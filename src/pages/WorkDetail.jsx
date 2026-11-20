import { Link, useParams } from 'react-router'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

import Page from '../components/Page.jsx'
import WorkCover from '../components/WorkCover.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import NotFound from './NotFound.jsx'
import { works, getWork } from '../data/works.js'
import { getCategory } from '../data/taxonomy.js'
import { getLink } from '../config/links.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

function formatDate(iso) {
  if (!iso) return null
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
}

/** public/ 底下的圖片路徑要接上網站的 base（GitHub Pages 是 /studio/） */
function asset(path) {
  return path.startsWith('/') ? import.meta.env.BASE_URL + path.slice(1) : path
}

export default function WorkDetail() {
  const { id } = useParams()
  const work = getWork(id)
  usePageMeta(work ? `${work.code} ${work.title}` : '找不到檔案', work?.summary)

  if (!work) return <NotFound />

  const cat = getCategory(work.category)
  const url = getLink(work.linkKey)
  const playUrl = getLink(work.playKey)
  const index = works.findIndex((w) => w.id === work.id)
  const prev = works[index - 1]
  const next = works[index + 1]

  const meta = [
    ['檔案編號', <span className="font-mono">{work.code}</span>],
    ['分類', `${cat.label}／${cat.labelZh}`],
    ['開發狀態', <StatusBadge status={work.status} />],
    ['發布日期', formatDate(work.releaseDate) ?? '未公開'],
  ]

  return (
    <Page>
      <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-8">
        <Link to="/archive" className="ui-zh inline-flex items-center gap-2 text-muted hover:text-fg">
          <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" /> 返回檔案館
        </Link>
      </div>

      {/* 檔案展開動畫：由上往下攤開 */}
      <motion.article
        className="mx-auto mt-8 max-w-5xl px-5 sm:px-8"
        initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.4 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="file-code ml-4 inline-block border border-b-0 border-line bg-card px-3 pb-1 pt-1.5 text-mist">
          {work.code}
        </div>
        <div className="-mt-px border border-line bg-card/50">
          <header className="border-b border-line p-6 sm:p-10">
            <p className="file-code text-bronze">{cat.label}</p>
            <h1 className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="font-serif text-5xl tracking-wide sm:text-6xl">{work.title}</span>
              {work.subtitle && <span className="zh-title text-xl text-muted">{work.subtitle}</span>}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">{work.summary}</p>
          </header>

          <WorkCover work={work} large className="border-b border-line" />

          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-[1.6fr_1fr]">
            <motion.div
              className="prose-mp max-w-prose leading-loose"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h2 className="file-code mb-4 text-bronze">DESCRIPTION</h2>
              {work.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {work.tags?.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="關鍵字">
                  {work.tags.map((t) => (
                    <li key={t}>
                      <Link
                        to={`/archive?q=${encodeURIComponent(t)}`}
                        className="file-code border border-line px-2.5 py-1 normal-case text-muted hover:border-mist hover:text-fg"
                      >
                        #{t}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            <aside aria-label="檔案資料">
              <dl className="border-t border-line">
                {meta.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-between border border-fg/80 bg-fg px-5 py-3 text-bg transition-colors hover:bg-transparent hover:text-fg"
                  >
                    <span className="ui-zh">前往作品網站</span>
                    <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    <span className="sr-only">（另開新視窗）</span>
                  </a>
                ) : (
                  <p className="border border-dashed border-line px-5 py-3 text-sm text-muted">
                    <span className="file-code mr-2 text-bronze">LINK</span>外部連結尚未開放
                  </p>
                )}
                {playUrl && (
                  <a
                    href={playUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-3 inline-flex w-full items-center justify-between border border-mist/70 px-5 py-3 text-fg transition-colors hover:border-mist hover:bg-mist/15"
                  >
                    <span className="ui-zh">前往遊玩</span>
                    <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    <span className="sr-only">（另開新視窗，前往 ChelizAI）</span>
                  </a>
                )}
              </div>
            </aside>
          </div>

          {work.video && (
            <section className="border-t border-line p-6 sm:p-10" aria-label="介紹影片">
              <h2 className="file-code mb-4 text-bronze">FILM</h2>
              <video
                src={asset(work.video.src)}
                poster={work.video.poster ? asset(work.video.poster) : undefined}
                controls
                playsInline
                preload="none"
                aria-label={work.video.label}
                className="mx-auto aspect-[9/16] w-full max-w-xs border border-line bg-bg object-cover"
              />
            </section>
          )}

          {work.chapters?.length > 0 && (
            <section className="border-t border-line p-6 sm:p-10" aria-label="作品介紹">
              <h2 className="file-code mb-8 text-bronze">CHAPTERS</h2>
              <ol className="space-y-14 sm:space-y-20">
                {work.chapters.map((c, i) => (
                  <li
                    key={c.title}
                    className={`grid items-center gap-6 sm:gap-12 ${i % 2 ? 'sm:grid-cols-[1fr_minmax(0,15rem)]' : 'sm:grid-cols-[minmax(0,15rem)_1fr]'}`}
                  >
                    <img
                      src={asset(c.image)}
                      alt={`${c.title}：${c.lead}`}
                      loading="lazy"
                      decoding="async"
                      className={`mx-auto aspect-[9/16] w-48 border border-line object-cover sm:w-full ${i % 2 ? 'sm:order-2' : ''}`}
                    />
                    <div className={i % 2 ? 'sm:order-1 sm:text-right' : ''}>
                      <p className="file-code text-mist">— {String(i + 1).padStart(2, '0')} —</p>
                      <h3 className="mt-2 font-serif text-3xl tracking-wide">{c.title}</h3>
                      <p className="mt-2 text-muted">{c.lead}</p>
                      <p className="mt-4 leading-loose">{c.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {work.closing && (
                <div className="mt-16 border-t border-line pt-10 text-center">
                  <p className="font-serif text-2xl tracking-wide sm:text-3xl">{work.closing}</p>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-3 border border-mist/70 px-5 py-3 text-fg transition-colors hover:border-mist hover:bg-mist/15"
                    >
                      <span className="ui-zh">手機打開就能玩</span>
                      <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                      <span className="sr-only">（另開新視窗）</span>
                    </a>
                  )}
                </div>
              )}
            </section>
          )}

          {work.gallery?.length > 0 && (
            <section className="border-t border-line p-6 sm:p-10" aria-label="作品圖集">
              <h2 className="file-code mb-4 text-bronze">GALLERY</h2>
              <ul className="flex snap-x gap-4 overflow-x-auto pb-3">
                {work.gallery.map((g) => (
                  <li key={g.src} className="w-56 shrink-0 snap-start sm:w-64">
                    <img
                      src={asset(g.src)}
                      alt={g.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[9/16] w-full border border-line object-cover"
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </motion.article>

      <nav aria-label="其他檔案" className="mx-auto mt-12 grid max-w-5xl gap-4 px-5 sm:grid-cols-2 sm:px-8">
        {prev ? (
          <Link to={`/archive/${prev.id}`} className="group border border-line p-5 hover:border-mist/60">
            <span className="ui-zh inline-flex items-center gap-2 text-muted">
              <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" /> 上一份 · <span className="file-code">{prev.code}</span>
            </span>
            <span className="mt-2 block font-serif text-xl">{prev.title}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link to={`/archive/${next.id}`} className="group border border-line p-5 text-right hover:border-mist/60">
            <span className="ui-zh inline-flex items-center gap-2 text-muted">
              下一份 · <span className="file-code">{next.code}</span> <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="mt-2 block font-serif text-xl">{next.title}</span>
          </Link>
        )}
      </nav>
    </Page>
  )
}
