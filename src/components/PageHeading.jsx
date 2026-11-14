/** 各分頁頂部的標題區：檔案編號 + 英文標題 + 中文標題 + 說明 */
export default function PageHeading({ code, title, titleZh, children }) {
  return (
    <header className="relative border-b border-line">
      <div className="faint-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-16 sm:px-8 sm:pt-24">
        <p className="file-code text-bronze">
          {code} <span className="mx-2 text-line">/</span> {title}
        </p>
        <h1 className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="font-serif text-5xl leading-none tracking-[0.06em] sm:text-7xl">{title}</span>
          <span className="zh-title text-xl text-muted sm:text-2xl">{titleZh}</span>
        </h1>
        {children && <div className="mt-6 max-w-2xl text-muted">{children}</div>}
      </div>
    </header>
  )
}
