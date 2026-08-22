export const stories = [
  {
    slug: 'the-summer-that-never-left-me',
    title: 'The Summer That Never Left Me',
    subtitle: 'How one poem reminded me that memories never really leave us.',
    excerpt:
      'A reflection on poetry, summer afternoons, family, teaching, and the small objects that become chapters of a life.',
    author: 'Marguerite Lyon',
    category: 'Memory',
    date: 'June 2026',
    readingTime: '5 min read',
    heroImage: '/assets/summer-story.webp',
    heroAlt: 'Old books and an open volume beside a flower-lined creek in warm summer light',
    featured: true,
    series: 'The Lyon Den Journal',
    episode: 2,
    pullQuote: 'Memories have a remarkable way of waiting patiently until something awakens them.',
    content: [
      { type: 'paragraph', text: 'Sometimes a poem doesn’t simply give us words.' },
      { type: 'paragraph', text: 'Sometimes it quietly opens a door.' },
      {
        type: 'paragraph',
        text: 'Recently I reread a favorite poem that immediately carried me back to summers I thought I had almost forgotten.',
      },
      {
        type: 'paragraph',
        text: 'Family afternoons at the swimming pool. The sound of laughter. Friends. Students. The simple joy of sharing books and discovering new stories together.',
      },
      {
        type: 'quote',
        text: 'Memories have a remarkable way of waiting patiently until something awakens them.',
      },
      {
        type: 'paragraph',
        text: 'A scent. A photograph. A favorite book. A poem.',
      },
      {
        type: 'paragraph',
        text: 'One of the things I loved most about teaching was watching students discover that literature isn’t simply something we read. It’s something we experience.',
      },
      {
        type: 'paragraph',
        text: 'Every reader brings a different life to every page. That’s why one poem can mean something entirely different to each person who encounters it.',
      },
      {
        type: 'paragraph',
        text: 'Perhaps that’s the true gift of literature. It reminds us that our own stories matter.',
      },
      { type: 'divider' },
      {
        type: 'paragraph',
        text: 'Some of my happiest memories involve water. Summers with family. Later, watching my parents enjoy the swimming pool they worked so hard to build. Moments that seemed ordinary then but have become priceless now.',
      },
      {
        type: 'paragraph',
        text: 'One small object can hold an entire lifetime of memories: a favorite kitchen utensil, a treasured ring from a parent, a book whose pages have become worn through years of reading.',
      },
      {
        type: 'paragraph',
        text: 'These things become more than objects. They become chapters.',
      },
      {
        type: 'paragraph',
        text: 'The older I become, the more I realize that memories don’t fade because they’re unimportant. The important ones simply become part of who we are.',
      },
      {
        type: 'image',
        src: '/assets/life-lessons.webp',
        alt: 'Marguerite writing beside books and a creek in a warm watercolor-style scene',
        caption: 'Stories, wisdom, and life lessons — gathered one chapter at a time.',
      },
      {
        type: 'paragraph',
        text: 'Perhaps every story has something to teach us. And perhaps every memory is quietly waiting for the right moment to bloom again.',
      },
      { type: 'paragraph', text: 'Welcome to The Lyon Den. Never stop learning.' },
    ],
  },
  {
    slug: 'every-story-has-something-to-teach-us',
    title: 'Every Story Has Something to Teach Us',
    subtitle: 'Why I created The Lyon Den.',
    excerpt:
      'A welcome to the stories, books, questions, and lifelong learning that shape this literary home.',
    author: 'Marguerite Lyon',
    category: 'Life',
    date: 'June 2026',
    readingTime: '4 min read',
    heroImage: '/assets/lessons-that-last.webp',
    heroAlt: 'Marguerite sharing a book with an intimate group in a warmly lit room',
    featured: false,
    series: 'The Lyon Den Journal',
    episode: 1,
    pullQuote: 'Every story has something to teach us.',
    content: [
      {
        type: 'paragraph',
        text: 'Throughout my life, I’ve been fortunate to learn from wonderful teachers, remarkable books, family, friendships, mistakes, and experiences I never could have predicted.',
      },
      { type: 'quote', text: 'Every story has something to teach us.' },
      {
        type: 'paragraph',
        text: 'Some lessons come through joy. Some come through heartbreak. Some come quietly through books, conversations, memories, music, nature, or ordinary days that become meaningful only after time has passed.',
      },
      {
        type: 'paragraph',
        text: 'The Lyon Den was created as a place to preserve those lessons and share them with anyone who might need them.',
      },
      {
        type: 'paragraph',
        text: 'Here, we explore truth, love, money, literature, poetry, personal growth, and lifelong learning. Not because we have all the answers, but because staying curious keeps us growing.',
      },
      { type: 'divider' },
      {
        type: 'paragraph',
        text: 'My hope is that The Lyon Den becomes a warm place for reflection — a place where stories become lessons, books become conversations, and wisdom is shared one chapter at a time.',
      },
      {
        type: 'paragraph',
        text: 'Every life holds chapters worth remembering. Every experience can become a seed of wisdom. And every story, if shared with love, has the power to encourage someone else.',
      },
      { type: 'paragraph', text: 'Welcome to The Lyon Den. Never stop learning.' },
    ],
  },
]

export const socialChapters = [
  {
    title: 'Broadway Dreams & The Shower Concert',
    label: 'A video chapter',
    description: 'Private songs, unexpected stages, and the dreams that keep humming.',
    url: null,
  },
  {
    title: 'Love Changes',
    label: 'A reflection',
    description: 'Connection, change, courage, and the lessons love leaves behind.',
    url: null,
  },
  {
    title: 'The Book That Changed My Life',
    label: 'From the bookshelf',
    description: 'The pages that change us and the sentences we carry forward.',
    url: null,
  },
  {
    title: 'One Bite at a Time',
    label: 'A life lesson',
    description: 'Taking the long road slowly, faithfully, and one small step at a time.',
    url: null,
  },
]

export const featuredStory = stories.find((story) => story.featured) || stories[0]

export function getStory(slug) {
  return stories.find((story) => story.slug === slug)
}

export function getSeriesNeighbors(story) {
  const chapters = stories
    .filter((candidate) => candidate.series === story.series)
    .sort((a, b) => a.episode - b.episode)
  const index = chapters.findIndex((candidate) => candidate.slug === story.slug)

  return {
    previous: chapters[index - 1] || null,
    next: chapters[index + 1] || null,
  }
}
