import { useEffect, useMemo, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase, supabaseConfig } from './lib/supabaseClient'

const exploreCards = [
  {
    title: 'Truth',
    text: 'Honest perspective, clear questions, literature, memoirs, and the courage to look closely.',
  },
  {
    title: 'Love',
    text: 'Connection, compassion, relationships, loneliness, courage, and the heart-work of being human.',
  },
  {
    title: 'Money',
    text: 'Practical wisdom, confidence, lived lessons, and calmer choices for real life.',
  },
]

const reflectionCards = [
  'Poetry that notices the small holy moments.',
  'Memoirs and memories shaped into meaning.',
  'Reflections for personal growth and quiet courage.',
]

const youtubeChannelUrl = 'https://www.youtube.com/@TheLyonDen-Marguerite'
const youtubeLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}

const blogPosts = [
  {
    title: 'The Summer That Never Left Me',
    subtitle: 'How one poem reminded me that memories never really leave us.',
    author: 'Marguerite Lyon',
    category: 'Stories',
    featured: true,
    readingTime: '5 minutes',
    path: '/blog/the-summer-that-never-left-me',
    heroImage: '/assets/summer-that-never-left-me.png',
    heroAlt: 'Golden summer creekside scene with books, flowers, warm light, and a nostalgic literary atmosphere',
    excerpt:
      'A reflective story about poetry, memory, summer afternoons, teaching, family, and the small objects that become chapters of a life.',
    paragraphs: [
      'Sometimes a poem doesn’t simply give us words.',
      'Sometimes it quietly opens a door.',
      'Recently I reread a favorite poem that immediately carried me back to summers I thought I had almost forgotten.',
      'Family afternoons at the swimming pool.',
      'The sound of laughter.',
      'Friends.',
      'Students.',
      'The simple joy of sharing books and discovering new stories together.',
      'It reminded me that memories have a remarkable way of waiting patiently until something awakens them.',
      'A scent.',
      'A photograph.',
      'A favorite book.',
      'A poem.',
      'One of the things I loved most about teaching was watching students discover that literature isn’t simply something we read.',
      'It’s something we experience.',
      'Every reader brings a different life to every page.',
      'That’s why one poem can mean something entirely different to each person who encounters it.',
      'Perhaps that’s the true gift of literature.',
      'It reminds us that our own stories matter.',
      'Some of my happiest memories involve water.',
      'Summers with family.',
      'Later, watching my parents enjoy the swimming pool they worked so hard to build.',
      'Moments that seemed ordinary then but have become priceless now.',
      'One small object can hold an entire lifetime of memories.',
      'A favorite kitchen utensil.',
      'A treasured ring from a parent.',
      'A book whose pages have become worn through years of reading.',
      'These things become more than objects.',
      'They become chapters.',
      'The older I become, the more I realize that memories don’t fade because they’re unimportant.',
      'The important ones simply become part of who we are.',
      'Perhaps every story has something to teach us.',
      'And perhaps every memory is quietly waiting for the right moment to bloom again.',
      'Welcome to The Lyon Den.',
      'Never stop learning.',
    ],
  },
  {
  title: 'Every Story Has Something to Teach Us',
  subtitle: 'Why I Created The Lyon Den',
  author: 'Marguerite Lyon',
  category: 'Stories',
  featured: false,
  readingTime: '4 minutes',
  path: '/blog/every-story-has-something-to-teach-us',
  heroImage: '/assets/banner.png',
  heroAlt: 'The Lyon Den creekside banner artwork with books, flowers, and handwritten story notes',
  excerpt:
    'The first official written chapter of The Lyon Den, welcoming readers into stories, lessons, books, and lifelong learning.',
  paragraphs: [
    'Throughout my life, I’ve been fortunate to learn from wonderful teachers, remarkable books, family, friendships, mistakes, and experiences I never could have predicted.',
    'Eventually, I realized something simple and important:',
    'Every story has something to teach us.',
    'Some lessons come through joy. Some come through heartbreak. Some come quietly through books, conversations, memories, music, nature, or ordinary days that become meaningful only after time has passed.',
    'The Lyon Den was created as a place to preserve those lessons and share them with anyone who might need them.',
    'Here, we explore truth, love, money, literature, poetry, personal growth, and lifelong learning. Not because we have all the answers, but because staying curious keeps us growing.',
    'My hope is that The Lyon Den becomes a warm place for reflection — a place where stories become lessons, books become conversations, and wisdom is shared one chapter at a time.',
    'Every life holds chapters worth remembering.',
    'Every experience can become a seed of wisdom.',
    'And every story, if shared with love, has the power to encourage someone else.',
    'Welcome to The Lyon Den.',
    'Never stop learning.',
  ],
  },
]

const featuredBlogPost = blogPosts.find((post) => post.featured) || blogPosts[0]
const firstBlogPost = blogPosts.find((post) => post.path === '/blog/every-story-has-something-to-teach-us')

function getPostByPath(path) {
  return blogPosts.find((post) => post.path === path)
}

const youtubeVideosUrl = `${youtubeChannelUrl}/videos`

const latestChapters = [
  {
    title: 'Every Story Has Something to Teach Us',
    publishedAt: 'June 2026',
    description: 'A first welcome to The Lyon Den and the stories, books, and lessons that shape this literary home.',
    thumbnail: '/assets/banner.png',
    url: youtubeChannelUrl,
  },
  {
    title: 'Truth, Love, Money, and a Life of Learning',
    publishedAt: 'June 2026',
    description: 'A reflective chapter on staying curious, gathering wisdom, and noticing what ordinary days can teach.',
    thumbnail: '/assets/lifelessons.png',
    url: youtubeChannelUrl,
  },
  {
    title: 'Books That Stay With Us',
    publishedAt: 'June 2026',
    description: 'A gentle bookshelf conversation about literature, memory, and the passages that keep speaking.',
    thumbnail: '/assets/lessonsthatlast.png',
    url: youtubeChannelUrl,
  },
  {
    title: 'Poetry for the Quiet Hours',
    publishedAt: 'June 2026',
    description: 'Short reflections for the softer moments: poetry, wonder, courage, and the heart-work of listening.',
    thumbnail: '/assets/cta.png',
    url: youtubeChannelUrl,
  },
]

const bookshelfItems = [
  {
    title: 'Literature',
    text: 'Books that open a window, ask better questions, and leave a sentence glowing long after the page is closed.',
  },
  {
    title: 'Memoir',
    text: 'Remembered chapters, family stories, turning points, and the wisdom that comes from looking back with tenderness.',
  },
  {
    title: 'Life Lessons',
    text: 'Practical reflections on truth, love, money, courage, and the choices that help a life become more whole.',
  },
]

const entryTypes = [
  { label: 'Story or Memory', value: 'story_memory', icon: '📝' },
  { label: 'Book Recommendation', value: 'book_recommendation', icon: '📚' },
  { label: 'Poetry', value: 'poetry', icon: '✍️' },
  { label: 'Random Thought', value: 'random_thought', icon: '💭' },
  { label: 'Relationship Lesson', value: 'relationship_lesson', icon: '❤️' },
  { label: 'Money Lesson', value: 'money_lesson', icon: '💰' },
  { label: 'Future Video Idea', value: 'future_video_idea', icon: '🎥' },
  { label: 'Reminder For Felicia', value: 'reminder_for_felicia', icon: '⭐' },
]

const statusLabels = {
  new: 'Newly Planted',
  used: 'Harvested',
  planned: 'Growing',
  published: 'Bloomed',
}

const VAULT_USER_EMAIL = 'cmargu@yahoo.com'
const ADMIN_EMAIL = 'frj816@gmail.com'
const allowedEmails = [VAULT_USER_EMAIL, ADMIN_EMAIL]
const vaultNextStorageKey = 'tlm-story-vault-next'

function normalizeEmail(email = '') {
  return email.trim().toLowerCase()
}

function isAllowedEmail(email) {
  return allowedEmails.includes(normalizeEmail(email))
}

function isAdminEmail(email) {
  return normalizeEmail(email) === ADMIN_EMAIL
}

function isVaultUserEmail(email) {
  return normalizeEmail(email) === VAULT_USER_EMAIL
}

function canRequestMagicLink(email, admin) {
  return admin ? isAdminEmail(email) : isAllowedEmail(email)
}

function getLoginBlockMessage(email, admin) {
  if (admin && isVaultUserEmail(email)) {
    return 'This area is reserved for Felicia.'
  }

  return 'This private garden is currently reserved for Marguerite.'
}

function getLoginErrorMessage(error) {
  const message = error?.message || 'Supabase did not provide an error message.'
  const status = error?.status || error?.statusCode
  const isRateLimited =
    status === 429 ||
    /rate limit|too many|security purposes|wait|after/i.test(message)

  if (isRateLimited) {
    return 'A garden gate link was already sent. Please wait a minute, then use the newest email.'
  }

  if (/failed to fetch|networkerror|load failed/i.test(message)) {
    return `The site could not reach Supabase (${supabaseConfig.host || 'missing Supabase URL'}). In Vercel, VITE_SUPABASE_URL should be https://eyirlvsqrusyngrvswsw.supabase.co. Browser message: ${message}`
  }

  return message
}

function getReadableError(error, fallback = 'Something went wrong.') {
  return error?.message || error?.error_description || fallback
}

function getSafeNextPath(nextPath, fallbackPath = '/vault') {
  if (nextPath === '/') return '/'
  if (nextPath === '/vault-admin') return '/vault-admin'
  if (nextPath === '/vault') return '/vault'
  if (fallbackPath === '/') return '/'
  return fallbackPath === '/vault-admin' ? '/vault-admin' : '/vault'
}

function getAuthRedirectDetails() {
  const currentUrl = new URL(window.location.href)
  const hashParams = new URLSearchParams(currentUrl.hash.replace(/^#/, ''))

  return {
    currentUrl,
    hashParams,
    hasAuthParams: Boolean(
      currentUrl.searchParams.get('code') ||
        currentUrl.searchParams.get('error') ||
        currentUrl.searchParams.get('error_description') ||
        currentUrl.searchParams.get('error_code') ||
        hashParams.get('access_token') ||
        hashParams.get('refresh_token') ||
        hashParams.get('token_hash') ||
        hashParams.get('error') ||
        hashParams.get('error_description') ||
        hashParams.get('error_code'),
    ),
  }
}

function saveIntendedVaultPath(path) {
  try {
    window.localStorage.setItem(vaultNextStorageKey, path)
  } catch {
    // Private browsing or storage limits should not block login.
  }
}

function readIntendedVaultPath() {
  try {
    return window.localStorage.getItem(vaultNextStorageKey)
  } catch {
    return null
  }
}

function clearIntendedVaultPath() {
  try {
    window.localStorage.removeItem(vaultNextStorageKey)
  } catch {
    // Storage may be unavailable.
  }
}

function getTypeLabel(value) {
  return entryTypes.find((entry) => entry.value === value)?.label || value
}

function YouTubeIcon() {
  return <span className="youtube-icon" aria-hidden="true">▶</span>
}

function useChapterVisibleCount() {
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 1
    if (window.innerWidth >= 1120) return 3
    if (window.innerWidth >= 681) return 2
    return 1
  }

  const [visibleCount, setVisibleCount] = useState(getVisibleCount)

  useEffect(() => {
    function handleResize() {
      setVisibleCount(getVisibleCount())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return visibleCount
}

function LatestChaptersCarousel() {
  const visibleCount = useChapterVisibleCount()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef(null)
  const maxIndex = Math.max(latestChapters.length - visibleCount, 0)
  const safeIndex = Math.min(activeIndex, maxIndex)

  useEffect(() => {
    setActiveIndex((currentIndex) => Math.min(currentIndex, maxIndex))
  }, [maxIndex])

  useEffect(() => {
    const carousel = carouselRef.current
    const targetCard = carousel?.querySelectorAll('.chapter-card')[safeIndex]

    if (!carousel || !targetCard) return

    carousel.scrollTo({
      left: targetCard.offsetLeft,
      behavior: 'smooth',
    })
  }, [safeIndex, visibleCount])

  useEffect(() => {
    if (isPaused || maxIndex === 0) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex >= maxIndex ? 0 : currentIndex + 1))
    }, 6000)

    return () => window.clearInterval(interval)
  }, [isPaused, maxIndex])

  function showPrevious() {
    setActiveIndex((currentIndex) => (currentIndex <= 0 ? maxIndex : currentIndex - 1))
  }

  function showNext() {
    setActiveIndex((currentIndex) => (currentIndex >= maxIndex ? 0 : currentIndex + 1))
  }

  return (
    <section
      className="latest-chapters section-shell"
      id="latest-chapters"
      aria-labelledby="latest-chapters-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="latest-chapters-heading">
        <div>
          <p className="eyebrow">Latest Chapters</p>
          <h2 id="latest-chapters-title">Latest Chapters</h2>
          <p>Stories, reflections, and life lessons from The Lyon Den.</p>
        </div>
        <a className="button button-secondary" href={youtubeVideosUrl} {...youtubeLinkProps}>
          View All Chapters
        </a>
      </div>

      <div
        className="chapter-carousel"
        aria-roledescription="carousel"
        aria-label="Latest Lyon Den YouTube chapters"
        ref={carouselRef}
      >
        <div className="chapter-track">
          {latestChapters.map((chapter, index) => (
            <a
              className="chapter-card"
              href={chapter.url}
              key={chapter.title}
              aria-label={`Watch ${chapter.title} on YouTube`}
              {...youtubeLinkProps}
            >
              <img
                src={chapter.thumbnail}
                alt=""
                loading="lazy"
              />
              <div className="chapter-card-body">
                <p className="chapter-date">{chapter.publishedAt}</p>
                <h3>{chapter.title}</h3>
                {chapter.description && <p>{chapter.description}</p>}
                <span className="button button-primary">Watch on YouTube</span>
              </div>
              <span className="sr-only">
                Chapter {index + 1} of {latestChapters.length}
              </span>
            </a>
          ))}
        </div>
      </div>

      <p className="youtube-note chapter-note">New chapters are published regularly.</p>

      <div className="chapter-controls" aria-label="Latest Chapters controls">
        <button type="button" onClick={showPrevious} aria-label="Show previous chapters">
          ←
        </button>
        <div className="chapter-dots" aria-hidden="true">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <span className={index === safeIndex ? 'active' : ''} key={index} />
          ))}
        </div>
        <button type="button" onClick={showNext} aria-label="Show next chapters">
          →
        </button>
      </div>
    </section>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const { hasAuthParams } = getAuthRedirectDetails()

  useEffect(() => {
    const handleNavigation = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handleNavigation)
    return () => window.removeEventListener('popstate', handleNavigation)
  }, [])

  const normalizedPath = path.replace(/\/+$/, '') || '/'

  if (normalizedPath === '/vault') {
    return <VaultApp admin={false} />
  }

  if (normalizedPath === '/vault-admin') {
    return <VaultApp admin />
  }

  if (normalizedPath === '/auth/callback' || hasAuthParams) {
    return <AuthCallback />
  }

  const selectedPost = getPostByPath(normalizedPath)

  if (normalizedPath === '/blog' || selectedPost) {
    return <BlogPostPage post={selectedPost || featuredBlogPost} />
  }

  return <HomePage />
}

function HomePage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <main className="site-shell" id="top">
      <header className="site-header" aria-label="TruthLoveMoney.com header">
        <a className="brand" href="#top" aria-label="TruthLoveMoney.com home">
          <img src="/assets/watermark-logo.png" alt="" className="brand-logo" />
          <span>
            <strong>TruthLoveMoney.com</strong>
            <small>Stories • Wisdom • Life Lessons</small>
          </span>
        </a>
        <a
          className="mobile-youtube-link"
          href={youtubeChannelUrl}
          aria-label="Open The Lyon Den YouTube channel"
          {...youtubeLinkProps}
        >
          <YouTubeIcon />
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#featured">Featured</a>
          <a href="#latest-chapters">Latest Chapters</a>
          <a href="#bookshelf">Books</a>
          <a href="#poetry">Poetry</a>
          <a href="#about">About</a>
          <a href="/blog">Blog</a>
          <a className="youtube-nav-link" href={youtubeChannelUrl} {...youtubeLinkProps}>
            <YouTubeIcon />
          </a>
          <a className="nav-cta" href={youtubeChannelUrl} {...youtubeLinkProps}>Subscribe</a>
        </nav>
      </header>

      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="script-line">A modern literary home for</p>
          <h1 id="hero-title">The Lyon Den</h1>
          <p className="truth-line">Truth • Love • Money</p>
          <p className="tagline">Never Stop Learning</p>
          <p className="hero-intro">
            Read reflective essays, discover meaningful books, watch gentle video chapters,
            and linger with poetry, memoir, and life lessons for the heart.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href={featuredBlogPost.path}>
              Read Featured Article
            </a>
            <a className="button button-secondary" href={youtubeChannelUrl} {...youtubeLinkProps}>
              Watch on YouTube
            </a>
          </div>
        </div>

        <figure className="hero-media">
          <img
            src="/assets/hero.png"
            alt="Truth Love Money hero artwork for The Lyon Den with creekside books and warm reflective light"
          />
        </figure>
      </section>

      <LatestChaptersCarousel />

      <section className="publication-lead section-shell" id="featured" aria-labelledby="publication-title">
        <article className="featured-article-card">
          <p className="eyebrow">Featured Article</p>
          <h2 id="publication-title">{featuredBlogPost.title}</h2>
          <p className="blog-subtitle">{featuredBlogPost.subtitle}</p>
          <p>
            {featuredBlogPost.excerpt}
          </p>
          <a className="button button-secondary" href={featuredBlogPost.path}>
            Read the Article
          </a>
        </article>

        <a
          className="latest-chapter-card"
          href={youtubeChannelUrl}
          aria-label="Watch the latest Lyon Den video on YouTube"
          {...youtubeLinkProps}
        >
          <p className="eyebrow">Latest Chapter</p>
          <h2>{latestChapters[0].title}</h2>
          <p>{latestChapters[0].description}</p>
          <span className="button button-primary">Watch on YouTube</span>
        </a>
      </section>

      <section className="bookshelf section-shell" id="bookshelf" aria-labelledby="bookshelf-title">
        <div className="section-heading">
          <p className="eyebrow">Bookshelf</p>
          <h2 id="bookshelf-title">Books, memoirs, and lessons worth keeping close.</h2>
          <p>
            The Lyon Den reads life through books and books through life: favorite passages,
            remembered chapters, and practical wisdom for ordinary days.
          </p>
        </div>
        <div className="bookshelf-grid">
          {bookshelfItems.map((item) => (
            <article className="book-card" key={item.title}>
              <span aria-hidden="true">Chapter</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="poetry section-shell" id="poetry" aria-labelledby="poetry-title">
        <div className="section-heading centered">
          <p className="eyebrow">Poetry &amp; Reflections</p>
          <h2 id="poetry-title">A softer room for meaning, memory, and wonder.</h2>
          <p>
            Some lessons arrive as stories. Some arrive as poems. Some arrive as one quiet
            sentence that keeps tapping on the heart.
          </p>
        </div>
        <div className="reflection-grid">
          {reflectionCards.map((text) => (
            <article className="reflection-card" key={text}>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="latest-stories section-shell" id="latest-stories" aria-labelledby="latest-stories-title">
        <div className="section-heading">
          <p className="eyebrow">Latest Stories</p>
          <h2 id="latest-stories-title">Truth, love, and money through a story-shaped lens.</h2>
          <p>
            Essays, video chapters, and reflections gather here as the publication grows.
          </p>
        </div>
        <div className="story-grid">
          <article className="story-card story-card-featured">
            <p className="eyebrow">Latest Blog</p>
            <h3>{featuredBlogPost.title}</h3>
            <p>{featuredBlogPost.subtitle}</p>
            <a className="text-link" href={featuredBlogPost.path}>Read now</a>
          </article>
          {blogPosts
            .filter((post) => post.path !== featuredBlogPost.path)
            .map((post) => (
              <article className="story-card" key={post.path}>
                <p className="eyebrow">{post.category}</p>
                <h3>{post.title}</h3>
                <p>{post.subtitle}</p>
                <a className="text-link" href={post.path}>Continue reading</a>
              </article>
            ))}
          {exploreCards.map((card) => (
            <article className="story-card" key={card.title}>
              <p className="eyebrow">{card.title}</p>
              <h3>{card.title} Notes</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell media-section reverse publication-image-band" aria-labelledby="lessons-title">
        <div className="media-image">
          <img
            src={featuredBlogPost.heroImage}
            alt={featuredBlogPost.heroAlt}
          />
        </div>
        <div className="media-copy">
          <p className="eyebrow">Featured Story</p>
          <h2 id="lessons-title">{featuredBlogPost.title}</h2>
          <p>
            {featuredBlogPost.excerpt}
          </p>
          <a className="text-link" href={featuredBlogPost.path}>Read the featured story</a>
        </div>
      </section>

      <section className="about section-shell media-section" id="about" aria-labelledby="about-title">
        <div className="media-image">
          <img
            src="/assets/portrait.png"
            alt="Illustrated portrait of Marguerite with silver hair, glasses, and a warm scarf"
          />
        </div>
        <div className="media-copy">
          <p className="eyebrow">About Marguerite</p>
          <h2 id="about-title">A host for thoughtful stories and gentle wisdom.</h2>
          <p>
            Marguerite shares reflections from literature, life, love, personal growth, and
            practical financial wisdom. The tone is personal and grounded: not a lecture,
            but a welcoming conversation.
          </p>
          <p>
            The Lyon Den is a place for memoirs, meaningful books, poetry, clear questions,
            and lessons that stay with us.
          </p>
        </div>
      </section>

      <section className="join section-shell" id="join" aria-labelledby="join-title">
        <div className="join-copy">
          <p className="eyebrow">Subscribe</p>
          <h2 id="join-title">Join the Story Circle.</h2>
          <p>
            Receive new essays, video chapters, reading notes, poetry, and invitations from
            The Lyon Den.
          </p>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" autoComplete="name" />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            Message or topic request
            <textarea name="message" rows="4" />
          </label>
          <button className="button button-primary" type="submit">
            Join the Story Circle
          </button>
          {submitted && (
            <p className="success" role="status">
              Thank you. Your note has been received for this preview site.
            </p>
          )}
        </form>
      </section>

      <section className="final-cta section-shell" aria-labelledby="final-cta-title">
        <div className="final-cta-image">
          <img
            src="/assets/cta.png"
            alt="Warm Lyon Den call-to-action artwork with books, flowers, creekside light, and the Truth Love Money brand"
          />
        </div>
        <div className="final-cta-copy">
          <p className="eyebrow">Never Stop Learning</p>
          <h2 id="final-cta-title">Bring your story to the circle.</h2>
          <p>
            Truth Love Money grows from shared questions, good books, honest memories, and
            reflections that help us live with more courage.
          </p>
          <a className="button button-primary" href="#join">
            Share a Question or Story Idea
          </a>
        </div>
      </section>

      <footer className="footer">
        <img src="/assets/watermark-logo.png" alt="" className="footer-logo" />
        <div>
          <p>TruthLoveMoney.com</p>
          <p>The Lyon Den • Hosted by Marguerite</p>
          <p>Stories • Wisdom • Life Lessons</p>
          <a className="footer-youtube-link" href={youtubeChannelUrl} {...youtubeLinkProps}>
            <YouTubeIcon />
            YouTube
          </a>
          <a className="creator-login-link" href="/vault">Creator Login</a>
        </div>
      </footer>
    </main>
  )
}

function BlogPostPage({ post }) {
  const currentIndex = blogPosts.findIndex((blogPost) => blogPost.path === post.path)
  const previousPost = blogPosts[currentIndex + 1] || null
  const nextPost = blogPosts[currentIndex - 1] || null
  const continuePost =
    post.path === firstBlogPost.path ? featuredBlogPost : blogPosts.find((blogPost) => blogPost.path !== post.path)

  return (
    <main className="site-shell blog-shell">
      <header className="site-header blog-header" aria-label="TruthLoveMoney.com blog header">
        <a className="brand" href="/" aria-label="TruthLoveMoney.com home">
          <img src="/assets/watermark-logo.png" alt="" className="brand-logo" />
          <span>
            <strong>TruthLoveMoney.com</strong>
            <small>The Lyon Den Journal</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Blog navigation">
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
          <a href={youtubeChannelUrl} {...youtubeLinkProps}>YouTube</a>
          <a className="nav-cta" href={youtubeChannelUrl} {...youtubeLinkProps}>Subscribe</a>
        </nav>
      </header>

      <article className="blog-article section-shell" aria-labelledby="blog-title">
        <a className="text-link back-home-link" href="/">
          Back to The Lyon Den
        </a>
        <header className="blog-article-header">
          <p className="eyebrow">{post.category}</p>
          <h1 id="blog-title">{post.title}</h1>
          <p className="blog-subtitle">{post.subtitle}</p>
          <div className="blog-meta" aria-label="Article details">
            <span>By {post.author}</span>
            <span>{post.readingTime}</span>
            {post.featured && <span>Featured Story</span>}
          </div>
        </header>

        <figure className="blog-hero-image">
          <img src={post.heroImage} alt={post.heroAlt} />
        </figure>

        <div className="blog-body">
          {post.paragraphs.map((paragraph) =>
            paragraph === 'Every story has something to teach us.' ||
            paragraph === 'Sometimes a poem doesn’t simply give us words.' ? (
              <blockquote key={paragraph}>{paragraph}</blockquote>
            ) : (
              <p key={paragraph}>{paragraph}</p>
            ),
          )}
        </div>
      </article>

      {continuePost && (
        <section className="continue-reading section-shell" aria-labelledby="continue-reading-title">
          <div>
            <p className="eyebrow">Continue Reading</p>
            <h2 id="continue-reading-title">{continuePost.title}</h2>
            <p>{continuePost.subtitle}</p>
          </div>
          <a className="button button-secondary" href={continuePost.path}>
            Continue Reading
          </a>
        </section>
      )}

      <nav className="article-nav section-shell" aria-label="Article navigation">
        {previousPost ? (
          <a href={previousPost.path}>
            <span>Previous Article</span>
            {previousPost.title}
          </a>
        ) : (
          <span />
        )}
        {nextPost ? (
          <a href={nextPost.path}>
            <span>Next Article</span>
            {nextPost.title}
          </a>
        ) : (
          <span />
        )}
      </nav>

      <section className="blog-next section-shell" aria-labelledby="blog-next-title">
        <div>
          <p className="eyebrow">Keep Growing</p>
          <h2 id="blog-next-title">Plant a thought for a future chapter.</h2>
          <p>
            The Seed Garden is where ideas begin before they bloom into stories, poems,
            videos, and lessons.
          </p>
        </div>
        <a className="button button-primary" href={youtubeChannelUrl} {...youtubeLinkProps}>
          Watch on YouTube
        </a>
      </section>

      <footer className="footer">
        <img src="/assets/watermark-logo.png" alt="" className="footer-logo" />
        <div>
          <p>TruthLoveMoney.com</p>
          <p>The Lyon Den • Hosted by Marguerite</p>
          <p>Never Stop Learning</p>
          <a className="footer-youtube-link" href={youtubeChannelUrl} {...youtubeLinkProps}>
            <YouTubeIcon />
            YouTube
          </a>
          <a className="creator-login-link" href="/vault">Creator Login</a>
        </div>
      </footer>
    </main>
  )
}

function VaultApp({ admin }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!isSupabaseConfigured) {
    return <VaultConfigNotice />
  }

  if (loading) {
    return (
      <VaultShell>
        <p className="vault-loading">Opening The Seed Garden...</p>
      </VaultShell>
    )
  }

  if (!session) {
    return <VaultLogin admin={admin} />
  }

  const userEmail = normalizeEmail(session.user?.email)

  if (!isAllowedEmail(userEmail)) {
    return (
      <RestrictedVaultMessage
        session={session}
        message="This private garden is currently reserved for Marguerite."
      />
    )
  }

  if (admin && !isAdminEmail(userEmail)) {
    return <RestrictedVaultMessage session={session} message="This area is reserved for Felicia." />
  }

  return admin ? <VaultAdmin session={session} /> : <VaultSubmissionPortal session={session} />
}

function VaultShell({ children, session }) {
  const showAdminLink = isAdminEmail(session?.user?.email)

  async function handleSignOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    window.location.href = '/vault'
  }

  return (
    <main className="vault-shell">
      <header className="vault-header">
        <a className="brand" href="/" aria-label="TruthLoveMoney.com home">
          <img src="/assets/watermark-logo.png" alt="" className="brand-logo" />
          <span>
            <strong>The Seed Garden</strong>
            <small>The Lyon Den • Private Journal of Ideas</small>
          </span>
        </a>
        <div className="vault-header-actions">
          <a className="vault-home-link" href="/">Home</a>
          {showAdminLink && (
            <a className="vault-home-link" href="/vault-admin">
              Admin
            </a>
          )}
          {session && (
            <button className="vault-home-link sign-out-button" type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          )}
        </div>
      </header>
      {children}
    </main>
  )
}

function VaultConfigNotice() {
  return (
    <VaultShell>
      <section className="vault-panel narrow-panel">
        <p className="eyebrow">Setup Needed</p>
        <h1>Connect Supabase to open The Seed Garden.</h1>
        <p>
          Place `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the deployment
          environment. Those are the exact Vercel variable names this site reads.
          The table SQL is included in `supabase/schema.sql`.
        </p>
        <p>
          Current config check: URL {supabaseConfig.hasUrl ? 'present' : 'missing'},
          key {supabaseConfig.hasAnonKey ? 'present' : 'missing'}, URL format{' '}
          {supabaseConfig.urlIsValid ? 'valid' : 'invalid'}.
        </p>
      </section>
    </VaultShell>
  )
}

function AuthCallback() {
  const [message, setMessage] = useState('Opening The Seed Garden...')
  const [error, setError] = useState('')
  const [showDebug, setShowDebug] = useState(false)
  const [debug, setDebug] = useState({
    currentPath: '/auth/callback',
    hasCode: 'checking',
    hasHashTokens: 'checking',
    nextPath: '/vault',
    exchange: 'not started',
    sessionExists: 'checking',
    supabaseError: 'none',
  })

  useEffect(() => {
    async function handleCallback() {
      const markFailure = (updates, errorMessage) => {
        setDebug((currentDebug) => ({
          ...currentDebug,
          ...updates,
          supabaseError: errorMessage || 'none',
        }))
        setShowDebug(true)
        setError(errorMessage || 'That login link may have expired. Please request a new one.')
      }

      if (!isSupabaseConfigured) {
        markFailure(
          {
            currentPath: window.location.pathname,
            exchange: 'skipped',
            sessionExists: 'no',
          },
          'Connect Supabase to finish opening The Seed Garden.',
        )
        return
      }

      const { currentUrl, hashParams } = getAuthRedirectDetails()
      const requestedNext = currentUrl.searchParams.get('next')
      const nextPath = getSafeNextPath(requestedNext)
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      const authError =
        currentUrl.searchParams.get('error_description') ||
        hashParams.get('error_description') ||
        currentUrl.searchParams.get('error_code') ||
        hashParams.get('error_code') ||
        currentUrl.searchParams.get('error') ||
        hashParams.get('error')
      const code = currentUrl.searchParams.get('code')

      setDebug({
        currentPath: window.location.pathname,
        hasCode: code ? 'yes' : 'no',
        hasHashTokens: accessToken && refreshToken ? 'yes' : 'no',
        nextPath,
        exchange: code ? 'pending' : 'not needed',
        sessionExists: 'checking',
        supabaseError: 'none',
      })

      if (authError) {
        markFailure(
          {
            exchange: 'failed',
            sessionExists: 'no',
          },
          authError,
        )
        return
      }

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

        if (exchangeError) {
          markFailure(
            {
              exchange: 'failed',
              sessionExists: 'no',
            },
            getReadableError(exchangeError, 'That login link may have expired. Please request a new one.'),
          )
          return
        }

        setDebug((currentDebug) => ({
          ...currentDebug,
          exchange: 'success',
        }))
      } else if (accessToken && refreshToken) {
        const { error: setSessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })

        if (setSessionError) {
          markFailure(
            {
              exchange: 'hash session failed',
              sessionExists: 'no',
            },
            getReadableError(setSessionError, 'That login link may have expired. Please request a new one.'),
          )
          return
        }

        setDebug((currentDebug) => ({
          ...currentDebug,
          exchange: 'hash session success',
        }))
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        markFailure(
          {
            sessionExists: 'no',
          },
          getReadableError(sessionError, 'Could not read The Seed Garden session.'),
        )
        return
      }

      setDebug((currentDebug) => ({
        ...currentDebug,
        sessionExists: session ? 'yes' : 'no',
      }))

      if (session) {
        setMessage('You are signed in. Taking you to The Seed Garden...')
        clearIntendedVaultPath()
        window.location.replace(nextPath || '/vault')
        return
      }

      const storedNext = readIntendedVaultPath()
      if (!requestedNext && storedNext) {
        setDebug((currentDebug) => ({
          ...currentDebug,
          nextPath: getSafeNextPath(storedNext),
        }))
      }

      markFailure(
        {
          exchange: code ? 'success' : accessToken && refreshToken ? 'hash session success' : 'not started',
          sessionExists: 'no',
        },
        'No Seed Garden session was found yet. Please use the newest email link.',
      )
    }

    handleCallback()
  }, [])

  return (
    <VaultShell>
      <section className="vault-panel narrow-panel login-panel" aria-labelledby="callback-title">
        <p className="eyebrow">Secure Login</p>
        <h1 id="callback-title">Seed Garden Login</h1>
        <p>{error || message}</p>
        {showDebug && (
          <dl className="callback-debug" aria-label="Seed Garden login debug">
            <div>
              <dt>Current path</dt>
              <dd>{debug.currentPath}</dd>
            </div>
            <div>
              <dt>Has code?</dt>
              <dd>{debug.hasCode}</dd>
            </div>
            <div>
              <dt>Has hash tokens?</dt>
              <dd>{debug.hasHashTokens}</dd>
            </div>
            <div>
              <dt>Next route</dt>
              <dd>{debug.nextPath}</dd>
            </div>
            <div>
              <dt>Session found?</dt>
              <dd>{debug.sessionExists}</dd>
            </div>
            <div>
              <dt>Supabase error</dt>
              <dd>{debug.supabaseError}</dd>
            </div>
          </dl>
        )}
        {error && (
          <a className="button button-primary large-action" href="/vault">
            Request a New Garden Link
          </a>
        )}
      </section>
    </VaultShell>
  )
}

function RestrictedVaultMessage({ message, session }) {
  return (
    <VaultShell session={session}>
      <section className="vault-panel narrow-panel restricted-panel" aria-labelledby="restricted-title">
        <p className="eyebrow">Private Area</p>
        <h1 id="restricted-title">{message}</h1>
      </section>
    </VaultShell>
  )
}

function VaultLogin({ admin }) {
  const [email, setEmail] = useState(admin ? ADMIN_EMAIL : VAULT_USER_EMAIL)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleLogin(event) {
    event.preventDefault()
    const cleanEmail = normalizeEmail(email)

    if (!canRequestMagicLink(cleanEmail, admin)) {
      setMessage(getLoginBlockMessage(cleanEmail, admin))
      return
    }

    setBusy(true)
    setMessage('')

    const redirectPath = admin ? '/vault-admin' : '/vault'
    saveIntendedVaultPath(redirectPath)
    let error = null

    try {
      const response = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectPath}`,
        },
      })

      error = response.error
    } catch (requestError) {
      error = requestError
    }

    setBusy(false)
    if (error) {
      console.error('Seed Garden magic link error:', {
        message: error.message,
        name: error.name,
        status: error.status || error.statusCode,
      })
      setMessage(getLoginErrorMessage(error))
      return
    }

    setMessage(
      'Check your email for the secure garden gate link. It may take a minute. If you don’t see it, check spam or junk.',
    )
  }

  return (
    <VaultShell>
      <section className="vault-panel login-panel" aria-labelledby="vault-login-title">
        <p className="eyebrow">Private Garden</p>
        <h1 id="vault-login-title">
          {admin ? 'Seed Garden Studio Login' : 'Welcome to The Lyon Den Seed Garden'}
        </h1>
        <p>Enter your email and we’ll send you a secure garden gate link.</p>
        <form className="vault-form" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <button className="button button-primary large-action" type="submit" disabled={busy}>
            {busy ? 'Sending...' : 'Send My Garden Link'}
          </button>
          {message && (
            <p
              className={`form-message ${
                message.startsWith('Check your email') ? 'success-message' : 'error-message'
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </section>
    </VaultShell>
  )
}

function VaultSubmissionPortal({ session }) {
  const [selectedType, setSelectedType] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [draftSavedAt, setDraftSavedAt] = useState('')

  const draftKey = selectedType ? `tlm-vault-draft-${selectedType.value}` : null

  useEffect(() => {
    if (!draftKey) return
    const savedDraft = window.localStorage.getItem(draftKey)
    if (!savedDraft) {
      setTitle('')
      setContent('')
      return
    }

    try {
      const parsed = JSON.parse(savedDraft)
      setTitle(parsed.title || '')
      setContent(parsed.content || '')
    } catch {
      window.localStorage.removeItem(draftKey)
    }
  }, [draftKey])

  useEffect(() => {
    if (!draftKey) return undefined

    const saveDraft = () => {
      window.localStorage.setItem(draftKey, JSON.stringify({ title, content }))
      setDraftSavedAt(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    }

    const interval = window.setInterval(saveDraft, 30000)
    return () => window.clearInterval(interval)
  }, [content, draftKey, title])

  function chooseType(entryType) {
    setMessage('')
    setSelectedType(entryType)
  }

  function clearForm() {
    setTitle('')
    setContent('')
    setMessage('')
    if (draftKey) window.localStorage.removeItem(draftKey)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!selectedType) return

    setBusy(true)
    setMessage('')

    const { error } = await supabase.from('vault_entries').insert({
      entry_type: selectedType.value,
      title,
      content,
      status: 'new',
    })

    setBusy(false)
    if (error) {
      console.error('Seed Garden save error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setMessage(`This seed did not save: ${getReadableError(error, 'Please try again.')}`)
      return
    }

    if (draftKey) window.localStorage.removeItem(draftKey)
    setTitle('')
    setContent('')
    setSelectedType(null)
    setMessage('Your seed has been planted. We’ll help it grow into something beautiful.')
  }

  return (
    <VaultShell session={session}>
      <section className="vault-welcome" aria-labelledby="vault-title">
        <p className="eyebrow">Welcome Back, Marguerite</p>
        <h1 id="vault-title">What would you like to plant today?</h1>
        {message && <p className="form-message success-message">{message}</p>}
      </section>

      {!selectedType && (
        <section className="entry-type-grid" aria-label="Seed Garden seed types">
          {entryTypes.map((entryType) => (
            <button
              className="entry-type-card"
              type="button"
              key={entryType.value}
              onClick={() => chooseType(entryType)}
            >
              <span aria-hidden="true">{entryType.icon}</span>
              {entryType.label}
            </button>
          ))}
        </section>
      )}

      {selectedType && (
        <section className="vault-panel" aria-labelledby="entry-form-title">
          <button className="back-button" type="button" onClick={() => setSelectedType(null)}>
            Back to seed choices
          </button>
          <p className="eyebrow">{selectedType.icon} {selectedType.label}</p>
          <h2 id="entry-form-title">Plant this seed</h2>
          <form className="vault-form" onSubmit={handleSubmit}>
            <label>
              Seed title
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </label>
            <label>
              Seed notes
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows="8"
                required
              />
            </label>
            <div className="upload-placeholders" aria-label="Future enhancements">
              <span>Voice note upload coming later</span>
              <span>Photo upload coming later</span>
            </div>
            {draftSavedAt && <p className="draft-note">Seed draft saved at {draftSavedAt}</p>}
            {message && <p className="form-message error-message">{message}</p>}
            <div className="form-actions">
              <button className="button button-secondary" type="button" onClick={clearForm}>
                Clear Seed
              </button>
              <button className="button button-primary large-action" type="submit" disabled={busy}>
                {busy ? 'Saving seed...' : 'Save Seed'}
              </button>
            </div>
          </form>
        </section>
      )}
    </VaultShell>
  )
}

function VaultAdmin({ session }) {
  const [entries, setEntries] = useState([])
  const [entryType, setEntryType] = useState('all')
  const [status, setStatus] = useState('all')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [connectionMessage, setConnectionMessage] = useState('')
  const [connectionOk, setConnectionOk] = useState(false)
  const [connectionBusy, setConnectionBusy] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)

  useEffect(() => {
    loadEntries()
  }, [])

  async function loadEntries() {
    setLoading(true)
    const { data, error } = await supabase
      .from('vault_entries')
      .select('*')
      .order('created_at', { ascending: false })

    setLoading(false)
    if (error) {
      console.error('Seed Garden admin read error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setMessage(`Could not gather today’s seeds: ${getReadableError(error)}`)
      return
    }
    setEntries(data || [])
  }

  async function testSupabaseConnection() {
    setConnectionBusy(true)
    setConnectionMessage('')
    setConnectionOk(false)

    const { error } = await supabase.from('vault_entries').select('id').limit(1)

    setConnectionBusy(false)
    if (error) {
      console.error('Seed Garden connection test error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setConnectionMessage(`The garden connection needs attention: ${getReadableError(error)}`)
      return
    }

    setConnectionOk(true)
    setConnectionMessage('The garden connection is working. Seeds are readable.')
  }

  async function updateStatus(id, status) {
    setMessage('')
    const { error } = await supabase.from('vault_entries').update({ status }).eq('id', id)

    if (error) {
      console.error('Seed Garden growth stage update error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setMessage(`That growth stage did not update: ${getReadableError(error)}`)
      return
    }

    setEntries((currentEntries) =>
      currentEntries.map((entry) => (entry.id === id ? { ...entry, status } : entry)),
    )
    setSelectedEntry((entry) => (entry?.id === id ? { ...entry, status } : entry))
  }

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesType = entryType === 'all' || entry.entry_type === entryType
      const matchesStatus = status === 'all' || entry.status === status
      const matchesDate = !date || entry.created_at.slice(0, 10) === date
      return matchesType && matchesStatus && matchesDate
    })
  }, [date, entries, entryType, status])

  return (
    <VaultShell session={session}>
      <section className="vault-welcome" aria-labelledby="admin-title">
        <p className="eyebrow">Seed Garden Studio</p>
        <h1 id="admin-title">Review Today’s Seeds</h1>
      </section>

      <section className="admin-filters" aria-label="Filter Seed Garden seeds">
        <label>
          Seed type
          <select value={entryType} onChange={(event) => setEntryType(event.target.value)}>
            <option value="all">All types</option>
            {entryTypes.map((type) => (
              <option value={type.value} key={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Growth stage
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All growth stages</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <button className="button button-secondary" type="button" onClick={loadEntries}>
          Refresh Garden
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={testSupabaseConnection}
          disabled={connectionBusy}
        >
          {connectionBusy ? 'Checking...' : 'Check Garden Connection'}
        </button>
      </section>

      {message && <p className="form-message error-message">{message}</p>}
      {connectionMessage && (
        <p className={`form-message ${connectionOk ? 'success-message' : 'error-message'}`}>
          {connectionMessage}
        </p>
      )}
      {loading && <p className="vault-loading">Gathering seeds...</p>}

      {selectedEntry && (
        <section className="vault-panel admin-detail-card" aria-labelledby="entry-detail-title">
          <button className="back-button" type="button" onClick={() => setSelectedEntry(null)}>
            Close seed
          </button>
          <div className="entry-meta">
            <span><b>Seed Type</b>{getTypeLabel(selectedEntry.entry_type)}</span>
            <span><b>Date Planted</b>{new Date(selectedEntry.created_at).toLocaleDateString()}</span>
            <span><b>Growth Stage</b>{statusLabels[selectedEntry.status] || selectedEntry.status}</span>
          </div>
          <h2 id="entry-detail-title">{selectedEntry.title}</h2>
          <p>{selectedEntry.content}</p>
          <div className="status-actions">
            <button type="button" onClick={() => updateStatus(selectedEntry.id, 'planned')}>
              Mark as Growing
            </button>
            <button type="button" onClick={() => updateStatus(selectedEntry.id, 'used')}>
              Mark as Harvested
            </button>
            <button type="button" onClick={() => updateStatus(selectedEntry.id, 'published')}>
              Mark as Bloomed
            </button>
          </div>
        </section>
      )}

      <section className="entry-list" aria-label="Seed Garden seeds">
        {!loading && filteredEntries.length === 0 && (
          <article className="vault-entry-card">
            <p>The garden is quiet today.<br />New ideas will bloom here soon.</p>
          </article>
        )}
        {filteredEntries.map((entry) => (
          <article className="vault-entry-card" key={entry.id}>
            <div className="entry-meta">
              <span><b>Seed Type</b>{getTypeLabel(entry.entry_type)}</span>
              <span><b>Date Planted</b>{new Date(entry.created_at).toLocaleDateString()}</span>
              <span><b>Growth Stage</b>{statusLabels[entry.status] || entry.status}</span>
            </div>
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
            <button className="read-entry-button" type="button" onClick={() => setSelectedEntry(entry)}>
              Read Full Seed
            </button>
            <div className="status-actions">
              <button type="button" onClick={() => updateStatus(entry.id, 'planned')}>
                Mark as Growing
              </button>
              <button type="button" onClick={() => updateStatus(entry.id, 'used')}>
                Mark as Harvested
              </button>
              <button type="button" onClick={() => updateStatus(entry.id, 'published')}>
                Mark as Bloomed
              </button>
            </div>
          </article>
        ))}
      </section>
    </VaultShell>
  )
}

export default App
