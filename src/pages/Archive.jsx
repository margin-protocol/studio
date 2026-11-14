import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Search, X } from 'lucide-react'

import Page from '../components/Page.jsx'
import PageHeading from '../components/PageHeading.jsx'
import WorkCard from '../components/WorkCard.jsx'
import { works } from '../data/works.js'
import { categories, getCategory, getStatus } from '../data/taxonomy.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

function matches(work, q) {
  if (!q) return true
  const cat = getCategory(work.category)
  const status = getStatus(work.status)
  const haystack = [
    work.code, work.title, work.subtitle, work.summary,
    ...(work.description ?? []), ...(work.tags ?? []),
    cat.label, cat.labelZh, status.label, status.en,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

export default function Archive() {
  usePageMeta('作品檔案館', '瀏覽 MARGIN PROTOCOL. 的作品檔案：數位產品、互動敘事、知識系統與實驗作品。')

  // 篩選條件同步到網址（?cat=narrative&q=角色），可直接分享
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const cat = params.get('cat') ?? 'all'

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const results = useMemo(
    () => works.filter((w) => (cat === 'all' || w.category === cat) && matches(w, q.trim())),
    [q, cat],
  )

  const filters = [{ id: 'all', label: 'ALL', labelZh: '全部' }, ...categories]

  return (
    <Page>
      <PageHeading code="01" title="ARCHIVE" titleZh="作品檔案館">
        <p>
          每一份檔案都是一件作品。依分類篩選，或輸入關鍵字檢索。
          尚未完成的作品會如實標示狀態。
        </p>
      </PageHeading>

      <section aria-label="檢索條件" className="sticky top-16 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="作品分類" className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = cat === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update('cat', f.id)}
                  className={`file-code border px-3 py-1.5 transition-colors ${
                    active ? 'border-mist bg-mist text-bg' : 'border-line text-muted hover:border-mist/60 hover:text-fg'
                  }`}
                >
                  {f.labelZh}
                </button>
              )
            })}
          </div>

          <div className="relative md:w-72">
            <label htmlFor="archive-search" className="sr-only">搜尋作品</label>
            <Search size={15} strokeWidth={1.5} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="archive-search"
              type="search"
              value={q}
              onChange={(e) => update('q', e.target.value)}
              placeholder="搜尋檔案編號、名稱、關鍵字…"
              autoComplete="off"
              className="w-full border border-line bg-card/60 py-2 pl-9 pr-9 text-sm text-fg placeholder:text-muted/70 focus:border-mist focus:outline-none"
            />
            {q && (
              <button
                type="button"
                onClick={() => update('q', '')}
                aria-label="清除搜尋文字"
                className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center text-muted hover:text-fg"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section aria-label="作品列表" className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <p className="file-code mb-8 text-muted" aria-live="polite">
          RESULTS — 共 {results.length} 份檔案
        </p>

        {results.length > 0 ? (
          <motion.ul layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((work) => (
                <motion.li
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <WorkCard work={work} headingLevel="h2" />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="border border-dashed border-line px-6 py-16 text-center">
            <p className="file-code text-bronze">NO MATCHING FILES</p>
            <p className="mt-3 text-muted">沒有符合條件的檔案。</p>
            <button
              type="button"
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
              className="file-code mt-6 border border-line px-4 py-2 text-muted hover:border-mist hover:text-fg"
            >
              清除所有條件
            </button>
          </div>
        )}
      </section>
    </Page>
  )
}
