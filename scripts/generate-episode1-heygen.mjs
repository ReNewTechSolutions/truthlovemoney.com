import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const episodeDir = path.resolve('content/episodes/episode-001-the-summer-that-never-left-me')
const scriptPath = path.join(episodeDir, 'script.md')
const requestPath = path.join(episodeDir, 'heygen-request.json')
const preparedRequestPath = path.join(episodeDir, 'heygen-request.prepared.json')
const resultPath = path.join(episodeDir, 'heygen-result.json')

const apiBaseUrl = process.env.HEYGEN_API_BASE_URL || 'https://api.heygen.com'
const createEndpoint = process.env.HEYGEN_CREATE_ENDPOINT || '/v3/videos'
const statusEndpointTemplate = process.env.HEYGEN_STATUS_ENDPOINT_TEMPLATE || '/v3/videos/{video_id}'
const pollIntervalMs = Number(process.env.HEYGEN_POLL_INTERVAL_MS || 15000)
const maxPolls = Number(process.env.HEYGEN_MAX_POLLS || 90)
const avatarId = process.env.HEYGEN_AVATAR_ID || '610a6411cf0e4d58925b9cb7c122b973'

function requireEnv(name) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

function extractSpokenScript(markdown) {
  const startMarker = '<!-- HEYGEN_SCRIPT_START -->'
  const endMarker = '<!-- HEYGEN_SCRIPT_END -->'
  const start = markdown.indexOf(startMarker)
  const end = markdown.indexOf(endMarker)

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('script.md must include HEYGEN_SCRIPT_START and HEYGEN_SCRIPT_END markers.')
  }

  return markdown
    .slice(start + startMarker.length, end)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function applyTemplate(template, values) {
  return Object.entries(values).reduce(
    (current, [key, value]) => current.replaceAll(`{{${key}}}`, value),
    template,
  )
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function getVideoId(responseBody) {
  return (
    responseBody?.data?.video_id ||
    responseBody?.data?.id ||
    responseBody?.video_id ||
    responseBody?.id
  )
}

function getStatus(responseBody) {
  return String(responseBody?.data?.status || responseBody?.status || '').toLowerCase()
}

function getVideoUrl(responseBody) {
  return (
    responseBody?.data?.video_url ||
    responseBody?.data?.url ||
    responseBody?.video_url ||
    responseBody?.url
  )
}

async function heygenFetch(endpoint, options = {}) {
  const response = await fetch(new URL(endpoint, apiBaseUrl), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': heygenApiKey,
      ...options.headers,
    },
  })
  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(`HeyGen API error ${response.status}: ${JSON.stringify(body)}`)
  }

  return body
}

const heygenApiKey = requireEnv('HEYGEN_API_KEY')
const heygenVoiceId = requireEnv('HEYGEN_VOICE_ID')
const scriptMarkdown = await readFile(scriptPath, 'utf8')
const spokenScript = extractSpokenScript(scriptMarkdown)
const requestTemplate = await readFile(requestPath, 'utf8')
const requestBody = JSON.parse(
  applyTemplate(requestTemplate, {
    HEYGEN_AVATAR_ID: avatarId,
    HEYGEN_VOICE_ID: heygenVoiceId,
    SCRIPT_TEXT: JSON.stringify(spokenScript).slice(1, -1),
  }),
)

await writeFile(preparedRequestPath, `${JSON.stringify(requestBody, null, 2)}\n`)

if (process.env.HEYGEN_DRY_RUN === '1') {
  console.log(`Dry run complete. Prepared request written to ${preparedRequestPath}`)
  process.exit(0)
}

console.log(`Submitting Episode 001 to HeyGen: ${createEndpoint}`)
const createResponse = await heygenFetch(createEndpoint, {
  method: 'POST',
  body: JSON.stringify(requestBody),
})
const videoId = getVideoId(createResponse)

if (!videoId) {
  throw new Error(`HeyGen response did not include a video id: ${JSON.stringify(createResponse)}`)
}

console.log(`HeyGen video id: ${videoId}`)

for (let attempt = 1; attempt <= maxPolls; attempt += 1) {
  await sleep(pollIntervalMs)

  const statusEndpoint = statusEndpointTemplate.replace('{video_id}', encodeURIComponent(videoId))
  const statusResponse = await heygenFetch(statusEndpoint)
  const status = getStatus(statusResponse)
  const videoUrl = getVideoUrl(statusResponse)

  console.log(`Poll ${attempt}/${maxPolls}: ${status || 'unknown'}`)

  if (['completed', 'complete', 'success', 'done'].includes(status) && videoUrl) {
    await writeFile(
      resultPath,
      `${JSON.stringify({ video_id: videoId, status, video_url: videoUrl, raw: statusResponse }, null, 2)}\n`,
    )
    console.log(`Episode 001 render complete. Result written to ${resultPath}`)
    console.log(videoUrl)
    process.exit(0)
  }

  if (['failed', 'error', 'canceled', 'cancelled'].includes(status)) {
    await writeFile(
      resultPath,
      `${JSON.stringify({ video_id: videoId, status, raw: statusResponse }, null, 2)}\n`,
    )
    throw new Error(`HeyGen render failed with status: ${status}`)
  }
}

throw new Error(`Timed out waiting for HeyGen render after ${maxPolls} polls.`)
