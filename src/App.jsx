import { useState } from 'react'

const exploreCards = [
  {
    title: 'Truth',
    text: 'Honest reflection, beloved books, and the courage to see life clearly.',
  },
  {
    title: 'Love',
    text: 'Connection, kindness, courage, and wisdom for the heart.',
  },
  {
    title: 'Money',
    text: 'Practical guidance, learned confidence, and steadier choices.',
  },
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
          <a href="#vault">Story Vault</a>
          <a href="#join">Join</a>
          <a className="nav-cta" href="#preview">Watch Preview</a>
        </nav>
      </header>

      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="script-line">Welcome to</p>
          <h1 id="hero-title">The Lyon Den</h1>
          <p className="truth-line">Truth • Love • Money</p>
          <p className="tagline">Never Stop Learning</p>
          <p className="hero-intro">
            A warm, reflective home for stories, wisdom, and life lessons from
            The Lyon Den. Pull up a chair for thoughtful conversations about
            books, relationships, practical money wisdom, and the art of staying curious.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#preview">
              Watch the First Preview
            </a>
            <a className="button button-secondary" href="#join">
              Join the Story Circle
            </a>
          </div>
        </div>

        <figure className="hero-media">
          <img
            src="/assets/hero.png"
            alt="The Lyon Den hero artwork with a creek, books, flowers, and the Truth Love Money brand message"
          />
        </figure>
      </section>

      <section className="quick-explore section-shell" aria-label="Truth Love Money overview">
        {exploreCards.map((card) => (
          <article className="quick-card" key={card.title}>
            <span className="card-mark" aria-hidden="true">
              {card.title.slice(0, 1)}
            </span>
            <div>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
        <article className="quick-card vault-teaser">
          <span className="card-mark" aria-hidden="true">V</span>
          <div>
            <h2>The Story Vault</h2>
            <p>Stories, memories, favorite quotes, and ideas that become future videos.</p>
          </div>
        </article>
      </section>

      <section className="about section-shell" id="about" aria-labelledby="about-title">
        <article className="about-card">
          <div className="about-portrait">
            <img
              src="/assets/portrait.png"
              alt="Illustrated portrait of Marguerite with silver hair, glasses, and a warm scarf"
            />
          </div>
          <div className="about-copy">
            <p className="eyebrow">About Marguerite</p>
            <h2 id="about-title">Warm wisdom for the chapters we are still writing.</h2>
            <p>
              Marguerite shares lessons from literature, life, love, personal growth,
              and financial wisdom gathered through lived experience.
            </p>
            <p>
              Her voice is reflective rather than guru-like: a gentle invitation to keep
              asking questions, reading closely, loving bravely, and learning with grace.
            </p>
          </div>
          <img
            className="about-banner"
            src="/assets/banner.png"
            alt="The Lyon Den channel banner with creekside books, flowers, and the Truth Love Money brand"
          />
        </article>
      </section>

      <section className="explore section-shell" id="explore" aria-labelledby="explore-title">
        <div className="section-heading">
          <p className="eyebrow">What We Explore</p>
          <h2 id="explore-title">Life lessons for the mind, heart, and future.</h2>
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

      <section className="vault" id="vault" aria-labelledby="vault-title">
        <img
          src="/assets/banner.png"
          alt="The Lyon Den banner artwork with a creek, books, flowers, and handwritten story notes"
        />
        <div className="vault-card">
          <p className="eyebrow">Featured Archive</p>
          <h2 id="vault-title">The Lyon Den Story Vault</h2>
          <p>
            A growing private collection of stories, memories, favorite books, quotes, and
            ideas that become future videos and lessons we can all learn from.
          </p>
          <a className="button button-primary" href="#join">
            Share a Question or Story Idea
          </a>
        </div>
      </section>

      <section className="quote-section section-shell" aria-labelledby="quote-title">
        <figure className="quote-card">
          <img src="/assets/watermark-logo.png" alt="" aria-hidden="true" />
          <blockquote id="quote-title">
            "We don't stop learning because we grow old; we grow old because we stop learning."
          </blockquote>
          <figcaption>Marguerite</figcaption>
        </figure>
      </section>

      <section className="preview section-shell" id="preview" aria-labelledby="preview-title">
        <div className="preview-copy">
          <p className="eyebrow">Coming Soon</p>
          <h2 id="preview-title">
            Life never stops teaching us when we stay open to the lesson.
          </h2>
          <p>
            The first preview introduces The Lyon Den, the heart behind Truth Love Money,
            and the quiet promise to keep learning together.
          </p>
        </div>
        <article className="preview-card" aria-label="First preview feature card">
          <img
            src="/assets/portrait.png"
            alt="Illustrated portrait of Marguerite for the first Lyon Den preview"
          />
          <div>
            <span>First Preview</span>
            <strong>Never Stop Learning</strong>
          </div>
        </article>
      </section>

      <section className="join section-shell" id="join" aria-labelledby="join-title">
        <div className="join-copy">
          <p className="eyebrow">Join the Story Circle</p>
          <h2 id="join-title">Receive future notes, previews, and invitations.</h2>
          <p>
            Leave your name, email, and a topic or story question for Marguerite. Community
            and subscription features can be added later when the circle is ready.
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
          <p className="eyebrow">The Story Circle</p>
          <h2 id="final-cta-title">Bring your question to the den.</h2>
          <p>
            Share a question, a story idea, or a theme you would love to hear explored
            through Truth Love Money.
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
          <p>Never Stop Learning</p>
        </div>
      </footer>
    </main>
  )
}

export default App
