import { getStatus } from '../data/taxonomy.js'

const dot = {
  live: 'bg-mist',
  dev: 'bg-bronze',
  pending: 'border border-muted bg-transparent',
}

export default function StatusBadge({ status, showZh = true }) {
  const s = getStatus(status)
  return (
    <span className="file-code inline-flex items-center gap-2 text-muted">
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot[s.tone]}`} aria-hidden="true" />
      <span>{s.en}</span>
      {showZh && <span className="font-sans normal-case tracking-normal">／{s.label}</span>}
    </span>
  )
}
