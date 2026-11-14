/**
 * 外部連結集中管理
 * ------------------------------------------------------------
 * 所有作品的外部網址都只寫在這裡。作品資料（src/data/works.js）
 * 只記錄 linkKey，畫面元件也不會出現任何寫死的網址。
 *
 * 值為 null 代表「尚未開放」，畫面會顯示說明文字，不會出現假按鈕。
 */

export const links = {
  littleDays: 'https://little-days-793.pages.dev/',

  // GitHub 帳號 margin-protocol（2026-11 由 xia-mumu 改名）
  offPage: 'https://margin-protocol.github.io/Off-Page/',

  lexnote: null,
  null: null,
}

/** 依 linkKey 取得網址；找不到或為 null 時回傳 null */
export function getLink(key) {
  if (!key) return null
  return links[key] ?? null
}
