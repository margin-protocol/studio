import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

import Page from '../components/Page.jsx'
import PageHeading from '../components/PageHeading.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { experiments } from '../data/lab.js'
import { getLink } from '../config/links.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function Laboratory() {
  usePageMeta('實驗室', '尚未正式發布的作品、互動原型、AI 實驗與創意工具的研究紀錄。')

  return (
    <Page>
      <PageHeading code="02" title="LABORATORY" titleZh="實驗室">
        <p>尚未正式發布的作品、互動原型、AI 實驗與創意工具。以下為研究日誌，內容可能隨時變動。</p>
      </PageHeading>

      <section aria-label="實驗紀錄" className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <ol className="space-y-10">
          {experiments.map((exp, i) => {
            const url = getLink(exp.linkKey)
            return (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <article className="border border-line bg-card/40">
                  <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-5 py-3">
                    <span className="file-code text-mist">{exp.code}</span>
                    <span className="file-code text-line" aria-hidden="true">//</span>
                    <span className="ui-zh text-muted">{exp.kind}</span>
                    <span className="ml-auto">
                      <StatusBadge status={exp.status} />
                    </span>
                  </header>

                  <div className="grid gap-6 p-5 sm:grid-cols-[1fr_1.3fr] sm:p-8">
                    <div>
                      <h2 className="zh-title text-2xl">{exp.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{exp.abstract}</p>
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ui-zh mt-5 inline-flex items-center gap-1.5 text-mist hover:text-fg"
                        >
                          查看原型 <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                          <span className="sr-only">（另開新視窗）</span>
                        </a>
                      )}
                    </div>

                    <div className="border-l border-line pl-5">
                      <h3 className="file-code text-bronze">RESEARCH LOG</h3>
                      <ol className="mt-3 space-y-2">
                        {exp.log.map((entry, j) => (
                          <li key={j} className="flex gap-3 text-sm">
                            <span className="file-code shrink-0 pt-0.5 text-muted">{String(j + 1).padStart(2, '0')} &gt;</span>
                            <span>{entry}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </article>
              </motion.li>
            )
          })}
        </ol>

        <p className="file-code mt-14 text-center text-muted">— END OF LOG —</p>
      </section>
    </Page>
  )
}
