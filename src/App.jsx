import { useEffect, useMemo, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import ArchetypeQuiz from './ArchetypeQuiz'
import RomanceEraQuiz from './RomanceEraQuiz'
import {
  featuredStory,
  getSeriesNeighbors,
  getStory,
  socialChapters,
  stories,
} from './content/stories'
import {
  getSeoForPath,
  getStructuredData,
  siteUrl,
  socialLinks,
  youtubeUrl,
} from './content/site'

function setMeta(name, content, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function PageMeta({ path = '/' }) {
  const seo = useMemo(() => getSeoForPath(path), [path])

  useEffect(() => {
    const canonicalUrl = `${siteUrl}${seo.canonicalPath}`
    document.title = seo.title
    setMeta('description', seo.description)
    setMeta('og:title', seo.title, 'property')
    setMeta('og:description', seo.description, 'property')
    setMeta('og:type', seo.ogType, 'property')
    setMeta('og:url', canonicalUrl, 'property')
    setMeta('og:image', `${siteUrl}${seo.image}`, 'property')
    if (seo.imageWidth) setMeta('og:image:width', String(seo.imageWidth), 'property')
    if (seo.imageHeight) setMeta('og:image:height', String(seo.imageHeight), 'property')
    if (seo.imageType) setMeta('og:image:type', seo.imageType, 'property')
    if (seo.imageAlt) setMeta('og:image:alt', seo.imageAlt, 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', seo.title)
    setMeta('twitter:description', seo.description)
    setMeta('twitter:image', `${siteUrl}${seo.image}`)
    if (seo.imageAlt) setMeta('twitter:image:alt', seo.imageAlt)
    setMeta('robots', seo.noindex ? 'noindex, nofollow' : 'index, follow')

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    const existingSchema = document.getElementById('page-schema')
    existingSchema?.remove()
    const schema = document.createElement('script')
    schema.id = 'page-schema'
    schema.type = 'application/ld+json'
    schema.text = JSON.stringify(getStructuredData(seo))
    document.head.appendChild(schema)

    return () => schema.remove()
  }, [seo])

  return null
}

function Brand({ light = false }) {
  return (
    <span className={`wordmark ${light ? 'wordmark--light' : ''}`} aria-label="The Lyon Den">
      <span>The</span>
      <strong>Lyon Den</strong>
      <small>Stories by Marguerite Lyon</small>
    </span>
  )
}

function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <header className="site-header">
      <a className="brand-link" href="/">
        <Brand />
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? 'Close' : 'Menu'}</span>
        <i aria-hidden="true" />
      </button>
      <nav className={`primary-nav ${open ? 'is-open' : ''}`} id="primary-navigation" aria-label="Primary navigation">
        <a href="/stories" onClick={() => setOpen(false)}>Stories</a>
        <a href="/archetypes" onClick={() => setOpen(false)}>Quiz</a>
        <a href="/about" onClick={() => setOpen(false)}>About</a>
        <a href="/#follow" onClick={() => setOpen(false)}>Follow</a>
        <a className="nav-watch" href={youtubeUrl} target="_blank" rel="noreferrer">
          Watch <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <Brand light />
        <p>Stories about love, memory, books, family, mistakes, second chances — and the strange things that make up a life.</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/stories">Stories</a>
        <a href="/archetypes">Archetype quiz</a>
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href={youtubeUrl} target="_blank" rel="noreferrer">YouTube ↗</a>
      </nav>
      <p className="copyright">© {new Date().getFullYear()} The Lyon Den</p>
    </footer>
  )
}

function PageShell({ children }) {
  return (
    <div className="site-shell">
      <Analytics />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  )
}

function ArrowLink({ href, children, external = false, className = '' }) {
  return (
    <a
      className={`arrow-link ${className}`.trim()}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span>{children}</span>
      <i aria-hidden="true">↗</i>
    </a>
  )
}

function StoryMeta({ story }) {
  return (
    <p className="story-meta">
      <span>{story.category}</span>
      <span>{story.date}</span>
      <span>{story.readingTime}</span>
    </p>
  )
}

function HomePage() {
  const secondStory = stories.find((story) => story.slug !== featuredStory.slug)

  return (
    <PageShell>
      <PageMeta />
      <main id="main-content">
        <section className="home-hero" aria-labelledby="home-title">
          <img src="/assets/summer-story.webp" alt="" fetchPriority="high" />
          <div className="home-hero-shade" />
          <div className="home-hero-copy">
            <p className="eyebrow eyebrow--light">The Lyon Den</p>
            <h1 id="home-title">Every life leaves a story behind.</h1>
            <p>Love, memory, books, family, mistakes, second chances — and the things we understand differently with time.</p>
            <div className="hero-actions">
              <a className="button button--paper" href={`/stories/${featuredStory.slug}`}>Read a Story</a>
              <a className="button button--ghost" href="/about">Meet Marguerite</a>
            </div>
          </div>
          <p className="hero-edition" aria-hidden="true">A life, still unfolding</p>
        </section>

        <section className="featured-story layout-shell" aria-labelledby="featured-title">
          <div className="featured-number" aria-hidden="true">01</div>
          <a className="featured-image" href={`/stories/${featuredStory.slug}`} tabIndex="-1" aria-hidden="true">
            <img src={featuredStory.heroImage} alt="" />
          </a>
          <div className="featured-copy">
            <p className="eyebrow">The cover story</p>
            <StoryMeta story={featuredStory} />
            <h2 id="featured-title">{featuredStory.title}</h2>
            <p className="deck">{featuredStory.subtitle}</p>
            <p>{featuredStory.excerpt}</p>
            <ArrowLink href={`/stories/${featuredStory.slug}`}>Continue reading</ArrowLink>
          </div>
        </section>

        <section className="stories-preview" aria-labelledby="stories-preview-title">
          <div className="section-intro layout-shell">
            <div>
              <p className="eyebrow">From the journal</p>
              <h2 id="stories-preview-title">Stories for the life you’re living now.</h2>
            </div>
            <p>Some memories arrive softly. Others refuse to stay quiet. This is a place for both.</p>
          </div>
          <div className="story-mosaic layout-shell">
            <article className="mosaic-story">
              <a href={`/stories/${secondStory.slug}`} className="mosaic-image">
                <img src={secondStory.heroImage} alt={secondStory.heroAlt} loading="lazy" />
              </a>
              <StoryMeta story={secondStory} />
              <h3><a href={`/stories/${secondStory.slug}`}>{secondStory.title}</a></h3>
              <p>{secondStory.excerpt}</p>
            </article>
            <blockquote className="mosaic-quote">
              <span aria-hidden="true">“</span>
              <p>Every reader brings a different life to every page.</p>
              <cite>Marguerite Lyon</cite>
            </blockquote>
            <div className="mosaic-dispatches">
              <p className="eyebrow">Elsewhere in the Den</p>
              {socialChapters.slice(0, 3).map((chapter, index) => (
                <a href={chapter.url || youtubeUrl} target="_blank" rel="noreferrer" key={chapter.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <small>{chapter.label}</small>
                    <h3>{chapter.title}</h3>
                  </div>
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </div>
          </div>
          <div className="section-link layout-shell">
            <ArrowLink href="/stories">Browse all stories</ArrowLink>
          </div>
        </section>

        <section className="continuing-stories" aria-labelledby="continuing-title">
          <div className="continuing-grid layout-shell">
            <div className="continuing-copy">
              <p className="eyebrow eyebrow--light">Stories that continue</p>
              <h2 id="continuing-title">One life.<br />Many chapters.</h2>
              <p>The Lyon Den Journal gathers Marguerite’s reflections as an ongoing series. Begin at the beginning or step into the newest chapter.</p>
              <a className="button button--paper" href={`/stories/${secondStory.slug}`}>Begin with chapter one</a>
            </div>
            <div className="chapter-stack">
              {stories
                .slice()
                .sort((a, b) => a.episode - b.episode)
                .map((story) => (
                  <a href={`/stories/${story.slug}`} key={story.slug}>
                    <span>Chapter {String(story.episode).padStart(2, '0')}</span>
                    <h3>{story.title}</h3>
                    <i aria-hidden="true">Read →</i>
                  </a>
                ))}
              <div className="chapter-coming">
                <span>Next chapter</span>
                <p>The story is still being written.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="marguerite-intro layout-shell" aria-labelledby="marguerite-title">
          <div className="portrait-wrap">
            <span aria-hidden="true">ML</span>
            <img src="/assets/marguerite-portrait.webp" alt="Portrait of Marguerite Lyon with silver hair, glasses, and a warm scarf" loading="lazy" />
          </div>
          <div className="marguerite-copy">
            <p className="eyebrow">Meet Marguerite</p>
            <h2 id="marguerite-title">A lifelong reader. A former teacher. A storyteller still learning.</h2>
            <p>Marguerite writes about the books, people, memories, and choices that stay with us. Her stories are personal, curious, and grounded in the belief that every reader brings a different life to every page.</p>
            <p>The Lyon Den is not a place for answers handed down from above. It is a conversation — warm, honest, and always unfinished.</p>
            <ArrowLink href="/about">About Marguerite</ArrowLink>
          </div>
        </section>

        <section className="quote-interlude" aria-label="A reflection from Marguerite">
          <div className="layout-shell">
            <p>“The important memories simply become part of who we are.”</p>
            <span>— Marguerite Lyon</span>
          </div>
        </section>

        <section className="follow-section layout-shell" id="follow" aria-labelledby="follow-title">
          <div className="follow-heading">
            <p className="eyebrow">Follow along</p>
            <h2 id="follow-title">The story continues elsewhere.</h2>
          </div>
          <div className="social-list">
            {socialLinks.map((social) => (
              <a href={social.url} target="_blank" rel="noreferrer" key={social.name}>
                <span>{social.eyebrow}</span>
                <strong>{social.name}</strong>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className="letters-note layout-shell" aria-labelledby="letters-title">
          <p className="eyebrow">Watch from the Den</p>
          <h2 id="letters-title">Some stories are better told aloud.</h2>
          <p>Watch Marguerite share video chapters about memory, books, relationships, and the lessons that stay with us.</p>
          <ArrowLink href={youtubeUrl} external>Watch on YouTube</ArrowLink>
        </section>
      </main>
    </PageShell>
  )
}

function StoriesPage() {
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(stories.map((story) => story.category))]
  const visibleStories = category === 'All' ? stories : stories.filter((story) => story.category === category)

  return (
    <PageShell>
      <PageMeta path="/stories" />
      <main id="main-content">
        <header className="page-hero stories-hero layout-shell">
          <p className="eyebrow">The Lyon Den journal</p>
          <h1>Stories worth<br />sitting with.</h1>
          <p>Memoir, memory, books, relationships, and the unexpected ways a life keeps teaching us.</p>
        </header>

        <section className="index-feature layout-shell" aria-labelledby="index-feature-title">
          <img src={featuredStory.heroImage} alt={featuredStory.heroAlt} />
          <div>
            <p className="eyebrow">Featured now</p>
            <StoryMeta story={featuredStory} />
            <h2 id="index-feature-title">{featuredStory.title}</h2>
            <p>{featuredStory.excerpt}</p>
            <ArrowLink href={`/stories/${featuredStory.slug}`}>Read the story</ArrowLink>
          </div>
        </section>

        <section className="story-index layout-shell" aria-labelledby="recent-stories-title">
          <div className="index-toolbar">
            <h2 id="recent-stories-title">The journal</h2>
            <div className="filters" aria-label="Filter stories by category">
              {categories.map((item) => (
                <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="index-grid" aria-live="polite">
            {visibleStories.map((story, index) => (
              <article className="index-card" key={story.slug}>
                <a className="index-card-image" href={`/stories/${story.slug}`}>
                  <img src={story.heroImage} alt={story.heroAlt} loading={index ? 'lazy' : 'eager'} />
                  <span aria-hidden="true">0{index + 1}</span>
                </a>
                <StoryMeta story={story} />
                <h3><a href={`/stories/${story.slug}`}>{story.title}</a></h3>
                <p>{story.excerpt}</p>
                <ArrowLink href={`/stories/${story.slug}`}>Read</ArrowLink>
              </article>
            ))}
          </div>
        </section>

        <section className="dispatch-index" aria-labelledby="dispatch-title">
          <div className="layout-shell">
            <p className="eyebrow eyebrow--light">Video dispatches</p>
            <h2 id="dispatch-title">Some stories are told aloud.</h2>
            <div className="dispatch-grid">
              {socialChapters.map((chapter, index) => (
                <a href={chapter.url || youtubeUrl} target="_blank" rel="noreferrer" key={chapter.title}>
                  <span>0{index + 1}</span>
                  <small>{chapter.label}</small>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.description}</p>
                  <i aria-hidden="true">Watch ↗</i>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}

function StoryPage({ story }) {
  const { previous, next } = getSeriesNeighbors(story)
  const relatedArticle = stories.find((candidate) => candidate.slug !== story.slug)

  return (
    <PageShell>
      <PageMeta path={`/stories/${story.slug}`} />
      <main id="main-content" className="article-page">
        <article>
          <header className="article-header layout-shell">
            <a className="back-link" href="/stories">← All stories</a>
            <p className="eyebrow">{story.category}</p>
            <h1>{story.title}</h1>
            <p className="article-deck">{story.subtitle}</p>
            <div className="article-byline">
              <span>By {story.author}</span>
              <span>{story.date}</span>
              <span>{story.readingTime}</span>
            </div>
          </header>

          <figure className="article-hero layout-shell">
            <img src={story.heroImage} alt={story.heroAlt} fetchPriority="high" />
            <figcaption>The Lyon Den Journal · Chapter {String(story.episode).padStart(2, '0')}</figcaption>
          </figure>

          <div className="article-body">
            {story.content.map((block, index) => {
              if (block.type === 'quote') return <blockquote key={index}>{block.text}</blockquote>
              if (block.type === 'divider') return <div className="article-divider" aria-hidden="true" key={index}>◆</div>
              if (block.type === 'image') {
                return (
                  <figure className="article-inline-image" key={index}>
                    <img src={block.src} alt={block.alt} loading="lazy" />
                    <figcaption>{block.caption}</figcaption>
                  </figure>
                )
              }
              return <p key={index}>{block.text}</p>
            })}
          </div>
        </article>

        <nav className="series-nav layout-shell" aria-label="Chapter navigation">
          <p>{story.series}</p>
          <div>
            {previous ? (
              <a href={`/stories/${previous.slug}`}>
                <span>← Previous chapter</span>
                <strong>{previous.title}</strong>
              </a>
            ) : <span />}
            {next ? (
              <a href={`/stories/${next.slug}`}>
                <span>Next chapter →</span>
                <strong>{next.title}</strong>
              </a>
            ) : <span />}
          </div>
        </nav>

        <section className="keep-reading layout-shell" aria-labelledby="keep-reading-title">
          <p className="eyebrow">Keep reading</p>
          <h2 id="keep-reading-title">The conversation continues.</h2>
          <div className="related-grid">
            <a href={`/stories/${relatedArticle.slug}`} className="related-story">
              <img src={relatedArticle.heroImage} alt="" loading="lazy" />
              <span>{relatedArticle.category}</span>
              <h3>{relatedArticle.title}</h3>
              <i aria-hidden="true">Read story →</i>
            </a>
            {socialChapters.slice(0, 2).map((chapter) => (
              <a href={chapter.url || youtubeUrl} target="_blank" rel="noreferrer" className="related-dispatch" key={chapter.title}>
                <span>{chapter.label}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.description}</p>
                <i aria-hidden="true">Watch on YouTube ↗</i>
              </a>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  )
}

function AboutPage() {
  return (
    <PageShell>
      <PageMeta path="/about" />
      <main id="main-content" className="about-page">
        <header className="about-hero layout-shell">
          <div className="about-portrait">
            <img src="/assets/marguerite-portrait.webp" alt="Portrait of Marguerite Lyon with silver hair, glasses, and a warm scarf" />
            <span>Marguerite Lyon</span>
          </div>
          <div>
            <p className="eyebrow">About Marguerite</p>
            <h1>A life shaped by books, people, questions, and time.</h1>
            <p>Marguerite Lyon is a lifelong reader, a former teacher, and the storyteller at the heart of The Lyon Den.</p>
          </div>
        </header>

        <section className="about-story layout-shell" aria-labelledby="about-story-title">
          <div className="about-aside">
            <p>On the nightstand</p>
            <strong>Poetry, memoir, and literature that asks good questions.</strong>
          </div>
          <div>
            <h2 id="about-story-title">Why tell these stories now?</h2>
            <p>Throughout her life, Marguerite has learned from teachers, books, family, friendships, mistakes, and experiences she could never have predicted. Teaching showed her that literature is not simply something we read. It is something we experience.</p>
            <p>The Lyon Den grew from a simple belief: every story has something to teach us. Some lessons arrive through joy. Some through heartbreak. Others wait inside a scent, a photograph, a familiar object, or a sentence read years ago.</p>
            <p>This is where Marguerite gathers those lessons — not as a guru with all the answers, but as a curious human being willing to look back honestly and keep learning in public.</p>
          </div>
        </section>

        <section className="about-values" aria-label="The heart of The Lyon Den">
          <div className="layout-shell">
            <p className="eyebrow eyebrow--light">The heart of the Den</p>
            <div className="values-grid">
              <div><span>01</span><h2>Stories become lessons.</h2><p>A remembered moment can change shape when it is finally told.</p></div>
              <div><span>02</span><h2>Books become conversations.</h2><p>Every reader brings a different life to every page.</p></div>
              <div><span>03</span><h2>Curiosity keeps us growing.</h2><p>The point is not to have every answer. It is to keep asking better questions.</p></div>
            </div>
          </div>
        </section>

        <section className="about-cta layout-shell">
          <p className="eyebrow">Come sit awhile</p>
          <h2>There is always another story.</h2>
          <ArrowLink href="/stories">Enter the journal</ArrowLink>
        </section>
      </main>
    </PageShell>
  )
}

function PrivacyPage() {
  return (
    <PageShell>
      <PageMeta path="/privacy" />
      <main id="main-content" className="policy-page layout-shell">
        <p className="eyebrow">The fine print</p>
        <h1>Privacy, plainly told.</h1>
        <p className="policy-lead">The Lyon Den is currently a simple, public reading experience. It does not offer visitor accounts, accept private story submissions, or store newsletter signups.</p>
        <section>
          <h2>Technical information</h2>
          <p>Like most websites, the hosting service may process basic technical information needed to deliver the site securely and reliably, such as request logs, browser details, and approximate network information.</p>
        </section>
        <section>
          <h2>External links</h2>
          <p>Links to YouTube lead to a service with its own privacy practices. Its policies apply once you leave this site.</p>
        </section>
        <section>
          <h2>Future changes</h2>
          <p>If The Lyon Den adds a real newsletter or another feature that collects information, this page will be updated before that feature is made available.</p>
        </section>
        <p className="policy-updated">Last updated August 2026.</p>
      </main>
    </PageShell>
  )
}

function ArchetypesPage() {
  return (
    <PageShell>
      <PageMeta path="/archetypes" />
      <ArchetypeQuiz />
    </PageShell>
  )
}

function RomanceEraPage() {
  return (
    <PageShell>
      <PageMeta path="/romance-era" />
      <RomanceEraQuiz />
    </PageShell>
  )
}

function NotFoundPage() {
  return (
    <PageShell>
      <PageMeta path="/404" />
      <main id="main-content" className="not-found layout-shell">
        <p className="eyebrow">A missing page</p>
        <h1>This chapter isn’t here.</h1>
        <p>It may have moved, or perhaps it has not been written yet.</p>
        <a className="button button--ink" href="/stories">Browse the stories</a>
      </main>
    </PageShell>
  )
}

function App({ initialPath }) {
  const browserPath = typeof window === 'undefined' ? '/' : window.location.pathname
  const path = (initialPath || browserPath).replace(/\/+$/, '') || '/'
  const legacyMatch = path.match(/^\/blog\/(.+)$/)
  const storyMatch = path.match(/^\/stories\/(.+)$/)
  const story = getStory(storyMatch?.[1] || legacyMatch?.[1])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  if (path === '/') return <HomePage />
  if (path === '/stories' || path === '/blog') return <StoriesPage />
  if (story) return <StoryPage story={story} />
  if (path === '/about') return <AboutPage />
  if (path === '/archetypes') return <ArchetypesPage />
  if (path === '/romance-era') return <RomanceEraPage />
  if (path === '/privacy') return <PrivacyPage />
  return <NotFoundPage />
}

export default App
