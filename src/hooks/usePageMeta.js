import { useEffect } from 'react'
import { site } from '../config/site.js'

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * 設定各頁的 <title>、meta description、canonical 與分享卡資訊。
 * 第一次載入時的 SEO 由打包後的 scripts/build-seo.mjs 產生在 HTML 裡；
 * 這裡負責在站內換頁時同步更新。
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    const fullTitle = title
      ? `${title}｜${site.name}`
      : `${site.name}｜${site.nameZh}`
    const desc = description ?? `${site.name} ${site.nameZh}——${site.description}`

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', desc)

    // canonical 一律用結尾有斜線的網址，和 GitHub Pages 實際提供的網址一致
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
    const path = window.location.pathname.slice(basePath.length).replace(/^\/|\/$/g, '')
    const canonical = site.url.replace(/\/?$/, '/') + (path ? `${path}/` : '')
    setMeta('link[rel="canonical"]', 'href', canonical)
    setMeta('meta[property="og:url"]', 'content', canonical)
  }, [title, description])
}
