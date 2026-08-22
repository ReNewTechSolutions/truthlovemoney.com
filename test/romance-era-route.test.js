import assert from 'node:assert/strict'
import test from 'node:test'
import { createServer } from 'vite'
import { getPublicRoutes, getSeoForPath } from '../src/content/site.js'

test('the romance-era route is public and has route-specific metadata', () => {
  const seo = getSeoForPath('/romance-era')

  assert.ok(getPublicRoutes().includes('/romance-era'))
  assert.equal(seo.title, 'What Era of Romance Does Your Heart Belong To? | The Lyon Den')
  assert.equal(seo.canonicalPath, '/romance-era')
  assert.equal(seo.image, '/assets/romance-era/results/devoted-romantic-1940s.png')
})

test('the romance-era route renders its landing experience on the server', async () => {
  const server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  })

  try {
    const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
    const html = render('/romance-era')

    assert.match(html, /What Era of Romance Does Your Heart Belong To\?/)
    assert.match(html, /Discover my era/i)
    assert.doesNotMatch(html, /This chapter isn’t here/)
  } finally {
    await server.close()
  }
})
