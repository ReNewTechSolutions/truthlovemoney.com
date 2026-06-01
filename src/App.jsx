import { useState } from 'react'

const exploreCards = [
  {
    title: 'Truth',
    text: 'Life lessons, beloved books, perspective, and the honest questions that help us keep growing.',
  },
  {
    title: 'Love',
    text: 'Connection, relationships, loneliness, courage, and the tenderness it takes to remain open.',
  },
  {
    title: 'Money',
    text: 'Practical wisdom, financial confidence, lessons learned, and steadier choices for real life.',
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
    <main className="site-shell">
      <section className="hero section-band" aria-labelledby="hero-title">
        <div className="nav" aria-label="Site identity">
          <a className="brand" href="#top" aria-label="TruthLoveMoney.com home">
            <span className="brand-mark">TLM</span>
            <span>
              <strong>TruthLoveMoney.com</strong>
              <small>The Lyon Den</small>
            </span>
          </a>
          <a className="nav-link" href="#join">Join the Story Circle</a>
        </div>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow">The Lyon Den with Marguerite Lyon</p>
            <h1 id="hero-title">Welcome to The Lyon Den</h1>
            <p className="hero-subtitle">
              Truth, Love &amp; Money for a life that never stops learning.
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

          <div className="hero-visual" aria-label="Marguerite Lyon avatar and creek-inspired banner">
            <div className="banner-frame">
              <img src="/assets/banner.png" alt="" onError={(event) => event.currentTarget.remove()} />
              <div className="banner-fallback">Peaceful creek banner</div>
            </div>
            <div className="avatar-card">
              <img
                src="/assets/avatar.png"
                alt="Animated avatar placeholder for Marguerite Lyon"
                onError={(event) => event.currentTarget.remove()}
              />
              <span className="avatar-placeholder" aria-hidden="true">ML</span>
              <div>
                <p>Marguerite Lyon</p>
                <span>Never Stop Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about section-content" aria-labelledby="about-title">
        <div className="section-kicker">About Marguerite</div>
        <div className="two-column">
          <h2 id="about-title">A warm place for stories, reflection, and lived wisdom.</h2>
          <div className="prose">
            <p>
              Marguerite Lyon shares lessons gathered across seventy-six years of life,
              literature, love, family, work, and financial experience. Her voice is personal,
              thoughtful, and grounded in the belief that every chapter can still teach us.
            </p>
            <p>
              The Lyon Den is not about having all the answers. It is a calm invitation to sit
              together, ask better questions, remember what matters, and keep learning with grace.
            </p>
          </div>
        </div>
      </section>

      <section className="explore section-content" aria-labelledby="explore-title">
        <div className="section-heading">
          <div className="section-kicker">What We Explore</div>
          <h2 id="explore-title">Three gentle doorways into a richer life.</h2>
        </div>
        <div className="card-grid">
          {exploreCards.map((card) => (
            <article className="wisdom-card" key={card.title}>
              <span aria-hidden="true">{card.title.slice(0, 1)}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vault section-band" aria-labelledby="vault-title">
        <div className="vault-inner">
          <div>
            <div className="section-kicker">The Lyon Den Story Vault</div>
            <h2 id="vault-title">A growing private collection of memories and sparks.</h2>
          </div>
          <div className="prose">
            <p>
              The Story Vault gathers Marguerite’s stories, favorite books, meaningful quotes,
              memories, and ideas that may become future videos. It is a living archive for
              questions worth returning to and wisdom worth passing along.
            </p>
            <a className="button button-primary" href="#join">
              Share a Question or Story Idea
            </a>
          </div>
        </div>
      </section>

      <section className="preview section-content" id="preview" aria-labelledby="preview-title">
        <div className="preview-grid">
          <div>
            <div className="section-kicker">Coming Soon</div>
            <h2 id="preview-title">At seventy-six years old, I've learned that life never stops teaching us.</h2>
            <p>
              The first preview introduces Marguerite’s voice, The Lyon Den, and the heart behind
              Truth, Love &amp; Money.
            </p>
          </div>
          <article className="video-card" aria-label="First video preview placeholder">
            <img src="/assets/preview-thumbnail.png" alt="" onError={(event) => event.currentTarget.remove()} />
            <div className="play-button" aria-hidden="true"><span /></div>
            <div className="video-caption">
              <span>First Preview</span>
              <strong>Never Stop Learning</strong>
            </div>
          </article>
        </div>
      </section>

      <section className="join section-band" id="join" aria-labelledby="join-title">
        <div className="join-grid">
          <div>
            <div className="section-kicker">Join the Story Circle</div>
            <h2 id="join-title">Receive future notes, previews, and invitations.</h2>
            <p>
              Leave your name, email, and a topic or story question for Marguerite. Payments and
              member features can be added later when the community is ready.
            </p>
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" autoComplete="name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
            </label>
            <label>
              Message or topic request
              <textarea name="message" placeholder="A question, story idea, or theme you'd love Marguerite to explore" rows="4" />
            </label>
            <button className="button button-primary" type="submit">Join the Story Circle</button>
            {submitted && (
              <p className="success" role="status">
                Thank you. Your note has been received for this preview site.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="footer">
        <p>TruthLoveMoney.com</p>
        <p>The Lyon Den with Marguerite Lyon</p>
        <p>Never Stop Learning</p>
      </footer>
    </main>
  )
}

export default App
