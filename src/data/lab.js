/**
 * 實驗室紀錄
 * ------------------------------------------------------------
 * 放尚未正式發布的作品、互動原型、AI 實驗與創意工具。
 * 以下三筆是依現有創作暫填的範例，請依實際狀況修改或刪除。
 *
 *   kind      實驗類型
 *   status    狀態 id，見 taxonomy.js
 *   abstract  簡述
 *   log       研究日誌，每行一筆（不用填日期，也可以自行加上）
 *   linkKey   若有外部連結，在 src/config/links.js 新增後填入代號；否則 null
 */

export const experiments = [
  {
    id: 'seventh-registry',
    code: 'LAB-01',
    title: '第七婚籍管理處',
    kind: '互動敘事原型',
    status: 'prototype',
    abstract: '冥府中負責登記婚姻的辦事處。一份份婚籍文件，記錄著生前未完的關係。',
    log: [
      '建立世界觀基本設定：冥府、婚籍、管理處的職能。',
      '測試多世界觀分支的敘事結構。',
      '作品頁面製作中。',
    ],
    linkKey: null,
  },
  {
    id: 'desktop-companion',
    code: 'LAB-02',
    title: '桌面角色陪伴',
    kind: '創意工具',
    status: 'prototype',
    abstract: '讓故事角色離開文字，以桌面寵物與手機小工具的形式出現在日常裡。',
    log: [
      'Windows 桌面寵物原型可運作。',
      'iPhone 主畫面小工具版本實驗中。',
      '觀察：角色在「被看見的時間」裡持續生長。',
    ],
    linkKey: null,
  },
  {
    id: 'lorebook',
    code: 'LAB-03',
    title: '棲川市 Lorebook',
    kind: 'AI 敘事實驗',
    status: 'development',
    abstract: '一座虛構城市的設定資料庫，用來測試角色與世界觀在 AI 對話中的一致性。',
    log: [
      '整理城市、角色卡與地點條目。',
      '測試設定長度與角色一致性之間的關係。',
    ],
    linkKey: null,
  },
]
