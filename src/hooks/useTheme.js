import { useCallback, useState } from 'react'

const KEY = 'mp-theme'
const THEME_COLOR = { dark: '#17191F', light: '#EEE8DE' }

function current() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** 日間／夜間切換。預設夜間，選擇會存在 localStorage。 */
export function useTheme() {
  const [theme, setTheme] = useState(current)

  const toggle = useCallback(() => {
    const next = current() === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[next])
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* 無痕模式等情況下無法儲存，忽略即可 */
    }
    setTheme(next)
  }, [])

  return { theme, toggle }
}
