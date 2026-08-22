import { useEffect, useRef, useState } from 'react'
import { track } from '@vercel/analytics'
import {
  createRomanceEraQuizState,
  romanceEraQuestions,
  romanceEraResults,
  startRomanceEraQuiz,
  submitRomanceEraAnswer,
} from './content/romanceEra'
import { youtubeUrl } from './content/site'
import './romanceEra.css'

const quizUrl = 'https://www.truthlovemoney.com/romance-era'
const quizTitle = 'What Era of Romance Does Your Heart Belong To?'
const campaignParameters = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const validResultCodes = new Set(Object.keys(romanceEraResults))

function getShareUrl(resultCode) {
  const currentUrl = new URL(window.location.href)
  const shareUrl = new URL(quizUrl)

  campaignParameters.forEach((parameter) => {
    const value = currentUrl.searchParams.get(parameter)
    if (value) shareUrl.searchParams.set(parameter, value)
  })

  if (resultCode) shareUrl.searchParams.set('result', resultCode)
  return shareUrl.toString()
}

async function copyText(text) {
  try {
    await window.navigator.clipboard.writeText(text)
    return true
  } catch {
    const textArea = window.document.createElement('textarea')
    textArea.value = text
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

function RomanceIntro({ onStart }) {
  return (
    <section className="romance-intro" aria-labelledby="romance-intro-title">
      <div className="romance-intro-copy">
        <p className="romance-eyebrow">A Lyon Den cinematic quiz</p>
        <h1 id="romance-intro-title">What Era of Romance Does Your Heart Belong To?</h1>
        <p className="romance-intro-deck">Ten little choices. One romantic era waiting for you.</p>
        <button className="romance-primary" type="button" onClick={onStart}>
          Discover my era <span aria-hidden="true">→</span>
        </button>
        <p className="romance-helper">Don’t overthink it. Choose what pulls at you first.</p>
      </div>

      <div className="romance-film-window" aria-hidden="true">
        <img
          alt=""
          className="romance-film-image"
          fetchPriority="high"
          src={romanceEraResults.T.image}
        />
        <div className="romance-film-era-strips">
          <span /><span /><span /><span /><span />
        </div>
        <div className="romance-film-window-shade" />
        <p>Ten choices <span>·</span> Five worlds <span>·</span> One heart</p>
      </div>
    </section>
  )
}

function RomanceQuestion({ questionIndex, selectedChoice, onChoose }) {
  const question = romanceEraQuestions[questionIndex]
  const progress = ((questionIndex + 1) / romanceEraQuestions.length) * 100

  return (
    <section className="romance-question" aria-labelledby={`romance-question-${questionIndex}`}>
      <header className="romance-question-header">
        <div className="romance-progress-copy">
          <span>Question {questionIndex + 1}</span>
          <strong>{questionIndex + 1} <i>of</i> {romanceEraQuestions.length}</strong>
        </div>
        <div className="romance-progress-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <h1 id={`romance-question-${questionIndex}`}>{question.prompt}</h1>
        <p>Choose what pulls at you first.</p>
      </header>

      <div className={`romance-choices ${question.choices.length === 5 ? 'romance-choices--five' : ''}`}>
        {question.choices.map((choice, choiceIndex) => {
          const isSelected = selectedChoice === choice.id
          const isWaiting = Boolean(selectedChoice)

          return (
            <button
              aria-pressed={isSelected}
              className={`romance-choice romance-choice--${romanceEraResults[choice.primary].slug} ${isSelected ? 'is-selected' : ''}`}
              disabled={isWaiting && !isSelected}
              key={choice.id}
              onClick={() => onChoose(choice)}
              style={{ '--choice-index': choiceIndex }}
              type="button"
            >
              <span className="romance-choice-visual" aria-hidden="true">
                <i />
                <b>{String(questionIndex + 1).padStart(2, '0')} · {choice.id}</b>
              </span>
              <span className="romance-choice-copy">
                <strong>{choice.label}</strong>
                <span>{choice.text}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function RomanceReveal() {
  return (
    <section className="romance-reveal" aria-live="polite">
      <p>A little suspense is romantic…</p>
      <div className="romance-reel" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
    </section>
  )
}

function RomanceResult({ resultCode, onRetake }) {
  const [shareStatus, setShareStatus] = useState('')
  const resultImageBlob = useRef(null)
  const result = romanceEraResults[resultCode]

  useEffect(() => {
    resultImageBlob.current = null
    const controller = new window.AbortController()
    let active = true

    window.fetch(result.image, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Result image unavailable.')
        return response.blob()
      })
      .then((blob) => {
        if (active) resultImageBlob.current = blob
      })
      .catch(() => {})

    return () => {
      active = false
      controller.abort()
      resultImageBlob.current = null
    }
  }, [result.image])

  const shareResult = async () => {
    const url = getShareUrl(resultCode)
    const shareData = {
      title: `${result.name} — ${result.era}`,
      text: `My heart belongs to ${result.name} — ${result.era}. What era does your heart belong to?`,
      url,
    }

    if (resultImageBlob.current && typeof window.navigator.canShare === 'function') {
      const file = new window.File(
        [resultImageBlob.current],
        result.downloadFilename,
        { type: resultImageBlob.current.type || 'image/png' },
      )

      try {
        if (window.navigator.canShare({ files: [file] })) shareData.files = [file]
      } catch {
        // Some browsers expose canShare but reject file checks.
      }
    }

    if (window.navigator.share) {
      track('romance_quiz_share_clicked', { result_code: resultCode, share_method: 'native_share' })
      try {
        await window.navigator.share(shareData)
        setShareStatus(shareData.files
          ? 'Your era card was sent to the share sheet.'
          : 'Your result link was sent to the share sheet. You can also save the card for Instagram.')
      } catch (error) {
        if (error.name !== 'AbortError') setShareStatus('Sharing was unavailable. Try copying the link or saving your era card.')
      }
      return
    }

    track('romance_quiz_share_clicked', { result_code: resultCode, share_method: 'copy_link' })
    const copied = await copyText(url)
    setShareStatus(copied
      ? 'Your result link was copied. Save the era card to share it on Instagram.'
      : `Copy this link to share your result: ${url}`)
  }

  const shareWithFriend = async () => {
    const url = getShareUrl()
    const shareData = {
      title: quizTitle,
      text: 'Ten little choices. One romantic era waiting for you.',
      url,
    }

    if (window.navigator.share) {
      track('romance_quiz_friend_share_clicked', { result_code: resultCode, share_method: 'native_share' })
      try {
        await window.navigator.share(shareData)
        setShareStatus('The quiz was sent to your share sheet.')
      } catch (error) {
        if (error.name !== 'AbortError') setShareStatus('Sharing was unavailable. Try copying the quiz link.')
      }
      return
    }

    track('romance_quiz_friend_share_clicked', { result_code: resultCode, share_method: 'copy_link' })
    const copied = await copyText(url)
    setShareStatus(copied ? 'The quiz link was copied for your friend.' : `Copy this quiz link: ${url}`)
  }

  const copyResultLink = async () => {
    track('romance_quiz_share_clicked', { result_code: resultCode, share_method: 'copy_link' })
    const url = getShareUrl(resultCode)
    const copied = await copyText(url)
    setShareStatus(copied ? 'Your result link was copied.' : `Copy this result link: ${url}`)
  }

  const shareOnFacebook = () => {
    track('romance_quiz_share_clicked', { result_code: resultCode, share_method: 'facebook' })
  }

  const saveCard = () => {
    track('romance_quiz_share_clicked', { result_code: resultCode, share_method: 'save_image' })
    setShareStatus('Your result-card download has started. Add it to Instagram from your photos.')
  }

  const openArchetypeQuiz = () => {
    track('romance_quiz_archetype_clicked', { result_code: resultCode })
  }

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl(resultCode))}`

  return (
    <section className={`romance-result romance-result--${result.slug}`} aria-labelledby="romance-result-title">
      <header className="romance-result-heading">
        <p className="romance-eyebrow">Your heart belongs to…</p>
        <h1 id="romance-result-title">{result.name}</h1>
        <p>{result.era}</p>
      </header>

      <div className="romance-result-layout">
        <figure className="romance-result-card">
          <img
            alt={`${result.name} — ${result.era} result card from The Lyon Den.`}
            decoding="async"
            src={result.image}
          />
        </figure>

        <article className="romance-result-reading">
          <p className="romance-result-label">A reading for your heart</p>
          {result.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          <dl className="romance-result-details">
            <div><dt>You crave</dt><dd>{result.crave}</dd></div>
            <div><dt>You notice</dt><dd>{result.notice}</dd></div>
            <div><dt>You fall for</dt><dd>{result.fallFor}</dd></div>
            <div><dt>Your perfect romance</dt><dd>{result.perfectRomance}</dd></div>
          </dl>
        </article>
      </div>

      <section className="romance-result-actions" aria-label="Result actions">
        <button className="romance-primary" type="button" onClick={shareResult}>
          <span>01</span> Share my era <i aria-hidden="true">↗</i>
        </button>
        <button className="romance-secondary" type="button" onClick={shareWithFriend}>
          <span>02</span> Send this quiz to a friend <i aria-hidden="true">↗</i>
        </button>
        <a className="romance-secondary" href="/archetypes" onClick={openArchetypeQuiz}>
          <span>03</span> Take the feminine archetype quiz <i aria-hidden="true">→</i>
        </a>
        <a className="romance-secondary" href={youtubeUrl} target="_blank" rel="noreferrer">
          <span>04</span> Follow The Lyon Den <i aria-hidden="true">↗</i>
        </a>
      </section>

      <div className="romance-share-tools">
        <p>Sharing another way?</p>
        <a download={result.downloadFilename} href={result.image} onClick={saveCard}>Save result card</a>
        <a href={facebookShareUrl} target="_blank" rel="noreferrer" onClick={shareOnFacebook}>Share on Facebook</a>
        <button type="button" onClick={copyResultLink}>Copy result link</button>
        <button type="button" onClick={onRetake}>Take the quiz again</button>
      </div>
      <p className="romance-share-help">Instagram does not accept direct browser posts. Save your result card, then share it from your photos.</p>
      <p className="romance-share-status" aria-live="polite">{shareStatus}</p>
    </section>
  )
}

export default function RomanceEraQuiz() {
  const [quizState, setQuizState] = useState(createRomanceEraQuizState)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const focusTarget = useRef(null)
  const transitionTimeout = useRef(null)
  const revealTimeout = useRef(null)
  const hasCompleted = useRef(false)

  useEffect(() => {
    const sharedResultCode = new URL(window.location.href).searchParams.get('result')
    if (!validResultCodes.has(sharedResultCode)) return

    setQuizState({
      phase: 'result',
      questionIndex: romanceEraQuestions.length - 1,
      answers: [],
      resultCode: sharedResultCode,
    })
  }, [])

  useEffect(() => {
    if (quizState.phase === 'intro') return

    focusTarget.current?.focus()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [quizState.phase, quizState.questionIndex])

  useEffect(() => {
    if (quizState.phase !== 'reveal') return undefined

    revealTimeout.current = window.setTimeout(() => {
      setQuizState((current) => ({ ...current, phase: 'result' }))
    }, 1600)

    return () => window.clearTimeout(revealTimeout.current)
  }, [quizState.phase])

  useEffect(() => () => {
    window.clearTimeout(transitionTimeout.current)
    window.clearTimeout(revealTimeout.current)
  }, [])

  const startQuiz = () => {
    window.clearTimeout(transitionTimeout.current)
    window.clearTimeout(revealTimeout.current)
    hasCompleted.current = false
    setSelectedChoice(null)
    setQuizState(startRomanceEraQuiz())
    track('romance_quiz_started')
  }

  const chooseAnswer = (choice) => {
    if (selectedChoice) return

    const questionNumber = quizState.questionIndex + 1
    setSelectedChoice(choice.id)
    track('romance_quiz_question_answered', {
      question_number: questionNumber,
      result_code: choice.primary,
    })

    transitionTimeout.current = window.setTimeout(() => {
      const nextState = submitRomanceEraAnswer(quizState, choice.id)

      if (nextState.phase === 'reveal' && !hasCompleted.current) {
        hasCompleted.current = true
        track('romance_quiz_completed', { result_code: nextState.resultCode })
        track(romanceEraResults[nextState.resultCode].analyticsEvent, { result_code: nextState.resultCode })
      }

      setSelectedChoice(null)
      setQuizState(nextState)
    }, 340)
  }

  const regionLabel = quizState.phase === 'question'
    ? `Question ${quizState.questionIndex + 1} of ${romanceEraQuestions.length}`
    : quizState.phase === 'result'
      ? 'Your romance era result'
      : quizState.phase === 'reveal'
        ? 'Preparing your romance era result'
        : 'Romance era quiz introduction'

  return (
    <main className="romance-page" id="main-content">
      <div className="romance-grain" aria-hidden="true" />
      <div
        aria-label={regionLabel}
        className="romance-shell"
        ref={focusTarget}
        role="region"
        tabIndex="-1"
      >
        {quizState.phase === 'intro' && <RomanceIntro onStart={startQuiz} />}
        {quizState.phase === 'question' && (
          <RomanceQuestion
            onChoose={chooseAnswer}
            questionIndex={quizState.questionIndex}
            selectedChoice={selectedChoice}
          />
        )}
        {quizState.phase === 'reveal' && <RomanceReveal />}
        {quizState.phase === 'result' && (
          <RomanceResult resultCode={quizState.resultCode} onRetake={startQuiz} />
        )}
      </div>
    </main>
  )
}
