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
 *   playKey      遊玩連結代號（可省略），有填才會顯示「前往遊玩」
 *   cover        封面圖片路徑，例如 '/covers/little-days.webp'（放在 public/covers/）
 *                填 null 時使用程式產生的幾何封面
 *   motif        幾何封面圖樣：'calendar' | 'pages' | 'lattice' | 'void' | 'door' | 'phone' | 'chairs'
 *   gallery      作品圖集（可省略）：[{ src: '/works/<id>/01.webp', alt: '圖片說明' }]，圖片放在 public/works/<id>/
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
    featured: false,
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
    status: 'live',
    releaseDate: null,
    summary: '整理法律考點、考題、體系圖與判決的知識庫，讓條文之間的關係變得可見。',
    description: [
      'LEXNOTE 是一個法律知識庫的構想：把考點、考題、體系圖與判決放進同一個系統，讓原本散落在筆記與書頁之間的知識，能夠互相連結、被重新檢索。',
      '公開版不需要帳號，資料只存在使用者自己的瀏覽器裡。',
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
    subtitle: '無分類者',
    category: 'experimental',
    status: 'live',
    releaseDate: null,
    summary: '當所有人都能被預測，只有你無法被分類。以風險預測系統為主題的互動敘事世界。',
    description: [
      'NULL 是一個以風險預測系統為主題的近未來互動敘事世界。系統替每個人給出分數，而故事從那些無法被歸類、被標記為空值的人開始。',
    ],
    tags: ['科幻', '互動敘事', '系統', 'experimental'],
    linkKey: 'null',
    playKey: 'playNull',
    cover: null,
    motif: 'void',
    featured: true,
  },
  {
    id: 'seventh-marriage-registry',
    code: 'MP-005',
    title: '第七婚籍管理處',
    subtitle: '一紙婚籍，萬種人生',
    category: 'narrative',
    status: 'live',
    releaseDate: null,
    summary: '冥府的婚籍管理處發現一份原契受損。你與伴侶必須穿越不同世界，走完三段人生，讓契約重新成立。',
    description: [
      '第七婚籍管理處是一部冥府奇幻互動敘事。一對伴侶的婚籍原契出現破損，為了修復它，你們將穿越古代、現代、奇幻與未來等不同世界，完成「三境驗契」。',
      '進入之前，你可以自訂自己與伴侶的名字、外貌、性別、性格與起始關係。選定的角色會陪你走過每一段人生，不會在途中更換。',
    ],
    tags: ['冥府', '互動敘事', '奇幻', '多世界', 'narrative'],
    linkKey: 'seventhRegistry',
    playKey: 'playSeventhRegistry',
    cover: null,
    motif: 'door',
    featured: true,
  },
  {
    id: 'phone-widget',
    code: 'MP-006',
    title: '手機小工具',
    subtitle: '角色主畫面小工具',
    category: 'digital-product',
    status: 'live',
    releaseDate: null,
    summary: '讓角色住進 iPhone 主畫面，看時間跟你說話。抬頭就看得到，不用打開任何 app。',
    description: [
      '以 Scriptable 製作的 iPhone 主畫面小工具。角色會依早晚、星期、季節、上班日或休假日說不同的話，提醒你帶傘、加外套、喝水或充電，也會記得你們認識了多少天，在紀念日說些特別的話。',
      '輕點畫面可以摸頭、捏臉、牽手、擁抱，每種互動都有各自的反應；點一下台詞，就能進入聊天頁和她說話。她每天也會留下一篇日記。',
      '可以依照說明自己動手製作，也提供換上自己角色的委託。',
    ],
    tags: ['iPhone', '小工具', 'Scriptable', '角色', '聊天', 'widget'],
    linkKey: 'phoneWidget',
    cover: null,
    motif: 'phone',
    featured: false,
  },
  {
    id: 'the-unfinished-love',
    code: 'MP-007',
    title: '愛的未完成式',
    subtitle: 'THE UNFINISHED LOVE',
    category: 'narrative',
    status: 'live',
    releaseDate: null,
    summary: '離婚協議書已經放在桌上，但還沒有人簽名。一場關於婚姻、選擇與告別的 AI 互動敘事。',
    description: [
      '《愛的未完成式》是一部以婚姻、離婚協商與關係選擇為核心的 AI 互動敘事。故事開始於一份尚未簽署的離婚協議書：你可以試著修復，也可以選擇離開。',
      '婚姻的背景由你自己設定，透過自由對話與角色互動推進故事。對方有自己的意志，可以接受、拒絕、猶豫，或提出自己的條件；故事不保證復合，也沒有預先寫好的結局。',
      '家務、經濟、承諾與那些沒有說出口的事情，都是婚姻的一部分。作品於 ChelizAI 遊玩。',
    ],
    tags: ['婚姻', '離婚協商', '互動敘事', 'AI 互動', 'ChelizAI', 'narrative'],
    linkKey: 'theUnfinishedLove',
    playKey: 'playTheUnfinishedLove',
    cover: null,
    motif: 'chairs',
    featured: true,
  },
  {
    id: 'siang-collector',
    code: 'MP-008',
    title: '小湘收集器',
    subtitle: 'SIANG COLLECTOR',
    category: 'digital-product',
    status: 'live',
    releaseDate: null,
    summary: '孵一顆蛋，遇見一百多種小湘。一款會陪你過日常的收藏小遊戲。',
    description: [
      '小湘收集器是一款手機上的收藏養成小遊戲。故事從一封信開始：小湘把她的蛋交給你，接下來，就由你把她孵出來。',
      '完成每日願望拿到能量，一點一點注入蛋裡，等她自己破殼。一百多位小湘各有各的個性，好感度升上去，還能讀到她們的專屬小故事。',
      '簽到、化石交換、派小湘出門寄明信片、限定紀念蛋，遇見的小湘也會住進首頁陪你。用手機打開就能玩，可以加到主畫面。',
    ],
    tags: ['收集', '養成', '恐龍蛋', '小遊戲', 'PWA', 'game'],
    linkKey: 'siangCollector',
    cover: '/covers/siang-collector.webp',
    motif: 'door',
    video: {
      src: '/works/siang-collector/intro.mp4',
      poster: '/works/siang-collector/poster.webp',
      label: '小湘收集器介紹影片',
    },
    chapters: [
      {
        title: '一封信，一顆蛋',
        lead: '小湘把她的蛋交給你了',
        text: '第一次打開，會先收到小湘寫給你的信：「這顆蛋就交給你了，聽說只要好好照顧它，就會孵出一個很可愛的東西。」收下這顆蛋，日常就開始了。',
        image: '/works/siang-collector/ch01.webp',
      },
      {
        title: '孵出你的小湘',
        lead: '完成每日願望拿能量，注入溫暖等她破殼',
        text: '每天的願望會換成能量，一點一點注進蛋裡。進度滿了，就會聽見小小的聲音，蛋殼裂開，一位新的小湘跟你說：「初次見面，請多指教。」',
        image: '/works/siang-collector/ch02.webp',
      },
      {
        title: '小湘圖鑑',
        lead: '一百多位小湘，每一位都有自己的個性',
        text: '日常系列、隱藏配方、天氣與時節，圖鑑裡收著每一位遇見過的小湘。點開就能看到她的星等、喜歡的東西，和跟她之間的好感度。',
        image: '/works/siang-collector/ch03.webp',
      },
      {
        title: '點進小故事',
        lead: '好感度到 Lv.3，就能讀她的專屬小故事',
        text: '故事檔案館裡分成討伐故事、小湘故事和旅行故事。和小湘越熟，能讀到的就越多。',
        image: '/works/siang-collector/ch04.webp',
      },
      {
        title: '羈絆合照',
        lead: '對的三人組一起出發，解鎖隱藏合照',
        text: '把對的三位小湘湊成一隊派去討伐，會拍下一張只屬於她們的合照。',
        image: '/works/siang-collector/ch05.webp',
      },
      {
        title: '月簽到',
        lead: '每天簽一下，滿 28 天送星光蛋',
        text: '每個月一張簽到表，7 天、14 天、21 天都有小禮物，連續簽滿 28 天就能拿到星光蛋。',
        image: '/works/siang-collector/ch06.webp',
      },
      {
        title: '化石交換所',
        lead: '抽到重複的？換成化石，指定想見的她',
        text: '重複的小湘會變成化石。存夠了，可以換能量、換願望，也可以直接指定一位你想見的小湘。',
        image: '/works/siang-collector/ch07.webp',
      },
      {
        title: '明信片盒',
        lead: '縣市小湘出遠門，會寄家鄉明信片回來',
        text: '派小湘出門到便利商店、公園、夜市、海邊或山上。各縣市的小湘去旅行時，會寄一張家鄉的明信片回來，收進明信片盒。',
        image: '/works/siang-collector/ch08.webp',
      },
      {
        title: '限定紀念蛋',
        lead: '九合一大選限定，公民小湘紀念蛋',
        text: '特別的日子會有限定的蛋。選培育的蛋時挑紀念蛋，孵出來的是只在那段時間出現的小湘，例如 115 年九合一大選版的公民小湘。',
        image: '/works/siang-collector/ch09.webp',
      },
      {
        title: '小湘的日常',
        lead: '遇見的小湘，會住進你的首頁陪你',
        text: '孵出來的小湘會在首頁走來走去，今天的願望、正在孵的蛋，打開就看得到。',
        image: '/works/siang-collector/ch10.webp',
      },
    ],
    closing: '你的那顆蛋，也在等你喔 ♡',
    featured: false,
  },
]

export function getWork(id) {
  return works.find((w) => w.id === id) ?? null
}
