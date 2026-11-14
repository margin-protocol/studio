import { useId } from 'react'
import { motion } from 'motion/react'

/**
 * MARGIN PROTOCOL. 符號標誌（向量重繪）
 * 象牙色主板 + 霧紫半透明側板，構成一扇微開的門。
 * 夜間：象牙色；日間：自動改為檔案黑（見 index.css 的 --mp-logo-main）。
 *
 * props
 *   animated  首頁主視覺用：兩片門板依序浮現、門縫微光亮起
 *   title     提供時作為可讀名稱；未提供則視為裝飾（aria-hidden）
 */
export default function LogoMark({ className = '', animated = false, title }) {
  const uid = useId().replace(/:/g, '')
  const main = `lm-main-${uid}`
  const side = `lm-side-${uid}`
  const shade = `lm-shade-${uid}`

  const G = animated ? motion.g : 'g'
  const enter = (delay) =>
    animated
      ? {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        }
      : {}

  return (
    <svg
      viewBox="70 30 420 765"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      <defs>
        <linearGradient id={main} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--mp-logo-main)" />
          <stop offset="100%" stopColor="var(--mp-logo-main)" stopOpacity="0.86" />
        </linearGradient>
        <linearGradient id={side} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A99AB8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#A99AB8" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id={shade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A99AB8" stopOpacity="0" />
          <stop offset="100%" stopColor="#A99AB8" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* 霧紫側板與門內陰影 */}
      <G {...enter(0.5)}>
        <polygon points="262,320 335,282 335,730 262,705" fill={`url(#${shade})`} />
        <polygon
          points="335,276 472,200 472,780 335,730"
          fill={`url(#${side})`}
          stroke="#D6CDE0"
          strokeOpacity="0.55"
          strokeWidth="2"
        />
      </G>

      {/* 象牙主板 */}
      <G {...enter(0.15)}>
        <polygon points="85,175 335,45 335,282 262,320 262,705 85,770" fill={`url(#${main})`} />
      </G>
    </svg>
  )
}
