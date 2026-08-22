export const archetypeOrder = ['sage', 'muse', 'lover', 'wanderer', 'queen']

export const archetypes = {
  sage: {
    name: 'The Sage',
    numeral: 'I',
    statement: 'The quiet wisdom in you is asking for room.',
    interpretation: [
      'In this season, you may be drawn toward the long view: the detail beneath the detail, the lesson still unfolding, the truth that becomes visible when the room grows quiet. The Sage does not hurry toward certainty. She watches, listens, reads, and lets understanding ripen in its own time.',
      'Your answers suggest an affection for perspective over spectacle. That can be a beautiful guide now—not because reflection holds every answer, but because a well-considered question can change the path ahead. Let curiosity be useful, and let what you learn become something lived rather than merely collected.',
    ],
    strengths: [
      'Perspective that widens the room',
      'Thoughtful observation',
      'A lifelong appetite for learning',
    ],
    season: 'Make space for unhurried thought, then carry one clear insight into action. Wisdom becomes most alive when it is allowed to shape an ordinary choice.',
    reflection: 'What do you already understand that you are finally ready to live by?',
  },
  muse: {
    name: 'The Muse',
    numeral: 'II',
    statement: 'You are being drawn toward what wants to be made.',
    interpretation: [
      'The Muse notices the shimmer around ordinary things: a sentence overheard, a room at dusk, a feeling that has not yet found its form. In this season, beauty and imagination may be less like decoration and more like a way of paying close attention to your life.',
      'Your answers point toward expression, possibility, and the alchemy of turning experience into something new. You do not need to make a masterpiece for this energy to matter. A page, a table, a garden, a gathering, or a brave idea can all become places where inspiration is given a body.',
    ],
    strengths: [
      'Imagination that opens possibilities',
      'Sensitivity to beauty and meaning',
      'Emotional expression with texture',
    ],
    season: 'Protect a little time for making without demanding that it be useful. Follow the image, phrase, color, or idea that keeps returning to you.',
    reflection: 'What would you create if delight were reason enough to begin?',
  },
  lover: {
    name: 'The Lover',
    numeral: 'III',
    statement: 'You are moving through life by tending what matters.',
    interpretation: [
      'The Lover meets life through devotion: to people, to beauty, to memory, and to the small rituals that make a day feel inhabited. In this season, you may be especially aware that meaning is not only found in what we achieve, but in the quality of attention we offer.',
      'Your answers suggest that connection is a living art for you. The invitation is not to disappear into other people, but to let care include your own inner life as well. Appreciation, honesty, tenderness, and presence can deepen a bond without turning it into a promise of perfection.',
    ],
    strengths: [
      'Warm and generous attention',
      'Devotion to what has meaning',
      'An instinct for beauty and belonging',
    ],
    season: 'Choose the relationships and rituals that feel reciprocal and alive. Offer your full presence where it can be received, including in the promises you make to yourself.',
    reflection: 'What deserves to be loved more deliberately in the life you have now?',
  },
  wanderer: {
    name: 'The Wanderer',
    numeral: 'IV',
    statement: 'The horizon is speaking louder than the map.',
    interpretation: [
      'The Wanderer is alive to the road not yet taken. In this season, reinvention may feel less like rejecting what came before and more like making room for a self, place, or possibility that has been waiting at the edge of the known.',
      'Your answers lean toward movement, curiosity, and the courage to revise the route. Exploration does not always require a distant country or a dramatic departure. Sometimes it begins with one honest experiment: a different answer, an unfamiliar room, or permission to change your mind.',
    ],
    strengths: [
      'Courage to change direction',
      'Curiosity beyond the familiar',
      'Resourceful reinvention',
    ],
    season: 'Take one step that gives possibility somewhere to meet you. Keep enough of a compass to stay true to yourself, and enough openness to be surprised.',
    reflection: 'Which horizon keeps returning, even after you have tried to look away?',
  },
  queen: {
    name: 'The Queen',
    numeral: 'V',
    statement: 'Your next chapter wants a deliberate yes—and a dignified no.',
    interpretation: [
      'The Queen brings self-possession to the threshold. In this season, you may be called to decide what receives your time, what standards shape your days, and which responsibilities are truly yours to carry. Her power is not performance; it is the steadiness of intentional choice.',
      'Your answers suggest respect for clarity, dignity, and well-kept boundaries. Leadership here can be quiet: naming the priority, keeping the promise, setting the tone, or declining what diminishes the life you are building. Authority becomes generous when it is rooted in responsibility rather than control.',
    ],
    strengths: [
      'Clear and intentional choice',
      'Dignified boundaries',
      'Steady, responsible leadership',
    ],
    season: 'Name what belongs at the center of this chapter, then arrange your time around it. Let every thoughtful no protect the yes you most want to honor.',
    reflection: 'What would change if you treated your attention as something precious?',
  },
}

export const archetypeQuestions = [
  {
    prompt: 'When you enter a room, what tends to catch your attention first?',
    choices: [
      { archetype: 'muse', text: 'The light, color, and beautiful details' },
      { archetype: 'sage', text: 'The books, objects, and clues to its story' },
      { archetype: 'lover', text: 'The way people are welcoming one another' },
      { archetype: 'queen', text: 'The atmosphere—and what would make it feel settled' },
      { archetype: 'wanderer', text: 'The windows, doorways, and what may be beyond them' },
    ],
  },
  {
    prompt: 'When life begins to change, what do you seek first?',
    choices: [
      { archetype: 'lover', text: 'A trusted person to share the moment with' },
      { archetype: 'wanderer', text: 'A fresh horizon and room to move' },
      { archetype: 'sage', text: 'Time to understand what the change may mean' },
      { archetype: 'queen', text: 'A clear decision about what comes next' },
      { archetype: 'muse', text: 'A creative way to give the change a voice' },
    ],
  },
  {
    prompt: 'How do you prefer to meet uncertainty?',
    choices: [
      { archetype: 'queen', text: 'Choose what I can shape and begin there' },
      { archetype: 'muse', text: 'Follow the image or idea that sparks something' },
      { archetype: 'wanderer', text: 'Try a path and learn through movement' },
      { archetype: 'lover', text: 'Talk honestly with someone I trust' },
      { archetype: 'sage', text: 'Pause, observe, and gather perspective' },
    ],
  },
  {
    prompt: 'What makes a life feel meaningful to you?',
    choices: [
      { archetype: 'sage', text: 'Continuing to learn and understand' },
      { archetype: 'queen', text: 'Living by values I chose deliberately' },
      { archetype: 'lover', text: 'Loving well and being fully present' },
      { archetype: 'muse', text: 'Making something that did not exist before' },
      { archetype: 'wanderer', text: 'Remaining open to who I might become' },
    ],
  },
  {
    prompt: 'What do you value most in a close relationship?',
    choices: [
      { archetype: 'wanderer', text: 'Freedom to grow without losing one another' },
      { archetype: 'lover', text: 'Tenderness, devotion, and everyday care' },
      { archetype: 'queen', text: 'Mutual respect and clear boundaries' },
      { archetype: 'sage', text: 'Thoughtful honesty and real conversation' },
      { archetype: 'muse', text: 'Shared wonder, play, and inspiration' },
    ],
  },
  {
    prompt: 'Which place calls to you most strongly?',
    choices: [
      { archetype: 'muse', text: 'A sunlit studio scattered with works in progress' },
      { archetype: 'queen', text: 'A serene room with a long, beautifully set table' },
      { archetype: 'sage', text: 'A lamplit library while rain touches the windows' },
      { archetype: 'wanderer', text: 'A coastal road with no fixed arrival time' },
      { archetype: 'lover', text: 'A candlelit kitchen filled with familiar voices' },
    ],
  },
  {
    prompt: 'Which kind of legacy feels most worth leaving?',
    choices: [
      { archetype: 'lover', text: 'People who knew they were deeply cherished' },
      { archetype: 'sage', text: 'An idea or lesson that keeps illuminating' },
      { archetype: 'wanderer', text: 'Proof that a life can begin again' },
      { archetype: 'muse', text: 'Work that helps someone feel more alive' },
      { archetype: 'queen', text: 'A standard of dignity others can build upon' },
    ],
  },
  {
    prompt: 'How do you like to approach a new chapter?',
    choices: [
      { archetype: 'queen', text: 'Choose the intention and honor it consistently' },
      { archetype: 'sage', text: 'Reflect on the old chapter before mapping the new' },
      { archetype: 'muse', text: 'Give it a name, image, or atmosphere' },
      { archetype: 'lover', text: 'Invite the people closest to me into it' },
      { archetype: 'wanderer', text: 'Take the first step before the whole route is known' },
    ],
  },
  {
    prompt: 'What do you protect most fiercely?',
    choices: [
      { archetype: 'sage', text: 'The quiet time I need to think clearly' },
      { archetype: 'wanderer', text: 'My independence and sense of possibility' },
      { archetype: 'lover', text: 'The people and bonds I hold dear' },
      { archetype: 'muse', text: 'The spark that keeps my imagination alive' },
      { archetype: 'queen', text: 'My peace, standards, and essential commitments' },
    ],
  },
  {
    prompt: 'If fear went quiet for one day, what would you choose?',
    choices: [
      { archetype: 'wanderer', text: 'Change direction toward the life that keeps calling' },
      { archetype: 'muse', text: 'Make the beautiful idea real—and let it be seen' },
      { archetype: 'queen', text: 'Claim my place and make the overdue decision' },
      { archetype: 'sage', text: 'Study or teach the subject I cannot stop thinking about' },
      { archetype: 'lover', text: 'Speak from the heart without holding back' },
    ],
  },
]

export function calculateArchetypeResult(answers) {
  const scores = Object.fromEntries(archetypeOrder.map((archetype) => [archetype, 0]))

  answers.forEach((answer) => {
    if (answer in scores) scores[answer] += 1
  })

  // Ties resolve to the earliest archetype in the published order above.
  return archetypeOrder.reduce((winner, archetype) => (
    scores[archetype] > scores[winner] ? archetype : winner
  ), archetypeOrder[0])
}
