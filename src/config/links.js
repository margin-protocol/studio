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

  lexnote: 'https://margin-protocol.github.io/lexnote/',
  null: 'https://margin-protocol.github.io/null/',
  seventhRegistry: 'https://margin-protocol.github.io/seventh-marriage-registry/',
  theUnfinishedLove: 'https://margin-protocol.github.io/the-unfinished-love/',
  siangCollector: 'https://margin-protocol.github.io/dinosaur-collector/',

  // 手機小工具介紹在岔頁的工具頁
  phoneWidget: 'https://margin-protocol.github.io/Off-Page/tools.html#tool-widget',

  // ChelizAI 遊玩連結（作品資料用 playKey 指到這裡，沒有就不顯示「前往遊玩」）
  playNull: 'https://www.cheliz.ai/zh-hant/gallery?utm_source=web_share&utm_medium=share_play&phandle=750s7iv0eh8qu8s1&enter_from=poster&invite_code=55RWFA',
  playSeventhRegistry: 'https://www.cheliz.ai/zh-hant/gallery?utm_source=web_share&utm_medium=share_play&phandle=u3sqzdoomb0pj924&enter_from=poster&invite_code=55RWFA',
  playTheUnfinishedLove: 'https://www.cheliz.ai/play/bxtmufehosxalw26?utm_source=web_share&utm_medium=share_studio&enter_from=studio_share&invite_code=55RWFA',

  // 電腦桌寵：目前沒有公開頁面，有網址時填入即可
  desktopPet: null,
}

/** 依 linkKey 取得網址；找不到或為 null 時回傳 null */
export function getLink(key) {
  if (!key) return null
  return links[key] ?? null
}
