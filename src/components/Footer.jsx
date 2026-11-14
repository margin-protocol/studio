import { Link } from 'react-router'
import { navItems } from './navigation.js'
import { site } from '../config/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  const range = year > site.since ? `${site.since}–${year}` : `${site.since}`

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-serif text-2xl tracking-[0.12em]">
            MARGIN PROTOCOL<span className="text-mist">.</span>
          </p>
          <p className="zh-title mt-1 text-sm text-muted">頁邊協定</p>
          <p className="mt-6 max-w-sm font-serif text-lg italic text-muted">{site.taglineEn}</p>
        </div>

        <nav aria-label="頁尾選單">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="group inline-flex items-baseline gap-2 text-muted hover:text-fg">
                  <span className="file-code text-bronze">{item.code}</span>
                  <span className="text-sm">{item.labelZh}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="file-code mx-auto max-w-6xl px-5 py-5 text-muted sm:px-8">
          © {range} MARGIN PROTOCOL. — END OF FILE
        </p>
      </div>
    </footer>
  )
}
