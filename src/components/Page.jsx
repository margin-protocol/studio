import { useEffect } from 'react'
import { motion } from 'motion/react'

/** 每一頁的外框：負責換頁淡入淡出與回到頂端 */
export default function Page({ children, className = '' }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
