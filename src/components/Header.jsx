import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navItems } from './navigation.js'
import { useTheme } from '../hooks/useTheme.js'

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? '切換為日間模式' : '切換為夜間模式'}
      title={isDark ? '日間模式' : '夜間模式'}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-mist hover:text-fg"
    >
      {isDark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
    </button>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // 換頁時收起手機選單
  useEffect(() => setOpen(false), [pathname])

  // Esc 關閉選單
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-baseline gap-3" aria-label="MARGIN PROTOCOL. 回到首頁">
          <span className="font-serif text-xl tracking-[0.12em] text-fg">
            MARGIN PROTOCOL<span className="text-mist">.</span>
          </span>
          <span className="zh-title hidden text-xs text-muted sm:inline">頁邊協定</span>
        </Link>

        <nav aria-label="主選單" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.slice(1).map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative block px-3 py-2 transition-colors ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="file-code mr-1.5 text-bronze">{item.code}</span>
                      <span className="file-code">{item.label}</span>
                      <span
                        className={`absolute inset-x-3 -bottom-px h-px bg-mist transition-transform duration-300 origin-left ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-fg md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? '關閉選單' : '開啟選單'}
          >
            {open ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="手機選單"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5 py-4">
              {navItems.map((item) => (
                <li key={item.to} className="border-b border-line last:border-0">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 py-3.5 ${isActive ? 'text-fg' : 'text-muted'}`
                    }
                  >
                    <span className="file-code text-bronze">{item.code}</span>
                    <span className="file-code">{item.label}</span>
                    <span className="zh-title ml-auto text-sm">{item.labelZh}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
