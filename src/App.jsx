import { useState } from 'react'

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

function App() {
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
          <a className="nav-cta" href="#join">Join</a>
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
            <a className="button button-secondary" href="#vault">
              Visit the Story Vault
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
          <a className="button button-primary" href="#join">
            Share a Question or Story Idea
          </a>
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

export default App
