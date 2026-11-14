import { useEffect } from 'react'
import { site } from '../config/site.js'

/** 設定各頁的 <title> 與 meta description */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title
      ? `${title}｜${site.name}`
      : `${site.name}｜${site.nameZh}`

    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        description ?? `${site.name} ${site.nameZh}——${site.description}`,
      )
    }
  }, [title, description])
}
