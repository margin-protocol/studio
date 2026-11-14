import { motion } from 'motion/react'
import { ArrowUpRight, Mail } from 'lucide-react'

import Page from '../components/Page.jsx'
import PageHeading from '../components/PageHeading.jsx'
import { site, isEmailConfigured, mailto } from '../config/site.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

const services = [
  {
    code: 'C-01',
    title: '合作邀約',
    en: 'Collaboration',
    body: '展覽、出版、跨領域計畫或任何想一起嘗試的事。',
  },
  {
    code: 'C-02',
    title: '數位工具與網站開發',
    en: 'Digital Tools & Web',
    body: '個人網站、作品集、生活工具與小型數位產品的設計與開發。',
  },
  {
    code: 'C-03',
    title: '互動敘事設計',
    en: 'Interactive Narrative',
    body: '互動小說、實境遊戲、敘事型網頁與故事體驗的結構設計。',
  },
  {
    code: 'C-04',
    title: '角色與世界觀創作',
    en: 'Characters & Worlds',
    body: '角色設定、世界觀架構、設定資料庫與長期連載的故事世界。',
  },
]

export default function Contact() {
  usePageMeta('聯絡與委託', '合作邀約、數位工具與網站開發、互動敘事設計、角色與世界觀創作。')
  const ready = isEmailConfigured()

  return (
    <Page>
      <PageHeading code="04" title="CONTACT" titleZh="聯絡與委託">
        <p>如果你有一個故事、一個系統，或一個還說不清楚的想法，歡迎來信。</p>
      </PageHeading>

      {import.meta.env.DEV && !ready && (
        <p role="note" className="mx-auto mt-6 max-w-6xl px-5 text-sm text-bronze sm:px-8">
          【開發提示，正式站不會顯示】聯絡信箱仍是 placeholder，請到 src/config/site.js 修改 email。
        </p>
      )}

      <section aria-labelledby="services-title" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h2 id="services-title" className="file-code text-bronze">SERVICES</h2>
        <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
          {services.map((s, i) => (
            <motion.li
              key={s.code}
              className="bg-bg"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="group flex h-full flex-col p-6 transition-colors hover:bg-card/50 sm:p-8">
                <p className="file-code text-bronze">{s.code}</p>
                <h3 className="zh-title mt-3 text-xl">{s.title}</h3>
                <p className="font-serif italic text-muted" lang="en">{s.en}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{s.body}</p>
                {ready && (
                  <a
                    href={mailto(`[${s.title}] 來自 MARGIN PROTOCOL. 網站`)}
                    className="ui-zh mt-6 inline-flex items-center gap-1.5 text-mist hover:text-fg"
                  >
                    以此主旨來信 <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="mail-title" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden border border-line bg-card/50 px-6 py-14 text-center">
          <div className="faint-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative">
            <h2 id="mail-title" className="file-code text-bronze">E-MAIL</h2>
            {ready ? (
              <>
                <p className="mt-5 font-serif text-2xl tracking-wide sm:text-3xl">{site.email}</p>
                <a
                  href={mailto('來自 MARGIN PROTOCOL. 網站的訊息')}
                  className="mt-8 inline-flex items-center gap-3 border border-mist/70 px-6 py-3 transition-colors hover:bg-mist hover:text-bg"
                >
                  <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                  <span className="ui-zh">寫信給頁邊協定</span>
                </a>
              </>
            ) : (
              <p className="zh-title mt-5 text-xl text-muted">聯絡信箱即將開放</p>
            )}
            <p className="mt-6 text-sm text-muted">來信請簡述需求、時程與預算範圍，我們會盡快回覆。</p>
          </div>
        </div>
      </section>
    </Page>
  )
}
