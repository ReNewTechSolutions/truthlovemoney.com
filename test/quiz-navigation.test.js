import assert from 'node:assert/strict'
import test from 'node:test'
import { createServer } from 'vite'
import { getPublicRoutes, quizNavigationItems } from '../src/content/site.js'

test('quiz navigation exposes both existing public quiz routes', () => {
  assert.deepEqual(
    quizNavigationItems.map(({ href, label }) => ({ href, label })),
    [
      { href: '/archetypes', label: 'Feminine Archetype Quiz' },
      { href: '/romance-era', label: 'Romance Era Quiz' },
    ],
  )

  quizNavigationItems.forEach(({ href }) => {
    assert.ok(getPublicRoutes().includes(href))
  })
})

test('the server-rendered header includes an expandable Quiz parent and both destinations', async () => {
  const server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  })

  try {
    const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
    const html = render('/')

    assert.match(html, /aria-controls="quiz-navigation-links"/)
    assert.match(html, /Feminine Archetype Quiz/)
    assert.match(html, /href="\/archetypes"/)
    assert.match(html, /Romance Era Quiz/)
    assert.match(html, /href="\/romance-era"/)
  } finally {
    await server.close()
  }
})
