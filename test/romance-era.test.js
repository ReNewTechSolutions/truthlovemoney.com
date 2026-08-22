import assert from 'node:assert/strict'
import test from 'node:test'
import {
  calculateRomanceEraResult,
  calculateRomanceEraScores,
  romanceEraQuestions,
  startRomanceEraQuiz,
  submitRomanceEraAnswer,
} from '../src/content/romanceEra.js'

test('the published scoring matrix adds primary and secondary points exactly', () => {
  const answers = ['A', 'A', undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'A']

  assert.deepEqual(calculateRomanceEraScores(answers), {
    D: 7,
    F: 0,
    C: 1,
    G: 0,
    T: 1,
  })
})

test('Question 10 awards three points to the selected result', () => {
  const answers = Array(9).fill(undefined).concat('E')

  assert.deepEqual(calculateRomanceEraScores(answers), {
    D: 0,
    F: 0,
    C: 0,
    G: 0,
    T: 3,
  })
})

test('all five romance-era outcomes can win', () => {
  const timelessAnswers = ['A', 'B', 'C', 'A', 'C', 'B', 'A', 'C', 'B', 'E']

  assert.equal(calculateRomanceEraResult(Array(10).fill('A')), 'D')
  assert.equal(calculateRomanceEraResult(Array(10).fill('B')), 'F')
  assert.equal(calculateRomanceEraResult(Array(10).fill('C')), 'C')
  assert.equal(calculateRomanceEraResult(Array(10).fill('D')), 'G')
  assert.equal(calculateRomanceEraResult(timelessAnswers), 'T')
})

test('Question 10 resolves a tie when its primary result is tied for highest', () => {
  const answers = ['A', 'A', 'A', 'A', 'A', 'B', 'C', 'B', 'B', 'B']

  assert.deepEqual(calculateRomanceEraScores(answers), {
    D: 10,
    F: 10,
    C: 4,
    G: 0,
    T: 5,
  })
  assert.equal(calculateRomanceEraResult(answers), 'F')
})

test('Question 6 resolves a tie when Question 10 does not', () => {
  const answers = ['A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'D', 'C']

  assert.deepEqual(calculateRomanceEraScores(answers), {
    D: 8,
    F: 8,
    C: 5,
    G: 4,
    T: 3,
  })
  assert.equal(calculateRomanceEraResult(answers), 'F')
})

test('an unresolved tie falls back to the Timeless Romantic', () => {
  const answers = ['A', 'A', 'A', 'A', 'B', 'C', 'B', 'B', 'B', 'C']

  assert.deepEqual(calculateRomanceEraScores(answers), {
    D: 8,
    F: 8,
    C: 7,
    G: 2,
    T: 4,
  })
  assert.equal(calculateRomanceEraResult(answers), 'T')
})

test('the quiz flow advances through ten answers and enters the reveal phase', () => {
  let state = startRomanceEraQuiz()

  romanceEraQuestions.forEach(() => {
    state = submitRomanceEraAnswer(state, 'A')
  })

  assert.equal(state.phase, 'reveal')
  assert.equal(state.questionIndex, 9)
  assert.equal(state.answers.length, 10)
  assert.equal(state.resultCode, 'D')
})
