export function LyonDenIcon({ name = 'lion', title }) {
  const labeled = Boolean(title)
  const commonProps = {
    viewBox: '0 0 64 64',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': labeled ? undefined : 'true',
    role: labeled ? 'img' : undefined,
    focusable: 'false',
  }

  const titleNode = labeled ? <title>{title}</title> : null

  if (name === 'lioness') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
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
        {titleNode}
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
        {titleNode}
        <path d="M10 18c7-3 15-2 22 3v29c-7-5-15-6-22-3V18Z" />
        <path d="M54 18c-7-3-15-2-22 3v29c7-5 15-6 22-3V18Z" />
        <path d="M32 21v29M16 27c4-1 8 0 12 2M16 35c4-1 8 0 12 2M48 27c-4-1-8 0-12 2M48 35c-4-1-8 0-12 2" />
      </svg>
    )
  }

  if (name === 'lantern') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M25 12h14M28 12c0 5-5 7-5 13v21c0 4 4 7 9 7s9-3 9-7V25c0-6-5-8-5-13" />
        <path d="M23 26h18M23 45h18M32 25c-5 7-5 14 0 20 5-6 5-13 0-20Z" />
        <path d="M18 53h28M32 8v4" />
      </svg>
    )
  }

  if (name === 'journal') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M18 12h25c4 0 7 3 7 7v33H23c-5 0-9-4-9-9V16c0-2 2-4 4-4Z" />
        <path d="M23 12v40M30 22h12M30 30h12M30 38h9" />
        <path d="M18 52c2-3 5-4 10-4h22" />
      </svg>
    )
  }

  if (name === 'creek') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M8 40c9-8 16-8 24 0s15 8 24 0" />
        <path d="M10 29c8-6 15-6 22 0s14 6 22 0" />
        <path d="M17 18c5-4 10-4 15 0s10 4 15 0" />
        <path d="M20 49h24" />
      </svg>
    )
  }

  if (name === 'fountainPen') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M42 8l14 14-28 28-14 4 4-14L42 8Z" />
        <path d="M36 14l14 14M18 40l6 6M14 54l13-13" />
        <path d="M27 41c2-5 6-8 11-10" />
      </svg>
    )
  }

  if (name === 'wildflower') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M32 56V26" />
        <path d="M22 36c6-2 10-6 10-12-6 1-10 5-10 12ZM42 39c-6-2-10-6-10-13 6 1 10 5 10 13Z" />
        <path d="M32 20c-5-4-5-9 0-13 5 4 5 9 0 13ZM24 23c-6 0-9-4-9-9 6 0 9 3 9 9ZM40 23c6 0 9-4 9-9-6 0-9 3-9 9Z" />
      </svg>
    )
  }

  if (name === 'teacup') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M14 28h30v8c0 8-6 14-15 14S14 44 14 36v-8Z" />
        <path d="M44 31h4c4 0 7 3 7 7s-3 7-7 7h-5" />
        <path d="M20 55h22M24 17c-2-4 2-6 0-10M34 17c-2-4 2-6 0-10" />
      </svg>
    )
  }

  if (name === 'bookmark') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M20 10h24v44L32 45 20 54V10Z" />
        <path d="M26 20h12M26 28h12" />
      </svg>
    )
  }

  if (name === 'hourglass') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M20 10h24M20 54h24M23 10c0 11 18 13 18 22S23 43 23 54M41 10c0 11-18 13-18 22s18 11 18 22" />
        <path d="M28 24h8M27 44h10" />
      </svg>
    )
  }

  if (name === 'feather') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M13 52c8-20 19-34 39-40 0 18-10 31-31 37" />
        <path d="M25 43c7-2 13-5 18-10M30 34h13M36 25h10" />
      </svg>
    )
  }

  if (name === 'star') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M32 10l5 15 15 7-15 7-5 15-5-15-15-7 15-7 5-15Z" />
        <path d="M32 24v16M24 32h16" />
      </svg>
    )
  }

  if (name === 'play') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <path d="M18 12v40l32-20-32-20Z" />
      </svg>
    )
  }

  if (name === 'camera') {
    return (
      <svg className="lyon-icon" {...commonProps}>
        {titleNode}
        <rect x="12" y="18" width="40" height="30" rx="4" />
        <path d="M24 18l3-6h10l3 6" />
        <circle cx="32" cy="33" r="9" />
      </svg>
    )
  }

  return (
    <svg className="lyon-icon" {...commonProps}>
      {titleNode}
      <path d="M14 45c2-14 9-25 22-32" />
      <path d="M21 53c-2-12 1-22 9-30 6-6 15-9 27-9-3 8-8 14-16 18" />
      <path d="M43 32c8 1 13 6 16 14-10 2-18 0-25-6" />
      <path d="M27 19c-7-2-13-1-18 4 6 1 11 4 15 8" />
      <path d="M28 50c8 2 17 0 27-5" />
      <path d="M33 24c-3 6-4 12-3 18" />
    </svg>
  )
}
