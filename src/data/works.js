/**
 * 作品檔案資料
 * ------------------------------------------------------------
 * 新增作品：複製一筆物件、改掉內容即可，畫面會自動出現。
 *
 * 欄位說明
 *   id           網址用的代稱，例如 /archive/little-days（英數與連字號）
 *   code         檔案編號
 *   title        作品名稱
 *   subtitle     中文副標（可省略）
 *   category     分類 id，見 taxonomy.js
 *   status       狀態 id，見 taxonomy.js
 *   releaseDate  發布日期，格式 'YYYY-MM-DD'；未知請填 null（畫面顯示「未公開」）
 *   summary      一句話簡介（卡片與搜尋使用）
 *   description  詳細介紹，每個字串一段
 *   tags         關鍵字，會被搜尋
 *   linkKey      外部連結代號，網址寫在 src/config/links.js
 *   cover        封面圖片路徑，例如 '/covers/little-days.webp'（放在 public/covers/）
 *                填 null 時使用程式產生的幾何封面
 *   motif        幾何封面圖樣：'calendar' | 'pages' | 'lattice' | 'void' | 'door'
 *   featured     是否顯示在首頁精選
 */

export const works = [
  {
    id: 'little-days',
    code: 'MP-001',
    title: 'little-days',
    subtitle: '生活提醒與紀錄工具',
    category: 'digital-product',
    status: 'live',
    releaseDate: null,
    summary: '記下生活裡那些「上一次是什麼時候」的小事，讓日常有跡可循。',
    description: [
      'little-days 是一個生活提醒與紀錄工具。它不催促你把每件事做得完美，只是安靜地替你記住：上一次換貓砂、上一次澆花、上一次打電話給某個人，是哪一天。',
      '日常的重複常常讓人失去時間感。這個工具想做的，是在那些容易被遺忘的間隔裡，留下一點可以回頭查看的痕跡。',
    ],
    tags: ['生活', '提醒', '紀錄', 'PWA', 'tool'],
    linkKey: 'littleDays',
    cover: null,
    motif: 'calendar',
    featured: true,
  },
  {
    id: 'off-page',
    code: 'MP-002',
    title: 'Off-Page',
    subtitle: '岔頁',
    category: 'narrative',
    status: 'live',
    releaseDate: null,
    summary: '角色、世界觀與互動敘事創作的入口——故事在正文之外岔開的地方。',
    description: [
      'Off-Page 收納角色、世界觀與互動敘事的創作。它像一本書裡被折起的那一頁：不在主線上，卻藏著另一條路。',
      '這裡是多個故事世界的入口，每一扇門後都有各自的規則、人物與尚未寫完的段落。',
    ],
    tags: ['角色', '世界觀', '互動敘事', 'narrative'],
    linkKey: 'offPage',
    cover: null,
    motif: 'pages',
    featured: true,
  },
  {
    id: 'lexnote',
    code: 'MP-003',
    title: 'LEXNOTE',
    subtitle: '法律知識庫',
    category: 'knowledge',
    status: 'concept-dev',
    releaseDate: null,
    summary: '整理法律考點、考題、體系圖與判決的知識庫，讓條文之間的關係變得可見。',
    description: [
      'LEXNOTE 是一個法律知識庫的構想：把考點、考題、體系圖與判決放進同一個系統，讓原本散落在筆記與書頁之間的知識，能夠互相連結、被重新檢索。',
      '目前仍在概念與開發階段，尚未正式發布。',
    ],
    tags: ['法律', '考點', '判決', '體系圖', 'knowledge base'],
    linkKey: 'lexnote',
    cover: null,
    motif: 'lattice',
    featured: false,
  },
  {
    id: 'null',
    code: 'MP-004',
    title: 'NULL',
    subtitle: '風險預測系統',
    category: 'experimental',
    status: 'reserved',
    releaseDate: null,
    summary: '以風險預測系統為主題的互動敘事世界。當一個人被計算成數值，剩下的是什麼？',
    description: [
      'NULL 是一個以風險預測系統為主題的互動敘事世界。系統替每個人給出分數，而故事從那些無法被歸類、被標記為空值的人開始。',
      '檔案內容仍在整理中，狀態與連結將於日後更新。',
    ],
    tags: ['科幻', '互動敘事', '系統', 'experimental'],
    linkKey: 'null',
    cover: null,
    motif: 'void',
    featured: true,
  },
]

export function getWork(id) {
  return works.find((w) => w.id === id) ?? null
}
