import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const KEY = 'mp-intro-seen'
const DURATION = 1900 // 毫秒；保持短暫，不阻礙操作

const lines = [
  'MARGIN PROTOCOL // ARCHIVE v0.1',
  '> verifying access ............ OK',
  '> unfolding margins ........... OK',
]

function shouldShow() {
  if (typeof window === 'undefined') return false
  try {
    if (sessionStorage.getItem(KEY)) return false
  } catch {
    /* ignore */
  }
  // 系統開啟「減少動態」時直接略過進場動畫
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
  // 只在首頁首次進入時播放；直接開啟作品連結的訪客不需要等待
  const home = import.meta.env.BASE_URL // 例如 '/studio/'
  const path = window.location.pathname
  return path === home || path === home.replace(/\/$/, '')
}

/**
 * INITIALIZING ARCHIVE 進場動畫
 * - 每個瀏覽階段只播放一次
 * - 點擊任意處、按任意鍵或「略過」按鈕都能立即關閉
 */
export default function IntroOverlay() {
  const [show, setShow] = useState(shouldShow)

  const dismiss = useCallback(() => setShow(false), [])

  useEffect(() => {
    if (!show) return
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    const timer = setTimeout(dismiss, DURATION)
    const onKey = () => dismiss()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [show, dismiss])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-bg"
          onClick={dismiss}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          role="status"
          aria-label="正在開啟檔案館"
        >
          <div className="faint-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative w-[min(88vw,420px)]">
            {lines.map((line, i) => (
              <motion.p
                key={line}
                className="file-code text-muted"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.28, duration: 0.35 }}
              >
                {line}
              </motion.p>
            ))}
            <motion.p
              className="file-code mt-6 text-fg"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.55, 1] }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              INITIALIZING ARCHIVE
            </motion.p>
            <div className="mt-3 h-px w-full bg-line">
              <motion.div
                className="h-px origin-left bg-mist"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: DURATION / 1000 - 0.2, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="file-code absolute bottom-8 right-8 border border-line px-4 py-2 text-muted transition-colors hover:border-mist hover:text-fg"
          >
            略過 SKIP
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
