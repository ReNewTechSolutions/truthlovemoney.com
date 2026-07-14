import { useEffect, useRef, useState } from 'react'
import { QuoteInterlude } from './components/QuoteInterlude'
import { SocialPlatformCard } from './components/SocialPlatformCard'
import { homepageQuotes } from './data/quotes'
import { socialPlatforms } from './data/socialPlatforms'
import { LyonDenIcon } from './icons/LyonIcons'

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
const socialLinks = socialPlatforms

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
  'mother-already-knew': {
    titleLines: ['WHAT MY', 'MOTHER ALREADY', 'KNEW'],
    subtitle: 'Values lived before they were named.',
    theme: 'legacy',
    category: 'Journal',
    icon: 'lioness',
    variant: 'legacy',
    motif: 'character • influence • lived wisdom',
    alt: 'Editorial monogram card for What My Mother Already Knew with a lioness seal',
  },
  'fill-days-stories': {
    titleLines: ['FILL YOUR DAYS', 'WITH STORIES', 'THAT MAKE YOUR HEART WISER'],
    subtitle: 'Reading, wonder, and lifelong learning.',
    theme: 'window',
    category: 'Journal',
    icon: 'openBook',
    variant: 'blog',
    motif: 'stories • curiosity • wisdom',
    alt: 'Editorial card for Fill Your Days With Stories That Make Your Heart Wiser',
  },
  'books-never-leave': {
    titleLines: ['BOOKS THAT', 'NEVER REALLY', 'LEAVE US'],
    subtitle: 'The pages that shape compassion.',
    theme: 'glow-book',
    category: 'From the Bookshelf',
    icon: 'openBook',
    variant: 'blog',
    motif: 'Scarlet Letter • Anne Frank • compassion',
    alt: 'Editorial card for Books That Never Really Leave Us',
  },
  'between-winter-spring': {
    titleLines: ['BETWEEN', 'WINTER AND', 'SPRING'],
    subtitle: 'What hope still teaches us.',
    theme: 'poetry',
    category: 'Daily Chapter',
    icon: 'lantern',
    variant: 'wisdom',
    motif: 'Persephone • seasons • quiet hope',
    alt: 'Editorial card for Between Winter and Spring',
  },
  'before-the-forgetting': {
    titleLines: ['BEFORE THE', 'FORGETTING'],
    subtitle: 'Love, memory, and thirty-two years.',
    theme: 'legacy',
    category: 'The Long Goodbye',
    icon: 'hourglass',
    variant: 'legacy',
    motif: 'memory • staying • quiet love',
    alt: 'Editorial card for Before the Forgetting with an hourglass seal',
  },
}

const collectionDefinitions = [
  {
    title: 'Chapters',
    slug: 'stories-from-a-life',
    description: 'Long-form memoir and documentary storytelling from The Lyon Den.',
    icon: 'lion',
    coverId: 'summer-memory',
  },
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
    title: 'Daily Chapters',
    slug: 'daily-chapters',
    description: 'Brief seasonal reflections, small joys, and meaning gathered from ordinary days.',
    icon: 'feather',
    coverId: 'between-winter-spring',
  },
  {
    title: 'Wildflowers & Wisdom',
    slug: 'wildflowers-wisdom',
    description: 'Illustrated reminders, gentle observations, and the joy that blooms in small places.',
    icon: 'wildflower',
    coverId: 'fill-days-stories',
  },
  {
    title: 'Living Places',
    slug: 'living-places',
    description: 'Pools, porches, libraries, kitchens, creeks, and rooms that keep memory alive.',
    icon: 'creek',
    coverId: 'summer-memory',
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
  {
    title: 'The Long Goodbye',
    slug: 'the-long-goodbye',
    description: 'Love, memory, caregiving, and the life that existed before illness.',
    icon: 'hourglass',
    coverId: 'before-the-forgetting',
  },
]

function articleBlocks(blocks) {
  return blocks.map((block) => (typeof block === 'string' ? { type: 'paragraph', text: block } : block))
}

const blogPosts = [
  {
    title: 'Before the Forgetting',
    series: 'The Long Goodbye',
    seriesPart: 'Part I',
    subtitle: 'Love, Memory, Caregiving, and Thirty-Two Years with George',
    author: 'Marguerite Lyon',
    category: 'Stories From a Life',
    featured: true,
    date: 'July 13, 2026',
    readingTime: '9 minutes',
    path: '/journal/before-the-forgetting',
    redirectPaths: ['/blog/before-the-forgetting'],
    slug: 'before-the-forgetting',
    seoTitle: 'Before the Forgetting | The Long Goodbye | The Lyon Den',
    metaDescription:
      'A respectful Lyon Den memoir essay about Marguerite and George, thirty-two years together, quiet love, memory, caregiving, and the life that existed before illness.',
    ogDescription:
      'Part I of The Long Goodbye: Marguerite remembers George as a friend, teammate, husband, and the kind of person who stayed.',
    twitterCard: 'summary_large_image',
    primaryKeyword: 'love memory caregiving memoir',
    secondaryKeywords: [
      'The Long Goodbye',
      'caregiving memoir',
      'memory and love',
      'thirty-two years together',
      'George and Marguerite',
      'legacy storytelling',
    ],
    tags: ['memoir', 'memory', 'caregiving', 'marriage', 'George', 'The Long Goodbye', 'legacy'],
    collectionSlugs: ['the-long-goodbye', 'stories-from-a-life', 'legacy-lessons'],
    ogImage: '/assets/marguerite-library-selfie.png',
    suggestedFeaturedImage: 'marguerite-library-selfie.png',
    pinterestDescription:
      'Before the Forgetting: a respectful Lyon Den memoir about love, memory, thirty-two years together, and the person George was before illness entered the story.',
    facebookCaption:
      'Part I of The Long Goodbye remembers George as a person before he was a patient: honest, loyal, funny, dependable, and the kind of man who stayed.',
    instagramCaption:
      'Before the forgetting, there was a lifetime of remembering. Part I of The Long Goodbye begins with George: the laughter, the loyalty, the pool, the years, and the quiet love that stayed.',
    socialExcerpt:
      'George was a person before he was a patient. Alzheimer’s became part of their story. It was never their whole story.',
    pullQuote: 'He made her laugh. He showed up. He stayed.',
    customCover: '',
    coverId: 'before-the-forgetting',
    excerpt:
      'Part I of The Long Goodbye remembers George as a person before he was a patient: a friend, husband, teammate, and the kind of man who stayed.',
    note:
      'This essay is part of The Long Goodbye, a Lyon Den memoir series about love, memory, caregiving, and the life that existed before illness.',
    content: articleBlocks([
      'Before the forgetting, there was a lifetime of remembering.',
      'There were jokes and restaurants, swimming pools and late-night television, trips and family gatherings, stock conversations and ordinary Saturdays. There was a marriage that lasted thirty-two years, but before it was a span of time, it was a daily life. It was two people learning one another’s rhythms. It was friendship. It was teamwork. It was the slow blending of two different personalities until, as Marguerite once said, they blended.',
      'This is where The Long Goodbye begins. Not with illness. Not with a chart. Not with a diagnosis. It begins with George.',
      { type: 'quote', text: 'He made her laugh. He showed up. He stayed.' },
      { type: 'heading', text: 'The Strong, Silent Type' },
      'Marguerite’s father called George “the strong, silent type,” and the phrase fits him in the best sense. George did not need to fill a room to be present in it. He was honest, dependable, loyal, and sweet. He was the kind of person whose steadiness became part of the atmosphere. You might not always notice it loudly, but you felt it.',
      'He studied history and psychology, although Marguerite laughed remembering that he hated writing papers. There is something tender in that detail: a man drawn to the study of people and time, but not especially eager to turn his thoughts into assignments. She also laughed that he never quite knew what he wanted to be when he grew up. Some people carry a little uncertainty without making it dramatic. George seems to have carried his with a kind of practical humor.',
      'He eventually worked for the IRS for approximately thirty years. It was steady work, and steadiness was one of his gifts. Yet there was more to their life than routine. George and Marguerite enjoyed trading stocks together. Their planning, their investing, and their shared attention to money helped them retire unusually young. Money, in that part of their story, was not about display. It was about choices, partnership, and the freedom to build a life with intention.',
      { type: 'heading', text: 'A Wonderful Team' },
      'Marguerite remembers them as close friends who made a wonderful team. That is no small thing. Friendship inside marriage has its own quiet architecture. It is built from shared jokes, private shorthand, errands, habits, loyalties, compromises, and the simple knowledge that the other person is beside you.',
      'They were different in some ways. Most couples are. But difference does not have to become distance. Over time, when two people keep choosing one another, difference can soften into balance. One person brings one kind of strength. The other brings another. One has a habit the other learns to smile at. One worries where the other steadies. One talks while the other listens. Slowly, a household develops its own language.',
      'George came from a family where teaching mattered. His mother and sisters were teachers, and perhaps that shaped the way family, loyalty, and service gathered around him. He stayed beside loved ones when they were sick. He showed up not as performance, but as character. Some people make speeches about devotion. Others simply sit in the chair, drive the car, make the call, wait beside the bed, and do the next faithful thing.',
      { type: 'heading', text: 'The Laughter They Shared' },
      'One of the most important things to know about George is that he made Marguerite laugh. That may sound ordinary until we remember how much ordinary laughter carries. A marriage is not sustained only by grand declarations. It is sustained by moments when one person knows how to lighten the room for the other.',
      'They loved Saturday Night Live and jokes. George deliberately pronounced words incorrectly to make her laugh. There is a sweetness in deliberate silliness, especially from someone remembered as strong and quiet. It means he was willing to be playful. It means he knew her laughter was worth inviting. It means humor was part of their companionship, not an accessory to it.',
      'He was also a good sport when the Kansas City Chiefs were losing. That kind of detail belongs in a memoir because it tells us more than a summary ever could. We learn the texture of a person through what they loved, endured, teased about, and returned to. We learn them through the small domestic rituals that become memory only later.',
      { type: 'heading', text: 'Beside the Water' },
      'The pool memory feels like a small window into the heart of their marriage.',
      'George could not swim very well. And still, he went to the pool with Marguerite at night. He sat beside the water while she swam. He did not have to be the swimmer to be part of the evening. He did not need to turn the moment into something centered on himself. He could simply be there.',
      'That is quiet love. A person does not always show love by sharing the same ability or desire. Sometimes love is sitting beside the water because the person you love wants to swim. Sometimes love is presence without performance. Sometimes it is the willingness to accompany another person into a place where their joy is easier than yours.',
      'The image stays with me: night air, water, the soft sounds of swimming, George nearby. Not dramatic. Not cinematic in the obvious sense. But deeply cinematic in the way real memory often is. A small light. A still figure. A woman moving through the water. A husband keeping company from the edge.',
      'So many marriages are made of moments like that. They do not announce themselves as symbols while they are happening. They become symbols later, when memory has had time to gather them and say, look closely. This mattered.',
      { type: 'heading', text: 'The Life Before Illness' },
      'George and Marguerite loved meals, restaurants, cruises, vineyards, travel, Lake Tahoe, and Las Vegas. Those details matter because they remind us that a life is never only its hardest chapter. Their story had movement, appetite, humor, scenery, family, planning, and pleasure. It had trips and tables and places they returned to in conversation. It had the ordinary luxury of enjoying something together.',
      'Their families loved one another, too. That kind of family affection becomes part of the shelter around a marriage. It gives the relationship a larger home. When families love one another, memories spread beyond two people. They become shared stories, repeated at gatherings, carried by siblings, parents, nieces, nephews, cousins, and friends. They become part of the family archive.',
      'To remember George only through what came later would be unfair to the fullness of who he was. He was not merely someone who became ill. He was a husband, friend, worker, investor, traveler, son, brother, family member, joke-maker, sports fan, and companion beside the pool. He had preferences and habits. He had a history. He had loyalties. He had a personality before illness ever entered the story.',
      'George was a person before he was a patient. Alzheimer’s became part of their story. It was never their whole story.',
      { type: 'heading', text: 'The Kind of Person Who Stayed' },
      'There are people whose love is best understood through staying. They may not always have the most polished words. They may not turn tenderness into speeches. But they remain. They sit nearby. They do what needs doing. They become dependable in a world that often is not.',
      'George seems to have been that kind of person. Honest. Loyal. Sweet. Dependable. Able to laugh. Able to make someone laugh. Able to sit beside the water. Able to stand by family when they were sick. Able to build a life one practical, faithful act at a time.',
      'In legacy storytelling, we often look for the dramatic turning point. But sometimes the deepest truth is simpler. A person stayed. A person showed up. A person made life steadier and funnier and more companionable. A person shared thirty-two years, and the years were not merely counted. They were lived.',
      'The Long Goodbye will eventually include harder chapters. There are parts of the story that belong to caregiving, change, recognition, grief, and the ache of memory becoming unreliable. But this first chapter belongs to George before that. It belongs to the man Marguerite loved, the friend and teammate, the one who could make her laugh by saying a word wrong on purpose, the one who sat beside the pool because she wanted to swim.',
      'That is where the story deserves to begin.',
      'George had always been the kind of person who stayed beside the people he loved.',
      'Neither of us knew then that one day, it would be my turn to stay beside him.',
      'Never Stop Learning.',
    ]),
  },
  {
    title: 'Fill Your Days With Stories That Make Your Heart Wiser',
    subtitle: 'A Lyon Den reflection on reading, wonder, curiosity, and lifelong learning.',
    author: 'Marguerite Lyon',
    category: 'Stories From a Life',
    featured: true,
    date: 'July 11, 2026',
    readingTime: '8 minutes',
    path: '/blog/fill-your-days-with-stories-that-make-your-heart-wiser',
    slug: 'fill-your-days-with-stories-that-make-your-heart-wiser',
    seoTitle: 'Fill Your Days With Stories That Make Your Heart Wiser | The Lyon Den',
    metaDescription:
      'A cornerstone Lyon Den essay on reading, storytelling, curiosity, journaling, teaching, wonder, wisdom, and lifelong learning.',
    ogDescription:
      'Marguerite reflects on why stories, books, teaching, journaling, curiosity, and wonder make the heart wiser across a lifetime.',
    twitterCard: 'summary_large_image',
    primaryKeyword: 'stories that make your heart wiser',
    secondaryKeywords: [
      'lifelong learning',
      'literary wisdom',
      'reading and storytelling',
      'journaling',
      'teaching',
      'curiosity',
      'wonder',
      'The Lyon Den',
    ],
    tags: ['stories', 'wisdom', 'reading', 'lifelong learning', 'journaling', 'teaching', 'wonder'],
    collectionSlugs: ['legacy-lessons', 'teaching-wisdom', 'field-notes', 'conversations'],
    ogImage: '/assets/lyon-den-storytelling-banner.png',
    suggestedFeaturedImage: 'lyon-den-storytelling-banner.png',
    pinterestDescription:
      'Fill your days with stories that make your heart wiser. A warm Lyon Den reflection on reading, curiosity, journaling, teaching, and lifelong learning.',
    facebookCaption:
      'Some stories entertain us for an afternoon. Others make the heart wiser. This cornerstone Lyon Den reflection is about reading, wonder, and the kind of lifelong learning that keeps a person beautifully awake.',
    instagramCaption:
      'Fill your days with stories that make your heart wiser. Reading, journaling, teaching, curiosity, wonder, and the quiet work of lifelong learning.',
    socialExcerpt:
      'A cornerstone Lyon Den reflection on reading, storytelling, curiosity, journaling, teaching, wonder, wisdom, and lifelong learning.',
    pullQuote: 'A wise story does not simply tell us what happened. It helps us notice what matters.',
    customCover: '/assets/lyon-den-storytelling-banner.png',
    displayMode: 'cover',
    coverId: 'fill-days-stories',
    excerpt:
      'A cornerstone reflection on reading, storytelling, curiosity, journaling, teaching, wonder, and the stories that make the heart wiser.',
    content: articleBlocks([
      'Some days are filled before they truly begin. There are errands, messages, appointments, bills, questions, meals, lists, interruptions, and all the small duties that make a life practical. It is easy to reach evening and realize the day was full, but not necessarily nourishing.',
      'That is why I keep returning to one simple thought: fill your days with stories that make your heart wiser.',
      'Not every story needs to be grand. Not every book needs to be famous. Not every memory needs to arrive with a lesson already attached. But a life becomes richer when we give ourselves regular company with words, pages, conversations, memories, poems, journals, and reflections that ask us to notice more deeply.',
      { type: 'quote', text: 'A wise story does not simply tell us what happened. It helps us notice what matters.' },
      { type: 'heading', text: 'Reading as a Way of Staying Awake' },
      'Reading has always felt to me like a way of keeping the inner life awake. A book can bring us into another house, another century, another conscience, another sorrow, another kind of courage. We may close the cover and return to our own kitchen, but we do not return quite unchanged.',
      'A good story slows the world down long enough for us to recognize something. We recognize a fear we have carried privately. We recognize a tenderness we had almost dismissed. We recognize that other people have lived with questions that sound very much like our own.',
      'That is one of the quiet gifts of literature. It enlarges compassion. It asks us to step outside the small room of our own assumptions. It teaches us that every person has a before, a context, a hidden page, a chapter we may not have been invited to read.',
      { type: 'heading', text: 'Curiosity Keeps the Door Open' },
      'Curiosity is one of the gentlest forms of hope. It says there is still something to learn. It says the world has not become flat, even if we are tired. It says a conversation may still surprise us, a memory may still teach us, a book may still open a window we did not know we needed.',
      'The Lyon Den was built around that belief. Never Stop Learning is not a slogan for people collecting information. It is an invitation to remain alive to meaning. Learning can happen in a classroom, but it can also happen beside a creek, in a kitchen, through a poem, in a journal, in a hard conversation, or in a memory that returns at exactly the right time.',
      'Wonder is not childish. Wonder is disciplined attention. It is the choice to look again at something ordinary and admit that it may still have more to offer.',
      { type: 'heading', text: 'Journaling the Small Sparks' },
      'A journal does not have to be impressive to be useful. It can hold a sentence from a book, a question from a conversation, a recipe that reminds you of someone, a line of poetry, a gratitude, a worry, a memory, or a small observation from the day.',
      'Those little entries can become seeds. Later, a seed becomes a story. A story becomes a lesson. A lesson becomes something another person can carry. That is how private reflection becomes shared wisdom.',
      'When we write something down, we are saying: this mattered enough to keep. We are refusing to let every meaningful thing disappear into the rush of ordinary time.',
      { type: 'heading', text: 'Teaching, Even When the Classroom Changes' },
      'Teaching gave me a lifelong respect for the way stories help people find words. A student might begin with confusion and slowly discover a thought. A reader might begin with a character and end with compassion. A family member might begin with an old memory and suddenly understand why it stayed.',
      'The best teaching is not only instruction. It is invitation. It says, come closer. Think with me. Read this line again. Tell me what it reminds you of. Listen before you judge. Let the story become a place where understanding can begin.',
      'We teach whenever we help someone notice. We teach when we preserve a memory honestly. We teach when we share a book that changed us. We teach when we admit that wisdom is still unfolding.',
      { type: 'heading', text: 'A Heart Made Wiser' },
      'A wiser heart is not a harder heart. Wisdom should not make us cold. It should make us more discerning, more compassionate, more patient with complexity, more careful with words, and more grateful for beauty when it appears.',
      'Stories can do that. They can soften what has become brittle. They can strengthen what has become uncertain. They can remind us that every life contains more than one chapter, and that the page we are living now is not the only page that will ever be written.',
      'So fill your days, when you can, with stories that make your heart wiser. Read a few pages. Write one sentence. Ask one better question. Remember one lesson. Share one story with love.',
      'That is slow publishing. That is legacy storytelling. That is The Lyon Den.',
      'Never Stop Learning.',
    ]),
  },
  {
    title: 'Books That Never Really Leave Us',
    subtitle: 'Some books entertain us. Some books quietly become part of who we are.',
    author: 'Marguerite Lyon',
    category: 'From the Bookshelf',
    featured: false,
    date: 'July 11, 2026',
    readingTime: '6 minutes',
    path: '/blog/books-that-never-really-leave-us',
    slug: 'books-that-never-really-leave-us',
    seoTitle: 'Books That Never Really Leave Us | The Lyon Den',
    metaDescription:
      'A literary reflection on The Scarlet Letter, Anne Frank, compassion, memory, and the books that stay with us long after reading.',
    ogDescription:
      'Marguerite reflects on books that do more than entertain: The Scarlet Letter, Anne Frank, compassion, and the stories that quietly shape us.',
    twitterCard: 'summary_large_image',
    primaryKeyword: 'books that never leave us',
    secondaryKeywords: ['The Scarlet Letter', 'Anne Frank', 'books that shape compassion', 'literary memories', 'reading wisdom'],
    tags: ['books', 'The Scarlet Letter', 'Anne Frank', 'compassion', 'literature', 'reading'],
    collectionSlugs: ['books-that-changed-me', 'teaching-wisdom', 'legacy-lessons'],
    ogImage: '/assets/wildflowers-never-ask-permission.png',
    suggestedFeaturedImage: 'wildflowers-never-ask-permission.png',
    pinterestDescription:
      'Some books entertain us. Some books quietly become part of who we are. A Lyon Den reflection on literature, compassion, The Scarlet Letter, and Anne Frank.',
    facebookCaption:
      'Some books never really leave us. They shape compassion, widen perspective, and stay close long after the last page.',
    instagramCaption:
      'What book quietly changed your life? A Lyon Den bookshelf reflection on the stories that stay.',
    socialExcerpt:
      'A bookshelf reflection on The Scarlet Letter, Anne Frank, compassion, and the books that remain part of who we become.',
    pullQuote: 'The books that stay with us are often the ones that made us more compassionate.',
    customCover: '',
    coverId: 'books-never-leave',
    excerpt:
      'A reflection on The Scarlet Letter, Anne Frank, compassion, and the books that quietly become part of who we are.',
    content: articleBlocks([
      'Some books entertain us, and there is nothing wrong with that. A good story can be a welcome chair at the end of a long day. It can carry us away for an hour, give us a mystery to solve, a world to enter, or a character to follow.',
      'But some books do something deeper. They do not simply pass the time. They quietly become part of who we are.',
      'We may forget the exact chapter. We may forget the year we first read them. We may forget the cover, the classroom, or the edition. But something remains: a question, a character, a wound, a sentence, a new way of seeing another person.',
      { type: 'quote', text: 'The books that stay with us are often the ones that made us more compassionate.' },
      { type: 'heading', text: 'When a Book Changes the Room' },
      'There are books that change the room we are standing in. The Scarlet Letter is one of those books for many readers. It asks us to look at judgment, shame, secrecy, public opinion, private pain, and the difference between what a community claims to value and how it treats a person standing alone.',
      'A student may first approach it as an assignment. Later, with more life behind them, the story can feel different. We begin to understand that literature is rarely only about its plot. It is about the moral atmosphere around the plot. It is about how human beings behave when fear, pride, reputation, and punishment enter the room.',
      'That is why a book can grow with us. We read it once and see the story. We read it later and see ourselves. We read it again and see society, family, silence, courage, and consequence.',
      { type: 'heading', text: 'The Diary That Still Speaks' },
      'Anne Frank’s diary remains with readers for another reason. It is intimate. It is young. It is observant. It carries ordinary thoughts under extraordinary pressure. The world around her was marked by danger and hatred, yet the diary preserves a human voice that refuses to become only a symbol.',
      'That matters. Books like Anne Frank’s diary shape compassion because they do not allow us to keep suffering at a distance. They bring history into a room small enough for one person’s handwriting. They remind us that every large event is lived by individual hearts.',
      'When young readers encounter a voice like Anne’s, they may begin to understand that history is not only dates. It is fear, hope, family, imagination, boredom, longing, and the desire to be seen. Literature makes the human face visible.',
      { type: 'heading', text: 'Compassion Has to Be Practiced' },
      'Compassion is not automatic. It has to be practiced. Books give us a place to practice before life asks it of us directly. We sit with a character we might not have understood. We listen to a narrator whose circumstances are not ours. We discover that a person can be flawed and still worthy of being understood.',
      'That does not mean every story excuses every choice. It means a good reader learns to look for context before judgment. A good reader asks, what happened here? What did this person carry? What did fear do? What did love require? What would I have understood if I had listened longer?',
      'That habit matters far beyond the page. It matters in families, classrooms, friendships, work, and communities. The person who has learned to read deeply may also learn to listen more carefully.',
      { type: 'heading', text: 'The Books We Carry Forward' },
      'The books that never leave us often become quiet companions. They do not follow us loudly. They simply appear when life gives us a reason to remember them.',
      'A question about judgment may return us to The Scarlet Letter. A conversation about courage may return us to Anne Frank. A moment of misunderstanding may return us to a story that once taught us to slow down before deciding who someone is.',
      'That is why The Lyon Den keeps a place for books. Literature is not decoration for a thoughtful life. It is part of how a thoughtful life is formed. Books give us language, imagination, sympathy, moral tension, and a way to consider what kind of people we are becoming.',
      'Some books entertain us. Some books inform us. Some books challenge us. And some books quietly become part of the furniture of the soul.',
      'What book quietly changed your life?',
      'Never Stop Learning.',
    ]),
  },
  {
    title: 'Between Winter and Spring',
    subtitle: 'What Persephone Still Teaches Us About Hope',
    author: 'Marguerite Lyon',
    category: 'Daily Chapter',
    featured: false,
    date: 'July 10, 2026',
    readingTime: '8 minutes',
    path: '/blog/between-winter-and-spring',
    redirectPaths: ['/daily-chapters/one-bloom-at-a-time'],
    canonicalPath: '/blog/between-winter-and-spring',
    slug: 'between-winter-and-spring',
    seoTitle: 'Between Winter and Spring | The Lyon Den',
    metaDescription:
      'A literary reflection on Persephone, the winters we endure, and the quiet ways hope and renewal return—one bloom at a time.',
    ogDescription:
      'A literary Lyon Den reflection on Persephone as symbolism for winter, spring, hope, becoming, resilience, ordinary joy, poetry, and quiet renewal.',
    primaryKeyword: 'Persephone hope reflection',
    secondaryKeywords: [
      'Persephone and hope',
      'seasons of life',
      'winter and renewal',
      'literary reflection',
      'grief and growth',
      'daily chapter',
      'lifelong learning',
    ],
    tags: [
      'Persephone',
      'hope',
      'renewal',
      'winter',
      'seasons of life',
      'literary reflection',
      'Daily Chapter',
      'lifelong learning',
    ],
    collectionSlugs: ['poetry', 'legacy-lessons', 'field-notes', 'conversations'],
    ogImage: '/assets/between-winter-and-spring-artwork.png',
    suggestedFeaturedImage: 'between-winter-and-spring-artwork.png',
    pinterestDescription:
      'Between Winter and Spring: a literary reflection on Persephone, hope, resilience, ordinary joy, lemon cookies, poetry, laughter, and quiet renewal.',
    facebookCaption:
      'Most people are not living philosophically. We are living ordinary days, looking for small signs of hope. This Daily Chapter reflects on winter, spring, Persephone, and the quiet ways renewal returns.',
    instagramCaption:
      'Between winter and spring, hope often returns quietly. Lemon cookies. Poetry. Laughter. One small bloom at a time.',
    socialExcerpt:
      'Some stories continue to live because they continue to teach us. A Daily Chapter on Persephone, winter, and the quiet return of hope.',
    pullQuote: 'Sometimes hope returns quietly—one bloom at a time.',
    customCover: '/assets/between-winter-and-spring-artwork.png',
    displayMode: 'contain',
    coverId: 'between-winter-spring',
    excerpt:
      'The story of Persephone has endured not only because it explains the seasons, but because it gives language to the winters we carry within us—and the quiet ways hope returns.',
    content: [
      {
        type: 'paragraph',
        text: 'Some stories continue to live because they continue to teach us.',
      },
      {
        type: 'paragraph',
        text: 'They travel from one century to another not because every reader believes the same things about them, but because they keep offering language for the human condition. A story may begin in an ancient world and still meet us in a modern kitchen, a hospital waiting room, a quiet bedroom, a classroom, a garden, or a season of life we did not choose.',
      },
      {
        type: 'paragraph',
        text: 'The story of Persephone is one of those enduring stories. I do not think of it here as a history lesson or as spiritual instruction. I think of it as literature: a symbolic language readers have used for generations to consider winter, return, waiting, grief, growth, and the mystery of renewal.',
      },
      {
        type: 'quote',
        text: 'Sometimes hope returns quietly—one bloom at a time.',
      },
      {
        type: 'heading',
        text: 'The Story Beneath the Story',
      },
      {
        type: 'paragraph',
        text: 'In the old story, Persephone becomes associated with the turning of the seasons. Her absence is linked with the barrenness of winter, and her return is linked with the renewal of spring. Across time, readers and artists have seen in that pattern more than an explanation of nature. They have seen descent and return, separation and reunion, sorrow and fertility, waiting and bloom.',
      },
      {
        type: 'paragraph',
        text: 'That is the part that continues to speak. Every life has seasons. We may not name them while we are living them, but later we can often see the weather of a chapter. There are spring seasons when energy returns. There are summer seasons full of warmth and gathering. There are autumn seasons of letting go. And there are winters, too.',
      },
      {
        type: 'paragraph',
        text: 'Winter is part of life. That is not a harsh statement. It is an honest one. Every person eventually meets a season when life feels colder than expected, when something familiar is gone, when the old rhythm no longer works, or when hope feels as if it has stepped into another room.',
      },
      {
        type: 'heading',
        text: 'The Winters We Do Not Choose',
      },
      {
        type: 'paragraph',
        text: 'Some winters arrive through loss. Some through illness. Some through uncertainty, distance, caregiving, changing identity, or dreams placed on hold. Sometimes winter is the long waiting room of a life that has not yet begun again. Sometimes it is simply the quiet knowledge that we are not the person we were, but we do not yet know who we are becoming.',
      },
      {
        type: 'paragraph',
        text: 'It would be too simple to say that every hardship exists to teach us a lesson. Some pain is not tidy. Some grief does not become beautiful because we have found a sentence for it. A literary reflection should never demand that someone be grateful for suffering.',
      },
      {
        type: 'paragraph',
        text: 'But stories can keep us company inside those seasons. They can remind us that winter is real without insisting that winter is final. They can give us a way to say, “This is where I am right now,” while still leaving room for return.',
      },
      {
        type: 'heading',
        text: 'Hope Does Not Always Arrive Dramatically',
      },
      {
        type: 'paragraph',
        text: 'We sometimes expect renewal to announce itself. We imagine a door opening, music swelling, the answer arriving all at once. But much of real hope is quieter than that. It may begin with one phone call. One morning with a little more energy. One honest conversation. One page written. One seed planted. One small decision. One bloom.',
      },
      {
        type: 'paragraph',
        text: 'Sometimes hope returns quietly—one bloom at a time. Not because everything has been fixed, and not because the past has disappeared, but because something living has begun to move again beneath the surface.',
      },
      {
        type: 'paragraph',
        text: 'A person may not be able to change the whole season. But perhaps they can answer the phone. Perhaps they can open a book. Perhaps they can make lemon cookies, write three lines, sit in the sun for ten minutes, or laugh at something small and unexpected. These are not grand gestures. They are signs of life.',
      },
      {
        type: 'paragraph',
        text: 'Most people are not living philosophically in a formal way. We are not walking through ordinary days trying to solve the meaning of life as though it were a puzzle hidden under a stone. We are making meals, keeping appointments, remembering loved ones, worrying, hoping, reading, working, listening, and trying to be decent to one another.',
      },
      {
        type: 'paragraph',
        text: 'Perhaps we are not meant to find the meaning of life as a single answer. Perhaps we are invited to notice the meaning already surrounding us. Lemon cookies. Poetry. A good laugh. A favorite chair. A conversation that stays with us. A line in a book that seems to know exactly where we are.',
      },
      {
        type: 'paragraph',
        text: 'Small joys are not small because they are unimportant. They are small because they are near. They are the pieces life allows us to hold. Over time, those pieces can become a meaningful life.',
      },
      {
        type: 'heading',
        text: 'Every Season Has Its Work',
      },
      {
        type: 'paragraph',
        text: 'Winter is not necessarily empty. Beneath the ground, roots may be holding. Seeds may be waiting. A tree may look still while it is protecting what it needs to survive. In a human life, winter can contain rest, grief, reflection, reassessment, preparation, and hidden growth.',
      },
      {
        type: 'paragraph',
        text: 'That does not mean we should rush to make suffering useful. It means only that stillness is not always absence. Waiting is not always waste. The parts of us that are quiet may still be alive. The lesson may not be visible yet. The bloom may not have broken the surface.',
      },
      {
        type: 'paragraph',
        text: 'This is one reason The Lyon Den returns again and again to stories, books, poems, memories, and daily chapters. They help us pay attention. They do not hand us a formula for living. They help us notice what our own lives are already trying to teach us.',
      },
      {
        type: 'paragraph',
        text: 'Every story has something to teach us, but not every lesson arrives in a lecture. Some lessons arrive as images. A girl returning from the underworld. A field beginning to green. A flower pushing through cold ground. A reader recognizing that she, too, has lived through a season and returned changed.',
      },
      {
        type: 'heading',
        text: 'The Return',
      },
      {
        type: 'paragraph',
        text: 'The return does not always mean life becomes exactly what it was before. Often it does not. Some returns are changed returns. We come back with new strength, new tenderness, new boundaries, new understanding, or a new sense of what matters.',
      },
      {
        type: 'paragraph',
        text: 'That is not a lesser hope. It may be the truest kind. The spring that follows winter is not the same as the spring before it. It carries memory. It carries weather. It carries the evidence of what was endured. And still, it blooms.',
      },
      {
        type: 'paragraph',
        text: 'When I think of Persephone, I think of literature as a lantern. Not a doctrine. Not a demand. A lantern. A story that lets us look at winter without surrendering to it, and lets us imagine spring without pretending that winter never happened.',
      },
      {
        type: 'paragraph',
        text: 'Some stories continue to live because they continue to teach us. They teach us to notice the season we are in. They teach us to honor what has been lost without closing the door on what may yet return. They teach us that growth often begins beneath the surface.',
      },
      {
        type: 'heading',
        text: 'Becoming Is Often Quiet',
      },
      {
        type: 'paragraph',
        text: 'Becoming rarely looks impressive while it is happening. It can look like uncertainty. It can look like a person learning to speak more honestly, rest more faithfully, ask for help, release an old expectation, or choose a quieter kind of courage.',
      },
      {
        type: 'paragraph',
        text: 'Resilience is not always dramatic either. Sometimes resilience is simply continuing to make breakfast. Answering one message. Reading one poem. Laughing at something small because laughter has finally found a little room again.',
      },
      {
        type: 'paragraph',
        text: 'That is why ordinary joys matter. Lemon cookies on a plate. A line of poetry copied into a notebook. The first warm breeze through a window. A good laugh at a table where people feel safe. These things do not solve every sorrow, but they remind us that sorrow is not the only thing in the room.',
      },
      {
        type: 'paragraph',
        text: 'And they teach us, gently, to keep learning. Even in winter. Even while waiting. Even when the first bloom is very small.',
      },
      {
        type: 'heading',
        text: 'Reader Reflection',
      },
      {
        type: 'paragraph',
        text: 'What season of life are you walking through today?',
      },
      {
        type: 'paragraph',
        text: '1. What has this season asked you to release?',
      },
      {
        type: 'paragraph',
        text: '2. What may be growing beneath the surface, even if you cannot see it yet?',
      },
      {
        type: 'paragraph',
        text: '3. What would one small bloom of hope look like this week?',
      },
      {
        type: 'paragraph',
        text: 'Never Stop Learning.',
      },
    ],
  },
  {
    title: 'What My Mother Already Knew',
    subtitle: 'Stephen Covey gave language to values my mother had already lived.',
    author: 'Marguerite Lyon',
    category: 'Legacy Lessons',
    featured: false,
    date: 'July 7, 2026',
    readingTime: '6 minutes',
    path: '/blog/what-my-mother-already-knew',
    slug: 'what-my-mother-already-knew',
    seoTitle: 'What My Mother Already Knew | Stephen Covey, Mother Wisdom, and Lived Values',
    metaDescription:
      'Marguerite reflects on Stephen Covey, her mother’s moral foundation, teaching as lifelong influence, character, people-first wisdom, and Never Stop Learning.',
    primaryKeyword: 'mother wisdom',
    secondaryKeywords: [
      'Stephen Covey reflection',
      'lived wisdom',
      'teaching influence',
      'moral foundation',
      'ethical foundation',
      'character over circumstances',
      'legacy lessons',
      'Never Stop Learning',
    ],
    tags: [
      'mother wisdom',
      'Stephen Covey',
      'lived values',
      'teaching influence',
      'legacy lessons',
      'character',
      'lifelong learning',
    ],
    collectionSlugs: ['legacy-lessons', 'teaching-wisdom', 'books-that-changed-me', 'conversations'],
    ogImage: '/assets/watermark-logo.png',
    suggestedFeaturedImage: 'what-my-mother-already-knew.png',
    socialExcerpt:
      'Some people never write books. They simply become the lesson. A Lyon Den reflection on Stephen Covey, mother wisdom, character, and influence.',
    pullQuote:
      'Stephen Covey wrote what my mother lived, but she did not need a chapter title to understand character.',
    customCover: '',
    coverId: 'mother-already-knew',
    excerpt:
      'A reflective Journal entry about Stephen Covey, a mother’s moral foundation, living to give, teaching as influence, and wisdom that was lived before it was named.',
    content: [
      {
        type: 'paragraph',
        text: 'Sometimes a book does not teach us something entirely new. Sometimes it gives language to something we have already witnessed in the life of someone we love.',
      },
      {
        type: 'paragraph',
        text: 'That is how I feel when I think about Stephen Covey and the principles he wrote about so clearly. His words helped many people understand habits, choices, values, responsibility, and character. But when I read or remember those ideas, I also think of my mother. I think of the way she lived before I had the vocabulary to describe it.',
      },
      {
        type: 'quote',
        text: 'Stephen Covey wrote what my mother lived, but she did not need a chapter title to understand character.',
      },
      {
        type: 'paragraph',
        text: 'My mother gave me a moral and ethical foundation that has followed me through every season of my life. She did not present it as a lecture series. She did not call it leadership training. She simply lived by a set of inner commitments. People first. Character first. Growth always. Responsibility even when circumstances were difficult. Giving because giving was part of love.',
      },
      {
        type: 'heading',
        text: 'Living to Give',
      },
      {
        type: 'paragraph',
        text: 'There are people who live as though the world exists mainly to serve them. My mother was not one of those people. She lived to give. She gave advice, time, concern, standards, encouragement, and sometimes correction. She gave because she cared about what would become of the people around her.',
      },
      {
        type: 'paragraph',
        text: 'I did not always understand that advice could be a love language. When we are young, advice can feel like interference. Later, if we are fortunate, we begin to hear the love inside it. We realize that someone was trying to help us build a foundation strong enough to stand on when life became complicated.',
      },
      {
        type: 'paragraph',
        text: 'That is one of the great gifts parents and teachers can give. Not a perfect life. Not a life without disappointment. A foundation. A way to measure choices. A sense that truth matters, that work matters, that people matter, and that our influence reaches farther than we can see.',
      },
      {
        type: 'heading',
        text: 'Character Over Circumstances',
      },
      {
        type: 'paragraph',
        text: 'Stephen Covey wrote about choosing our response, about living from principles instead of being ruled by circumstances. My mother understood that long before I saw it written in a book. She knew that circumstances could change quickly. Money could be tight. Work could be hard. Plans could be interrupted. But character was the steady place from which a person could still choose wisely.',
      },
      {
        type: 'paragraph',
        text: 'That does not mean life is easy. It means we are not helpless inside it. We can decide what kind of person we will be while we are passing through the hard parts. We can decide whether to become bitter or generous, careless or responsible, self-protective or useful.',
      },
      {
        type: 'paragraph',
        text: 'My mother’s life taught me that values are not proved in theory. They are proved in ordinary decisions. They show up in how we speak when we are tired, how we treat people who cannot repay us, how we respond when plans change, and how willing we are to keep growing when staying the same would be easier.',
      },
      {
        type: 'heading',
        text: 'Teaching as Lifelong Influence',
      },
      {
        type: 'paragraph',
        text: 'I have often returned to the phrase, “You never know where your influence lies.” It is one of those sentences that becomes more true the longer you live. A teacher may never know which comment stayed with a student. A parent may never know which example became a child’s inner compass. A friend may never know which conversation helped someone keep going.',
      },
      {
        type: 'paragraph',
        text: 'Teaching is not limited to classrooms. Teaching happens whenever we help another person see more clearly, choose more carefully, or believe that growth is still possible. My mother taught in that way. She taught by example. She taught through standards. She taught through concern. She taught by expecting people to become better without giving up on them when they were still learning.',
      },
      {
        type: 'paragraph',
        text: 'That kind of influence is quiet. It is not always praised in public. It may never become a book or a speech or a formal lesson. But it becomes part of other people. It becomes the voice they hear when they are making a decision. It becomes the question they ask themselves when no one else is watching.',
      },
      {
        type: 'heading',
        text: 'Some People Become the Lesson',
      },
      {
        type: 'paragraph',
        text: 'Some people never write books. They simply become the lesson. Their lives teach what words can only point toward. They show us what patience looks like, what courage costs, what generosity requires, and what it means to keep learning across an entire lifetime.',
      },
      {
        type: 'paragraph',
        text: 'That is why Covey’s ideas feel personal to me. He organized principles beautifully, but my mother had already made them visible. People first. Character over circumstances. Influence as responsibility. Advice as care. Growth as a choice. A life measured not only by what we accomplish, but by what we give to others along the way.',
      },
      {
        type: 'paragraph',
        text: 'The Lyon Den exists for reflections like this. Every story has something to teach us, and sometimes the most important stories are not dramatic at all. They are the stories of people who quietly became examples. People whose wisdom was not announced, but lived.',
      },
      {
        type: 'paragraph',
        text: 'My mother already knew what many of us spend years learning: that a life built on truth, love, responsibility, and generosity continues teaching long after the moment has passed.',
      },
      {
        type: 'paragraph',
        text: 'Never Stop Learning.',
      },
    ],
  },
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
    category: 'Poetry and Reflection',
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
    category: 'Field Notes',
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
    category: 'From the Bookshelf',
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
    category: 'Daily Chapters',
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
    category: 'Stories From a Life',
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
    category: 'Stories From a Life',
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
  return blogPosts.find((post) => post.path === path || post.redirectPaths?.includes(path))
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
    '/blog/between-winter-and-spring': ['daily-chapters', 'poetry', 'wildflowers-wisdom'],
    '/blog/fill-your-days-with-stories-that-make-your-heart-wiser': ['wildflowers-wisdom', 'legacy-lessons', 'field-notes'],
    '/blog/books-that-never-really-leave-us': ['books-that-changed-me', 'legacy-lessons', 'conversations'],
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

function setCanonicalHref(href) {
  let canonical = document.querySelector('link[rel="canonical"]')
  const previousHref = canonical?.getAttribute('href') || null
  const created = !canonical

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }

  canonical.setAttribute('href', href)

  return () => {
    if (created) {
      canonical.remove()
    } else if (previousHref) {
      canonical.setAttribute('href', previousHref)
    } else {
      canonical.removeAttribute('href')
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
    title: 'The Summer That Never Left Me',
    publishedAt: 'June 2026',
    description: 'A nostalgic reflection on poetry, water, memory, and the summers that keep returning.',
    customCover: '/assets/summer-that-never-left-me.png',
    coverId: 'summer-memory',
    displayMode: 'cover',
    url: youtubeChannelUrl,
    collectionSlugs: ['summer-memories', 'poetry', 'illustrated-pages'],
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
  if (item.customCover) {
    return (
      <img
        className={`editorial-cover-image custom-cover-image ${className}`.trim()}
        src={item.customCover}
        alt={item.coverAlt || `Featured artwork for ${item.title}`}
        loading="lazy"
      />
    )
  }

  return <EditorialCard cover={getEditorialCover(item)} className={className} />
}

function JournalCollageArticle({ post, variant = 'standard' }) {
  if (!post) return null

  return (
    <article className={`journal-collage-item journal-collage-${variant}`.trim()}>
      <a className="journal-collage-link" href={post.path}>
        <div className="journal-collage-visual" aria-hidden="true">
          <ChapterVisual item={post} className="journal-collage-art" />
        </div>
        <div className="journal-collage-copy">
          <p className="chapter-kicker">{post.series || post.category}</p>
          <h3>{post.title}</h3>
          <p>{post.excerpt || post.subtitle}</p>
          <span className="text-link">Read the Chapter</span>
        </div>
      </a>
    </article>
  )
}

function JournalQuoteTile({ children, icon = 'lantern', tone = 'cream' }) {
  return (
    <aside className={`journal-collage-quote journal-collage-quote-${tone}`}>
      <LyonDenIcon name={icon} />
      <p>{children}</p>
    </aside>
  )
}

function JournalArtworkTile() {
  return (
    <a className="journal-collage-artwork" href="/collections/wildflowers-wisdom">
      <img
        src="/assets/carry-love-forward-comic.png"
        alt="Illustrated Lyon Den comic about carrying love forward and continuing to find joy in life."
        loading="lazy"
        decoding="async"
      />
      <span>Illustrated Page</span>
      <strong>Carry love forward.</strong>
    </a>
  )
}

function JournalAuthorTile() {
  return (
    <a className="journal-collage-author" href="/about">
      <img
        src="/assets/marguerite-library-selfie.png"
        alt="Marguerite Lyon seated in a warm library surrounded by books."
        loading="lazy"
        decoding="async"
      />
      <span>Marguerite Lyon</span>
      <p>Stories are not only what we remember. They are how we understand what remains.</p>
    </a>
  )
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

function SocialIcon({ type }) {
  return (
    <span className="social-icon" aria-hidden="true">
      <LyonDenIcon name={type} />
    </span>
  )
}

function SocialLinks({ className = '' }) {
  return (
    <div className={`social-links ${className}`.trim()} aria-label="The Lyon Den social links">
      {socialLinks.map((link) => (
        <a className="social-link" href={link.href} key={link.label} {...youtubeLinkProps}>
          <SocialIcon type={link.icon} />
          {link.label}
        </a>
      ))}
    </div>
  )
}

const publicNavItems = [
  { label: 'Home', href: '/' },
  { label: 'Stories', href: '/collections/legacy-lessons' },
  { label: 'Watch', href: '/episodes' },
  { label: 'From the Bookshelf', href: '/collections/books-that-changed-me' },
  { label: 'Field Notes', href: '/field-notes' },
  { label: 'About Marguerite', href: '/about' },
  { label: 'The Archive', href: '/archive' },
  { label: 'Journal', href: '/blog' },
]

function SiteHeader({ variant = 'light', subtitle = 'Preserving wisdom through beautiful storytelling.' }) {
  return (
    <header className={`site-header heirloom-header heirloom-header-${variant}`} aria-label="TruthLoveMoney.com header">
      <a className="brand" href="/" aria-label="TruthLoveMoney.com home">
        <img src="/assets/watermark-logo.png" alt="" className="brand-logo" />
        <span>
          <strong>The Lyon Den</strong>
          <small>{subtitle}</small>
        </span>
      </a>
      <a className="mobile-youtube-link heirloom-mobile-link" href="/archive">
        The Archive
      </a>
      <nav className="site-nav heirloom-nav" aria-label="Primary navigation">
        {publicNavItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="footer heirloom-footer">
      <div className="footer-bookplate">
        <img src="/assets/watermark-logo.png" alt="" className="footer-logo" />
        <p>Preserving wisdom through beautiful storytelling.</p>
      </div>
      <nav aria-label="Footer navigation" className="footer-nav">
        {publicNavItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="footer-meta">
        <p>TruthLoveMoney.com</p>
        <p>The Lyon Den • Produced with ReNewTech Solutions</p>
        <p>Never Stop Learning</p>
        <SocialLinks />
        <div className="footer-quiet-links">
          <a href="/archive">Archive</a>
        </div>
      </div>
    </footer>
  )
}

function usePageMeta({ title, description, image = '/assets/watermark-logo.png', type = 'website' }) {
  useEffect(() => {
    const previousTitle = document.title
    const descriptionMeta =
      document.querySelector('meta[name="description"]') ||
      document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description' }))
    const previousDescription = descriptionMeta.getAttribute('content')
    const cleanTitle = title || 'The Lyon Den | Stories, Memory, Literature & Legacy'
    const cleanDescription =
      description ||
      'Enter The Lyon Den, a living archive where Marguerite Lyon’s memories, reflections, books, and lessons become cinematic episodes, written stories, and lasting legacy.'
    const cleanupMeta = [
      setMetaContent('meta[property="og:title"]', { property: 'og:title' }, cleanTitle),
      setMetaContent('meta[property="og:description"]', { property: 'og:description' }, cleanDescription),
      setMetaContent('meta[property="og:type"]', { property: 'og:type' }, type),
      setMetaContent('meta[property="og:image"]', { property: 'og:image' }, image),
      setMetaContent('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image'),
    ]

    document.title = cleanTitle
    descriptionMeta.setAttribute('content', cleanDescription)

    return () => {
      document.title = previousTitle
      cleanupMeta.forEach((cleanup) => cleanup())
      if (previousDescription === null) {
        descriptionMeta.removeAttribute('content')
      } else {
        descriptionMeta.setAttribute('content', previousDescription)
      }
    }
  }, [title, description, image, type])
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

  useEffect(() => {
    const handleNavigation = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handleNavigation)
    return () => window.removeEventListener('popstate', handleNavigation)
  }, [])

  const normalizedPath = path.replace(/\/+$/, '') || '/'

  if (normalizedPath === '/vault' || normalizedPath === '/vault-admin' || normalizedPath === '/auth/callback') {
    return <RetiredCreatorPage />
  }

  const selectedPost = getPostByPath(normalizedPath)

  if (normalizedPath === '/blog') {
    return <JournalPage />
  }

  if (selectedPost) {
    return <BlogPostPage post={selectedPost} />
  }

  if (normalizedPath === '/episodes' || normalizedPath === '/watch') {
    return <EpisodesPage />
  }

  if (normalizedPath === '/field-notes') {
    return <CollectionPage collection={getCollectionBySlug('field-notes')} />
  }

  if (normalizedPath === '/stories') {
    return <CollectionPage collection={getCollectionBySlug('legacy-lessons')} />
  }

  if (normalizedPath === '/bookshelf' || normalizedPath === '/from-the-bookshelf') {
    return <CollectionPage collection={getCollectionBySlug('books-that-changed-me')} />
  }

  if (normalizedPath === '/archive' || normalizedPath === '/the-archive') {
    return <ArchivePage />
  }

  if (normalizedPath === '/about') {
    return <AboutPage />
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

function RetiredCreatorPage() {
  usePageMeta({
    title: 'The Lyon Den | Continue the Story',
    description:
      'The Lyon Den public site now focuses on Journal articles, literary collections, episodes, and social storytelling.',
    image: '/assets/watermark-logo.png',
  })

  return (
    <main className="site-shell blog-shell">
      <SiteHeader subtitle="A literary archive of story, memory, and wisdom." />
      <section className="archive-hero section-shell creator-retired" aria-labelledby="creator-retired-title">
        <p className="eyebrow">Continue the Story</p>
        <h1 id="creator-retired-title">The public site is now a literary archive.</h1>
        <p>
          The former private creator tools are no longer maintained here. Explore the Journal,
          browse the collections, or follow The Lyon Den for new stories, reflections, and videos.
        </p>
        <div className="inline-actions">
          <a className="button button-primary" href="/blog">Read the Journal</a>
          <a className="button button-secondary" href="/archive">Enter the Archive</a>
        </div>
      </section>
      <section className="social-invitation section-shell quiet-section" aria-labelledby="retired-social-title">
        <div className="section-heading centered">
          <p className="eyebrow">Continue the Story</p>
          <h2 id="retired-social-title">CONTINUE THE STORY</h2>
          <p>Read here. Reflect with us. Then follow The Lyon Den wherever stories continue.</p>
        </div>
        <div className="social-platform-grid">
          {socialPlatforms.map((platform) => (
            <SocialPlatformCard platform={platform} key={platform.label} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}

function HomePage() {
  const chapters = useLatestChapters()
  const latestChapter = chapters.find((chapter) => chapter.title === 'The Summer That Never Left Me') || chapters[0] || curatedChapters[0]
  const summerStory = getPostByPath('/blog/the-summer-that-never-left-me') || featuredBlogPost
  const beforePost = getPostByPath('/journal/before-the-forgetting') || blogPosts[0]
  const betweenPost = getPostByPath('/blog/between-winter-and-spring')
  const fillPost = getPostByPath('/blog/fill-your-days-with-stories-that-make-your-heart-wiser')
  const booksPost = getPostByPath('/blog/books-that-never-really-leave-us')
  const pillarCollections = [
    'stories-from-a-life',
    'field-notes',
    'illustrated-pages',
    'books-that-changed-me',
    'living-places',
    'daily-chapters',
    'wildflowers-wisdom',
    'the-long-goodbye',
  ]
    .map(getCollectionBySlug)
    .filter(Boolean)

  usePageMeta({
    title: 'The Lyon Den | Stories, Memory, Literature & Legacy',
    description:
      'Enter The Lyon Den, a living archive where Marguerite Lyon’s memories, reflections, books, and lessons become cinematic episodes, written stories, and lasting legacy.',
    image: '/assets/carry-love-forward-comic.png',
  })

  return (
    <main className="site-shell heirloom-site" id="top">
      <section className="editorial-hero" aria-labelledby="hero-title">
        <SiteHeader variant="dark" />
        <div className="section-shell editorial-hero-layout">
          <div className="editorial-hero-copy">
            <p className="eyebrow">A Living Archive of Story, Memory &amp; Wisdom</p>
            <h1 id="hero-title">THE LYON DEN</h1>
            <p className="hero-deck">Stories. Memory. Reflection. Wonder.</p>
            <p>
              A literary home for the stories that shape us, the memories that remain,
              and the wisdom we carry forward.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-primary" href="/blog">
                READ THE JOURNAL
              </a>
              <a className="story-link" href="#social-platforms">
                FOLLOW THE STORY
              </a>
            </div>
            <a className="turn-page-cue" href="#latest-journal">
              <span aria-hidden="true" />
              Open the Journal
            </a>
          </div>
          <div className="hero-collage" aria-label="Editorial collage for The Lyon Den">
            <div className="hero-paper hero-paper-note parallax-drift" aria-hidden="true">
              <LyonDenIcon name="fountainPen" />
              <span>Letters, books, memory, and wonder.</span>
            </div>
            <figure className="hero-portrait-card">
              <img
                src="/assets/marguerite-library-selfie.png"
                alt="Marguerite Lyon seated in a warm library surrounded by books."
                fetchPriority="high"
                decoding="async"
              />
            </figure>
            <figure className="hero-comic-card parallax-drift">
              <img
                src="/assets/carry-love-forward-comic.png"
                alt="Illustrated Lyon Den comic about carrying love forward and continuing to find joy in life."
                loading="eager"
                decoding="async"
              />
            </figure>
            <div className="hero-paper hero-paper-quote" aria-hidden="true">
              <LyonDenIcon name="lantern" />
              <span>Carry love forward.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="journal-collage-section section-shell quiet-section" id="latest-journal" aria-labelledby="written-title">
        <div className="section-heading">
          <p className="eyebrow">Latest Journal</p>
          <h2 id="written-title">A living shelf of stories, books, and memory.</h2>
          <p>
            Begin with the newest memoir chapter, then wander into seasonal reflections,
            literary essays, illustrated pages, and the quieter notes that keep wisdom alive.
          </p>
        </div>
        <div className="journal-collage-grid">
          <JournalCollageArticle post={beforePost} variant="featured" />
          <JournalCollageArticle post={betweenPost} variant="tall" />
          <JournalQuoteTile icon="hourglass" tone="ink">
            Before the forgetting, there was a lifetime of remembering.
          </JournalQuoteTile>
          <JournalCollageArticle post={fillPost} variant="wide" />
          <JournalArtworkTile />
          <JournalCollageArticle post={booksPost} variant="standard" />
          <a className="journal-collage-wildflower" href="/collections/wildflowers-wisdom">
            <img
              src="/assets/wildflowers-never-ask-permission.png"
              alt="Illustrated Wildflowers and Wisdom artwork about blooming without asking permission."
              loading="lazy"
              decoding="async"
            />
            <span>Wildflowers &amp; Wisdom</span>
            <strong>Never cease to find some joy in life.</strong>
          </a>
          <JournalAuthorTile />
          <JournalQuoteTile icon="openBook" tone="gold">
            Some chapters end quietly. Others deserve to be sung at full volume.
          </JournalQuoteTile>
        </div>
      </section>

      <section className="collections section-shell quiet-section archive-pillars" aria-labelledby="home-collections-title">
        <div className="section-heading">
          <p className="eyebrow">The Archive</p>
          <h2 id="home-collections-title">Pillars of The Lyon Den.</h2>
        </div>
        <div className="collection-grid featured-collection-grid">
          {pillarCollections.map((collection) => (
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

      <section className="premiere-section" id="featured-chapter" aria-labelledby="featured-chapter-title">
        <div className="section-shell premiere-layout">
          <figure className="cinematic-poster">
            <img
              src="/assets/summer-that-never-left-me.png"
              alt="Painterly summer chapter artwork for The Summer That Never Left Me"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="premiere-copy">
            <p className="chapter-kicker">Latest Chapter</p>
            <h2 id="featured-chapter-title">The Summer That Never Left Me</h2>
            <p>
              A warm, reflective story about childhood, memory, summer, and the moments that
              remain with us long after the season has passed.
            </p>
            <div className="inline-actions">
              <a className="button button-primary" href={latestChapter.url} {...youtubeLinkProps}>
                Watch the Episode
              </a>
              <a className="button button-secondary" href={summerStory.path}>
                Read the Story
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuoteInterlude quote={homepageQuotes[0]} className="section-shell" />

      <section className="storyteller-spread section-shell quiet-section" id="about" aria-labelledby="storyteller-title">
        <div className="portrait-bookplate">
          <img
            src="/assets/marguerite-library-selfie.png"
            alt="Marguerite Lyon seated in a warm library surrounded by books."
            loading="lazy"
            decoding="async"
          />
          <span>Marguerite Lyon</span>
        </div>
        <div className="storyteller-copy">
          <p className="eyebrow">About Marguerite</p>
          <h2 id="storyteller-title">Stories gathered over a lifetime deserve more than a passing moment.</h2>
          <p>
            Marguerite Lyon reflects on literature, family, truth, love, money, poetry,
            and the small memories that quietly shape a life. The Lyon Den preserves those
            reflections as written chapters, illustrated pages, and gentle video stories.
          </p>
          <blockquote>“Preserve wisdom through beautiful storytelling.”</blockquote>
          <a className="text-link" href="/about">Meet Marguerite</a>
        </div>
      </section>

      <section className="social-invitation section-shell quiet-section" id="social-platforms" aria-labelledby="social-title">
        <div className="section-heading centered">
          <p className="eyebrow">Continue the Story</p>
          <h2 id="social-title">CONTINUE THE STORY</h2>
          <p>
            Read here. Reflect with us. Then follow The Lyon Den wherever stories continue.
          </p>
        </div>
        <div className="social-platform-grid">
          {socialPlatforms.map((platform) => (
            <SocialPlatformCard platform={platform} key={platform.label} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

function EpisodesPage() {
  usePageMeta({
    title: 'Watch The Lyon Den Episodes | Stories & Life Lessons',
    description:
      'Watch gentle video chapters from The Lyon Den, including spoken stories, reflections, and life lessons from Marguerite Lyon.',
    image: '/assets/summer-that-never-left-me.png',
  })

  return (
    <main className="site-shell blog-shell">
      <header className="site-header blog-header" aria-label="TruthLoveMoney.com episodes header">
        <a className="brand" href="/" aria-label="TruthLoveMoney.com home">
          <img src="/assets/watermark-logo.png" alt="" className="brand-logo" />
          <span>
            <strong>TruthLoveMoney.com</strong>
            <small>The Lyon Den Episodes</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Episodes navigation">
          <a href="/">Home</a>
          <a href="/blog">Journal</a>
          <a href="/episodes">Episodes</a>
          <a href="/field-notes">Field Notes</a>
          <a href="/poetry">Poetry</a>
          <a href="/#about">About</a>
        </nav>
      </header>

      <section className="archive-hero section-shell" aria-labelledby="episodes-title">
        <p className="eyebrow">Episodes</p>
        <h1 id="episodes-title">Gentle chapters from The Lyon Den.</h1>
        <p>
          Video reflections and spoken stories from Marguerite, gathered here as a quiet
          shelf for listening, learning, and returning.
        </p>
      </section>

      <section className="journal-index section-shell" aria-labelledby="episodes-index-title">
        <div className="section-heading">
          <p className="eyebrow">Latest Chapters</p>
          <h2 id="episodes-index-title">Watch the Episodes</h2>
        </div>
        <div className="simple-card-grid journal-preview-grid">
          {curatedChapters.map((chapter) => (
            <a
              className="simple-editorial-card"
              href={chapter.url}
              key={chapter.title}
              {...youtubeLinkProps}
            >
              <div className="simple-card-seal" aria-hidden="true">
                <LyonDenIcon name={getCover(chapter.coverId).icon} />
              </div>
              <p className="eyebrow">{chapter.publishedAt}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
              <span className="text-link">Watch on YouTube</span>
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
          <SocialLinks />
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

  usePageMeta({
    title: 'The Lyon Den Journal | Written Stories, Poetry & Legacy Lessons',
    description:
      'Read The Lyon Den Journal: literary reflections, teaching memories, poetry, books, family lessons, and story-shaped wisdom.',
    image: '/assets/watermark-logo.png',
  })

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
          <a href="/episodes">Episodes</a>
          <a href="/field-notes">Field Notes</a>
          <a href="/poetry">Poetry</a>
          <a href="/#about">About</a>
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
        {normalizedSearch ? (
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
        ) : (
          <div className="journal-collage-grid journal-collage-grid-archive">
            {filteredPosts.map((post, index) => (
              <JournalCollageArticle
                post={post}
                variant={index === 0 ? 'featured' : index === 1 ? 'tall' : index === 2 ? 'wide' : 'standard'}
                key={post.path}
              />
            ))}
            <JournalQuoteTile icon="wildflower" tone="gold">
              Fill your days with stories that make your heart wiser.
            </JournalQuoteTile>
          </div>
        )}
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
          <SocialLinks />
        </div>
      </footer>
    </main>
  )
}

function CollectionPage({ collection }) {
  const entries = getCollectionEntries(collection.slug)
  const journalEntries = entries.filter((entry) => entry.type === 'Journal')
  const supportingEntries = entries.filter((entry) => entry.type !== 'Journal')

  usePageMeta({
    title: `${collection.title} | The Lyon Den Archive`,
    description: collection.description,
    image: '/assets/watermark-logo.png',
  })

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
          <a href="/episodes">Episodes</a>
          <a href="/field-notes">Field Notes</a>
          <a href="/poetry">Poetry</a>
          <a href="/#about">About</a>
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
          <SocialLinks />
        </div>
      </footer>
    </main>
  )
}

function ArchivePage() {
  const [activeType, setActiveType] = useState('All')
  const entries = getArchiveEntries()
  const entryTypesForFilter = ['All', ...Array.from(new Set(entries.map((entry) => entry.type)))]
  const filteredEntries = activeType === 'All' ? entries : entries.filter((entry) => entry.type === activeType)

  usePageMeta({
    title: 'The Lyon Den Archive | Stories, Episodes, Poetry & Field Notes',
    description:
      'Browse The Lyon Den living archive of stories, episodes, poetry, field notes, books, reflections, and legacy lessons.',
    image: '/assets/banner.png',
  })

  return (
    <main className="site-shell blog-shell archive-page">
      <SiteHeader subtitle="The living archive of stories, episodes, poetry, and field notes." />

      <section className="archive-hero archive-page-hero section-shell" aria-labelledby="archive-page-title">
        <p className="eyebrow">The Archive</p>
        <h1 id="archive-page-title">A curated library of memory and meaning.</h1>
        <p>
          Browse written chapters, spoken episodes, poetry reflections, field notes, and
          the growing shelves of The Lyon Den.
        </p>
      </section>

      <section className="section-shell archive-filter-panel" aria-label="Archive filters">
        <div className="archive-filter-buttons">
          {entryTypesForFilter.map((type) => (
            <button
              type="button"
              className={type === activeType ? 'archive-filter active' : 'archive-filter'}
              onClick={() => setActiveType(type)}
              key={type}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <section className="section-shell archive-index" aria-labelledby="archive-index-title">
        <div className="section-heading">
          <p className="eyebrow">{filteredEntries.length} {filteredEntries.length === 1 ? 'Piece' : 'Pieces'}</p>
          <h2 id="archive-index-title">Open a drawer.</h2>
        </div>
        <div className="archive-drawer-list">
          {filteredEntries.map((entry, index) => (
            <a
              className="archive-drawer"
              href={entry.path}
              key={`${entry.type}-${entry.title}`}
              {...(entry.external ? youtubeLinkProps : {})}
            >
              <span className="archive-drawer-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="eyebrow">{entry.type} {entry.date ? `• ${entry.date}` : ''}</p>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </div>
              <span className="text-link">{entry.external ? 'Watch' : 'Read'}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="collections section-shell" aria-labelledby="archive-collections-title">
        <div className="section-heading">
          <p className="eyebrow">Collections</p>
          <h2 id="archive-collections-title">Shelves within the archive.</h2>
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

      <SiteFooter />
    </main>
  )
}

function AboutPage() {
  usePageMeta({
    title: 'About Marguerite Lyon | The Lyon Den',
    description:
      'Meet Marguerite Lyon, the storyteller at the heart of The Lyon Den, a living archive of memory, literature, reflection, and legacy.',
    image: '/assets/marguerite-library-selfie.png',
  })

  return (
    <main className="site-shell blog-shell about-page">
      <SiteHeader subtitle="The storyteller at the heart of The Lyon Den." />

      <section className="about-hero section-shell" aria-labelledby="about-page-title">
        <div className="portrait-bookplate">
          <img
            src="/assets/marguerite-library-selfie.png"
            alt="Marguerite Lyon seated in a warm library surrounded by books"
            loading="lazy"
          />
          <span>Marguerite Lyon</span>
        </div>
        <div>
          <p className="eyebrow">About Marguerite</p>
          <h1 id="about-page-title">The storyteller at the heart of The Lyon Den.</h1>
          <p>
            The Lyon Den exists to preserve memories, books, lessons, and reflections in a
            form that can be returned to, shared, and treasured.
          </p>
        </div>
      </section>

      <section className="about-manifesto section-shell" aria-labelledby="about-manifesto-title">
        <p className="eyebrow">Storytelling Philosophy</p>
        <h2 id="about-manifesto-title">A life becomes legacy when its stories are preserved with care.</h2>
        <div className="manifesto-columns">
          <p>
            Marguerite reflects on literature, teaching, memory, family, work, truth, love,
            and money with the warmth of a conversation and the patience of a journal page.
          </p>
          <p>
            ReNewTech Solutions produces, edits, designs, publishes, and manages the platform
            so each story can become part of a beautiful living archive.
          </p>
        </div>
      </section>

      <section className="philosophy-section about-philosophy" aria-labelledby="about-values-title">
        <div className="section-shell philosophy-layout">
          <div>
            <p className="eyebrow">Why It Exists</p>
            <h2 id="about-values-title">Some lessons should not disappear with time.</h2>
          </div>
          <p>
            The Lyon Den gathers stories, books, poetry, field notes, and keepsakes so wisdom
            can be preserved beautifully, one chapter at a time.
          </p>
          <a className="button button-secondary" href="/archive">Enter the Archive</a>
        </div>
      </section>

      <SiteFooter />
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
    const cleanOgDescription = post.ogDescription || cleanDescription
    const cleanTitle = post.seoTitle || `${post.title} | The Lyon Den Journal`
    const canonicalPath = post.canonicalPath || post.path
    const canonicalHref = `${window.location.origin}${canonicalPath}`
    const cleanupMeta = [
      setMetaContent('meta[property="og:title"]', { property: 'og:title' }, cleanTitle),
      setMetaContent('meta[property="og:description"]', { property: 'og:description' }, cleanOgDescription),
      setMetaContent('meta[property="og:type"]', { property: 'og:type' }, 'article'),
      setMetaContent('meta[property="og:image"]', { property: 'og:image' }, getPostOgImage(post)),
      setMetaContent('meta[name="keywords"]', { name: 'keywords' }, getPostTags(post).join(', ')),
      setCanonicalHref(canonicalHref),
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
          <a href="/episodes">Episodes</a>
          <a href="/field-notes">Field Notes</a>
          <a href="/poetry">Poetry</a>
          <a href="/#about">About</a>
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
          {post.note && <p className="article-note-inline">{post.note}</p>}
          <div className="blog-meta" aria-label="Article details">
            <span className="author-meta">
              <img
                src="/assets/marguerite-library-selfie.png"
                alt=""
                loading="lazy"
              />
              By {post.author}
            </span>
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
          <h2 id="blog-next-title">Carry the next question with you.</h2>
          <p>
            Read here. Reflect with us. Then follow The Lyon Den wherever stories continue.
          </p>
        </div>
        <a className="button button-primary" href="/archive">
          Explore the Archive
        </a>
      </section>

      <footer className="footer">
        <img src="/assets/watermark-logo.png" alt="" className="footer-logo" />
        <div>
          <p>TruthLoveMoney.com</p>
          <p>The Lyon Den • Hosted by Marguerite</p>
          <p>Never Stop Learning</p>
          <SocialLinks />
        </div>
      </footer>
    </main>
  )
}

function PoetryPage() {
  usePageMeta({
    title: 'Poems That Stayed With Me | The Lyon Den Poetry',
    description:
      'A copyright-safe poetry reflection from The Lyon Den about poems, memory, teaching literature, and the ordinary moments that stay with us.',
    image: '/assets/watermark-logo.png',
  })

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
          href="/blog"
          aria-label="Open The Lyon Den Journal"
        >
          Journal
        </a>
        <nav className="site-nav" aria-label="Poetry navigation">
          <a href="/">Home</a>
          <a href="/blog">Journal</a>
          <a href="/episodes">Episodes</a>
          <a href="/field-notes">Field Notes</a>
          <a href="/poetry">Poetry</a>
          <a href="/#about">About</a>
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
          <SocialLinks />
        </div>
      </footer>
    </main>
  )
}

export default App
