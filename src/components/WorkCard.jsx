import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import WorkCover from './WorkCover.jsx'
import StatusBadge from './StatusBadge.jsx'
import { getCategory } from '../data/taxonomy.js'

/** 檔案卡片：上方索引標籤 + 封面 + 基本資料，整張可點擊進入詳情頁 */
export default function WorkCard({ work, headingLevel = 'h3' }) {
  const Heading = headingLevel
  const cat = getCategory(work.category)

  return (
    <article className="group relative h-full">
      {/* 索引標籤 */}
      <div
        className="file-code relative z-10 ml-4 inline-block border border-b-0 border-line bg-card px-3 pb-1 pt-1.5 text-bronze transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-mist group-focus-within:text-mist"
        aria-hidden="true"
      >
        {work.code}
      </div>

      <div className="relative -mt-px flex h-full flex-col border border-line bg-card/60 transition-colors duration-300 group-hover:border-mist/60 group-focus-within:border-mist/60">
        <WorkCover work={work} />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="file-code text-muted">{cat.label}</span>
            <StatusBadge status={work.status} showZh={false} />
          </div>

          <Heading className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Link
              to={`/archive/${work.id}`}
              className="shrink-0 font-serif text-2xl tracking-wide after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {work.title}
            </Link>
            {work.subtitle && <span className="text-sm text-muted">{work.subtitle}</span>}
          </Heading>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{work.summary}</p>

          <p className="file-code mt-5 inline-flex items-center gap-1.5 text-muted transition-colors group-hover:text-fg">
            開啟檔案
            <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </p>
        </div>
      </div>
    </article>
  )
}
