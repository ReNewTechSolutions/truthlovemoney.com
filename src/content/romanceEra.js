export const romanceEraOrder = ['D', 'F', 'C', 'G', 'T']

export const romanceEraResults = {
  D: {
    slug: 'devoted',
    name: 'The Devoted Romantic',
    era: '1940s',
    image: '/assets/romance-era/results/devoted-romantic-1940s.png',
    downloadFilename: 'the-lyon-den-devoted-romantic-1940s.png',
    analyticsEvent: 'romance_quiz_result_devoted',
    paragraphs: [
      'Your heart believes love is something you tend.',
      'You are drawn to loyalty, intention, consistency, and the quiet ways people prove they mean what they say.',
      'For you, romance isn’t necessarily the loudest moment in the room.',
      'It’s someone remembering. Someone returning. Someone doing the little thing they promised they would do.',
      'You’re moved by love that feels dependable without becoming dull — the kind built from ordinary acts that slowly become a life.',
    ],
    crave: 'Devotion',
    notice: 'Consistency',
    fallFor: 'Someone whose actions match their words',
    perfectRomance: 'A love that feels chosen again and again, even on the ordinary days.',
  },
  F: {
    slug: 'free-spirited',
    name: 'The Free-Spirited Romantic',
    era: '1960s',
    image: '/assets/romance-era/results/free-spirited-romantic-1960s.png',
    downloadFilename: 'the-lyon-den-free-spirited-romantic-1960s.png',
    analyticsEvent: 'romance_quiz_result_free_spirited',
    paragraphs: [
      'Your heart wants love to feel alive.',
      'You’re drawn to people who make the world feel larger.',
      'You want connection, but not confinement. Intimacy, but never at the expense of individuality.',
      'For you, romance lives in spontaneous plans, unexpected turns, long roads, inside jokes, and the exhilarating feeling that the person beside you is still discovering life with you.',
      'You don’t want love to become a cage. You want it to feel like an open door.',
    ],
    crave: 'Freedom + connection',
    notice: 'Curiosity',
    fallFor: 'Someone who makes you want to experience more of life',
    perfectRomance: 'Two people choosing each other without asking either one to become smaller.',
  },
  C: {
    slug: 'cinematic',
    name: 'The Cinematic Romantic',
    era: '1970s',
    image: '/assets/romance-era/results/cinematic-romantic-1970s.png',
    downloadFilename: 'the-lyon-den-cinematic-romantic-1970s.png',
    analyticsEvent: 'romance_quiz_result_cinematic',
    paragraphs: [
      'Your heart was made for the kind of love they make movies about.',
      'Not necessarily perfect. But unforgettable.',
      'You are drawn to chemistry, intelligence, complexity, longing, and the rare feeling of being understood by another person at a depth that surprises you.',
      'You remember conversations. Glances. Songs. Places. Tiny moments other people might not notice.',
      'For you, romance is emotional intimacy with a little mystery still left inside it.',
    ],
    crave: 'Depth',
    notice: 'What people don’t say',
    fallFor: 'Conversation + chemistry',
    perfectRomance: 'Two people who can talk about everything and still occasionally leave each other speechless.',
  },
  G: {
    slug: 'grand',
    name: 'The Grand Romantic',
    era: '1980s',
    image: '/assets/romance-era/results/grand-romantic-1980s.png',
    downloadFilename: 'the-lyon-den-grand-romantic-1980s.png',
    analyticsEvent: 'romance_quiz_result_grand',
    paragraphs: [
      'You believe love deserves to be felt out loud.',
      'You appreciate passion, intention, celebration, and people who refuse to hide behind ambiguity.',
      'You don’t necessarily need extravagance. What matters is effort you can feel.',
      'The planned evening. The unexpected flowers. The declaration. The person who crosses the room because being near you matters more than pretending it doesn’t.',
      'You want romance with pulse.',
    ],
    crave: 'Passion',
    notice: 'Effort',
    fallFor: 'Someone who makes their feelings unmistakable',
    perfectRomance: 'A love that never leaves you wondering whether you are wanted.',
  },
  T: {
    slug: 'timeless',
    name: 'The Timeless Romantic',
    era: 'No Era',
    image: '/assets/romance-era/results/timeless-romantic.png',
    downloadFilename: 'the-lyon-den-timeless-romantic.png',
    analyticsEvent: 'romance_quiz_result_timeless',
    paragraphs: [
      'Your heart doesn’t belong to an era. It belongs to a feeling.',
      'You’ve taken the best pieces from all of them.',
      'The devotion of yesterday. The freedom to remain yourself. The emotional depth of a great love story. The courage to say what you feel.',
      'But what matters most to you now is simpler.',
      'You want love that adds to your life rather than consumes it. Something warm. Honest. Mutual.',
      'Something exciting enough to keep discovering and peaceful enough to call home.',
    ],
    crave: 'Intentional love',
    notice: 'How someone makes you feel when nothing exciting is happening',
    fallFor: 'Presence',
    perfectRomance: 'A love that feels like home without ever feeling like a cage.',
  },
}

export const romanceEraQuestions = [
  {
    prompt: 'It’s Friday night. Don’t think too hard. Where would you rather be?',
    choices: [
      { id: 'A', label: 'Candlelit dinner at home', text: 'At home, candles lit, dinner cooking, nowhere else to be.', primary: 'D', scores: { D: 2, T: 1 } },
      { id: 'B', label: 'A beautiful drive with no plan', text: 'Driving somewhere beautiful with no real plan.', primary: 'F', scores: { F: 2 } },
      { id: 'C', label: 'A tiny restaurant after closing', text: 'In a tiny restaurant talking long after everyone else has left.', primary: 'C', scores: { C: 2, T: 1 } },
      { id: 'D', label: 'Dressed up somewhere gorgeous', text: 'Dressed up somewhere gorgeous, letting the night decide what happens.', primary: 'G', scores: { G: 2, C: 1 } },
    ],
  },
  {
    prompt: 'Choose the gesture that would stay with you the longest.',
    choices: [
      { id: 'A', label: 'A handwritten letter', text: 'A handwritten letter you could keep forever.', primary: 'D', scores: { D: 2, C: 1 } },
      { id: 'B', label: 'A surprise day trip', text: 'A surprise day trip planned just because they thought you’d love it.', primary: 'F', scores: { F: 2, T: 1 } },
      { id: 'C', label: 'A book with a private note', text: 'A book with a private note written inside the cover.', primary: 'C', scores: { C: 2, D: 1 } },
      { id: 'D', label: 'Flowers and a planned evening', text: 'Flowers, reservations, and an evening they planned from beginning to end.', primary: 'G', scores: { G: 2, T: 1 } },
    ],
  },
  {
    prompt: 'Pick the love-story scene you’d step into if you could.',
    choices: [
      { id: 'A', label: 'A train-platform goodbye', text: 'A train platform, one person leaving, one final kiss before the doors close.', primary: 'D', scores: { D: 2, C: 1 } },
      { id: 'B', label: 'A convertible on an empty road', text: 'A convertible on an empty road, music playing, nowhere you have to be.', primary: 'F', scores: { F: 2, G: 1 } },
      { id: 'C', label: 'A rainy bookstore window', text: 'A rainy bookstore window and a conversation that changes everything.', primary: 'C', scores: { C: 2, T: 1 } },
      { id: 'D', label: 'A rooftop at night', text: 'A rooftop at night, city lights below, dressed like the evening matters.', primary: 'G', scores: { G: 2, C: 1 } },
    ],
  },
  {
    prompt: 'Which kind of song moment feels the most romantic?',
    choices: [
      { id: 'A', label: 'A slow song in the kitchen', text: 'A slow song in the kitchen when no one else is watching.', primary: 'D', scores: { D: 2, T: 1 } },
      { id: 'B', label: 'Your favorite song, windows down', text: 'Your favorite song blasting with the windows down on a road trip.', primary: 'F', scores: { F: 2 } },
      { id: 'C', label: 'The song attached to one person', text: 'A song that becomes permanently attached to one particular person.', primary: 'C', scores: { C: 2, D: 1 } },
      { id: 'D', label: 'A song dedicated to you', text: 'Someone dedicating a song to you in front of everyone.', primary: 'G', scores: { G: 2 } },
    ],
  },
  {
    prompt: 'Choose your perfect first date.',
    choices: [
      { id: 'A', label: 'A quiet dinner', text: 'Dinner somewhere quiet where you can actually hear each other talk.', primary: 'D', scores: { D: 2, T: 1 } },
      { id: 'B', label: 'Something spontaneous', text: 'Something spontaneous — a market, festival, road trip, or place neither of you has been.', primary: 'F', scores: { F: 2, G: 1 } },
      { id: 'C', label: 'A bookstore, museum, or café', text: 'A bookstore, museum, old cinema, or café where conversation can wander.', primary: 'C', scores: { C: 2, T: 1 } },
      { id: 'D', label: 'Cocktails and beautiful lighting', text: 'Cocktails, incredible clothes, beautiful lighting, and somewhere memorable.', primary: 'G', scores: { G: 2, C: 1 } },
    ],
  },
  {
    prompt: 'What makes you fall hardest?',
    choices: [
      { id: 'A', label: 'Consistency', text: 'Someone being consistent when nobody is asking them to be.', primary: 'D', scores: { D: 2, T: 1 } },
      { id: 'B', label: 'Someone who makes life feel bigger', text: 'Someone who makes the world feel bigger when you’re together.', primary: 'F', scores: { F: 2, T: 1 } },
      { id: 'C', label: 'Feeling completely understood', text: 'Feeling completely understood without having to explain every part of yourself.', primary: 'C', scores: { C: 2, T: 1 } },
      { id: 'D', label: 'Being wanted without doubt', text: 'Someone who makes it unmistakably clear that they want you.', primary: 'G', scores: { G: 2, D: 1 } },
    ],
  },
  {
    prompt: 'Pick somewhere to disappear together for a few days.',
    choices: [
      { id: 'A', label: 'A cottage with books and a fireplace', text: 'A little cottage with a fireplace, books, and nowhere to rush off to.', primary: 'D', scores: { D: 2, T: 1 } },
      { id: 'B', label: 'A coastal road', text: 'A coastal road with one bag each and no fixed itinerary.', primary: 'F', scores: { F: 2, G: 1 } },
      { id: 'C', label: 'An old European city', text: 'An old European city full of cafés, galleries, and places to wander at night.', primary: 'C', scores: { C: 2, F: 1 } },
      { id: 'D', label: 'A beautiful hotel', text: 'A beautiful hotel where you dress for dinner and order champagne upstairs afterward.', primary: 'G', scores: { G: 2, C: 1 } },
    ],
  },
  {
    prompt: 'Which sentence sounds most like love to you?',
    choices: [
      { id: 'A', label: '“I said I’d be here, so I’m here.”', text: '“I said I’d be here, so I’m here.”', primary: 'D', scores: { D: 2 } },
      { id: 'B', label: '“Let’s go. We’ll figure it out.”', text: '“Let’s go. We’ll figure it out on the way.”', primary: 'F', scores: { F: 2 } },
      { id: 'C', label: '“Tell me the part no one knows.”', text: '“Tell me the part you don’t usually tell anyone.”', primary: 'C', scores: { C: 2, T: 1 } },
      { id: 'D', label: '“I don’t want you wondering.”', text: '“I don’t want you wondering how I feel about you.”', primary: 'G', scores: { G: 2, D: 1 } },
    ],
  },
  {
    prompt: 'Choose the one thing you’d be most likely to keep for years.',
    choices: [
      { id: 'A', label: 'An old love letter', text: 'An old love letter folded soft from being read too many times.', primary: 'D', scores: { D: 2, C: 1 } },
      { id: 'B', label: 'A travel keepsake', text: 'A ticket or little object from a trip you took together.', primary: 'F', scores: { F: 2, T: 1 } },
      { id: 'C', label: 'A photograph only you understand', text: 'A photograph that captures a moment nobody else would understand.', primary: 'C', scores: { C: 2, D: 1 } },
      { id: 'D', label: 'A gift from an unforgettable night', text: 'A piece of jewelry or gift tied to one unforgettable night.', primary: 'G', scores: { G: 2 } },
    ],
  },
  {
    prompt: 'And finally… what do you want love to feel like now?',
    choices: [
      { id: 'A', label: 'Like someone will always come back', text: 'Like someone will always come back.', primary: 'D', scores: { D: 3 } },
      { id: 'B', label: 'Like we could go anywhere together', text: 'Like we could go anywhere together.', primary: 'F', scores: { F: 3 } },
      { id: 'C', label: 'Like being completely understood', text: 'Like being completely understood.', primary: 'C', scores: { C: 3 } },
      { id: 'D', label: 'Like being wanted without hesitation', text: 'Like being wanted without hesitation.', primary: 'G', scores: { G: 3 } },
      { id: 'E', label: 'Like peace', text: 'Like peace.', primary: 'T', scores: { T: 3 } },
    ],
  },
]

function getChoice(questionIndex, choiceId) {
  return romanceEraQuestions[questionIndex]?.choices.find((choice) => choice.id === choiceId)
}

export function calculateRomanceEraScores(answers) {
  const scores = Object.fromEntries(romanceEraOrder.map((code) => [code, 0]))

  romanceEraQuestions.forEach((_, questionIndex) => {
    const choice = getChoice(questionIndex, answers[questionIndex])
    if (!choice) return

    Object.entries(choice.scores).forEach(([code, points]) => {
      scores[code] += points
    })
  })

  return scores
}

export function calculateRomanceEraResult(answers) {
  const scores = calculateRomanceEraScores(answers)
  const highestScore = Math.max(...Object.values(scores))
  const tiedCodes = romanceEraOrder.filter((code) => scores[code] === highestScore)

  if (tiedCodes.length === 1) return tiedCodes[0]

  const questionTenPrimary = getChoice(9, answers[9])?.primary
  if (tiedCodes.includes(questionTenPrimary)) return questionTenPrimary

  const questionSixPrimary = getChoice(5, answers[5])?.primary
  if (tiedCodes.includes(questionSixPrimary)) return questionSixPrimary

  return 'T'
}

export function createRomanceEraQuizState() {
  return {
    phase: 'intro',
    questionIndex: 0,
    answers: [],
    resultCode: null,
  }
}

export function startRomanceEraQuiz() {
  return {
    phase: 'question',
    questionIndex: 0,
    answers: [],
    resultCode: null,
  }
}

export function submitRomanceEraAnswer(state, choiceId) {
  if (state.phase !== 'question') throw new Error('Answers can only be submitted during the question phase.')
  if (!getChoice(state.questionIndex, choiceId)) throw new Error('That answer does not belong to the current question.')

  const answers = [...state.answers]
  answers[state.questionIndex] = choiceId

  if (state.questionIndex < romanceEraQuestions.length - 1) {
    return {
      ...state,
      answers,
      questionIndex: state.questionIndex + 1,
    }
  }

  return {
    ...state,
    phase: 'reveal',
    answers,
    resultCode: calculateRomanceEraResult(answers),
  }
}
