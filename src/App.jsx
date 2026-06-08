import { useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from './lib/supabaseClient'

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
  new: 'New',
  used: 'Used',
  planned: 'Planned',
  published: 'Published',
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

  return 'This private vault is currently reserved for Marguerite.'
}

function getLoginErrorMessage(error) {
  const message = error?.message || 'Supabase did not provide an error message.'
  const status = error?.status || error?.statusCode
  const isRateLimited =
    status === 429 ||
    /rate limit|too many|security purposes|wait|after/i.test(message)

  if (isRateLimited) {
    return 'A login link was already sent. Please wait a minute, then use the newest email link.'
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
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#explore">Explore</a>
          <a href="#lessons">Lessons</a>
          <a href="#vault">Story Vault</a>
          <a className="nav-cta" href="/vault">Enter Vault</a>
        </nav>
      </header>

      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="script-line">Welcome to</p>
          <h1 id="hero-title">The Lyon Den</h1>
          <p className="truth-line">Truth • Love • Money</p>
          <p className="tagline">Never Stop Learning</p>
          <p className="hero-intro">
            A warm, literary home for stories, wisdom, poetry, memoirs, and life lessons
            that help us keep learning with courage and grace.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#join">
              Join the Story Circle
            </a>
            <a className="button button-secondary" href="/vault">
              Enter Story Vault
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

      <section className="about section-shell media-section" id="about" aria-labelledby="about-title">
        <div className="media-image portrait-frame">
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

      <section className="explore section-shell" id="explore" aria-labelledby="explore-title">
        <div className="section-heading">
          <p className="eyebrow">What We Explore</p>
          <h2 id="explore-title">Truth, love, and money through a story-shaped lens.</h2>
        </div>
        <div className="card-grid">
          {exploreCards.map((card) => (
            <article className="wisdom-card" key={card.title}>
              <span className="card-mark" aria-hidden="true">
                {card.title.slice(0, 1)}
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell media-section reverse" id="lessons" aria-labelledby="lessons-title">
        <div className="media-image">
          <img
            src="/assets/lifelessons.png"
            alt="Life Lessons visual with books, creekside warmth, and reflective storytelling imagery"
          />
        </div>
        <div className="media-copy">
          <p className="eyebrow">Life Lessons Gallery</p>
          <h2 id="lessons-title">Literature, memories, and lessons worth carrying.</h2>
          <p>
            This gallery introduces the recurring themes behind The Lyon Den: favorite
            passages, turning points, practical insight, and the wisdom found in everyday life.
          </p>
          <a className="text-link" href="#join">Suggest a life lesson topic</a>
        </div>
      </section>

      <section className="section-shell media-section" aria-labelledby="teaching-title">
        <div className="media-image">
          <img
            src="/assets/lessonsthatlast.png"
            alt="Lessons That Last artwork with a warm literary teaching and speaking theme"
          />
        </div>
        <div className="media-copy">
          <p className="eyebrow">Teaching &amp; Speaking</p>
          <h2 id="teaching-title">Lessons that last beyond the moment.</h2>
          <p>
            Future talks, short teachings, and community sessions can grow from the Story
            Vault: literature circles, memoir prompts, personal growth themes, and practical
            wisdom for the heart and home.
          </p>
        </div>
      </section>

      <section className="poetry section-shell" aria-labelledby="poetry-title">
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

      <section className="vault" id="vault" aria-labelledby="vault-title">
        <img
          src="/assets/banner.png"
          alt="The Lyon Den banner artwork with creekside books, flowers, and handwritten story notes"
        />
        <div className="vault-card">
          <p className="eyebrow">Story Vault</p>
          <h2 id="vault-title">A living archive for future videos.</h2>
          <p>
            The Story Vault gathers memories, favorite books, quotes, poetry, reflections,
            and questions that become future Truth Love Money episodes.
          </p>
          <div className="vault-actions">
            <a className="button button-primary" href="/vault">
              Enter Story Vault
            </a>
          </div>
        </div>
      </section>

      <section className="join section-shell" id="join" aria-labelledby="join-title">
        <div className="join-copy">
          <p className="eyebrow">Join the Story Circle</p>
          <h2 id="join-title">Receive future notes, previews, and invitations.</h2>
          <p>
            Send a question, a reflection, a poem prompt, or a theme you would love to see
            explored through The Lyon Den.
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
          <a className="text-link vault-admin-link" href="/vault">
            Enter Story Vault
          </a>
        </div>
      </section>

      <footer className="footer">
        <img src="/assets/watermark-logo.png" alt="" className="footer-logo" />
        <div>
          <p>TruthLoveMoney.com</p>
          <p>The Lyon Den • Hosted by Marguerite</p>
          <p>Stories • Wisdom • Life Lessons</p>
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
        <p className="vault-loading">Opening the Story Vault...</p>
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
        message="This private vault is currently reserved for Marguerite."
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
            <strong>Story Vault</strong>
            <small>The Lyon Den • Private Journal</small>
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
        <h1>Connect Supabase to open the Story Vault.</h1>
        <p>
          Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the deployment
          environment. Those are the exact Vercel variable names this site reads.
          The table SQL is included in `supabase/schema.sql`.
        </p>
      </section>
    </VaultShell>
  )
}

function AuthCallback() {
  const [message, setMessage] = useState('Opening your Story Vault...')
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
          'Connect Supabase to finish opening the Story Vault.',
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
          getReadableError(sessionError, 'Could not read the Story Vault session.'),
        )
        return
      }

      setDebug((currentDebug) => ({
        ...currentDebug,
        sessionExists: session ? 'yes' : 'no',
      }))

      if (session) {
        setMessage('You are signed in. Taking you to the Story Vault...')
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
        'No Story Vault session was found yet. Please use the newest email link.',
      )
    }

    handleCallback()
  }, [])

  return (
    <VaultShell>
      <section className="vault-panel narrow-panel login-panel" aria-labelledby="callback-title">
        <p className="eyebrow">Secure Login</p>
        <h1 id="callback-title">Story Vault Login</h1>
        <p>{error || message}</p>
        {showDebug && (
          <dl className="callback-debug" aria-label="Story Vault login debug">
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
            Request a New Login Link
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
    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectPath}`,
      },
    })

    setBusy(false)
    if (error) {
      console.error('Story Vault magic link error:', {
        message: error.message,
        name: error.name,
        status: error.status || error.statusCode,
      })
      setMessage(getLoginErrorMessage(error))
      return
    }

    setMessage(
      'Check your email for the secure login link. It may take a minute. If you don’t see it, check spam or junk.',
    )
  }

  return (
    <VaultShell>
      <section className="vault-panel login-panel" aria-labelledby="vault-login-title">
        <p className="eyebrow">Private Login</p>
        <h1 id="vault-login-title">
          {admin ? 'Story Vault Admin Login' : 'Welcome to The Lyon Den Story Vault'}
        </h1>
        <p>Enter your email and we’ll send you a secure login link.</p>
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
            {busy ? 'Sending...' : 'Send My Login Link'}
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
      console.error('Story Vault save error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setMessage(`Something did not save: ${getReadableError(error, 'Please try again.')}`)
      return
    }

    if (draftKey) window.localStorage.removeItem(draftKey)
    setTitle('')
    setContent('')
    setSelectedType(null)
    setMessage('Your story has been saved to the Story Vault.')
  }

  return (
    <VaultShell session={session}>
      <section className="vault-welcome" aria-labelledby="vault-title">
        <p className="eyebrow">Welcome Back, Marguerite</p>
        <h1 id="vault-title">What would you like to add today?</h1>
        {message && <p className="form-message success-message">{message}</p>}
      </section>

      {!selectedType && (
        <section className="entry-type-grid" aria-label="Story Vault entry types">
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
            Back to choices
          </button>
          <p className="eyebrow">{selectedType.icon} {selectedType.label}</p>
          <h2 id="entry-form-title">Add this to the Story Vault</h2>
          <form className="vault-form" onSubmit={handleSubmit}>
            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </label>
            <label>
              Details
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
            {draftSavedAt && <p className="draft-note">Draft auto-saved at {draftSavedAt}</p>}
            {message && <p className="form-message error-message">{message}</p>}
            <div className="form-actions">
              <button className="button button-secondary" type="button" onClick={clearForm}>
                Clear
              </button>
              <button className="button button-primary large-action" type="submit" disabled={busy}>
                {busy ? 'Saving...' : 'Save to the Story Vault'}
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
      console.error('Story Vault admin read error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setMessage(`Could not load the Story Vault entries: ${getReadableError(error)}`)
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
      console.error('Story Vault connection test error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setConnectionMessage(`Supabase connection failed: ${getReadableError(error)}`)
      return
    }

    setConnectionOk(true)
    setConnectionMessage('Supabase connection works. Vault entries are readable.')
  }

  async function updateStatus(id, status) {
    setMessage('')
    const { error } = await supabase.from('vault_entries').update({ status }).eq('id', id)

    if (error) {
      console.error('Story Vault status update error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setMessage(`That status did not update: ${getReadableError(error)}`)
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
        <p className="eyebrow">Story Vault Admin</p>
        <h1 id="admin-title">Review the latest submissions.</h1>
      </section>

      <section className="admin-filters" aria-label="Filter vault entries">
        <label>
          Entry type
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
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
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
          Refresh
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={testSupabaseConnection}
          disabled={connectionBusy}
        >
          {connectionBusy ? 'Testing...' : 'Test Supabase Connection'}
        </button>
      </section>

      {message && <p className="form-message error-message">{message}</p>}
      {connectionMessage && (
        <p className={`form-message ${connectionOk ? 'success-message' : 'error-message'}`}>
          {connectionMessage}
        </p>
      )}
      {loading && <p className="vault-loading">Loading entries...</p>}

      {selectedEntry && (
        <section className="vault-panel admin-detail-card" aria-labelledby="entry-detail-title">
          <button className="back-button" type="button" onClick={() => setSelectedEntry(null)}>
            Close entry
          </button>
          <div className="entry-meta">
            <span>{getTypeLabel(selectedEntry.entry_type)}</span>
            <span>{new Date(selectedEntry.created_at).toLocaleDateString()}</span>
            <span>{statusLabels[selectedEntry.status] || selectedEntry.status}</span>
          </div>
          <h2 id="entry-detail-title">{selectedEntry.title}</h2>
          <p>{selectedEntry.content}</p>
          <div className="status-actions">
            <button type="button" onClick={() => updateStatus(selectedEntry.id, 'planned')}>
              Mark as Planned
            </button>
            <button type="button" onClick={() => updateStatus(selectedEntry.id, 'used')}>
              Mark as Used
            </button>
            <button type="button" onClick={() => updateStatus(selectedEntry.id, 'published')}>
              Mark as Published
            </button>
          </div>
        </section>
      )}

      <section className="entry-list" aria-label="Vault submissions">
        {!loading && filteredEntries.length === 0 && (
          <article className="vault-entry-card">
            <p>No entries match those filters yet.</p>
          </article>
        )}
        {filteredEntries.map((entry) => (
          <article className="vault-entry-card" key={entry.id}>
            <div className="entry-meta">
              <span>{getTypeLabel(entry.entry_type)}</span>
              <span>{new Date(entry.created_at).toLocaleDateString()}</span>
              <span>{statusLabels[entry.status] || entry.status}</span>
            </div>
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
            <button className="read-entry-button" type="button" onClick={() => setSelectedEntry(entry)}>
              Read Full Entry
            </button>
            <div className="status-actions">
              <button type="button" onClick={() => updateStatus(entry.id, 'planned')}>
                Mark as Planned
              </button>
              <button type="button" onClick={() => updateStatus(entry.id, 'used')}>
                Mark as Used
              </button>
              <button type="button" onClick={() => updateStatus(entry.id, 'published')}>
                Mark as Published
              </button>
            </div>
          </article>
        ))}
      </section>
    </VaultShell>
  )
}

export default App
