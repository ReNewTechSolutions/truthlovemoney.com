import { readFile, writeFile } from 'node:fs/promises'
import dotenv from 'dotenv'
import path from 'node:path'
import process from 'node:process'

dotenv.config({ path: '.env.local', quiet: true })

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
const avatarId = '610a6411cf0e4d58925b9cb7c122b973'
const isDryRun = process.env.HEYGEN_DRY_RUN === '1' || process.argv.includes('--dry-run')
const isTestShort = process.argv.includes('--test-short')

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

function getFirstSentences(text, sentenceCount) {
  const matches = text.match(/[^.!?]+[.!?]+(?:["'”’])?/g) || []
  const sentences = matches.slice(0, sentenceCount).map((sentence) => sentence.trim())

  if (sentences.length >= sentenceCount) {
    return sentences.join(' ')
  }

  return text.split('\n').filter(Boolean).slice(0, sentenceCount).join(' ')
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

function getFailureDetails(responseBody) {
  const data = responseBody?.data || {}

  return {
    status: getStatus(responseBody),
    error: data.error || responseBody?.error || null,
    message: data.message || responseBody?.message || null,
    failure_reason:
      data.failure_reason ||
      data.failureReason ||
      data.error_message ||
      data.errorMessage ||
      responseBody?.failure_reason ||
      responseBody?.failureReason ||
      responseBody?.error_message ||
      responseBody?.errorMessage ||
      null,
  }
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

function sanitizeForLog(value) {
  return JSON.parse(
    JSON.stringify(value, (key, nestedValue) => {
      if (/api.?key|token|secret|authorization/i.test(key)) {
        return '[hidden]'
      }

      return nestedValue
    }),
  )
}

function validateRequestBody(requestBody) {
  const requiredStringFields = ['type', 'title', 'avatar_id', 'script', 'voice_id', 'output_format']

  for (const field of requiredStringFields) {
    if (typeof requestBody[field] !== 'string' || requestBody[field].trim() === '') {
      throw new Error(`Prepared HeyGen request is missing required string field: ${field}`)
    }
  }

  if (requestBody.type !== 'avatar') {
    throw new Error('HeyGen v3 avatar generation requires top-level type: "avatar".')
  }

  if (requestBody.avatar_id !== avatarId) {
    throw new Error(`Prepared HeyGen request avatar_id does not match expected avatar ${avatarId}.`)
  }
}

const heygenVoiceId = process.env.HEYGEN_VOICE_ID || (isDryRun ? 'DRY_RUN_HEYGEN_VOICE_ID' : requireEnv('HEYGEN_VOICE_ID'))
const scriptMarkdown = await readFile(scriptPath, 'utf8')
const spokenScript = extractSpokenScript(scriptMarkdown)
const renderScript = isTestShort ? getFirstSentences(spokenScript, 2) : spokenScript
const requestTemplate = await readFile(requestPath, 'utf8')
const requestBody = JSON.parse(
  applyTemplate(requestTemplate, {
    HEYGEN_AVATAR_ID: avatarId,
    HEYGEN_VOICE_ID: heygenVoiceId,
    SCRIPT_TEXT: JSON.stringify(renderScript).slice(1, -1),
  }),
)

await writeFile(preparedRequestPath, `${JSON.stringify(requestBody, null, 2)}\n`)
validateRequestBody(requestBody)

console.log('Final sanitized HeyGen request body:')
console.log(JSON.stringify(sanitizeForLog(requestBody), null, 2))

if (isTestShort) {
  console.log('Short test mode enabled: submitting only the first 2 script sentences.')
}

if (isDryRun) {
  if (!process.env.HEYGEN_VOICE_ID) {
    console.log('Dry run used placeholder HEYGEN_VOICE_ID. Set HEYGEN_VOICE_ID in .env.local before live generation.')
  }
  console.log(`Dry run complete. Prepared request written to ${preparedRequestPath}`)
  process.exit(0)
}

const heygenApiKey = requireEnv('HEYGEN_API_KEY')

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
    const failurePayload = {
      video_id: videoId,
      status,
      failure_details: getFailureDetails(statusResponse),
      raw: statusResponse,
    }
    await writeFile(
      resultPath,
      `${JSON.stringify(failurePayload, null, 2)}\n`,
    )
    console.error('HeyGen render failed. Full sanitized status response:')
    console.error(JSON.stringify(sanitizeForLog(failurePayload), null, 2))
    throw new Error(`HeyGen render failed with status: ${status}`)
  }
}

throw new Error(`Timed out waiting for HeyGen render after ${maxPolls} polls.`)
