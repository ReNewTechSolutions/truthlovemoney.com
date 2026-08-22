import { getStory, stories } from './stories.js'

export const siteUrl = 'https://truthlovemoney.com'
export const youtubeUrl = 'https://www.youtube.com/@TheLyonDen-Marguerite'

export const socialLinks = [
  {
    name: 'YouTube',
    eyebrow: 'Watch the latest chapters',
    url: youtubeUrl,
  },
]

const staticPages = {
  '/': {
    title: 'The Lyon Den | Stories by Marguerite Lyon',
    description:
      'Stories about love, memory, books, family, second chances, and the things we understand differently with time.',
    image: '/assets/banner-main.jpg',
    schemaType: 'WebSite',
    changefreq: 'weekly',
    priority: '1.0',
  },
  '/stories': {
    title: 'Stories | The Lyon Den',
    description:
      'Browse Marguerite Lyon’s stories about memory, literature, family, love, and the lessons a life leaves behind.',
    image: '/assets/summer-story.webp',
    schemaType: 'CollectionPage',
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/about': {
    title: 'About Marguerite Lyon | The Lyon Den',
    description:
      'Meet Marguerite Lyon, the lifelong reader, former teacher, and storyteller behind The Lyon Den.',
    image: '/assets/marguerite-portrait.webp',
    schemaType: 'AboutPage',
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/archetypes': {
    title: 'Which Feminine Archetype Is Guiding Your Life Right Now?',
    description:
      'Ten questions. Five archetypes. Discover which energy is shaping your next chapter.',
    image: '/assets/archetype-quiz-cover.jpg',
    imageAlt: 'Which Feminine Archetype Is Guiding Your Life Right Now? — The Lyon Den',
    imageHeight: 630,
    imageType: 'image/jpeg',
    imageWidth: 1200,
    schemaType: 'WebPage',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/romance-era': {
    title: 'What Era of Romance Does Your Heart Belong To? | The Lyon Den',
    description:
      'Ten little choices. One romantic era. Discover whether your heart belongs to devoted love, free-spirited romance, cinematic passion, grand gestures—or somewhere outside of time entirely.',
    image: '/assets/romance-era/results/devoted-romantic-1940s.png',
    imageAlt: 'What Era of Romance Does Your Heart Belong To? — The Lyon Den',
    imageHeight: 1369,
    imageType: 'image/png',
    imageWidth: 1149,
    schemaType: 'WebPage',
    changefreq: 'monthly',
    priority: '0.9',
  },
  '/privacy': {
    title: 'Privacy | The Lyon Den',
    description: 'Privacy information for visitors to The Lyon Den at truthlovemoney.com.',
    image: '/assets/banner-main.jpg',
    schemaType: 'WebPage',
    changefreq: 'yearly',
    priority: '0.2',
  },
}

function normalizePath(path) {
  return path.replace(/\/+$/, '') || '/'
}

export function getSeoForPath(inputPath) {
  const path = normalizePath(inputPath)
  const legacyMatch = path.match(/^\/blog\/(.+)$/)
  const storyMatch = path.match(/^\/stories\/(.+)$/)
  const story = getStory(storyMatch?.[1] || legacyMatch?.[1])

  if (story) {
    const canonicalPath = `/stories/${story.slug}`
    return {
      title: `${story.title} | The Lyon Den`,
      description: story.excerpt,
      canonicalPath,
      image: story.heroImage,
      ogType: 'article',
      schemaType: 'Article',
      story,
      changefreq: 'monthly',
      priority: '0.8',
    }
  }

  const canonicalPath = path === '/blog' ? '/stories' : path
  const page = staticPages[canonicalPath]

  if (page) {
    return {
      ...page,
      canonicalPath,
      ogType: 'website',
    }
  }

  return {
    title: 'Page Not Found | The Lyon Den',
    description: 'This page could not be found.',
    canonicalPath: '/404',
    image: '/assets/banner-main.jpg',
    ogType: 'website',
    schemaType: 'WebPage',
    noindex: true,
  }
}

export function getStructuredData(seo) {
  const canonicalUrl = `${siteUrl}${seo.canonicalPath}`

  if (seo.story) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: seo.story.title,
      description: seo.story.excerpt,
      image: `${siteUrl}${seo.story.heroImage}`,
      author: { '@type': 'Person', name: seo.story.author },
      publisher: { '@type': 'Organization', name: 'The Lyon Den' },
      mainEntityOfPage: canonicalUrl,
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': seo.schemaType,
    name: seo.title,
    url: canonicalUrl,
    description: seo.description,
  }
}

export function getPublicRoutes() {
  return [
    ...Object.keys(staticPages),
    ...stories.map((story) => `/stories/${story.slug}`),
  ]
}
