import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import {
  getPublicRoutes,
  getSeoForPath,
  getStructuredData,
  siteUrl,
} from '../src/content/site.js'

const projectRoot = process.cwd()
const distDirectory = path.join(projectRoot, 'dist')
const serverEntry = path.join(projectRoot, '.prerender', 'entry-server.js')
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8')
const { render } = await import(pathToFileURL(serverEntry).href)
const publicRoutes = getPublicRoutes()

const metaMarker = /<!-- static-meta:start -->[\s\S]*?<!-- static-meta:end -->/
const appMarker = '<div id="root"><!-- app-html --></div>'

if (!metaMarker.test(template) || !template.includes(appMarker)) {
  throw new Error('The built index is missing its static metadata or app HTML marker.')
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function serializeSchema(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}

function createMetaMarkup(seo) {
  const canonicalUrl = `${siteUrl}${seo.canonicalPath}`
  const imageUrl = `${siteUrl}${seo.image}`
  const robots = seo.noindex ? 'noindex, nofollow' : 'index, follow'
  const imageMetadata = seo.imageWidth
    ? `
    <meta property="og:image:width" content="${seo.imageWidth}" />
    <meta property="og:image:height" content="${seo.imageHeight}" />
    <meta property="og:image:type" content="${escapeHtml(seo.imageType)}" />
    <meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />`
    : ''
  const twitterImageAlt = seo.imageAlt
    ? `
    <meta name="twitter:image:alt" content="${escapeHtml(seo.imageAlt)}" />`
    : ''

  return `<!-- static-meta:start -->
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:site_name" content="The Lyon Den" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:type" content="${seo.ogType}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${imageUrl}" />${imageMetadata}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${imageUrl}" />${twitterImageAlt}
    <script id="page-schema" type="application/ld+json">${serializeSchema(getStructuredData(seo))}</script>
    <!-- static-meta:end -->`
}

function createHtml(route) {
  const seo = getSeoForPath(route)
  const renderedMarkup = render(route)
  const resourceHints = renderedMarkup.match(/^((?:<link\b[^>]*\/>)+)/)?.[1] || ''
  const appMarkup = resourceHints
    ? renderedMarkup.slice(resourceHints.length)
    : renderedMarkup

  return template
    .replace(metaMarker, createMetaMarkup(seo))
    .replace('</head>', `${resourceHints}\n  </head>`)
    .replace(appMarker, `<div id="root">${appMarkup}</div>`)
}

async function writeRoute(route) {
  const outputPath = route === '/'
    ? path.join(distDirectory, 'index.html')
    : path.join(distDirectory, route.slice(1), 'index.html')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, createHtml(route))
}

await Promise.all(publicRoutes.map(writeRoute))
await writeFile(path.join(distDirectory, '404.html'), createHtml('/404'))

const sitemapEntries = publicRoutes.map((route) => {
  const seo = getSeoForPath(route)
  const location = route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`
  return `  <url>
    <loc>${location}</loc>
    <changefreq>${seo.changefreq}</changefreq>
    <priority>${seo.priority}</priority>
  </url>`
})

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>
`

await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap)
await rm(path.join(projectRoot, '.prerender'), { recursive: true, force: true })

console.log(`Prerendered ${publicRoutes.length} routes plus the 404 page.`)
