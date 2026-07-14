import { LyonDenIcon } from '../icons/LyonIcons'

export function SocialPlatformCard({ platform }) {
  return (
    <a
      className="social-platform-card"
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow The Lyon Den on ${platform.label}`}
    >
      <span className="social-platform-seal" aria-hidden="true">
        <LyonDenIcon name={platform.icon} />
      </span>
      <span>
        <strong>{platform.label}</strong>
        <small>{platform.description}</small>
      </span>
    </a>
  )
}
