import { homepageQuotes } from '../data/quotes'

export function QuoteInterlude({ quote = homepageQuotes[0], className = '' }) {
  return (
    <section className={`quote-interlude ${className}`.trim()} aria-label="Lyon Den reflection">
      <div className="quote-interlude-rule" aria-hidden="true" />
      <p className="eyebrow">{quote.motif}</p>
      <blockquote>{quote.text}</blockquote>
      <div className="quote-interlude-rule" aria-hidden="true" />
    </section>
  )
}
