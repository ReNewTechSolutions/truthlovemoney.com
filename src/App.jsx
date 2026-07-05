import { useEffect, useMemo, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase, supabaseConfig } from './lib/supabaseClient'

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

const poetryFeature = {
  pageTitle: 'Poems That Stayed With Me',
  poemTitle: 'Reflections on a Gift of Watermelon Pickle Received from a Friend Called Felicity',
  author: 'John Tobias',
  anthology: 'Reflections on a Gift of Watermelon Pickle... and other Modern Verse',
  sourceUrl: 'https://archive.org/details/reflectionsongif00nota',
  note:
    'This poem reminded Marguerite of childhood summers, teaching literature, students discovering poetry, family memories, and the way ordinary moments become treasured over time.',
  question: 'Has a poem ever carried you back to a memory you thought you had forgotten?',
}

const youtubeChannelUrl = 'https://www.youtube.com/@TheLyonDen-Marguerite'
const youtubeLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}
const youtubeChannelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || ''
const configuredYoutubeFeedUrl = import.meta.env.VITE_YOUTUBE_FEED_URL || ''
const youtubeFeedUrl =
  configuredYoutubeFeedUrl ||
  (youtubeChannelId ? `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannelId}` : '')

const coverLibrary = {
  'broadway-dreams': {
    titleLines: ['BROADWAY', 'DREAMS'],
    subtitle: 'Sometimes life gives us a different stage.',
    theme: 'theater',
    category: 'Episode',
    icon: 'lion',
    variant: 'episode',
    motif: 'sheet music • spotlight • golden curtain',
    alt: 'Editorial monogram card for Broadway Dreams with a classic Lyon Den lion seal',
  },
  'every-story-video': {
    titleLines: ['EVERY STORY', 'HAS SOMETHING', 'TO TEACH US'],
    theme: 'creek',
    category: 'Episode',
    icon: 'openBook',
    variant: 'episode',
    motif: 'journal • lantern • creek pages',
    alt: 'Editorial monogram card for Every Story Has Something to Teach Us with an open book seal',
  },
  'summer-memory': {
    titleLines: ['THE SUMMER', 'THAT NEVER', 'LEFT ME'],
    theme: 'summer',
    category: 'Poetry',
    icon: 'creek',
    variant: 'poetry',
    motif: 'poetry book • water light • flowers',
    alt: 'Editorial monogram card for The Summer That Never Left Me with a creek line seal',
  },
  'every-story-blog': {
    titleLines: ['EVERY STORY', 'HAS SOMETHING', 'TO TEACH US'],
    theme: 'window',
    category: 'Journal',
    icon: 'journal',
    variant: 'blog',
    motif: 'old books • warm window • creek view',
    alt: 'Editorial monogram card for Every Story Has Something to Teach Us with a journal seal',
  },
  'love-changes': {
    titleLines: ['LOVE', 'CHANGES'],
    subtitle: 'But it never stops teaching us.',
    theme: 'love',
    category: 'Legacy / Wisdom',
    icon: 'lioness',
    variant: 'wisdom',
    motif: 'two chairs • sunset creek • books',
    alt: 'Editorial monogram card for Love Changes with a graceful lioness seal',
  },
  'one-bite-at-a-time': {
    titleLines: ['ONE BITE', 'AT A TIME'],
    theme: 'path',
    category: 'Harvest Session',
    icon: 'cub',
    variant: 'harvest',
    motif: 'storybook path • lanterns • mountains',
    alt: 'Editorial monogram card for One Bite at a Time with a small cub seal',
  },
  'book-that-changed-me': {
    titleLines: ['THE BOOK', 'THAT CHANGED', 'ME'],
    theme: 'glow-book',
    category: 'Books',
    icon: 'openBook',
    variant: 'blog',
    motif: 'antique books • gold light • discovery',
    alt: 'Editorial monogram card for The Book That Changed Me with an open book seal',
  },
  'seed-garden': {
    titleLines: ['THE SEED', 'GARDEN'],
    subtitle: 'Where ideas begin to bloom.',
    theme: 'garden',
    category: 'Field Notes',
    icon: 'journal',
    variant: 'field',
    motif: 'open journal • seedling • botanical border',
    alt: 'Editorial monogram card for The Seed Garden with a journal and seed seal',
  },
  'freedom-small-things': {
    titleLines: ['FREEDOM IS', 'FOUND IN THE', 'SMALL THINGS'],
    subtitle: 'A Fourth of July reflection.',
    theme: 'freedom',
    category: 'Journal',
    icon: 'lantern',
    variant: 'blog',
    motif: 'porch light • summer pages • quiet gratitude',
    alt: 'Editorial monogram card for Freedom Is Found in the Small Things with a lantern seal',
  },
  'covey-mother': {
    titleLines: ['STEPHEN COVEY', 'WROTE WHAT', 'MY MOTHER LIVED'],
    subtitle: 'Values, influence, and a calling to teach.',
    theme: 'legacy',
    category: 'Legacy / Wisdom',
    icon: 'lioness',
    variant: 'legacy',
    motif: 'red convertible • classroom light • lifelong influence',
    alt: 'Editorial monogram card for Stephen Covey Wrote What My Mother Lived with a lioness seal',
  },
  'clear-grammar': {
    titleLines: ['CLEAR GRAMMAR', 'CLEAR', 'THOUGHTS'],
    subtitle: 'Language, listening, and the wisdom of expression.',
    theme: 'language',
    category: 'Field Notes',
    icon: 'journal',
    variant: 'field',
    motif: 'ink pen • open pages • thoughtful listening',
    alt: 'Editorial monogram card for Clear Grammar, Clear Thoughts with a journal seal',
  },
  'poems-stayed': {
    titleLines: ['POEMS THAT', 'STAYED WITH ME'],
    subtitle: 'Lines, memory, and reflection.',
    theme: 'poetry',
    category: 'Poetry',
    icon: 'lantern',
    variant: 'poetry',
    motif: 'poems • memory • quiet light',
    alt: 'Editorial monogram card for Poems That Stayed With Me with a lantern seal',
  },
  'poetry-notebook': {
    titleLines: ['THE NOTEBOOK', 'THAT CHANGED', 'EVERYTHING'],
    subtitle: 'Poetry, teaching, and the first thread.',
    theme: 'language',
    category: 'Journal',
    icon: 'journal',
    variant: 'field',
    motif: 'notebook • poetry • student inspiration',
    alt: 'Editorial monogram card for The Notebook That Changed Everything with a journal seal',
  },
  'teacher-never-retires': {
    titleLines: ['A TEACHER', 'NEVER', 'RETIRES'],
    subtitle: 'Influence, listening, and lifelong wisdom.',
    theme: 'legacy',
    category: 'Legacy / Wisdom',
    icon: 'lioness',
    variant: 'legacy',
    motif: 'influence • clear words • legacy lessons',
    alt: 'Editorial monogram card for A Teacher Never Retires with a lioness seal',
  },
}

const collectionDefinitions = [
  {
    title: 'Summer Memories',
    slug: 'summer-memories',
    description: 'Water, porch light, family gatherings, and the warm seasons that return through story.',
    icon: 'creek',
    coverId: 'summer-memory',
  },
  {
    title: 'Teaching & Wisdom',
    slug: 'teaching-wisdom',
    description: 'Classroom lessons, influence, clear communication, and the wisdom that keeps teaching.',
    icon: 'lioness',
    coverId: 'teacher-never-retires',
  },
  {
    title: 'Poetry',
    slug: 'poetry',
    description: 'Poems, notebooks, anthologies, and the lines that open doors into memory.',
    icon: 'lantern',
    coverId: 'poems-stayed',
  },
  {
    title: 'Books That Changed Me',
    slug: 'books-that-changed-me',
    description: 'The books, authors, passages, and reading memories that shaped a life of learning.',
    icon: 'openBook',
    coverId: 'book-that-changed-me',
  },
  {
    title: 'Conversations',
    slug: 'conversations',
    description: 'Reflections shaped by listening, relationships, advice, and words that stay.',
    icon: 'lion',
    coverId: 'love-changes',
  },
  {
    title: 'Field Notes',
    slug: 'field-notes',
    description: 'Short observations, language lessons, seed ideas, and thoughtful notes from the margins.',
    icon: 'journal',
    coverId: 'clear-grammar',
  },
  {
    title: 'Illustrated Pages',
    slug: 'illustrated-pages',
    description: 'Visual chapters, editorial covers, and page-like pieces for the growing Lyon Den archive.',
    icon: 'openBook',
    coverId: 'every-story-video',
  },
  {
    title: 'Legacy Lessons',
    slug: 'legacy-lessons',
    description: 'Family values, moral foundations, influence, and wisdom passed from one chapter to the next.',
    icon: 'lioness',
    coverId: 'covey-mother',
  },
]

const blogPosts = [
  {
    title: 'A Teacher Never Retires',
    subtitle: 'Teaching as a way of living, listening, and leaving a gentle influence.',
    author: 'Marguerite Lyon',
    category: 'Legacy Lessons',
    featured: false,
    date: 'July 5, 2026',
    readingTime: '6 minutes',
    path: '/blog/a-teacher-never-retires',
    slug: 'a-teacher-never-retires',
    seoTitle: 'A Teacher Never Retires | Teaching Wisdom and Legacy Lessons',
    metaDescription:
      'Marguerite reflects on lifelong teaching, influence, advice as a love language, listening before judging, and clear communication.',
    primaryKeyword: 'lifelong teacher',
    secondaryKeywords: [
      'teaching wisdom',
      'storytelling and education',
      'clear communication',
      'legacy lessons',
      'listening before judging',
      'moral foundation',
      'lifelong learning',
    ],
    tags: [
      'lifelong teacher',
      'teaching wisdom',
      'storytelling and education',
      'clear communication',
      'legacy lessons',
    ],
    collectionSlugs: ['teaching-wisdom', 'legacy-lessons', 'conversations'],
    ogImage: '/assets/watermark-logo.png',
    suggestedFeaturedImage: 'a-teacher-never-retires.png',
    socialExcerpt:
      'A Lyon Den reflection on teaching as a way of living, listening before judging, and the quiet reach of influence.',
    pullQuote:
      'A teacher never really retires because teaching is not only what you do. It is how you listen, guide, encourage, and love.',
    customCover: '',
    coverId: 'teacher-never-retires',
    excerpt:
      'A reflection on lifelong teaching, advice as a love language, listening before judging, clear communication, and the legacy of influence.',
    content: [
      {
        type: 'paragraph',
        text: 'Some callings do not end simply because a season changes.',
      },
      {
        type: 'paragraph',
        text: 'A classroom may empty. A calendar may stop carrying lesson plans. The bell may no longer ring at the same hour each morning. But the habit of teaching, the instinct to listen, the desire to help someone find words for what they mean, those things remain. They become part of the way a person moves through the world.',
      },
      {
        type: 'paragraph',
        text: 'I have come to believe that a teacher never really retires because teaching is not only a profession. It is a way of living. It is a way of paying attention. It is the willingness to see possibility in another person before they can see it clearly in themselves.',
      },
      {
        type: 'quote',
        text: 'You never know where your influence lies.',
      },
      {
        type: 'heading',
        text: 'Influence Travels Quietly',
      },
      {
        type: 'paragraph',
        text: 'The phrase “You never know where your influence lies” has followed me for years. It is both a comfort and a responsibility. We may never know which sentence helped a student keep going, which correction became confidence, or which moment of patience taught more than the lesson on the board.',
      },
      {
        type: 'paragraph',
        text: 'Influence rarely announces itself. It often travels quietly through memory. A student may not understand the value of a difficult assignment until much later. A young person may resist advice in the moment, then return to it years afterward when life finally explains why it mattered.',
      },
      {
        type: 'paragraph',
        text: 'That is one reason teaching requires faith. You plant more than you harvest. You speak into lives without always knowing what will take root. You correct, encourage, challenge, and explain, trusting that something useful may remain.',
      },
      {
        type: 'heading',
        text: 'Advice as a Love Language',
      },
      {
        type: 'paragraph',
        text: 'In my own family, advice was often a love language. My parents gave me a strong moral and ethical foundation. They taught me that choices matter, that words matter, and that character is revealed not only in grand decisions but in ordinary habits.',
      },
      {
        type: 'paragraph',
        text: 'Advice did not always arrive wrapped in softness, but it usually arrived from care. It meant someone loved you enough to point toward a better path. It meant they believed you were capable of more clarity, more courage, more responsibility, more growth.',
      },
      {
        type: 'paragraph',
        text: 'That kind of guidance shaped the teacher in me. I wanted students to understand not only grammar or literature, but themselves. I wanted them to recognize that their words could carry ideas, questions, memories, and convictions into the world.',
      },
      {
        type: 'heading',
        text: 'Listening Before Judging',
      },
      {
        type: 'paragraph',
        text: 'A good teacher learns to listen before judging. A sentence that seems confused may be a thought still becoming clear. A student who seems careless may be overwhelmed. A person who speaks sharply may be carrying a story we have not yet heard.',
      },
      {
        type: 'paragraph',
        text: 'Listening does not mean we abandon standards. It means we gather context before we decide what the moment requires. Sometimes the answer is correction. Sometimes it is encouragement. Sometimes it is silence long enough for someone else to find their voice.',
      },
      {
        type: 'paragraph',
        text: 'Helping people articulate their thoughts is a quiet form of respect. When we help someone say what they mean, we help them stand more firmly inside their own life.',
      },
      {
        type: 'heading',
        text: 'Clear Words, Clearer Understanding',
      },
      {
        type: 'paragraph',
        text: 'I still believe in clear grammar, clear articulation, and clear thoughts. Not because language should be used to make people feel small, but because language can give dignity to what a person carries inside.',
      },
      {
        type: 'paragraph',
        text: 'A clear sentence can become a bridge. A careful explanation can calm confusion. A well-chosen word can make room for understanding. That is why teaching communication is never only about punctuation or pronunciation. It is about helping people be heard.',
      },
      {
        type: 'paragraph',
        text: 'The older I get, the more I understand that teaching continues in many forms. It happens in conversation. It happens in family. It happens when someone asks for advice, when a memory becomes a lesson, when a story helps another person feel less alone.',
      },
      {
        type: 'paragraph',
        text: 'The Lyon Den grows from that belief. Every story has something to teach us. Every life holds lessons worth preserving. And every person, if they keep listening and learning, can still be both student and teacher.',
      },
      {
        type: 'paragraph',
        text: 'A teacher never retires. The classroom simply becomes wider.',
      },
      {
        type: 'paragraph',
        text: 'Never Stop Learning.',
      },
    ],
  },
  {
    title: 'The Notebook That Changed Everything',
    subtitle: 'How a seventh-grade poetry notebook became a lifelong thread through teaching, memory, and story.',
    author: 'Marguerite Lyon',
    category: 'Poetry',
    featured: false,
    date: 'July 5, 2026',
    readingTime: '6 minutes',
    path: '/blog/the-notebook-that-changed-everything',
    slug: 'the-notebook-that-changed-everything',
    seoTitle: 'The Notebook That Changed Everything | Poetry Notebook and Teaching Poetry',
    metaDescription:
      'Marguerite reflects on a seventh-grade poetry notebook, the Watermelon Pickle anthology, teaching poetry, student inspiration, and lifelong learning.',
    primaryKeyword: 'poetry notebook',
    secondaryKeywords: [
      'teaching poetry',
      'student inspiration',
      'lifelong learning',
      'literary memories',
      'Watermelon Pickle anthology',
      'self-expression',
      'teaching influence',
    ],
    tags: [
      'poetry notebook',
      'teaching poetry',
      'student inspiration',
      'lifelong learning',
      'literary memories',
    ],
    collectionSlugs: ['poetry', 'teaching-wisdom', 'summer-memories', 'illustrated-pages'],
    ogImage: '/assets/watermark-logo.png',
    suggestedFeaturedImage: 'the-notebook-that-changed-everything.png',
    socialExcerpt:
      'A Lyon Den reflection on a seventh-grade poetry notebook, Watermelon Pickle, and the poems that helped students find their own voices.',
    pullQuote:
      'A notebook can look small from the outside and still hold the beginning of a lifelong thread.',
    customCover: '',
    coverId: 'poetry-notebook',
    excerpt:
      'A reflection on a seventh-grade poetry notebook, the Watermelon Pickle anthology, teaching poetry, and the lifelong thread of imagination.',
    content: [
      {
        type: 'paragraph',
        text: 'A notebook can look small from the outside and still hold the beginning of a lifelong thread.',
      },
      {
        type: 'paragraph',
        text: 'When I think back to seventh grade, I remember a poetry notebook. It was not grand. It was not expensive. It did not announce itself as something that would matter for years. But inside those pages, something opened. Poetry became more than an assignment. It became a doorway.',
      },
      {
        type: 'paragraph',
        text: 'At that age, a person is still learning how to name the world. Feelings arrive before vocabulary. Imagination runs ahead of explanation. A poem can meet a young reader in that tender space because it does not always demand a full report. Sometimes it simply offers an image, a rhythm, a line, and lets the reader step closer.',
      },
      {
        type: 'quote',
        text: 'Poetry became a doorway into interest, imagination, and self-expression.',
      },
      {
        type: 'heading',
        text: 'The First Doorway',
      },
      {
        type: 'paragraph',
        text: 'That seventh-grade notebook taught me that language could hold more than facts. It could hold wonder. It could hold humor, memory, sorrow, surprise, and the little flashes of recognition that make a reader think, I know that feeling too.',
      },
      {
        type: 'paragraph',
        text: 'I did not know then how long that thread would continue. I only knew that poetry had a way of catching my attention. It made ordinary things feel worth noticing. It gave shape to moments that might otherwise drift away.',
      },
      {
        type: 'paragraph',
        text: 'Years later, that early love of poetry followed me into teaching. I wanted students to experience literature not as something distant and dusty, but as something alive. A poem could become a conversation. A line could become a question. A surprising image could make even a reluctant reader pause.',
      },
      {
        type: 'heading',
        text: 'Watermelon Pickle and the Classroom',
      },
      {
        type: 'paragraph',
        text: 'One anthology stayed especially close to my heart: Reflections on a Gift of Watermelon Pickle... and other Modern Verse. Even the title felt like an invitation. It sounded curious, specific, memorable. It suggested that poetry could begin with something as ordinary as a gift, a taste, a memory, or a friend.',
      },
      {
        type: 'paragraph',
        text: 'I loved that book enough to buy twenty copies for students. That decision was not simply about having enough books in a classroom. It was about wanting students to hold the pages themselves, to turn them, to find a poem that might belong to them in some private way.',
      },
      {
        type: 'paragraph',
        text: 'There is a special joy in watching students discover that poetry does not have to be decoded like a locked box. It can be entered. It can be questioned. It can be felt first and understood more slowly. It can invite a student to say, “This reminds me of something,” and suddenly the lesson becomes personal.',
      },
      {
        type: 'heading',
        text: 'Teaching as Influence',
      },
      {
        type: 'paragraph',
        text: 'Teaching poetry is really teaching attention. It asks students to notice a word, a sound, a memory, a shift in tone, a feeling they may not have known how to explain. It gives them permission to bring their own lives to the page.',
      },
      {
        type: 'paragraph',
        text: 'That is where influence begins. Not in forcing a student to love what we love, but in offering something with enough care that they feel invited to explore it for themselves. A teacher can place a book in a student’s hands and never know which page will matter.',
      },
      {
        type: 'paragraph',
        text: 'The poems that stayed with me became part of the way I taught. They reminded me that literature is not only about analysis. It is about interest, imagination, self-expression, and the courage to let language carry what might otherwise remain unspoken.',
      },
      {
        type: 'heading',
        text: 'The Thread That Continued',
      },
      {
        type: 'paragraph',
        text: 'Looking back, I can see the thread more clearly now. A seventh-grade poetry notebook. A beloved anthology. Twenty copies for students. Classroom conversations. Memories awakened by poems years later. The thread kept weaving itself through teaching, family, literature, and reflection.',
      },
      {
        type: 'paragraph',
        text: 'That is one reason The Lyon Den matters to me. It is a place to gather the threads. It is a place to remember that the small things, a notebook, a poem, a classroom set of books, can become part of a larger story.',
      },
      {
        type: 'paragraph',
        text: 'Every story has something to teach us. Sometimes the lesson begins with a poem we met when we were young and returns when we are finally ready to understand what it gave us.',
      },
      {
        type: 'paragraph',
        text: 'Never Stop Learning.',
      },
    ],
  },
  {
   title: 'Clear Grammar, Clear Thoughts',
    subtitle: 'Why words, listening, and careful expression still matter.',
    author: 'Marguerite Lyon',
    category: 'Reflections',
    featured: false,
    date: 'July 5, 2026',
    readingTime: '6 minutes',
    path: '/blog/clear-grammar-clear-thoughts',
    slug: 'clear-grammar-clear-thoughts',
    seoTitle: 'Clear Grammar, Clear Thoughts | The Lyon Den',
    metaDescription:
      'Marguerite reflects on grammar, articulation, teaching, listening before judging, and how clear language helps us express wisdom with care.',
    primaryKeyword: 'clear grammar',
    secondaryKeywords: [
      'clear articulation',
      'clear thoughts',
      'language',
      'teaching',
      'communication',
      'listening',
      'storytelling',
      'lifelong learning',
      'wisdom',
    ],
    suggestedFeaturedImage: 'clear-grammar-clear-thoughts.png',
    socialExcerpt:
      'A Lyon Den reflection on grammar, articulation, listening, and why clear words can carry wisdom gently and well.',
    pullQuote:
      'Clear language is not about sounding impressive. It is about making room for understanding.',
    customCover: '',
    coverId: 'clear-grammar',
    excerpt:
      'A reflection on grammar, articulation, listening, and the way clear words help us understand one another with more patience and wisdom.',
    content: [
      {
        type: 'paragraph',
        text: 'There is a kind of clarity that begins long before a sentence reaches the page.',
      },
      {
        type: 'paragraph',
        text: 'It begins in the mind, where a thought is still taking shape. It begins in the pause before we speak, when we are deciding not only what we want to say, but how carefully we want to say it. It begins when we realize that words are not decorations. They are bridges.',
      },
      {
        type: 'paragraph',
        text: 'As a teacher, I spent many years helping students understand grammar, articulation, and expression. But the longer I taught, the more I understood that language was never only about rules. Rules mattered, of course. A clear sentence has a kind of architecture. A paragraph needs order. Punctuation can change meaning. A verb can give life to an idea. But beneath all of that was something deeper.',
      },
      {
        type: 'quote',
        text: 'Clear language is not about sounding impressive. It is about making room for understanding.',
      },
      {
        type: 'heading',
        text: 'Words Give Shape to Thought',
      },
      {
        type: 'paragraph',
        text: 'When students struggled to express themselves, I often saw that the problem was not a lack of intelligence. More often, it was that the thought had not yet found its structure. Language gave the thought a place to stand.',
      },
      {
        type: 'paragraph',
        text: 'That is why clear grammar can lead to clear thoughts. A sentence asks us to choose. What is the subject? What is the action? What belongs here, and what belongs somewhere else? What are we really trying to say?',
      },
      {
        type: 'paragraph',
        text: 'Those questions are not small. They are the same questions we ask in life. What matters? What is true? What is connected? What needs to be said with courage, and what needs to be said with gentleness?',
      },
      {
        type: 'paragraph',
        text: 'Language becomes a tool for expressing wisdom when we use it honestly. A clear thought does not have to be harsh. A carefully spoken sentence does not have to be cold. In fact, some of the kindest people I have known were people who chose their words with care because they understood their weight.',
      },
      {
        type: 'heading',
        text: 'Teaching Students to Communicate',
      },
      {
        type: 'paragraph',
        text: 'Teaching communication is really teaching confidence. When a student discovers that they can explain an idea, defend a belief, tell a story, or ask a thoughtful question, something changes. They stand a little taller. They begin to trust that their inner life can be shared.',
      },
      {
        type: 'paragraph',
        text: 'I loved watching that happen. A student who once hid behind silence might read a sentence aloud with new steadiness. Another might learn that revising a paragraph was not punishment, but discovery. Someone else might realize that the right word could make a memory vivid, an argument fair, or a feeling understandable.',
      },
      {
        type: 'paragraph',
        text: 'Words matter because people matter. If we want to be understood, we must learn to speak with some measure of order. If we want to understand others, we must learn to listen beyond the first sentence.',
      },
      {
        type: 'paragraph',
        text: 'A classroom teaches that lesson every day. One student may need structure, another encouragement, another time to discover that their voice is worth hearing.',
      },
      {
        type: 'heading',
        text: 'Listening Before Judging',
      },
      {
        type: 'paragraph',
        text: 'One of the most important lessons language teaches is patience. We do not always know what someone means the first time they speak. Sometimes a person is searching for words. Sometimes they are carrying a story we have not yet heard. Sometimes what sounds abrupt is really fear. Sometimes what seems confused is simply unfinished.',
      },
      {
        type: 'paragraph',
        text: 'Listening before judging is an act of respect. It says, I believe there may be more here than I can see at first glance. It says, I am willing to learn the context before I decide the meaning.',
      },
      {
        type: 'paragraph',
        text: 'Stories help us do that. A story gives context to a sentence. It shows us where a person has been, what they have carried, what they were taught, what they survived, and what they hope for. Without story, we are tempted to reduce people to a single moment. With story, we remember that every life has chapters.',
      },
      {
        type: 'heading',
        text: 'Lifelong Learning Through Language',
      },
      {
        type: 'paragraph',
        text: 'I still believe in good grammar. I still believe in articulation. I still believe young people deserve to be taught how to express themselves clearly, not because correctness is the highest goal, but because clarity can become freedom.',
      },
      {
        type: 'paragraph',
        text: 'A person who can communicate can ask for what they need. They can tell the truth. They can preserve a memory. They can write a letter of apology, a note of gratitude, a poem, a story, a lesson for someone who comes after them.',
      },
      {
        type: 'paragraph',
        text: 'And we never stop learning language. We keep learning how to say difficult things with kindness. We keep learning when to speak and when to wait. We keep learning that silence can be wise, but so can a well-chosen word.',
      },
      {
        type: 'paragraph',
        text: 'I think often about how many misunderstandings begin with words that were hurried, unfinished, or heard without patience. A sentence can be technically correct and still miss the heart of what needed to be said. That is why clear expression is not only a matter of grammar; it is also a matter of character. It asks us to slow down enough to be truthful, generous, and precise.',
      },
      {
        type: 'paragraph',
        text: 'Perhaps that is why language belongs so naturally in The Lyon Den. Every story has something to teach us, but we need words to carry the lesson. We need listening to receive it. We need humility to revise what we thought we knew.',
      },
      {
        type: 'paragraph',
        text: 'Clear grammar. Clear articulation. Clear thoughts. Not perfect thoughts. Not polished beyond recognition. Just honest thoughts, shaped with care and offered with respect.',
      },
      {
        type: 'paragraph',
        text: 'That is a lesson worth returning to, one sentence at a time.',
      },
      {
        type: 'paragraph',
        text: 'Never stop learning.',
      },
    ],
  },
  {
    title: 'Stephen Covey Wrote What My Mother Lived',
    subtitle: 'A reflection on values, influence, courage, and the calling to keep growing.',
    author: 'Marguerite Lyon',
    category: 'Books',
    featured: false,
    date: 'July 5, 2026',
    readingTime: '6 minutes',
    path: '/blog/stephen-covey-wrote-what-my-mother-lived',
    slug: 'stephen-covey-wrote-what-my-mother-lived',
    seoTitle: 'Stephen Covey Wrote What My Mother Lived | The Lyon Den',
    metaDescription:
      'Marguerite reflects on The 7 Habits of Highly Effective People, her mother’s lived values, teaching, influence, courage, and lifelong learning.',
    primaryKeyword: 'Stephen Covey reflection',
    secondaryKeywords: [
      'The 7 Habits of Highly Effective People',
      'mother lived values',
      'teaching as a calling',
      'lifelong learning',
      'influence',
      'family wisdom',
      'moral foundation',
      'ethical foundation',
      'personal growth',
    ],
    suggestedFeaturedImage: 'stephen-covey-wrote-what-my-mother-lived.png',
    socialExcerpt:
      'A reflective Lyon Den essay on Stephen Covey, a mother’s lived wisdom, the courage to grow, and the quiet legacy of influence.',
    pullQuote:
      'Stephen Covey wrote what my mother lived: character first, growth always, and influence carried quietly into the lives of others.',
    customCover: '',
    coverId: 'covey-mother',
    excerpt:
      'Marguerite reflects on Stephen Covey, her mother’s lived wisdom, teaching as a calling, and the quiet influence of a moral foundation.',
    content: [
      {
        type: 'paragraph',
        text: 'Some books explain what we have believed for years before we had language for it.',
      },
      {
        type: 'paragraph',
        text: 'When I think about Stephen Covey and The 7 Habits of Highly Effective People, I do not think first of charts, systems, or business advice. I think of my mother. I think of the values she lived so naturally that they did not feel like principles at the time. They felt like home.',
      },
      {
        type: 'paragraph',
        text: 'That is the curious gift of a good book. It can put words around something we already knew in our bones. It can help us recognize a pattern, honor a memory, and understand that wisdom is not always discovered in a classroom or a conference room. Sometimes it is lived at the kitchen table. Sometimes it is modeled in a difficult decision. Sometimes it is handed down through advice we did not fully appreciate until years later.',
      },
      {
        type: 'quote',
        text: 'Stephen Covey wrote what my mother lived: character first, growth always, and influence carried quietly into the lives of others.',
      },
      {
        type: 'heading',
        text: 'The Courage to Choose Growth',
      },
      {
        type: 'paragraph',
        text: 'One of the lessons I learned from my mother was that growth often asks something of us. It is rarely convenient. It may require us to leave something secure. It may ask us to trade comfort for calling.',
      },
      {
        type: 'paragraph',
        text: 'I think about the courage it took to leave a secure job and take a pay cut. On paper, that might not look like wisdom. It might look risky. It might look impractical. But life is not lived only on paper. There are moments when the soul knows it is being called toward something more meaningful, even if the numbers do not immediately applaud.',
      },
      {
        type: 'paragraph',
        text: 'That decision carried a lesson I have never forgotten: security is valuable, but purpose has its own kind of strength. My mother understood that a life cannot be measured only by what we keep. Sometimes it is measured by what we are willing to release.',
      },
      {
        type: 'paragraph',
        text: 'Even the red convertible became part of that lesson. Selling it was not just about a car. It was about priorities. It was about choosing the future over the symbol. It was about understanding that sacrifice is not always loss. Sometimes sacrifice is how love rearranges a life.',
      },
      {
        type: 'heading',
        text: 'Teaching as a Lifelong Calling',
      },
      {
        type: 'paragraph',
        text: 'Teaching was never merely a job in our family. It was a calling. It was a way of seeing people, especially young people, not only as they were but as they might become. My mother carried that spirit. She believed in growth. She believed in discipline. She believed in doing what was right even when no one was praising you for it.',
      },
      {
        type: 'paragraph',
        text: 'The best teachers do more than deliver information. They shape confidence. They model fairness. They make students feel that their effort matters. They plant seeds that may not bloom until years later.',
      },
      {
        type: 'paragraph',
        text: 'That is why the phrase “You never know where your influence lies” has stayed with me. It is one of the truest things I know. We may never see the full effect of a sentence spoken at the right time, a standard held with kindness, or advice given because we loved someone enough to tell the truth.',
      },
      {
        type: 'paragraph',
        text: 'Influence is often quiet. It does not always announce itself. It travels through memory, habit, conscience, and example. Long after a conversation ends, the lesson may remain.',
      },
      {
        type: 'heading',
        text: 'Advice as a Love Language',
      },
      {
        type: 'paragraph',
        text: 'In my family, advice was often a love language. It was not always wrapped in softness, but it came from care. It came from the desire to help us stand on a strong foundation. My parents gave me a moral and ethical grounding that has shaped every chapter of my life.',
      },
      {
        type: 'paragraph',
        text: 'They taught me that character matters when choices are easy and when choices are hard. They taught me that truth is not a decoration for convenient moments. They taught me that money, work, ambition, education, and relationships all need an inner compass.',
      },
      {
        type: 'paragraph',
        text: 'That is why Covey’s language about principles, habits, responsibility, and growth feels familiar to me. He organized ideas beautifully. He gave many people a framework. But when I read or remember those ideas, I also see my mother living them without needing to name them.',
      },
      {
        type: 'heading',
        text: 'A Foundation That Still Teaches',
      },
      {
        type: 'paragraph',
        text: 'The older I get, the more I understand that the values we inherit are not meant to sit untouched on a shelf. They are meant to be lived, tested, revised, deepened, and passed along. We honor our parents not by pretending they were perfect, but by recognizing the wisdom they gave us and allowing it to continue doing good.',
      },
      {
        type: 'paragraph',
        text: 'I can look back now and see how many of my own choices were shaped by that foundation. It was there when I entered a classroom. It was there when I had to make decisions about work, money, family, and responsibility. It was there when advice needed to become action. My parents gave me more than instructions; they gave me a way to measure a life.',
      },
      {
        type: 'paragraph',
        text: 'My mother’s life taught me that growth is a choice. Teaching is a calling. Influence is a responsibility. Advice can be love. And a strong moral foundation can carry a person through seasons they could not have predicted.',
      },
      {
        type: 'paragraph',
        text: 'This is part of The Lyon Den philosophy too. Every story has something to teach us. Every family has lessons tucked inside its memories. Every book becomes more meaningful when it meets a life that has already been learning.',
      },
      {
        type: 'paragraph',
        text: 'Stephen Covey wrote what my mother lived. And because she lived it, I am still learning from it.',
      },
      {
        type: 'paragraph',
        text: 'Never Stop Learning.',
      },
    ],
  },
  {
    title: 'Freedom Is Found in the Small Things',
    subtitle: 'A warm Fourth of July reflection on summer memories, family traditions, and the quiet freedoms that shape a life.',
    author: 'Marguerite Lyon',
    category: 'Reflections',
    featured: true,
    date: 'July 4, 2026',
    readingTime: '6 minutes',
    path: '/blog/freedom-is-found-in-the-small-things',
    slug: 'freedom-is-found-in-the-small-things',
    seoTitle: 'Freedom Is Found in the Small Things | Fourth of July Reflection',
    metaDescription:
      'A warm Fourth of July reflection from The Lyon Den on summer memories, family traditions, storytelling, gratitude, literature, wisdom, and legacy.',
    primaryKeyword: 'Fourth of July reflection',
    secondaryKeywords: [
      'summer memories',
      'storytelling',
      'family traditions',
      'gratitude',
      'Independence Day reflection',
      'legacy',
      'literature',
      'wisdom',
      'reflection',
    ],
    suggestedFeaturedImage: 'freedom-is-found-in-the-small-things.png',
    socialExcerpt:
      'A gentle Fourth of July reflection on porch swings, family gatherings, favorite books, and the quiet freedom to tell our stories.',
    pullQuote:
      'The freedom to tell our stories is one of the quietest freedoms, and one of the most lasting.',
    customCover: '',
    coverId: 'freedom-small-things',
    excerpt:
      'A Fourth of July reflection on porch swings, summer evenings, family gathered close, favorite books, and the quiet freedom to tell our stories.',
    content: [
      {
        type: 'paragraph',
        text: 'There is a certain kind of summer evening that seems to arrive already wrapped in memory.',
      },
      {
        type: 'paragraph',
        text: 'The air is warm but no longer heavy. The sky softens from blue to gold, then from gold to lavender. Somewhere in the neighborhood, a screen door closes with that familiar wooden sigh. A sprinkler ticks across a lawn. A flag moves gently in the dusk. On the porch, the swing keeps its slow rhythm, back and forth, back and forth, as if time itself has decided to rest for a while.',
      },
      {
        type: 'paragraph',
        text: 'Before the fireworks begin, there is this quieter hour. The table has been cleared, but the conversation has not ended. Someone is still laughing over a story that has been told before and will almost certainly be told again. A child runs across the yard with bare feet. A book lies open on a chair, facedown for just a moment, waiting for its reader to return.',
      },
      {
        type: 'paragraph',
        text: 'This is the Fourth of July I find myself thinking about most: not only the bright bursts in the sky, but the tender stillness before them.',
      },
      {
        type: 'heading',
        text: 'The Brightness and the Quiet',
      },
      {
        type: 'paragraph',
        text: 'Of course, fireworks have their own magic. They gather people outside. They make everyone look up. They turn the dark into a great theater of red, white, gold, and blue. For a few minutes, the whole sky seems to be speaking in light.',
      },
      {
        type: 'paragraph',
        text: 'There is joy in that kind of celebration. There is gratitude in standing together beneath a shared sky. There is something moving about hearing the first distant pop, watching the first spark climb, and waiting for the bloom of color that follows.',
      },
      {
        type: 'paragraph',
        text: 'But as the years pass, I notice that the memories that stay with us are often smaller than fireworks. They are quieter. They do not announce themselves. They slip into the heart while we are busy living them.',
      },
      {
        type: 'paragraph',
        text: 'A porch swing. Family gathered together. A summer evening. The sound of ice in a glass. The smell of cut grass. A favorite book carried outside because the light was too beautiful to waste. A conversation that begins with something ordinary and somehow becomes a sentence you remember for the rest of your life.',
      },
      {
        type: 'heading',
        text: 'The Porch Swing Kind of Freedom',
      },
      {
        type: 'paragraph',
        text: 'There is a freedom in having a place to sit and remember. There is a freedom in belonging to a table, a porch, a family story, a tradition that does not need to be perfect in order to be precious.',
      },
      {
        type: 'paragraph',
        text: 'A porch swing teaches patience. It does not hurry. It moves in a small arc, returning again and again, reminding us that not every meaningful journey is measured by distance. Sometimes we travel by reflection. Sometimes we go back in order to understand how far we have come.',
      },
      {
        type: 'paragraph',
        text: 'On a summer evening, when people gather close, stories seem to rise naturally. Someone remembers a trip. Someone mentions a recipe. Someone quotes a line from a song or a book. Someone tells a story about a grandparent, a first job, a hard season, a funny mistake, a moment of courage, a kindness that changed everything.',
      },
      {
        type: 'paragraph',
        text: 'That is when the past becomes present again. Not as a museum, but as a living thing. A legacy.',
      },
      {
        type: 'heading',
        text: 'Books Beside the Summer Light',
      },
      {
        type: 'paragraph',
        text: 'I have always believed books belong near windows, on bedside tables, in bags, on porches, and beside cups of tea or lemonade. A favorite book can become part of a season. You may remember where you were when you read it, what the weather was like, who handed it to you, or what was happening in your life when a certain sentence found you.',
      },
      {
        type: 'paragraph',
        text: 'Literature has a way of keeping company with memory. It gives us language for feelings we had not yet named. It helps us see our own lives with more tenderness. It reminds us that wisdom often arrives through story rather than instruction.',
      },
      {
        type: 'paragraph',
        text: 'That is one reason summer memories and favorite books seem to belong together. Both ask us to slow down. Both invite us to notice. Both hold more than they first appear to hold.',
      },
      {
        type: 'paragraph',
        text: 'A book read in July may forever carry the sound of cicadas. A poem may bring back the smell of chlorine from a swimming pool, the taste of watermelon, or the face of someone who once sat beside you in the sun. A story may remind you that your own story has meaning too.',
      },
      {
        type: 'heading',
        text: 'The Freedom to Tell Our Stories',
      },
      {
        type: 'paragraph',
        text: 'When we speak of freedom, we often think in large words, as we should. History, sacrifice, courage, country, responsibility. Those words matter. They carry weight.',
      },
      {
        type: 'paragraph',
        text: 'But there is also a quieter freedom, one that lives close to home. The freedom to remember. The freedom to gather. The freedom to read, to ask questions, to listen, to learn. The freedom to tell our stories and to hear the stories of others with respect.',
      },
      {
        type: 'quote',
        text: 'The freedom to tell our stories is one of the quietest freedoms, and one of the most lasting.',
      },
      {
        type: 'paragraph',
        text: 'A family tradition does not have to be grand to become sacred. A Fourth of July meal, a chair pulled into the shade, a walk at dusk, a familiar voice calling everyone outside for fireworks: these small things can become the chapters we return to again and again.',
      },
      {
        type: 'paragraph',
        text: 'This is the heart of The Lyon Den. Every story has something to teach us. Not only the dramatic stories. Not only the polished stories. Not only the stories that arrive with music and a spotlight. The small stories teach us too.',
      },
      {
        type: 'paragraph',
        text: 'They teach gratitude. They teach perspective. They teach us what we love. They teach us what endured. They teach us that ordinary moments are often ordinary only while they are happening.',
      },
      {
        type: 'heading',
        text: 'A Gentle Independence Day Reflection',
      },
      {
        type: 'paragraph',
        text: 'This Independence Day reflection is not about noise or argument. It is about gratitude. It is about the wisdom hidden in summer memories, the comfort of family traditions, and the legacy we leave when we share what life has taught us.',
      },
      {
        type: 'paragraph',
        text: 'Perhaps tonight, before the fireworks begin, we might pause for the smaller lights. The porch lamp. The fireflies. The candle on the table. The page of a favorite book. The face of someone we love turned toward us in conversation.',
      },
      {
        type: 'paragraph',
        text: 'Those lights may not fill the sky, but they help us find our way.',
      },
      {
        type: 'paragraph',
        text: 'And maybe that is part of what it means to never stop learning: to keep discovering that wisdom is not always far away. Sometimes it is right beside us, swinging gently on the porch, waiting for us to sit down and listen.',
      },
      {
        type: 'paragraph',
        text: 'What simple Fourth of July memory still lives in your heart?',
      },
    ],
  },
  {
    title: 'The Summer That Never Left Me',
    subtitle: 'How one poem reminded me that memories never really leave us.',
    author: 'Marguerite Lyon',
    category: 'Stories',
    featured: false,
    readingTime: '5 minutes',
    path: '/blog/the-summer-that-never-left-me',
    customCover: '',
    coverId: 'summer-memory',
    excerpt:
      'A reflective story about poetry, memory, summer afternoons, teaching, family, and the small objects that become chapters of a life.',
    paragraphs: [
      'Sometimes a poem doesn’t simply give us words.',
      'Sometimes it quietly opens a door.',
      'Recently I reread a favorite poem that immediately carried me back to summers I thought I had almost forgotten.',
      'Family afternoons at the swimming pool.',
      'The sound of laughter.',
      'Friends.',
      'Students.',
      'The simple joy of sharing books and discovering new stories together.',
      'It reminded me that memories have a remarkable way of waiting patiently until something awakens them.',
      'A scent.',
      'A photograph.',
      'A favorite book.',
      'A poem.',
      'One of the things I loved most about teaching was watching students discover that literature isn’t simply something we read.',
      'It’s something we experience.',
      'Every reader brings a different life to every page.',
      'That’s why one poem can mean something entirely different to each person who encounters it.',
      'Perhaps that’s the true gift of literature.',
      'It reminds us that our own stories matter.',
      'Some of my happiest memories involve water.',
      'Summers with family.',
      'Later, watching my parents enjoy the swimming pool they worked so hard to build.',
      'Moments that seemed ordinary then but have become priceless now.',
      'One small object can hold an entire lifetime of memories.',
      'A favorite kitchen utensil.',
      'A treasured ring from a parent.',
      'A book whose pages have become worn through years of reading.',
      'These things become more than objects.',
      'They become chapters.',
      'The older I become, the more I realize that memories don’t fade because they’re unimportant.',
      'The important ones simply become part of who we are.',
      'Perhaps every story has something to teach us.',
      'And perhaps every memory is quietly waiting for the right moment to bloom again.',
      'Welcome to The Lyon Den.',
      'Never stop learning.',
    ],
  },
  {
    title: 'Every Story Has Something to Teach Us',
    subtitle: 'Why I Created The Lyon Den',
    author: 'Marguerite Lyon',
    category: 'Stories',
    featured: false,
    readingTime: '4 minutes',
    path: '/blog/every-story-has-something-to-teach-us',
    customCover: '',
    coverId: 'every-story-blog',
    excerpt:
      'The first official written chapter of The Lyon Den, welcoming readers into stories, lessons, books, and lifelong learning.',
    paragraphs: [
      'Throughout my life, I’ve been fortunate to learn from wonderful teachers, remarkable books, family, friendships, mistakes, and experiences I never could have predicted.',
      'Eventually, I realized something simple and important:',
      'Every story has something to teach us.',
      'Some lessons come through joy. Some come through heartbreak. Some come quietly through books, conversations, memories, music, nature, or ordinary days that become meaningful only after time has passed.',
      'The Lyon Den was created as a place to preserve those lessons and share them with anyone who might need them.',
      'Here, we explore truth, love, money, literature, poetry, personal growth, and lifelong learning. Not because we have all the answers, but because staying curious keeps us growing.',
      'My hope is that The Lyon Den becomes a warm place for reflection — a place where stories become lessons, books become conversations, and wisdom is shared one chapter at a time.',
      'Every life holds chapters worth remembering.',
      'Every experience can become a seed of wisdom.',
      'And every story, if shared with love, has the power to encourage someone else.',
      'Welcome to The Lyon Den.',
      'Never stop learning.',
    ],
  },
]

const featuredBlogPost = blogPosts.find((post) => post.featured) || blogPosts[0]
const firstBlogPost = blogPosts.find((post) => post.path === '/blog/every-story-has-something-to-teach-us')

function getPostByPath(path) {
  return blogPosts.find((post) => post.path === path)
}

function getCollectionBySlug(slug) {
  return collectionDefinitions.find((collection) => collection.slug === slug)
}

function getCollectionPath(slug) {
  return `/collections/${slug}`
}

function getPostCollections(post) {
  if (post.collectionSlugs?.length) return post.collectionSlugs

  const fallbackCollections = {
    '/blog/clear-grammar-clear-thoughts': ['field-notes', 'teaching-wisdom', 'conversations'],
    '/blog/stephen-covey-wrote-what-my-mother-lived': ['books-that-changed-me', 'legacy-lessons', 'teaching-wisdom'],
    '/blog/freedom-is-found-in-the-small-things': ['summer-memories', 'legacy-lessons', 'conversations'],
    '/blog/the-summer-that-never-left-me': ['summer-memories', 'poetry', 'teaching-wisdom'],
    '/blog/every-story-has-something-to-teach-us': ['field-notes', 'legacy-lessons', 'illustrated-pages'],
  }

  return fallbackCollections[post.path] || ['field-notes']
}

function getPostTags(post) {
  return [
    ...(post.tags || []),
    post.category,
    post.primaryKeyword,
    ...(post.secondaryKeywords || []),
  ].filter(Boolean)
}

function getPostSlug(post) {
  return post.slug || post.path.split('/').filter(Boolean).pop()
}

function getPostOgImage(post) {
  return post.ogImage || '/assets/watermark-logo.png'
}

function getArchiveEntries() {
  const journalEntries = blogPosts.map((post) => ({
    type: 'Journal',
    title: post.title,
    description: post.excerpt || post.subtitle,
    date: post.date || post.publishedAt || '',
    path: post.path,
    coverId: post.coverId,
    category: post.category,
    collectionSlugs: getPostCollections(post),
  }))

  const chapterEntries = curatedChapters.map((chapter) => ({
    type: 'Episode',
    title: chapter.title,
    description: chapter.description,
    date: chapter.publishedAt,
    path: chapter.url,
    external: true,
    coverId: chapter.coverId,
    category: 'Episode',
    collectionSlugs: chapter.collectionSlugs || ['illustrated-pages'],
  }))

  const poetryEntries = [
    {
      type: 'Poetry',
      title: poetryFeature.pageTitle,
      description: poetryFeature.note,
      date: '',
      path: '/poetry',
      coverId: 'poems-stayed',
      category: 'Poetry',
      collectionSlugs: ['poetry', 'summer-memories'],
    },
  ]

  return [...journalEntries, ...chapterEntries, ...poetryEntries]
}

function getCollectionEntries(slug) {
  return getArchiveEntries().filter((entry) => entry.collectionSlugs.includes(slug))
}

function getRelatedPosts(post, limit = 3) {
  const collections = new Set(getPostCollections(post))
  const tags = new Set(getPostTags(post).map((tag) => tag.toLowerCase()))

  const scoredPosts = blogPosts
    .filter((candidate) => candidate.path !== post.path)
    .map((candidate) => {
      const candidateCollections = getPostCollections(candidate)
      const candidateTags = getPostTags(candidate).map((tag) => tag.toLowerCase())
      const collectionScore = candidateCollections.filter((slug) => collections.has(slug)).length * 4
      const tagScore = candidateTags.filter((tag) => tags.has(tag)).length

      return {
        post: candidate,
        score: collectionScore + tagScore,
      }
    })
    .sort((a, b) => b.score - a.score)

  const related = scoredPosts.filter((entry) => entry.score > 0).map((entry) => entry.post)
  const fallback = blogPosts.filter((candidate) => candidate.path !== post.path)

  return [...related, ...fallback.filter((candidate) => !related.includes(candidate))].slice(0, limit)
}

function setMetaContent(selector, attributes, content) {
  let meta = document.querySelector(selector)

  if (!meta) {
    meta = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => {
      meta.setAttribute(key, value)
    })
    document.head.appendChild(meta)
  }

  const previousContent = meta.getAttribute('content')
  meta.setAttribute('content', content)

  return () => {
    if (previousContent === null) {
      meta.removeAttribute('content')
    } else {
      meta.setAttribute('content', previousContent)
    }
  }
}

function getPostContent(post) {
  if (post.content) return post.content

  return post.paragraphs.map((paragraph) => ({
    type:
      paragraph === 'Every story has something to teach us.' ||
      paragraph === 'Sometimes a poem doesn’t simply give us words.'
        ? 'quote'
        : 'paragraph',
    text: paragraph,
  }))
}

function getCover(coverId) {
  return coverLibrary[coverId] || coverLibrary['every-story-blog']
}

function getCuratedChapterArt(title) {
  const normalizedTitle = title.trim().toLowerCase()
  return curatedChapters.find((chapter) => chapter.title.trim().toLowerCase() === normalizedTitle)
}

function getArtworkDisplayMode(item) {
  if (item.displayMode === 'cover' || item.displayMode === 'contain') return item.displayMode

  if (item.imageWidth && item.imageHeight) {
    const ratio = item.imageWidth / item.imageHeight
    return ratio > 1.8 || ratio < 0.75 ? 'contain' : 'cover'
  }

  if (item.customCover || item.coverId) return 'contain'

  return 'cover'
}

function getFallbackTitleLines(title = 'The Lyon Den') {
  const words = title.split(/\s+/).filter(Boolean)
  if (words.length <= 2) return [title.toUpperCase()]

  const midpoint = Math.ceil(words.length / 2)
  return [
    words.slice(0, midpoint).join(' ').toUpperCase(),
    words.slice(midpoint).join(' ').toUpperCase(),
  ]
}

function getEditorialCover(item = {}, fallbackCoverId = 'every-story-blog') {
  const baseCover = item.coverId ? getCover(item.coverId) : getCover(fallbackCoverId)
  const category = item.category || baseCover.category || (item.source === 'youtube' ? 'Episode' : 'Journal')

  if (item.coverId) {
    return {
      ...baseCover,
      category,
      title: item.title || baseCover.titleLines.join(' '),
    }
  }

  return {
    ...baseCover,
    title: item.title || baseCover.titleLines.join(' '),
    titleLines: getFallbackTitleLines(item.title || baseCover.titleLines.join(' ')),
    subtitle: item.subtitle || '',
    category,
    icon: item.source === 'youtube' ? 'lion' : baseCover.icon,
    variant: item.source === 'youtube' ? 'episode' : baseCover.variant,
    alt: `Editorial monogram card for ${item.title || baseCover.titleLines.join(' ')}`,
  }
}

const youtubeVideosUrl = `${youtubeChannelUrl}/videos`

const curatedChapters = [
  {
    title: 'Broadway Dreams & The Shower Concert',
    publishedAt: 'June 2026',
    description: 'A warm chapter about private songs, unexpected stages, and the dreams that keep humming.',
    customCover: '',
    coverId: 'broadway-dreams',
    displayMode: 'contain',
    url: youtubeChannelUrl,
    collectionSlugs: ['illustrated-pages', 'conversations'],
  },
  {
    title: 'Every Story Has Something to Teach Us',
    publishedAt: 'June 2026',
    description: 'A first welcome to The Lyon Den and the stories, books, and lessons that shape this literary home.',
    customCover: '',
    coverId: 'every-story-video',
    displayMode: 'contain',
    url: youtubeChannelUrl,
    collectionSlugs: ['illustrated-pages', 'field-notes', 'legacy-lessons'],
  },
  {
    title: 'The Summer That Never Left Me',
    publishedAt: 'June 2026',
    description: 'A nostalgic reflection on poetry, water, memory, and the summers that keep returning.',
    customCover: '',
    coverId: 'summer-memory',
    displayMode: 'contain',
    url: youtubeChannelUrl,
    collectionSlugs: ['summer-memories', 'poetry', 'illustrated-pages'],
  },
  {
    title: 'Love Changes',
    publishedAt: 'June 2026',
    description: 'A reflective chapter on connection, change, courage, and the lessons love leaves behind.',
    customCover: '',
    coverId: 'love-changes',
    displayMode: 'contain',
    url: youtubeChannelUrl,
    collectionSlugs: ['conversations', 'legacy-lessons'],
  },
  {
    title: 'One Bite at a Time',
    publishedAt: 'June 2026',
    description: 'A gentle lesson about taking the long road slowly, faithfully, and one small step at a time.',
    customCover: '',
    coverId: 'one-bite-at-a-time',
    displayMode: 'contain',
    url: youtubeChannelUrl,
    collectionSlugs: ['field-notes', 'legacy-lessons'],
  },
  {
    title: 'The Book That Changed My Life',
    publishedAt: 'June 2026',
    description: 'A bookshelf chapter about the pages that change us and the sentences we carry forward.',
    customCover: '',
    coverId: 'book-that-changed-me',
    displayMode: 'contain',
    url: youtubeChannelUrl,
    collectionSlugs: ['books-that-changed-me', 'illustrated-pages'],
  },
  {
    title: 'The Seed Garden',
    publishedAt: 'June 2026',
    description: 'A look inside the place where ideas are planted before they bloom into stories.',
    customCover: '',
    coverId: 'seed-garden',
    displayMode: 'contain',
    url: youtubeChannelUrl,
    collectionSlugs: ['field-notes', 'illustrated-pages'],
  },
]

const bookshelfItems = [
  {
    title: 'Literature',
    text: 'Books that open a window, ask better questions, and leave a sentence glowing long after the page is closed.',
  },
  {
    title: 'Memoir',
    text: 'Remembered chapters, family stories, turning points, and the wisdom that comes from looking back with tenderness.',
  },
  {
    title: 'Life Lessons',
    text: 'Practical reflections on truth, love, money, courage, and the choices that help a life become more whole.',
  },
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
  new: 'Newly Planted',
  used: 'Harvested',
  planned: 'Growing',
  published: 'Bloomed',
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

  return 'This private garden is currently reserved for Marguerite.'
}

function getLoginErrorMessage(error) {
  const message = error?.message || 'Supabase did not provide an error message.'
  const status = error?.status || error?.statusCode
  const isRateLimited =
    status === 429 ||
    /rate limit|too many|security purposes|wait|after/i.test(message)

  if (isRateLimited) {
    return 'A garden gate link was already sent. Please wait a minute, then use the newest email.'
  }

  if (/failed to fetch|networkerror|load failed/i.test(message)) {
    return `The site could not reach Supabase (${supabaseConfig.host || 'missing Supabase URL'}). In Vercel, VITE_SUPABASE_URL should be https://eyirlvsqrusyngrvswsw.supabase.co. Browser message: ${message}`
  }

  return message
}

function getReadableError(error, fallback = 'Something went wrong.') {
  return error?.message || error?.error_description || fallback
}

function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function truncateText(value = '', maxLength = 160) {
  const cleanValue = stripHtml(value)

  if (cleanValue.length <= maxLength) return cleanValue

  return `${cleanValue.slice(0, maxLength).trim().replace(/[.,;:!?-]+$/, '')}...`
}

function formatPublishedDate(value) {
  if (!value) return 'Latest Chapter'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function parseYouTubeFeed(xmlText) {
  const document = new DOMParser().parseFromString(xmlText, 'application/xml')
  if (document.querySelector('parsererror')) return []

  const entries = Array.from(document.querySelectorAll('entry'))

  return entries.slice(0, 8).map((entry) => {
    const title = entry.querySelector('title')?.textContent?.trim() || 'The Lyon Den Chapter'
    const curatedArt = getCuratedChapterArt(title)
    const published = entry.querySelector('published')?.textContent?.trim()
    const link = entry.querySelector('link')?.getAttribute('href') || youtubeChannelUrl
    const thumbnail =
      entry.querySelector('thumbnail')?.getAttribute('url') ||
      entry.querySelector('media\\:thumbnail')?.getAttribute('url') ||
      ''
    const description =
      entry.querySelector('description')?.textContent ||
      entry.querySelector('media\\:description')?.textContent ||
      ''

    return {
      title,
      publishedAt: formatPublishedDate(published),
      description: truncateText(description) || 'A new story, reflection, or life lesson from The Lyon Den.',
      customCover: curatedArt?.customCover || '',
      coverId: curatedArt?.coverId || '',
      displayMode: curatedArt?.displayMode || (curatedArt?.customCover || curatedArt?.coverId ? 'contain' : 'cover'),
      thumbnail,
      url: link,
      source: 'youtube',
    }
  })
}

function EditorialCover({ cover, className = '' }) {
  const title = cover.titleLines.join(' ')

  if (cover.image) {
    return (
      <img
        className={`editorial-cover-image ${className}`.trim()}
        src={cover.image}
        alt={cover.alt}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className={`editorial-cover cover-${cover.theme} ${className}`.trim()}
      role="img"
      aria-label={cover.alt}
    >
      <div className="cover-frame" aria-hidden="true">
        <div className="cover-topline">
          <span className="cover-seal">TLD</span>
          <span>The Lyon Den</span>
        </div>
        <div className="cover-illustration">
          <span className="cover-shape cover-shape-one" />
          <span className="cover-shape cover-shape-two" />
          <span className="cover-shape cover-shape-three" />
        </div>
        <h3 aria-hidden="true">
          {cover.titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h3>
        {cover.subtitle && <p>{cover.subtitle}</p>}
        <div className="cover-footer">
          <span>{cover.motif}</span>
          <strong>{title}</strong>
        </div>
      </div>
    </div>
  )
}

function LyonDenIcon({ name = 'lion' }) {
  const commonProps = {
    viewBox: '0 0 64 64',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    focusable: 'false',
  }

  if (name === 'lioness') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        <path d="M16 42c4-15 14-25 31-27" />
        <path d="M24 50c-2-10 0-18 7-24 5-5 12-7 21-7-3 6-7 10-13 12" />
        <path d="M40 31c7 1 11 5 13 11-8 2-15 1-21-4" />
        <path d="M27 47c7 2 15 1 23-4" />
        <path d="M33 26c-2 4-3 8-3 13" />
      </svg>
    )
  }

  if (name === 'cub') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        <path d="M18 43c3-11 10-18 22-21" />
        <path d="M25 50c-2-8 0-15 6-20 4-4 10-6 17-6-2 5-5 8-10 10" />
        <path d="M39 34c5 1 8 4 10 9-6 1-11 0-16-3" />
        <path d="M19 35c-3-2-5-5-5-9 5 0 9 2 12 6" />
        <path d="M30 47c5 1 11 0 17-3" />
      </svg>
    )
  }

  if (name === 'openBook') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        <path d="M10 18c7-3 15-2 22 3v29c-7-5-15-6-22-3V18Z" />
        <path d="M54 18c-7-3-15-2-22 3v29c7-5 15-6 22-3V18Z" />
        <path d="M32 21v29M16 27c4-1 8 0 12 2M16 35c4-1 8 0 12 2M48 27c-4-1-8 0-12 2M48 35c-4-1-8 0-12 2" />
      </svg>
    )
  }

  if (name === 'lantern') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        <path d="M25 12h14M28 12c0 5-5 7-5 13v21c0 4 4 7 9 7s9-3 9-7V25c0-6-5-8-5-13" />
        <path d="M23 26h18M23 45h18M32 25c-5 7-5 14 0 20 5-6 5-13 0-20Z" />
        <path d="M18 53h28M32 8v4" />
      </svg>
    )
  }

  if (name === 'journal') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        <path d="M18 12h25c4 0 7 3 7 7v33H23c-5 0-9-4-9-9V16c0-2 2-4 4-4Z" />
        <path d="M23 12v40M30 22h12M30 30h12M30 38h9" />
        <path d="M18 52c2-3 5-4 10-4h22" />
      </svg>
    )
  }

  if (name === 'creek') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        <path d="M8 40c9-8 16-8 24 0s15 8 24 0" />
        <path d="M10 29c8-6 15-6 22 0s14 6 22 0" />
        <path d="M17 18c5-4 10-4 15 0s10 4 15 0" />
        <path d="M20 49h24" />
      </svg>
    )
  }

  return (
    <svg className="lyon-icon" {...commonProps}>
      <path d="M14 45c2-14 9-25 22-32" />
      <path d="M21 53c-2-12 1-22 9-30 6-6 15-9 27-9-3 8-8 14-16 18" />
      <path d="M43 32c8 1 13 6 16 14-10 2-18 0-25-6" />
      <path d="M27 19c-7-2-13-1-18 4 6 1 11 4 15 8" />
      <path d="M28 50c8 2 17 0 27-5" />
      <path d="M33 24c-3 6-4 12-3 18" />
    </svg>
  )
}

function EditorialCard({ cover, className = '' }) {
  const title = cover.title || cover.titleLines.join(' ')
  const variant = cover.variant || cover.theme || 'blog'
  const icon = cover.icon || 'lion'

  return (
    <div
      className={`editorial-card editorial-card-${variant} ${className}`.trim()}
      role="img"
      aria-label={cover.alt || `Editorial card for ${title}`}
    >
      <div className="editorial-card-inner" aria-hidden="true">
        <div className="editorial-card-topline">
          <span>{cover.category || 'The Lyon Den'}</span>
          <strong>TLD</strong>
        </div>
        <div className="editorial-seal">
          <LyonDenIcon name={icon} />
        </div>
        <div className="editorial-card-title">
          {cover.titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        {cover.subtitle && <p>{cover.subtitle}</p>}
        <small>{cover.motif || 'Truth • Love • Money'}</small>
      </div>
    </div>
  )
}

function ChapterVisual({ item, className = '' }) {
  return <EditorialCard cover={getEditorialCover(item)} className={className} />
}

function BookCover({ cover, className = '' }) {
  return <EditorialCard cover={cover} className={className} />
}

function ChapterCardVisual({ item }) {
  return (
    <div className="chapter-artwork chapter-artwork-imprint">
      <EditorialCard cover={getEditorialCover(item, 'broadway-dreams')} className="chapter-book-cover" />
    </div>
  )
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

function YouTubeIcon() {
  return <span className="youtube-icon" aria-hidden="true">▶</span>
}

function useChapterVisibleCount() {
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 1
    if (window.innerWidth >= 1120) return 3
    if (window.innerWidth >= 681) return 2
    return 1
  }

  const [visibleCount, setVisibleCount] = useState(getVisibleCount)

  useEffect(() => {
    function handleResize() {
      setVisibleCount(getVisibleCount())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return visibleCount
}

function useLatestChapters() {
  const [chapters, setChapters] = useState(curatedChapters)

  useEffect(() => {
    if (!youtubeFeedUrl) return undefined

    const controller = new AbortController()

    async function loadYouTubeChapters() {
      try {
        const response = await fetch(youtubeFeedUrl, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`YouTube feed returned ${response.status}`)
        }

        const xmlText = await response.text()
        const youtubeChapters = parseYouTubeFeed(xmlText)

        if (youtubeChapters.length > 0) {
          setChapters(youtubeChapters)
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          setChapters(curatedChapters)
        }
      }
    }

    loadYouTubeChapters()

    return () => controller.abort()
  }, [])

  return chapters
}

function LatestChaptersCarousel({ chapters }) {
  const visibleCount = useChapterVisibleCount()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef(null)
  const maxIndex = Math.max(chapters.length - visibleCount, 0)
  const safeIndex = Math.min(activeIndex, maxIndex)

  useEffect(() => {
    setActiveIndex((currentIndex) => Math.min(currentIndex, maxIndex))
  }, [maxIndex])

  useEffect(() => {
    const carousel = carouselRef.current
    const targetCard = carousel?.querySelectorAll('.chapter-card')[safeIndex]

    if (!carousel || !targetCard) return

    carousel.scrollTo({
      left: targetCard.offsetLeft,
      behavior: 'smooth',
    })
  }, [safeIndex, visibleCount])

  useEffect(() => {
    if (isPaused || maxIndex === 0) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex >= maxIndex ? 0 : currentIndex + 1))
    }, 6000)

    return () => window.clearInterval(interval)
  }, [isPaused, maxIndex])

  function showPrevious() {
    setActiveIndex((currentIndex) => (currentIndex <= 0 ? maxIndex : currentIndex - 1))
  }

  function showNext() {
    setActiveIndex((currentIndex) => (currentIndex >= maxIndex ? 0 : currentIndex + 1))
  }

  return (
    <section
      className="latest-chapters section-shell"
      id="latest-chapters"
      aria-labelledby="latest-chapters-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="latest-chapters-heading">
        <div>
          <p className="eyebrow">Latest Chapters</p>
          <h2 id="latest-chapters-title">Latest Chapters</h2>
          <p>Stories, reflections, and life lessons from The Lyon Den.</p>
        </div>
        <a className="button button-secondary" href={youtubeVideosUrl} {...youtubeLinkProps}>
          View All Chapters
        </a>
      </div>

      <div
        className="chapter-carousel"
        aria-roledescription="carousel"
        aria-label="Latest Lyon Den YouTube chapters"
        ref={carouselRef}
      >
        <div className="chapter-track">
          {chapters.map((chapter, index) => (
            <a
              className="chapter-card"
              href={chapter.url}
              key={`${chapter.title}-${chapter.url}`}
              aria-label={`Watch ${chapter.title} on YouTube`}
              {...youtubeLinkProps}
            >
              <ChapterCardVisual item={chapter} />
              <div className="chapter-card-body">
                <p className="chapter-date">{chapter.publishedAt}</p>
                <h3 className={chapter.title.length > 32 ? 'chapter-title chapter-title-long' : 'chapter-title'}>
                  {chapter.title}
                </h3>
                {chapter.description && <p className="chapter-description">{chapter.description}</p>}
                <span className="button button-primary chapter-watch-button">Watch on YouTube</span>
              </div>
              <span className="sr-only">
                Chapter {index + 1} of {chapters.length}
              </span>
            </a>
          ))}
        </div>
      </div>

      <p className="youtube-note chapter-note">New chapters are published regularly.</p>

      <div className="chapter-controls" aria-label="Latest Chapters controls">
        <button type="button" onClick={showPrevious} aria-label="Show previous chapters">
          ←
        </button>
        <div className="chapter-dots" aria-hidden="true">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <span className={index === safeIndex ? 'active' : ''} key={index} />
          ))}
        </div>
        <button type="button" onClick={showNext} aria-label="Show next chapters">
          →
        </button>
      </div>
    </section>
  )
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

  const selectedPost = getPostByPath(normalizedPath)

  if (normalizedPath === '/blog') {
    return <JournalPage />
  }

  if (selectedPost) {
    return <BlogPostPage post={selectedPost} />
  }

  if (normalizedPath.startsWith('/collections/')) {
    const collectionSlug = normalizedPath.replace('/collections/', '')
    const collection = getCollectionBySlug(collectionSlug)
    return collection ? <CollectionPage collection={collection} /> : <JournalPage />
  }

  if (normalizedPath === '/poetry') {
    return <PoetryPage />
  }

  return <HomePage />
}

function HomePage() {
  const [submitted, setSubmitted] = useState(false)
  const chapters = useLatestChapters()
  const latestChapter = chapters[0] || curatedChapters[0]

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
        <a
          className="mobile-youtube-link"
          href={youtubeChannelUrl}
          aria-label="Open The Lyon Den YouTube channel"
          {...youtubeLinkProps}
        >
          <YouTubeIcon />
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#featured">Featured</a>
          <a href="#latest-chapters">Latest Chapters</a>
          <a href="#collections">Collections</a>
          <a href="#bookshelf">Books</a>
          <a href="/poetry">Poetry</a>
          <a href="#about">About</a>
          <a href="/blog">Journal</a>
          <a className="youtube-nav-link" href={youtubeChannelUrl} {...youtubeLinkProps}>
            <YouTubeIcon />
          </a>
          <a className="nav-cta" href={youtubeChannelUrl} {...youtubeLinkProps}>Subscribe</a>
        </nav>
      </header>

      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="script-line">A modern literary home for</p>
          <h1 id="hero-title">The Lyon Den</h1>
          <p className="truth-line">Truth • Love • Money</p>
          <p className="tagline">Never Stop Learning</p>
          <p className="hero-intro">
            Read reflective essays, discover meaningful books, watch gentle video chapters,
            and linger with poetry, memoir, and life lessons for the heart.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href={featuredBlogPost.path}>
              Read Featured Article
            </a>
            <a className="button button-secondary" href={youtubeChannelUrl} {...youtubeLinkProps}>
              Watch on YouTube
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

      <LatestChaptersCarousel chapters={chapters} />

      <section className="collections section-shell" id="collections" aria-labelledby="collections-title">
        <div className="section-heading">
          <p className="eyebrow">Featured Collections</p>
          <h2 id="collections-title">A literary archive of stories, notes, poems, and lessons.</h2>
          <p>
            Browse The Lyon Den by memory, subject, and enduring question. Each collection gathers
            Journal entries, episodes, poetry, illustrated pages, and field notes into a quieter shelf.
          </p>
        </div>
        <div className="collection-grid">
          {collectionDefinitions.map((collection) => {
            const entryCount = getCollectionEntries(collection.slug).length

            return (
              <a className="collection-card" href={getCollectionPath(collection.slug)} key={collection.slug}>
                <div className="collection-seal" aria-hidden="true">
                  <LyonDenIcon name={collection.icon} />
                </div>
                <p className="eyebrow">{entryCount} {entryCount === 1 ? 'Entry' : 'Entries'}</p>
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <span className="text-link">Open Collection</span>
              </a>
            )
          })}
        </div>
      </section>

      <section className="publication-lead section-shell" id="featured" aria-labelledby="publication-title">
        <article className="featured-article-card">
          <ChapterVisual item={featuredBlogPost} className="feature-cover" />
          <div className="featured-article-copy">
            <p className="eyebrow">Featured Article</p>
            <h2 id="publication-title">{featuredBlogPost.title}</h2>
            <p className="blog-subtitle">{featuredBlogPost.subtitle}</p>
            <p>
              {featuredBlogPost.excerpt}
            </p>
            <a className="button button-secondary" href={featuredBlogPost.path}>
              Read the Article
            </a>
          </div>
        </article>

        <a
          className="latest-chapter-card"
          href={latestChapter.url}
          aria-label={`Watch ${latestChapter.title} on YouTube`}
          {...youtubeLinkProps}
        >
          <ChapterVisual item={latestChapter} className="latest-chapter-cover" />
          <div className="latest-chapter-copy">
            <p className="eyebrow">Latest Chapter</p>
            <h2>{latestChapter.title}</h2>
            <p>{latestChapter.description}</p>
            <span className="button button-primary">Watch on YouTube</span>
          </div>
        </a>
      </section>

      <section className="bookshelf section-shell" id="bookshelf" aria-labelledby="bookshelf-title">
        <div className="section-heading">
          <p className="eyebrow">Bookshelf</p>
          <h2 id="bookshelf-title">Books, memoirs, and lessons worth keeping close.</h2>
          <p>
            The Lyon Den reads life through books and books through life: favorite passages,
            remembered chapters, and practical wisdom for ordinary days.
          </p>
        </div>
        <div className="bookshelf-grid">
          {bookshelfItems.map((item) => (
            <article className="book-card" key={item.title}>
              <span aria-hidden="true">Chapter</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="poetry section-shell" id="poetry" aria-labelledby="poetry-title">
        <article className="poetry-feature-card">
          <div>
            <p className="eyebrow">Poetry</p>
            <h2 id="poetry-title">{poetryFeature.pageTitle}</h2>
            <p>
              A new reflection series about poems, memories, teaching, and the lines that
              stay with us long after the book is closed.
            </p>
            <a className="button button-secondary" href="/poetry">
              Read the Reflection
            </a>
          </div>
          <div className="poetry-card-note" aria-label="Featured poem">
            <ChapterVisual
              item={{ title: poetryFeature.pageTitle, coverId: 'poems-stayed', category: 'Poetry' }}
              className="poetry-imprint-card"
            />
            <span>Featured Poem</span>
            <strong>{poetryFeature.poemTitle}</strong>
            <em>{poetryFeature.author}</em>
          </div>
        </article>
      </section>

      <section className="latest-stories section-shell" id="latest-stories" aria-labelledby="latest-stories-title">
        <div className="section-heading">
          <p className="eyebrow">Latest Stories</p>
          <h2 id="latest-stories-title">Truth, love, and money through a story-shaped lens.</h2>
          <p>
            Essays, video chapters, and reflections gather here as the publication grows.
          </p>
        </div>
        <div className="story-grid">
          <article className="story-card story-card-featured">
            <ChapterVisual item={featuredBlogPost} className="story-cover" />
            <p className="eyebrow">Latest Journal</p>
            <h3>{featuredBlogPost.title}</h3>
            <p>{featuredBlogPost.subtitle}</p>
            <a className="text-link" href={featuredBlogPost.path}>Read now</a>
          </article>
          {blogPosts
            .filter((post) => post.path !== featuredBlogPost.path)
            .map((post) => (
              <article className="story-card" key={post.path}>
                <ChapterVisual item={post} className="story-cover" />
                <p className="eyebrow">{post.category}</p>
                <h3>{post.title}</h3>
                <p>{post.subtitle}</p>
                <a className="text-link" href={post.path}>Continue reading</a>
              </article>
            ))}
          {exploreCards.map((card) => (
            <article className="story-card" key={card.title}>
              <p className="eyebrow">{card.title}</p>
              <h3>{card.title} Notes</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell media-section reverse publication-image-band" aria-labelledby="lessons-title">
        <div className="media-image">
          <ChapterVisual item={featuredBlogPost} className="media-cover" />
        </div>
        <div className="media-copy">
          <p className="eyebrow">Featured Story</p>
          <h2 id="lessons-title">{featuredBlogPost.title}</h2>
          <p>
            {featuredBlogPost.excerpt}
          </p>
          <a className="text-link" href={featuredBlogPost.path}>Read the featured story</a>
        </div>
      </section>

      <section className="about section-shell media-section" id="about" aria-labelledby="about-title">
        <div className="media-image">
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

      <section className="join section-shell" id="join" aria-labelledby="join-title">
        <div className="join-copy">
          <p className="eyebrow">Subscribe</p>
          <h2 id="join-title">Join the Story Circle.</h2>
          <p>
            Receive new essays, video chapters, reading notes, poetry, and invitations from
            The Lyon Den.
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
          <a className="footer-youtube-link" href={youtubeChannelUrl} {...youtubeLinkProps}>
            <YouTubeIcon />
            YouTube
          </a>
          <a className="creator-login-link" href="/vault">Creator Login</a>
        </div>
      </footer>
    </main>
  )
}

function JournalPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const normalizedSearch = searchQuery.trim().toLowerCase()
  const filteredPosts = normalizedSearch
    ? blogPosts.filter((post) => {
        const searchableText = [
          post.title,
          post.subtitle,
          post.excerpt,
          post.category,
          ...getPostTags(post),
          ...getPostCollections(post).map((slug) => getCollectionBySlug(slug)?.title || slug),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return searchableText.includes(normalizedSearch)
      })
    : blogPosts

  return (
    <main className="site-shell blog-shell">
      <header className="site-header blog-header" aria-label="TruthLoveMoney.com journal header">
        <a className="brand" href="/" aria-label="TruthLoveMoney.com home">
          <img src="/assets/watermark-logo.png" alt="" className="brand-logo" />
          <span>
            <strong>TruthLoveMoney.com</strong>
            <small>The Lyon Den Journal</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Journal navigation">
          <a href="/">Home</a>
          <a href="/#collections">Collections</a>
          <a href="/poetry">Poetry</a>
          <a href={youtubeChannelUrl} {...youtubeLinkProps}>YouTube</a>
          <a className="nav-cta" href={youtubeChannelUrl} {...youtubeLinkProps}>Subscribe</a>
        </nav>
      </header>

      <section className="archive-hero section-shell" aria-labelledby="journal-title">
        <p className="eyebrow">Journal</p>
        <h1 id="journal-title">Entries from The Lyon Den archive.</h1>
        <p>
          Literary reflections, teaching memories, poetry, books, family lessons, field notes,
          and story-shaped wisdom gathered one chapter at a time.
        </p>
      </section>

      <section className="journal-index section-shell" aria-labelledby="journal-index-title">
        <div className="section-heading">
          <p className="eyebrow">Latest Entries</p>
          <h2 id="journal-index-title">Read the Journal</h2>
        </div>
        <form className="archive-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="journal-search">Search the archive</label>
          <input
            id="journal-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search poetry, teaching, summer memories..."
          />
        </form>
        <div className="story-grid archive-grid">
          {filteredPosts.map((post) => (
            <article className="story-card" key={post.path}>
              <ChapterVisual item={post} className="story-cover" />
              <p className="eyebrow">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt || post.subtitle}</p>
              <div className="entry-tags" aria-label={`${post.title} collections`}>
                {getPostCollections(post).slice(0, 2).map((slug) => (
                  <a href={getCollectionPath(slug)} key={slug}>
                    {getCollectionBySlug(slug)?.title || slug}
                  </a>
                ))}
              </div>
              <a className="text-link" href={post.path}>Continue Reading</a>
            </article>
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <p className="archive-empty" role="status">
            No Journal entries matched that search. Try a collection like poetry, teaching, or summer memories.
          </p>
        )}
      </section>

      <section className="collections section-shell" aria-labelledby="journal-collections-title">
        <div className="section-heading">
          <p className="eyebrow">Browse by Collection</p>
          <h2 id="journal-collections-title">Find entries by theme.</h2>
        </div>
        <div className="collection-grid compact">
          {collectionDefinitions.map((collection) => (
            <a className="collection-card" href={getCollectionPath(collection.slug)} key={collection.slug}>
              <div className="collection-seal" aria-hidden="true">
                <LyonDenIcon name={collection.icon} />
              </div>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <span className="text-link">{getCollectionEntries(collection.slug).length} entries</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <img src="/assets/watermark-logo.png" alt="" className="footer-logo" />
        <div>
          <p>TruthLoveMoney.com</p>
          <p>The Lyon Den • Hosted by Marguerite</p>
          <p>Never Stop Learning</p>
          <a className="footer-youtube-link" href={youtubeChannelUrl} {...youtubeLinkProps}>
            <YouTubeIcon />
            YouTube
          </a>
          <a className="creator-login-link" href="/vault">Creator Login</a>
        </div>
      </footer>
    </main>
  )
}

function CollectionPage({ collection }) {
  const entries = getCollectionEntries(collection.slug)
  const journalEntries = entries.filter((entry) => entry.type === 'Journal')
  const supportingEntries = entries.filter((entry) => entry.type !== 'Journal')

  return (
    <main className="site-shell blog-shell">
      <header className="site-header blog-header" aria-label={`${collection.title} collection header`}>
        <a className="brand" href="/" aria-label="TruthLoveMoney.com home">
          <img src="/assets/watermark-logo.png" alt="" className="brand-logo" />
          <span>
            <strong>TruthLoveMoney.com</strong>
            <small>The Lyon Den Archive</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Collection navigation">
          <a href="/">Home</a>
          <a href="/blog">Journal</a>
          <a href="/#collections">Collections</a>
          <a href="/poetry">Poetry</a>
          <a className="nav-cta" href={youtubeChannelUrl} {...youtubeLinkProps}>Subscribe</a>
        </nav>
      </header>

      <section className="archive-hero collection-hero section-shell" aria-labelledby="collection-title">
        <div>
          <p className="eyebrow">Collection</p>
          <h1 id="collection-title">{collection.title}</h1>
          <p>{collection.description}</p>
        </div>
        <EditorialCard
          cover={{
            ...getCover(collection.coverId),
            titleLines: getFallbackTitleLines(collection.title),
            title: collection.title,
            category: 'Collection',
            icon: collection.icon,
            variant: 'field',
            alt: `Editorial collection card for ${collection.title}`,
          }}
          className="collection-hero-card"
        />
      </section>

      <section className="journal-index section-shell" aria-labelledby="collection-entries-title">
        <div className="section-heading">
          <p className="eyebrow">{entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}</p>
          <h2 id="collection-entries-title">Continue Reading</h2>
        </div>
        <div className="story-grid archive-grid">
          {journalEntries.map((entry) => (
            <article className="story-card" key={entry.path}>
              <ChapterVisual item={entry} className="story-cover" />
              <p className="eyebrow">{entry.type}</p>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              <a className="text-link" href={entry.path}>Continue Reading</a>
            </article>
          ))}
        </div>
      </section>

      {supportingEntries.length > 0 && (
        <section className="related-reading section-shell" aria-labelledby="supporting-entries-title">
          <div className="section-heading">
            <p className="eyebrow">Related Field Notes &amp; Illustrated Pages</p>
            <h2 id="supporting-entries-title">More from this shelf.</h2>
          </div>
          <div className="related-grid">
            {supportingEntries.map((entry) => (
              <a
                className="related-card"
                href={entry.path}
                key={`${entry.type}-${entry.title}`}
                {...(entry.external ? youtubeLinkProps : {})}
              >
                <ChapterVisual item={entry} className="story-cover" />
                <p className="eyebrow">{entry.type}</p>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
                <span className="text-link">{entry.external ? 'Open on YouTube' : 'Continue Reading'}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <footer className="footer">
        <img src="/assets/watermark-logo.png" alt="" className="footer-logo" />
        <div>
          <p>TruthLoveMoney.com</p>
          <p>The Lyon Den • Hosted by Marguerite</p>
          <p>Never Stop Learning</p>
          <a className="footer-youtube-link" href={youtubeChannelUrl} {...youtubeLinkProps}>
            <YouTubeIcon />
            YouTube
          </a>
          <a className="creator-login-link" href="/vault">Creator Login</a>
        </div>
      </footer>
    </main>
  )
}

function BlogPostPage({ post }) {
  const currentIndex = blogPosts.findIndex((blogPost) => blogPost.path === post.path)
  const previousPost = blogPosts[currentIndex + 1] || null
  const nextPost = blogPosts[currentIndex - 1] || null
  const continuePost =
    post.path === firstBlogPost.path ? featuredBlogPost : blogPosts.find((blogPost) => blogPost.path !== post.path)
  const postContent = getPostContent(post)
  const postCollections = getPostCollections(post)
  const relatedPosts = getRelatedPosts(post)
  const handlePrint = () => {
    window.print()
  }

  useEffect(() => {
    const previousTitle = document.title
    const description =
      document.querySelector('meta[name="description"]') ||
      document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description' }))
    const previousDescription = description.getAttribute('content')
    const cleanDescription = post.metaDescription || post.excerpt || post.subtitle
    const cleanTitle = post.seoTitle || `${post.title} | The Lyon Den Journal`
    const cleanupMeta = [
      setMetaContent('meta[property="og:title"]', { property: 'og:title' }, cleanTitle),
      setMetaContent('meta[property="og:description"]', { property: 'og:description' }, cleanDescription),
      setMetaContent('meta[property="og:type"]', { property: 'og:type' }, 'article'),
      setMetaContent('meta[property="og:image"]', { property: 'og:image' }, getPostOgImage(post)),
      setMetaContent('meta[name="keywords"]', { name: 'keywords' }, getPostTags(post).join(', ')),
    ]

    document.title = cleanTitle
    description.setAttribute('content', cleanDescription)

    return () => {
      document.title = previousTitle
      cleanupMeta.forEach((cleanup) => cleanup())
      if (previousDescription === null) {
        description.removeAttribute('content')
      } else {
        description.setAttribute('content', previousDescription)
      }
    }
  }, [post])

  return (
    <main className="site-shell blog-shell">
      <header className="site-header blog-header" aria-label="TruthLoveMoney.com journal header">
        <a className="brand" href="/" aria-label="TruthLoveMoney.com home">
          <img src="/assets/watermark-logo.png" alt="" className="brand-logo" />
          <span>
            <strong>TruthLoveMoney.com</strong>
            <small>The Lyon Den Journal</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Journal navigation">
          <a href="/">Home</a>
          <a href="/blog">Journal</a>
          <a href="/#collections">Collections</a>
          <a href="/poetry">Poetry</a>
          <a href={youtubeChannelUrl} {...youtubeLinkProps}>YouTube</a>
          <a className="nav-cta" href={youtubeChannelUrl} {...youtubeLinkProps}>Subscribe</a>
        </nav>
      </header>

      <article className="blog-article section-shell" aria-labelledby="blog-title">
        <a className="text-link back-home-link" href="/">
          Back to The Lyon Den
        </a>
        <header className="blog-article-header">
          <div className="blog-print-actions">
            <button
              className="button button-secondary print-story-button"
              type="button"
              onClick={handlePrint}
              aria-label={`Print ${post.title}`}
            >
              Print This Story
            </button>
          </div>
          <p className="eyebrow">{post.category}</p>
          <h1 id="blog-title">{post.title}</h1>
          <p className="blog-subtitle">{post.subtitle}</p>
          <div className="blog-meta" aria-label="Article details">
            <span>By {post.author}</span>
            {(post.date || post.publishedAt) && <span>{post.date || post.publishedAt}</span>}
            <span>{post.readingTime}</span>
            {post.featured && <span>Featured Story</span>}
          </div>
          <div className="entry-tags article-tags" aria-label={`${post.title} collections`}>
            {postCollections.map((slug) => (
              <a href={getCollectionPath(slug)} key={slug}>
                {getCollectionBySlug(slug)?.title || slug}
              </a>
            ))}
          </div>
        </header>

        <figure className="blog-hero-image">
          <ChapterVisual item={post} className="article-cover" />
        </figure>

        <div className="blog-body">
          {postContent.map((block, index) => {
            const key = `${block.type}-${index}-${block.text}`

            if (block.type === 'heading') {
              return <h2 key={key}>{block.text}</h2>
            }

            if (block.type === 'quote') {
              return <blockquote key={key}>{block.text}</blockquote>
            }

            return <p key={key}>{block.text}</p>
          })}
        </div>

        <div className="blog-bottom-print">
          <button
            className="text-link print-story-link"
            type="button"
            onClick={handlePrint}
            aria-label={`Print or save ${post.title}`}
          >
            Print or Save This Story
          </button>
        </div>

        <footer className="print-article-footer" aria-label="Printed article footer">
          <p>The Lyon Den — Truth • Love • Money — Never Stop Learning</p>
          <p>truthlovemoney.com</p>
        </footer>
      </article>

      <section className="related-reading section-shell" aria-labelledby="related-reading-title">
        <div className="section-heading">
          <p className="eyebrow">Related Reading</p>
          <h2 id="related-reading-title">More from this shelf.</h2>
        </div>
        <div className="related-grid">
          {relatedPosts.map((relatedPost) => (
            <a className="related-card" href={relatedPost.path} key={relatedPost.path}>
              <ChapterVisual item={relatedPost} className="story-cover" />
              <p className="eyebrow">{relatedPost.category}</p>
              <h3>{relatedPost.title}</h3>
              <p>{relatedPost.excerpt || relatedPost.subtitle}</p>
              <span className="text-link">Continue Reading</span>
            </a>
          ))}
        </div>
      </section>

      {continuePost && (
        <section className="continue-reading section-shell" aria-labelledby="continue-reading-title">
          <div>
            <p className="eyebrow">Continue Reading</p>
            <h2 id="continue-reading-title">{continuePost.title}</h2>
            <p>{continuePost.subtitle}</p>
          </div>
          <a className="button button-secondary" href={continuePost.path}>
            Continue Reading
          </a>
        </section>
      )}

      <nav className="article-nav section-shell" aria-label="Article navigation">
        {previousPost ? (
          <a href={previousPost.path}>
            <span>Previous Article</span>
            {previousPost.title}
          </a>
        ) : (
          <span />
        )}
        {nextPost ? (
          <a href={nextPost.path}>
            <span>Next Article</span>
            {nextPost.title}
          </a>
        ) : (
          <span />
        )}
      </nav>

      <section className="blog-next section-shell" aria-labelledby="blog-next-title">
        <div>
          <p className="eyebrow">Keep Growing</p>
          <h2 id="blog-next-title">Plant a thought for a future chapter.</h2>
          <p>
            The Seed Garden is where ideas begin before they bloom into stories, poems,
            videos, and lessons.
          </p>
        </div>
        <a className="button button-primary" href={youtubeChannelUrl} {...youtubeLinkProps}>
          Watch on YouTube
        </a>
      </section>

      <footer className="footer">
        <img src="/assets/watermark-logo.png" alt="" className="footer-logo" />
        <div>
          <p>TruthLoveMoney.com</p>
          <p>The Lyon Den • Hosted by Marguerite</p>
          <p>Never Stop Learning</p>
          <a className="footer-youtube-link" href={youtubeChannelUrl} {...youtubeLinkProps}>
            <YouTubeIcon />
            YouTube
          </a>
          <a className="creator-login-link" href="/vault">Creator Login</a>
        </div>
      </footer>
    </main>
  )
}

function PoetryPage() {
  return (
    <main className="site-shell poetry-shell">
      <header className="site-header blog-header" aria-label="TruthLoveMoney.com poetry header">
        <a className="brand" href="/" aria-label="TruthLoveMoney.com home">
          <img src="/assets/watermark-logo.png" alt="" className="brand-logo" />
          <span>
            <strong>TruthLoveMoney.com</strong>
            <small>The Lyon Den Poetry</small>
          </span>
        </a>
        <a
          className="mobile-youtube-link"
          href={youtubeChannelUrl}
          aria-label="Open The Lyon Den YouTube channel"
          {...youtubeLinkProps}
        >
          <YouTubeIcon />
        </a>
        <nav className="site-nav" aria-label="Poetry navigation">
          <a href="/">Home</a>
          <a href="/blog">Journal</a>
          <a href="/#collections">Collections</a>
          <a href="/poetry">Poetry</a>
          <a href={youtubeChannelUrl} {...youtubeLinkProps}>YouTube</a>
          <a className="nav-cta" href="#poetry-reflection">Read Reflection</a>
        </nav>
      </header>

      <section className="poetry-hero section-shell" aria-labelledby="poetry-page-title">
        <div className="poetry-hero-scene" aria-hidden="true">
          <span className="poetry-lantern" />
          <span className="firefly firefly-one" />
          <span className="firefly firefly-two" />
          <span className="firefly firefly-three" />
          <span className="creek-shimmer shimmer-one" />
          <span className="creek-shimmer shimmer-two" />
        </div>
        <div className="poetry-hero-copy">
          <p className="eyebrow">Poetry &amp; Reflections</p>
          <h1 id="poetry-page-title">{poetryFeature.pageTitle}</h1>
          <p>
            Some poems do more than sit on a page. They open a door, stir a
            summer afternoon, and let memory step quietly back into the room.
          </p>
        </div>
      </section>

      <article
        className="poetry-reflection section-shell"
        id="poetry-reflection"
        aria-labelledby="featured-poem-title"
      >
        <div className="poetry-reflection-main">
          <p className="eyebrow">Featured Poem</p>
          <h2 id="featured-poem-title">{poetryFeature.poemTitle}</h2>
          <p className="blog-subtitle">by {poetryFeature.author}</p>
          <dl className="poem-reference">
            <div>
              <dt>Anthology</dt>
              <dd>{poetryFeature.anthology}</dd>
            </div>
          </dl>
          <p>{poetryFeature.note}</p>
          <p>
            The Lyon Den does not republish the poem here. Instead, this page
            honors the way a poem can become a key: opening a room full of
            summer light, classroom voices, family stories, and ordinary
            moments that became treasured only with time.
          </p>
          <p>
            For Marguerite, the poem belongs with the kind of literature that
            helps readers notice what they already carry. It invites us to ask
            why one image, one taste, one phrase, or one remembered afternoon
            can remain bright for years.
          </p>
          <div className="poetry-actions">
            <a className="button button-primary" href={poetryFeature.sourceUrl} {...youtubeLinkProps}>
              Find the Poem
            </a>
            <a className="button button-secondary" href="/blog/the-summer-that-never-left-me">
              Read the Summer Reflection
            </a>
          </div>
        </div>

        <aside className="discussion-card" aria-labelledby="discussion-title">
          <p className="eyebrow">Discussion Question</p>
          <h3 id="discussion-title">{poetryFeature.question}</h3>
          <p>
            Bring the memory gently. A poem, like a seed, may already know
            where it wants to bloom.
          </p>
        </aside>
      </article>

      <section className="poetry-notes section-shell" aria-labelledby="poetry-notes-title">
        <div className="section-heading centered">
          <p className="eyebrow">What This Series Explores</p>
          <h2 id="poetry-notes-title">Poems as memory, conversation, and lesson.</h2>
        </div>
        <div className="reflection-grid">
          {reflectionCards.map((text) => (
            <article className="reflection-card" key={text}>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <img src="/assets/watermark-logo.png" alt="" className="footer-logo" />
        <div>
          <p>TruthLoveMoney.com</p>
          <p>The Lyon Den • Hosted by Marguerite</p>
          <p>Never Stop Learning</p>
          <a className="footer-youtube-link" href={youtubeChannelUrl} {...youtubeLinkProps}>
            <YouTubeIcon />
            YouTube
          </a>
          <a className="creator-login-link" href="/vault">Creator Login</a>
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
        <p className="vault-loading">Opening The Seed Garden...</p>
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
        message="This private garden is currently reserved for Marguerite."
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
            <strong>The Seed Garden</strong>
            <small>The Lyon Den • Private Journal of Ideas</small>
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
        <h1>Connect Supabase to open The Seed Garden.</h1>
        <p>
          Place `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the deployment
          environment. Those are the exact Vercel variable names this site reads.
          The table SQL is included in `supabase/schema.sql`.
        </p>
        <p>
          Current config check: URL {supabaseConfig.hasUrl ? 'present' : 'missing'},
          key {supabaseConfig.hasAnonKey ? 'present' : 'missing'}, URL format{' '}
          {supabaseConfig.urlIsValid ? 'valid' : 'invalid'}.
        </p>
      </section>
    </VaultShell>
  )
}

function AuthCallback() {
  const [message, setMessage] = useState('Opening The Seed Garden...')
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
          'Connect Supabase to finish opening The Seed Garden.',
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
          getReadableError(sessionError, 'Could not read The Seed Garden session.'),
        )
        return
      }

      setDebug((currentDebug) => ({
        ...currentDebug,
        sessionExists: session ? 'yes' : 'no',
      }))

      if (session) {
        setMessage('You are signed in. Taking you to The Seed Garden...')
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
        'No Seed Garden session was found yet. Please use the newest email link.',
      )
    }

    handleCallback()
  }, [])

  return (
    <VaultShell>
      <section className="vault-panel narrow-panel login-panel" aria-labelledby="callback-title">
        <p className="eyebrow">Secure Login</p>
        <h1 id="callback-title">Seed Garden Login</h1>
        <p>{error || message}</p>
        {showDebug && (
          <dl className="callback-debug" aria-label="Seed Garden login debug">
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
            Request a New Garden Link
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
    let error = null

    try {
      const response = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectPath}`,
        },
      })

      error = response.error
    } catch (requestError) {
      error = requestError
    }

    setBusy(false)
    if (error) {
      console.error('Seed Garden magic link error:', {
        message: error.message,
        name: error.name,
        status: error.status || error.statusCode,
      })
      setMessage(getLoginErrorMessage(error))
      return
    }

    setMessage(
      'Check your email for the secure garden gate link. It may take a minute. If you don’t see it, check spam or junk.',
    )
  }

  return (
    <VaultShell>
      <section className="vault-panel login-panel" aria-labelledby="vault-login-title">
        <p className="eyebrow">Private Garden</p>
        <h1 id="vault-login-title">
          {admin ? 'Seed Garden Studio Login' : 'Welcome to The Lyon Den Seed Garden'}
        </h1>
        <p>Enter your email and we’ll send you a secure garden gate link.</p>
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
            {busy ? 'Sending...' : 'Send My Garden Link'}
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
      console.error('Seed Garden save error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setMessage(`This seed did not save: ${getReadableError(error, 'Please try again.')}`)
      return
    }

    if (draftKey) window.localStorage.removeItem(draftKey)
    setTitle('')
    setContent('')
    setSelectedType(null)
    setMessage('Your seed has been planted. We’ll help it grow into something beautiful.')
  }

  return (
    <VaultShell session={session}>
      <section className="vault-welcome" aria-labelledby="vault-title">
        <p className="eyebrow">Welcome Back, Marguerite</p>
        <h1 id="vault-title">What would you like to plant today?</h1>
        {message && <p className="form-message success-message">{message}</p>}
      </section>

      {!selectedType && (
        <section className="entry-type-grid" aria-label="Seed Garden seed types">
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
            Back to seed choices
          </button>
          <p className="eyebrow">{selectedType.icon} {selectedType.label}</p>
          <h2 id="entry-form-title">Plant this seed</h2>
          <form className="vault-form" onSubmit={handleSubmit}>
            <label>
              Seed title
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </label>
            <label>
              Seed notes
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
            {draftSavedAt && <p className="draft-note">Seed draft saved at {draftSavedAt}</p>}
            {message && <p className="form-message error-message">{message}</p>}
            <div className="form-actions">
              <button className="button button-secondary" type="button" onClick={clearForm}>
                Clear Seed
              </button>
              <button className="button button-primary large-action" type="submit" disabled={busy}>
                {busy ? 'Saving seed...' : 'Save Seed'}
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
      console.error('Seed Garden admin read error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setMessage(`Could not gather today’s seeds: ${getReadableError(error)}`)
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
      console.error('Seed Garden connection test error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setConnectionMessage(`The garden connection needs attention: ${getReadableError(error)}`)
      return
    }

    setConnectionOk(true)
    setConnectionMessage('The garden connection is working. Seeds are readable.')
  }

  async function updateStatus(id, status) {
    setMessage('')
    const { error } = await supabase.from('vault_entries').update({ status }).eq('id', id)

    if (error) {
      console.error('Seed Garden growth stage update error:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })
      setMessage(`That growth stage did not update: ${getReadableError(error)}`)
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
        <p className="eyebrow">Seed Garden Studio</p>
        <h1 id="admin-title">Review Today’s Seeds</h1>
      </section>

      <section className="admin-filters" aria-label="Filter Seed Garden seeds">
        <label>
          Seed type
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
          Growth stage
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All growth stages</option>
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
          Refresh Garden
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={testSupabaseConnection}
          disabled={connectionBusy}
        >
          {connectionBusy ? 'Checking...' : 'Check Garden Connection'}
        </button>
      </section>

      {message && <p className="form-message error-message">{message}</p>}
      {connectionMessage && (
        <p className={`form-message ${connectionOk ? 'success-message' : 'error-message'}`}>
          {connectionMessage}
        </p>
      )}
      {loading && <p className="vault-loading">Gathering seeds...</p>}

      {selectedEntry && (
        <section className="vault-panel admin-detail-card" aria-labelledby="entry-detail-title">
          <button className="back-button" type="button" onClick={() => setSelectedEntry(null)}>
            Close seed
          </button>
          <div className="entry-meta">
            <span><b>Seed Type</b>{getTypeLabel(selectedEntry.entry_type)}</span>
            <span><b>Date Planted</b>{new Date(selectedEntry.created_at).toLocaleDateString()}</span>
            <span><b>Growth Stage</b>{statusLabels[selectedEntry.status] || selectedEntry.status}</span>
          </div>
          <h2 id="entry-detail-title">{selectedEntry.title}</h2>
          <p>{selectedEntry.content}</p>
          <div className="status-actions">
            <button type="button" onClick={() => updateStatus(selectedEntry.id, 'planned')}>
              Mark as Growing
            </button>
            <button type="button" onClick={() => updateStatus(selectedEntry.id, 'used')}>
              Mark as Harvested
            </button>
            <button type="button" onClick={() => updateStatus(selectedEntry.id, 'published')}>
              Mark as Bloomed
            </button>
          </div>
        </section>
      )}

      <section className="entry-list" aria-label="Seed Garden seeds">
        {!loading && filteredEntries.length === 0 && (
          <article className="vault-entry-card">
            <p>The garden is quiet today.<br />New ideas will bloom here soon.</p>
          </article>
        )}
        {filteredEntries.map((entry) => (
          <article className="vault-entry-card" key={entry.id}>
            <div className="entry-meta">
              <span><b>Seed Type</b>{getTypeLabel(entry.entry_type)}</span>
              <span><b>Date Planted</b>{new Date(entry.created_at).toLocaleDateString()}</span>
              <span><b>Growth Stage</b>{statusLabels[entry.status] || entry.status}</span>
            </div>
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
            <button className="read-entry-button" type="button" onClick={() => setSelectedEntry(entry)}>
              Read Full Seed
            </button>
            <div className="status-actions">
              <button type="button" onClick={() => updateStatus(entry.id, 'planned')}>
                Mark as Growing
              </button>
              <button type="button" onClick={() => updateStatus(entry.id, 'used')}>
                Mark as Harvested
              </button>
              <button type="button" onClick={() => updateStatus(entry.id, 'published')}>
                Mark as Bloomed
              </button>
            </div>
          </article>
        ))}
      </section>
    </VaultShell>
  )
}

export default App
