import { useEffect, useRef, useState } from 'react'
import { track } from '@vercel/analytics'
import {
  archetypeQuestions,
  archetypes,
  calculateArchetypeResult,
} from './content/archetypes'
import {
  shareCardContent,
} from './archetypeShareCards'

const quizUrl = 'https://www.truthlovemoney.com/archetypes'
const quizTitle = 'Which Feminine Archetype Is Guiding Your Life Right Now?'
const campaignParameters = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const resultAnalyticsNames = {
  sage: 'Sage',
  muse: 'Muse',
  lover: 'Lover',
  wanderer: 'Wanderer',
  queen: 'Queen',
}

let hasTrackedQuizView = false

function getShareUrl() {
  const currentUrl = new URL(window.location.href)
  const shareUrl = new URL(quizUrl)

  campaignParameters.forEach((parameter) => {
    const value = currentUrl.searchParams.get(parameter)
    if (value) shareUrl.searchParams.set(parameter, value)
  })

  return shareUrl.toString()
}

async function copyQuizUrl(url = getShareUrl()) {
  try {
    await window.navigator.clipboard.writeText(url)
    return true
  } catch {
    const textArea = window.document.createElement('textarea')
    textArea.value = url
    textArea.setAttribute('readonly', '')
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    window.document.body.appendChild(textArea)
    try {
      textArea.select()
      return window.document.execCommand('copy')
    } catch {
      return false
    } finally {
      textArea.remove()
    }
  }
}

function QuizIntro({ onStart }) {
  return (
    <section className="archetype-intro" aria-labelledby="archetype-title">
      <div className="archetype-orbit" aria-hidden="true">
        <span>I</span><span>II</span><span>III</span><span>IV</span><span>V</span>
      </div>
      <div className="archetype-intro-copy">
        <p className="archetype-kicker">A Lyon Den reflection</p>
        <h1 id="archetype-title">Which Feminine Archetype Is Guiding Your Life <em>Right Now?</em></h1>
        <p className="archetype-deck">Ten questions. Five archetypes. A quiet invitation to notice the energy shaping your next chapter.</p>
        <button className="archetype-primary" type="button" onClick={onStart}>
          Begin the reflection <span aria-hidden="true">→</span>
        </button>
        <p className="archetype-time">About 3 minutes · Choose what feels true today</p>
      </div>
      <p className="archetype-disclaimer">A reflective literary experience for entertainment and personal contemplation—not a psychological, medical, diagnostic, or scientifically validated assessment.</p>
    </section>
  )
}

function QuizQuestion({ questionIndex, answers, onAnswer, onBack, onNext }) {
  const question = archetypeQuestions[questionIndex]
  const selectedAnswer = answers[questionIndex]
  const progress = ((questionIndex + 1) / archetypeQuestions.length) * 100

  return (
    <section className="archetype-question-stage" aria-labelledby={`question-${questionIndex}`}>
      <div className="archetype-progress" aria-label={`Question ${questionIndex + 1} of ${archetypeQuestions.length}`}>
        <div className="archetype-progress-copy">
          <span>Question</span>
          <strong>{questionIndex + 1} <i>of</i> {archetypeQuestions.length}</strong>
        </div>
        <div className="archetype-progress-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form className="archetype-question-card" key={questionIndex} onSubmit={onNext}>
        <fieldset>
          <legend id={`question-${questionIndex}`}>{question.prompt}</legend>
          <p className="archetype-instruction">Choose one answer, then continue.</p>
          <div className="archetype-choices">
            {question.choices.map((choice, choiceIndex) => {
              const choiceId = `question-${questionIndex}-choice-${choiceIndex}`
              return (
                <label className="archetype-choice" htmlFor={choiceId} key={choice.archetype}>
                  <input
                    checked={selectedAnswer === choice.archetype}
                    id={choiceId}
                    name={`question-${questionIndex}`}
                    onChange={() => onAnswer(choice.archetype)}
                    type="radio"
                    value={choice.archetype}
                  />
                  <span className="archetype-choice-mark" aria-hidden="true" />
                  <span>{choice.text}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="archetype-question-actions">
          <button className="archetype-back" type="button" onClick={onBack}>
            <span aria-hidden="true">←</span> Back
          </button>
          <button className="archetype-primary" disabled={!selectedAnswer} type="submit">
            {questionIndex === archetypeQuestions.length - 1 ? 'Reveal my archetype' : 'Continue'}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </section>
  )
}

function QuizResult({ resultKey, onRetake }) {
  const [shareStatus, setShareStatus] = useState('')
  const shareCardBlob = useRef(null)
  const result = archetypes[resultKey]
  const card = shareCardContent[resultKey]
  const analyticsArchetype = resultAnalyticsNames[resultKey]

  useEffect(() => {
    shareCardBlob.current = null
    const controller = new window.AbortController()
    let active = true
    window.fetch(card.src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Result card unavailable.')
        return response.blob()
      })
      .then((blob) => {
        if (active) shareCardBlob.current = blob
      })
      .catch(() => {})

    return () => {
      active = false
      controller.abort()
      shareCardBlob.current = null
    }
  }, [card.src])

  const trackShare = (method) => {
    track('archetype_quiz_share_click', {
      archetype: analyticsArchetype,
      method,
    })
  }

  const copyLink = async () => {
    trackShare('copy_link')
    const copied = await copyQuizUrl()
    setShareStatus(copied ? 'Quiz link copied.' : 'Copy this link: www.truthlovemoney.com/archetypes')
  }

  const shareResult = async () => {
    if (!window.navigator.share) {
      trackShare('copy_link')
      const copied = await copyQuizUrl()
      setShareStatus(copied
        ? 'Native sharing is unavailable here, so the quiz link was copied. Save your card to post it manually.'
        : 'Native sharing is unavailable here. Save your card, then copy www.truthlovemoney.com/archetypes.')
      return
    }

    const shareData = {
      title: `${quizTitle} — ${result.name}`,
      text: card.message,
      url: getShareUrl(),
    }

    if (shareCardBlob.current && typeof window.navigator.canShare === 'function') {
      const file = new window.File(
        [shareCardBlob.current],
        card.downloadFilename,
        { type: shareCardBlob.current.type || 'image/jpeg' },
      )
      let canShareFile = false
      try {
        canShareFile = window.navigator.canShare({ files: [file] })
      } catch {
        canShareFile = false
      }
      if (canShareFile) shareData.files = [file]
    }

    trackShare('native_share')
    try {
      await window.navigator.share(shareData)
      setShareStatus(shareData.files
        ? 'Your result card was sent to the share sheet.'
        : 'Your result was sent to the share sheet. You can also save the card for Instagram.')
    } catch (error) {
      if (error.name !== 'AbortError') setShareStatus('Sharing was unavailable. You can copy the link or save your card instead.')
    }
  }

  const saveCard = () => {
    trackShare('save_card')
    setShareStatus('Your result card download has started.')
  }

  return (
    <section className="archetype-result" data-archetype={resultKey} aria-labelledby="archetype-result-title">
      <header className="archetype-result-header">
        <div className="archetype-result-sigil" aria-hidden="true">
          <span>{result.numeral}</span>
        </div>
        <div>
          <p className="archetype-kicker">The energy guiding this chapter</p>
          <h1 id="archetype-result-title">{result.name}</h1>
          <p className="archetype-result-statement">{result.statement}</p>
        </div>
      </header>

      <div className="archetype-result-body">
        <div className="archetype-interpretation">
          <p className="archetype-section-label">A reading for this season</p>
          {result.interpretation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <aside className="archetype-strengths" aria-labelledby="archetype-strengths-title">
          <p className="archetype-section-label" id="archetype-strengths-title">Three strengths</p>
          <ol>
            {result.strengths.map((strength) => <li key={strength}>{strength}</li>)}
          </ol>
        </aside>

        <div className="archetype-season">
          <p className="archetype-section-label">What this season may be asking of you</p>
          <p>{result.season}</p>
        </div>

        <blockquote className="archetype-reflection">
          <p>{result.reflection}</p>
          <cite>A question to carry with you</cite>
        </blockquote>
      </div>

      <section className="archetype-share-panel" aria-labelledby="archetype-share-title">
        <div className="archetype-share-card-frame">
          <img
            alt={card.alt}
            decoding="async"
            height={card.height}
            loading="lazy"
            src={card.src}
            width={card.width}
          />
        </div>
        <div className="archetype-share-copy">
          <p className="archetype-section-label">Made for your next post</p>
          <h2 id="archetype-share-title">Share your archetype</h2>
          <p>Your approved result card is ready for Facebook, Instagram, Stories, Messages, or wherever you gather.</p>
          <div className="archetype-result-actions">
            <button className="archetype-primary" type="button" onClick={shareResult}>Share my result <span aria-hidden="true">↗</span></button>
            <a
              className="archetype-secondary"
              download={card.downloadFilename}
              href={card.src}
              onClick={saveCard}
            >
              Save result card <span aria-hidden="true">↓</span>
            </a>
            <button className="archetype-secondary" type="button" onClick={copyLink}>Copy quiz link</button>
            <button className="archetype-text-button" type="button" onClick={onRetake}>Retake quiz</button>
            <a className="archetype-home-link" href="/">Return to The Lyon Den <span aria-hidden="true">→</span></a>
          </div>
          <p className="archetype-share-help">Save your card to share it to Stories, or use Share My Result on supported devices.</p>
          <p className="archetype-share-status" aria-live="polite">{shareStatus}</p>
        </div>
      </section>

      <p className="archetype-result-note">This result reflects the answers you chose today. It is an invitation to reflect, not a definition or assessment of who you are.</p>
    </section>
  )
}

export default function ArchetypeQuiz() {
  const [phase, setPhase] = useState('intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [resultKey, setResultKey] = useState(null)
  const focusTarget = useRef(null)
  const answeredQuestions = useRef(new Set())
  const hasCompleted = useRef(false)
  const hasStarted = useRef(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (hasTrackedQuizView) return
      hasTrackedQuizView = true
      track('archetype_quiz_view')
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (phase !== 'intro') {
      focusTarget.current?.focus()
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }, [phase, questionIndex])

  const resetQuiz = () => {
    setAnswers([])
    setQuestionIndex(0)
    setResultKey(null)
    answeredQuestions.current.clear()
    hasCompleted.current = false
    setPhase('question')
  }

  const startQuiz = () => {
    if (hasStarted.current) return
    hasStarted.current = true
    track('archetype_quiz_start')
    resetQuiz()
  }

  const retakeQuiz = () => {
    track('archetype_quiz_retake')
    hasStarted.current = true
    resetQuiz()
  }

  const chooseAnswer = (archetype) => {
    setAnswers((current) => {
      const nextAnswers = [...current]
      nextAnswers[questionIndex] = archetype
      return nextAnswers
    })
  }

  const goBack = () => {
    if (questionIndex === 0) {
      hasStarted.current = false
      setPhase('intro')
      return
    }
    setQuestionIndex((current) => current - 1)
  }

  const goNext = (event) => {
    event.preventDefault()
    if (!answers[questionIndex]) return

    const questionNumber = questionIndex + 1
    if (!answeredQuestions.current.has(questionNumber)) {
      answeredQuestions.current.add(questionNumber)
      track('archetype_quiz_question_answered', { question: questionNumber })
    }

    if (questionIndex < archetypeQuestions.length - 1) {
      setQuestionIndex((current) => current + 1)
      return
    }

    const nextResultKey = calculateArchetypeResult(answers)
    if (!hasCompleted.current) {
      hasCompleted.current = true
      track('archetype_quiz_complete')
      track('archetype_quiz_result', { archetype: resultAnalyticsNames[nextResultKey] })
    }
    setResultKey(nextResultKey)
    setPhase('result')
  }

  return (
    <main className="archetype-page" id="main-content">
      <div className="archetype-grain" aria-hidden="true" />
      <div className="archetype-shell" ref={focusTarget} tabIndex="-1">
        {phase === 'intro' && <QuizIntro onStart={startQuiz} />}
        {phase === 'question' && (
          <QuizQuestion
            answers={answers}
            onAnswer={chooseAnswer}
            onBack={goBack}
            onNext={goNext}
            questionIndex={questionIndex}
          />
        )}
        {phase === 'result' && <QuizResult onRetake={retakeQuiz} resultKey={resultKey} />}
      </div>
    </main>
  )
}
