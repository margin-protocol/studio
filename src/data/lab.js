/**
 * 實驗室紀錄
 * ------------------------------------------------------------
 * 放尚未正式發布的作品、互動原型、AI 實驗與創意工具。
 * 正式完成後，可移到 src/data/works.js 成為作品檔案。
 *
 *   kind      實驗類型
 *   status    狀態 id，見 taxonomy.js
 *   abstract  簡述
 *   log       研究日誌，每行一筆
 *   linkKey   若有外部連結，在 src/config/links.js 新增後填入代號；否則 null
 */

export const experiments = [
  {
    id: 'desktop-pet',
    code: 'LAB-01',
    title: '電腦桌寵',
    kind: '創意工具',
    status: 'prototype',
    abstract: '讓故事角色離開文字，以桌面寵物的形式陪在電腦螢幕一角。',
    log: [
      'Windows 桌面寵物原型可運作。',
      '觀察：角色在「被看見的時間」裡持續生長。',
    ],
    linkKey: 'desktopPet',
  },
  {
    id: 'lorebook',
    code: 'LAB-02',
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
