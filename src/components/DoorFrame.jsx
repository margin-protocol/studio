import { motion } from 'motion/react'

/** 首頁主視覺：幾何門框與門縫中的微光 */
export default function DoorFrame({ className = '' }) {
  const draw = (delay) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { delay, duration: 1.6, ease: [0.65, 0, 0.35, 1] }, opacity: { delay, duration: 0.3 } },
  })

  return (
    <svg viewBox="0 0 320 480" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="door-light" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--mp-mist)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--mp-mist)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--mp-mist)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="door-floor" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="var(--mp-mist)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--mp-mist)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 外框與內框 */}
      <motion.path d="M40 470 V40 H280 V470" stroke="var(--mp-bronze)" strokeWidth="1" {...draw(0.2)} />
      <motion.path d="M72 470 V88 Q72 72 88 72 H232 Q248 72 248 88 V470" stroke="var(--mp-mist)" strokeWidth="1" {...draw(0.5)} />
      <motion.path d="M100 470 V112 H220 V470" stroke="var(--mp-line)" strokeWidth="1" {...draw(0.8)} />

      {/* 門縫光 */}
      <motion.rect
        x="148" y="112" width="24" height="358"
        fill="url(#door-light)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.75] }}
        transition={{ delay: 1.6, duration: 2.4, ease: 'easeOut' }}
      />
      <motion.line
        x1="160" y1="112" x2="160" y2="470"
        stroke="var(--mp-fg)" strokeOpacity="0.55" strokeWidth="0.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.4, duration: 1.2, ease: 'easeOut' }}
      />
      <motion.ellipse
        cx="160" cy="472" rx="130" ry="10" fill="url(#door-floor)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1.5 }}
      />

      {/* 刻度 */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1="282" x2={i % 4 === 0 ? 296 : 290} y1={60 + i * 48} y2={60 + i * 48} stroke="var(--mp-line)" />
      ))}
      <text x="26" y="34" fill="var(--mp-bronze)" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2">
        ACCESS / 00
      </text>
    </svg>
  )
}
