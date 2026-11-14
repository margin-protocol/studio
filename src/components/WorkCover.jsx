import { useId } from 'react'

/**
 * 作品封面
 * - work.cover 有填圖片路徑 → 顯示圖片（延遲載入）
 * - 沒有圖片 → 依 work.motif 產生幾何封面，不使用任何來源不明的圖片
 */
export default function WorkCover({ work, className = '', large = false }) {
  if (work.cover) {
    return (
      <img
        src={work.cover}
        alt={`${work.title} 封面`}
        loading="lazy"
        decoding="async"
        className={`aspect-[16/10] w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden bg-card ${className}`}>
      <GeneratedCover motif={work.motif} code={work.code} large={large} />
    </div>
  )
}

const stroke = 'var(--mp-mist)'
const bronze = 'var(--mp-bronze)'
const fg = 'var(--mp-fg)'

function GeneratedCover({ motif, code, large }) {
  const uid = useId().replace(/:/g, '')
  const grid = `grid-${uid}`
  const glow = `glow-${uid}`

  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" role="img" aria-label={`${code} 幾何封面`}>
      <defs>
        <pattern id={grid} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--mp-line)" strokeWidth="0.6" />
        </pattern>
        <radialGradient id={glow} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${grid})`} />
      <rect width="400" height="250" fill={`url(#${glow})`} />

      <g className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" style={{ transformOrigin: '200px 125px' }}>
        {motif === 'calendar' && <Calendar />}
        {motif === 'pages' && <Pages />}
        {motif === 'lattice' && <Lattice />}
        {motif === 'void' && <Void />}
        {(!motif || motif === 'door') && <Door />}
      </g>

      {!large && (
        <text x="16" y="236" fill={bronze} fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2">
          {code}
        </text>
      )}
    </svg>
  )
}

/* little-days：日子格 + 少數被記住的日子 */
function Calendar() {
  const marked = new Set([3, 9, 10, 17, 26, 30])
  const cells = []
  for (let i = 0; i < 35; i++) {
    const x = 120 + (i % 7) * 24
    const y = 58 + Math.floor(i / 7) * 24
    cells.push(
      <rect
        key={i}
        x={x}
        y={y}
        width="16"
        height="16"
        fill={marked.has(i) ? stroke : 'none'}
        fillOpacity={marked.has(i) ? 0.55 : 0}
        stroke={marked.has(i) ? stroke : 'var(--mp-line)'}
        strokeWidth="0.8"
      />,
    )
  }
  return (
    <>
      <rect x="108" y="40" width="184" height="148" fill="none" stroke={bronze} strokeWidth="0.8" />
      <line x1="108" y1="50" x2="292" y2="50" stroke={bronze} strokeWidth="0.5" />
      {cells}
    </>
  )
}

/* Off-Page：錯開的書頁與一枚索引標籤 */
function Pages() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={138 + i * 14}
          y={46 - i * 8}
          width="110"
          height="150"
          fill="var(--mp-card)"
          stroke={i === 2 ? stroke : bronze}
          strokeWidth="0.9"
        />
      ))}
      <path d="M276 30 v26 l-14 0" fill="none" stroke={stroke} strokeWidth="0.9" />
      <rect x="278" y="58" width="16" height="30" fill={stroke} fillOpacity="0.6" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1="180" y1={70 + i * 14} x2={i === 5 ? 226 : 252} y2={70 + i * 14} stroke="var(--mp-line)" strokeWidth="1" />
      ))}
      <line x1="170" y1="40" x2="170" y2="170" stroke={stroke} strokeWidth="0.6" strokeDasharray="2 4" />
    </>
  )
}

/* LEXNOTE：節點與連線構成的體系圖 */
function Lattice() {
  const nodes = [
    [200, 62], [140, 110], [260, 110], [110, 172], [170, 172], [230, 172], [290, 172],
  ]
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [4, 5]]
  return (
    <>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={bronze} strokeWidth="0.8" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 12} y={y - 8} width="24" height="16" fill="var(--mp-card)" stroke={i === 0 ? stroke : bronze} strokeWidth="0.9" />
          {i === 0 && <rect x={x - 6} y={y - 2} width="12" height="4" fill={stroke} fillOpacity="0.7" />}
        </g>
      ))}
    </>
  )
}

/* NULL：同心門框、空集合與掃描線 */
function Void() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={150 + i * 12}
          y={34 + i * 12}
          width={100 - i * 24}
          height={180 - i * 24}
          fill="none"
          stroke={i === 3 ? stroke : bronze}
          strokeOpacity={1 - i * 0.15}
          strokeWidth="0.8"
        />
      ))}
      <circle cx="200" cy="124" r="16" fill="none" stroke={fg} strokeOpacity="0.8" strokeWidth="1" />
      <line x1="186" y1="140" x2="214" y2="108" stroke={fg} strokeOpacity="0.8" strokeWidth="1" />
      <line x1="60" y1="124" x2="340" y2="124" stroke={stroke} strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="1 5" />
    </>
  )
}

/* 預設：幾何門框 */
function Door() {
  return (
    <>
      <rect x="160" y="40" width="80" height="170" fill="none" stroke={bronze} strokeWidth="0.9" />
      <rect x="172" y="52" width="56" height="158" fill="none" stroke={stroke} strokeWidth="0.9" />
      <line x1="200" y1="60" x2="200" y2="210" stroke={fg} strokeOpacity="0.5" strokeWidth="0.8" />
    </>
  )
}
