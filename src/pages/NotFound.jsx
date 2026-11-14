import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import Page from '../components/Page.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function NotFound() {
  usePageMeta('找不到檔案')
  return (
    <Page>
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
        <p className="file-code text-bronze">ERROR 404 / FILE NOT FOUND</p>
        <h1 className="mt-6 font-serif text-6xl tracking-wide">NULL</h1>
        <p className="zh-title mt-4 text-lg text-muted">此檔案不存在，或已被移出檔案館。</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/" className="file-code inline-flex items-center gap-2 border border-line px-4 py-2 text-muted hover:border-mist hover:text-fg">
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" /> 回到入口
          </Link>
          <Link to="/archive" className="file-code border border-line px-4 py-2 text-muted hover:border-mist hover:text-fg">
            前往檔案館
          </Link>
        </div>
      </section>
    </Page>
  )
}
