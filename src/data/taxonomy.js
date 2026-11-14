/**
 * 分類與開發狀態的定義
 * 新增分類：在 categories 加一筆，作品的 category 填入對應的 id 即可。
 */

export const categories = [
  { id: 'digital-product', label: 'Digital Product', labelZh: '數位產品' },
  { id: 'narrative', label: 'Narrative', labelZh: '敘事' },
  { id: 'knowledge', label: 'Digital / Knowledge', labelZh: '知識系統' },
  { id: 'experimental', label: 'Experimental Narrative', labelZh: '實驗敘事' },
]

/**
 * tone 對應畫面上的顏色：
 *   live    → 霧紫實心點
 *   dev     → 灰銅點
 *   pending → 空心點
 */
export const statuses = {
  live: { label: '已上線', en: 'LIVE', tone: 'live' },
  development: { label: '開發中', en: 'IN DEVELOPMENT', tone: 'dev' },
  'concept-dev': { label: '概念／開發中', en: 'CONCEPT / IN DEV', tone: 'dev' },
  concept: { label: '概念階段', en: 'CONCEPT', tone: 'pending' },
  prototype: { label: '原型測試', en: 'PROTOTYPE', tone: 'dev' },
  reserved: { label: '資料保留中', en: 'RESERVED', tone: 'pending' },
  personal: { label: '個人使用中', en: 'IN USE', tone: 'dev' },
}

export function getCategory(id) {
  return categories.find((c) => c.id === id) ?? { id, label: id, labelZh: id }
}

export function getStatus(id) {
  return statuses[id] ?? { label: '未標示', en: 'UNKNOWN', tone: 'pending' }
}
