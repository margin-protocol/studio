import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight, Mail } from 'lucide-react'

import Page from '../components/Page.jsx'
import LogoMark from '../components/LogoMark.jsx'
import WorkCard from '../components/WorkCard.jsx'
import { works } from '../data/works.js'
import { site } from '../config/site.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

const ease = [0.22, 1, 0.36, 1]
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease },
})
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease },
}

export default function Home() {
  usePageMeta(null)
  const featured = works.filter((w) => w.featured)

  return (
    <Page>
      {/* ---------- HERO ---------- */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
        <div className="faint-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-16 sm:px-8 md:grid-cols-[1.35fr_1fr] md:pb-28 md:pt-24">
          <div>
            <motion.p className="file-code text-bronze" {...rise(0.1)}>
              FILE 00
            </motion.p>

            <h1 id="hero-title" className="mt-6">
              <motion.span
                className="block font-serif text-[clamp(3.2rem,11vw,7.5rem)] font-medium leading-[0.9] tracking-[0.04em]"
                {...rise(0.25)}
              >
                MARGIN
              </motion.span>
              <motion.span
                className="block font-serif text-[clamp(3.2rem,11vw,7.5rem)] font-medium leading-[0.9] tracking-[0.04em]"
                {...rise(0.4)}
              >
                PROTOCOL<span className="text-mist">.</span>
              </motion.span>
              <motion.span className="zh-title mt-6 block text-2xl text-muted sm:text-3xl" {...rise(0.6)}>
                頁邊協定
              </motion.span>
            </h1>

            <motion.div className="mt-10 border-l border-mist/50 pl-5" {...rise(0.8)}>
              <p className="font-serif text-xl italic sm:text-2xl">{site.taglineEn}</p>
              <p className="zh-title mt-2 text-muted">{site.taglineZh}</p>
            </motion.div>

            <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...rise(1)}>
              <Link
                to="/archive"
                className="group inline-flex items-center gap-3 border border-fg/80 bg-fg px-6 py-3 text-bg transition-colors hover:bg-transparent hover:text-fg"
              >
                <span className="ui-zh">進入檔案館</span>
                <span className="file-code">ENTER ARCHIVE</span>
                <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link to="/manifesto" className="ui-zh border-b border-line pb-1 text-muted transition-colors hover:border-mist hover:text-fg">
                閱讀宣言 →
              </Link>
            </motion.div>
          </div>

          <div className="relative mx-auto w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px]">
            {/* 門後微光 */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(ellipse at center, var(--mp-glow), transparent 65%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              aria-hidden="true"
            />
            <LogoMark animated className="relative h-auto w-full" />
          </div>
        </div>
      </section>

      {/* ---------- 精選作品 ---------- */}
      <section aria-labelledby="featured-title" className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="file-code text-bronze">SELECTED FILES</p>
            <h2 id="featured-title" className="zh-title mt-2 text-3xl">精選檔案</h2>
          </div>
          <Link to="/archive" className="ui-zh inline-flex items-center gap-2 text-muted hover:text-fg">
            查看全部 <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((work, i) => (
            <motion.li key={work.id} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
              <WorkCard work={work} />
            </motion.li>
          ))}
        </ul>
      </section>

      {/* ---------- 工作室簡介 ---------- */}
      <section aria-labelledby="about-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <motion.div className="grid gap-10 border-y border-line py-16 md:grid-cols-[1fr_1.6fr]" {...reveal}>
          <div>
            <p className="file-code text-bronze">ABOUT THE STUDIO</p>
            <h2 id="about-title" className="zh-title mt-2 text-3xl">關於頁邊協定</h2>
          </div>
          <div className="prose-mp max-w-xl text-muted">
            <p className="zh-title text-lg leading-relaxed text-fg sm:text-xl lg:whitespace-nowrap">「{site.motto}」</p>
            <p>
              MARGIN PROTOCOL. 是一間獨立創作工作室，在文學、互動敘事、藝術設計與創意程式之間工作。我們寫故事，也寫讓故事運作的系統；做工具，也讓工具帶著一點溫度。
            </p>
            <p>
              頁邊，是書頁上留給註記、疑問與另一種讀法的位置。我們把作品放在那裡。
            </p>
            <Link to="/manifesto" className="file-code mt-6 inline-flex items-center gap-2 text-mist hover:text-fg">
              03 MANIFESTO <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ---------- 聯絡入口 ---------- */}
      <section aria-labelledby="contact-title" className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <motion.div className="relative overflow-hidden border border-line bg-card/50 px-6 py-14 text-center sm:px-12" {...reveal}>
          <div className="faint-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative">
            <p className="file-code text-bronze">04 / CONTACT</p>
            <h2 id="contact-title" className="zh-title mt-4 text-3xl">在頁邊留下一則訊息</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">合作邀約、數位工具與網站開發、互動敘事與角色世界觀創作。</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 border border-mist/70 px-6 py-3 text-fg transition-colors hover:bg-mist hover:text-bg"
            >
              <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
              <span className="ui-zh">聯絡與委託</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </Page>
  )
}
