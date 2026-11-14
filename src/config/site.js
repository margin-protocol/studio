/**
 * 網站基本設定
 * ------------------------------------------------------------
 * 品牌文字、正式網址、聯絡信箱都集中在這裡。
 * 修改後重新部署即可，不需要動到任何畫面元件。
 */

export const site = {
  name: 'MARGIN PROTOCOL.',
  nameZh: '頁邊協定',
  taglineEn: 'Where stories meet systems.',
  taglineZh: '在文字與系統之間，創造另一種可能。',
  motto: '每個故事都有正文，而我們創造正文之外的可能。',
  description:
    '結合文學、互動敘事、藝術設計、創意程式與數位產品的獨立創作工作室。',

  // 正式網址（更換網域時，同時修改 index.html 內的 og:url / og:image）
  url: 'https://margin-protocol.github.io/studio/',

  // 聯絡信箱（若改回 example.com，正式站會顯示「信箱即將開放」）
  email: 'marginprotocol.studio@gmail.com',

  since: 2026,
}

/** 判斷信箱是否仍是 placeholder */
export function isEmailConfigured(email = site.email) {
  return Boolean(email) && !/@example\.(com|org|net)$/i.test(email)
}

/** 產生 mailto 連結（可附主旨） */
export function mailto(subject) {
  const base = `mailto:${site.email}`
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base
}
