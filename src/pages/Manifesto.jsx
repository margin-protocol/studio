import { motion } from 'motion/react'

import Page from '../components/Page.jsx'
import PageHeading from '../components/PageHeading.jsx'
import { site } from '../config/site.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

const articles = [
  {
    no: 'I',
    title: '敘事不只存在於紙張',
    en: 'Narrative is not bound to paper.',
    body: [
      '故事曾經住在書頁裡，後來住進螢幕、對話框、一個會記得你上次來訪的介面。',
      '我們相信敘事能夠出現在任何承載時間的地方——只要有人在那裡停留，故事就會發生。',
    ],
  },
  {
    no: 'II',
    title: '技術不只是功能',
    en: 'Technology is more than function.',
    body: [
      '一段程式可以只是解決問題，也可以是一種語氣。按鈕何時出現、文字以什麼速度浮現，都是寫作的一部分。',
      '我們把系統當成文體來設計。',
    ],
  },
  {
    no: 'III',
    title: '角色與世界可以透過互動持續生長',
    en: 'Characters and worlds keep growing through interaction.',
    body: [
      '完稿不是終點。角色在被提問的時候長出新的回答，世界在被探索的時候顯露新的邊界。',
      '我們留下可以繼續書寫的空白，讓讀者也成為頁邊的註記者。',
    ],
  },
  {
    no: 'IV',
    title: '每個數位作品都能承載情感與故事',
    en: 'Every digital work can carry feeling and story.',
    body: [
      '即使是一個提醒工具、一座知識庫，也可以有它的溫度與來歷。',
      '我們在意的不只是作品能做什麼，還有它被使用的時候，留下了什麼。',
    ],
  },
]

export default function Manifesto() {
  usePageMeta('工作室宣言', `${site.motto}——MARGIN PROTOCOL. 的創作理念。`)

  return (
    <Page>
      <PageHeading code="03" title="MANIFESTO" titleZh="工作室宣言" />

      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <motion.blockquote
          className="relative text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          <span className="file-code text-bronze">PREAMBLE ／ 序</span>
          <p className="zh-title mt-6 text-xl leading-relaxed sm:text-2xl md:whitespace-nowrap">{site.motto}</p>
          <footer className="mt-6 font-serif text-lg italic text-muted">{site.taglineEn}</footer>
        </motion.blockquote>

        <div className="mx-auto my-20 h-16 w-px bg-line" aria-hidden="true" />

        <ol className="space-y-24">
          {articles.map((a) => (
            <motion.li
              key={a.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <article className="grid gap-6 sm:grid-cols-[5rem_1fr]">
                <p className="font-serif text-5xl leading-none text-mist" aria-hidden="true">{a.no}</p>
                <div>
                  <h2 className="zh-title text-2xl">
                    <span className="sr-only">第 {a.no} 條：</span>
                    {a.title}
                  </h2>
                  <p className="mt-1 font-serif text-lg italic text-muted" lang="en">{a.en}</p>
                  <div className="prose-mp mt-6 leading-loose text-muted">
                    {a.body.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </ol>

        <p className="file-code mt-28 text-center text-muted">— 本協定於每次閱讀時生效 —</p>
      </section>
    </Page>
  )
}
