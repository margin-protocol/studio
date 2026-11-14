# MARGIN PROTOCOL.｜頁邊協定

> Where stories meet systems.
> 在文字與系統之間，創造另一種可能。

獨立創作工作室官方網站。React + Vite + Tailwind CSS v4 + Motion + Lucide，純前端、無後端、無金鑰，透過 GitHub Actions 自動部署到 GitHub Pages。

---

## 1. 網站架構

```
/                    00 ENTRANCE    首頁：品牌標題、標語、門框主視覺、檔案目錄、精選作品、工作室簡介、聯絡入口
/archive             01 ARCHIVE     作品檔案館：分類篩選、關鍵字搜尋（條件同步到網址，可分享）
/archive/:id         └ 作品詳情     檔案展開動畫、詳細介紹、檔案資料表、外部連結、上一份／下一份
/laboratory          02 LABORATORY  實驗室：研究日誌形式的未發布作品與原型
/manifesto           03 MANIFESTO   工作室宣言：序言 + 四條協定
/contact             04 CONTACT     聯絡與委託：四項服務（可帶主旨的 mailto）、信箱入口
*                    404            FILE NOT FOUND
```

全站共用：頂部導覽（桌面橫列、手機摺疊選單）、日／夜模式切換、頁尾、跳到主要內容連結、首頁首次進入的 INITIALIZING ARCHIVE 動畫。

## 2. 首頁視覺設計說明

| 元素 | 做法 |
|---|---|
| 氛圍 | 午夜檔案館。深墨底 `#17191F`、米白字 `#F0EAE0`，霧紫 `#A99AB8` 只用在關鍵處（句點、目前所在頁、狀態點），灰銅 `#887B72` 用在檔案編號與細線 |
| 品牌標題 | `MARGIN / PROTOCOL.` 兩行大型 Serif（Cormorant Garamond），句點以霧紫標記，逐行上浮進場 |
| 中文 | 「頁邊協定」使用思源宋體（Noto Serif TC），加大字距 |
| 標語 | 左側一條霧紫細線，英文斜體 Serif、中文宋體，像書頁邊的註記 |
| 主視覺 | 品牌符號標誌：象牙主板與霧紫側板依序浮現，背後一圈門後微光 |
| 紋理 | 全站極淡紙張雜訊 + 漸隱的低對比網格 |
| 檔案感 | 所有區塊以 Monospace 檔案編號標示（FILE 00、MP-001、LAB-01），作品卡片頂端有索引標籤 |
| 留白 | 大量垂直留白、窄欄文字，閱讀優先 |
| 進場動畫 | 約 1.9 秒的 INITIALIZING ARCHIVE；每個瀏覽階段只播一次、只在首頁播；點任意處、按任意鍵或「略過」立即關閉；系統開啟「減少動態」時完全不播 |

日間模式改為舊紙張色 `#EEE8DE`，霧紫與灰銅自動加深以維持文字對比。

## 3. 專案資料夾結構

```
margin-protocol/
├─ index.html                 SEO／Open Graph metadata、字體、防閃爍主題腳本
├─ package.json
├─ vite.config.js
├─ .nvmrc                     Node 22
├─ public/
│  ├─ favicon.svg
│  ├─ apple-touch-icon.png
│  ├─ og-image.png            社群分享圖（1200×630）
│  └─ robots.txt
└─ src/
   ├─ main.jsx                進入點
   ├─ App.jsx                 路由與換頁轉場
   ├─ index.css               Tailwind、色彩變數、紙張紋理、網格、減少動態
   ├─ config/
   │  ├─ site.js              ★ 品牌文字、正式網址、聯絡信箱
   │  └─ links.js             ★ 所有外部連結（集中修改）
   ├─ data/
   │  ├─ works.js             ★ 作品檔案資料
   │  ├─ lab.js               ★ 實驗室紀錄
   │  └─ taxonomy.js          ★ 分類與開發狀態定義
   ├─ hooks/
   │  ├─ useTheme.js          日／夜模式
   │  └─ usePageMeta.js       各頁 title 與 description
   ├─ components/
   │  ├─ Layout.jsx  Header.jsx  Footer.jsx  navigation.js
   │  ├─ IntroOverlay.jsx     進場動畫
   │  ├─ Page.jsx             換頁轉場外框
   │  ├─ PageHeading.jsx      分頁標題區
   │  ├─ WorkCard.jsx         作品卡片
   │  ├─ WorkCover.jsx        作品封面（圖片或程式產生的幾何封面）
   │  ├─ StatusBadge.jsx      開發狀態
   │  └─ LogoMark.jsx         品牌符號標誌（首頁主視覺、導覽列、頁尾）
   └─ pages/
      ├─ Home.jsx  Archive.jsx  WorkDetail.jsx
      ├─ Laboratory.jsx  Manifesto.jsx  Contact.jsx  NotFound.jsx
```

標 ★ 的檔案是日常會修改的內容；畫面元件不需要動。

## 4. 本機啟動

需要 Node.js 20.19 以上（建議 22）。

```bash
cd margin-protocol
npm install        # 第一次安裝套件
npm run dev        # 開發模式，打開終端機顯示的網址（通常是 http://localhost:5173）
npm run build      # 打包成 dist/
npm run preview    # 在本機預覽打包後的版本
```

## 5. 常見修改

**新增作品**：在 `src/data/works.js` 複製一筆物件，修改 `id`、`code`、內容。若有網址，到 `src/config/links.js` 新增一筆，例如 `myWork: 'https://...'`，作品的 `linkKey` 填 `'myWork'`。

**作品封面**：把圖片放到 `public/covers/`，作品的 `cover` 填 `'/covers/檔名.webp'`。沒有圖時維持 `null`，會使用程式產生的幾何封面。建議尺寸 1600×1000（16:10）。

**更改外部網址**（例如 GitHub 帳號改名）：只改 `src/config/links.js`。

**聯絡信箱**：`src/config/site.js` 的 `email`（目前為 marginprotocol.studio@gmail.com）。

**Logo**：符號標誌是依品牌規範重繪的向量檔 `src/components/LogoMark.jsx`，夜間為象牙色、日間自動改為檔案黑。品牌規範原圖放在 `docs/brand/brand-sheet-v1.jpg`。favicon、App 圖示、社群分享圖在 `public/`。

**正式網址**：目前為 GitHub Pages 網址；更換時修改 `src/config/site.js` 的 `url` 與 `index.html` 的分享網址（詳見第 6 節）。

**未完成的作品**：`status` 用 `concept`、`concept-dev`、`development` 或 `reserved`，`releaseDate` 填 `null`，`linkKey` 對應的網址填 `null`，詳情頁會顯示「外部連結尚未開放」。

## 6. 部署：GitHub Pages

網址：**https://margin-protocol.github.io/studio/**

部署已自動化（`.github/workflows/deploy.yml`）：每次推到 `main`，GitHub Actions 會自動安裝套件、打包並發布，不需要手動上傳任何檔案。

### 第一次啟用（只要做一次）

1. 打開 repo → **Settings** → 左側 **Pages**。
2. **Build and deployment → Source** 選 **GitHub Actions**。
3. 到 **Actions** 分頁，點最新一次的「Deploy to GitHub Pages」→ 右上 **Re-run all jobs**（或推一次新的 commit）。
4. 綠色勾勾出現後，打開上面的網址即可。

### 之後更新

```bash
git add .
git commit -m "更新內容"
git push
```

約 1–2 分鐘後網站自動更新。進度可在 Actions 分頁查看。

### 網址路徑說明

- 因為網站在 `/studio/` 底下，`vite.config.js` 的 `base` 設為 `'/studio/'`。
- 若 repo 改名為 `margin-protocol.github.io`，或綁定自訂網域，請把 `base` 改成 `'/'`，並更新 `src/config/site.js` 的 `url` 與 `index.html` 的 `og:url`、`og:image`、`twitter:image`。
- 單頁應用程式路由：打包時會把 `index.html` 複製成 `404.html`，直接開啟或重新整理 `/studio/archive/off-page` 也能正常顯示。

### 其他平台（選用）

也可部署到 Cloudflare Pages：連接此 repo，Build command `npm run build`、Output directory `dist`，並把 `base` 改成 `'/'`。

## 7. 品質與無障礙

- 介面語言為繁體中文（`lang="zh-Hant-TW"`），英文段落另標 `lang="en"`
- 語意化 HTML：`header`、`nav`、`main`、`article`、`aside`、`dl`、每頁一個 `h1`
- 鍵盤操作：跳到主要內容、可見的 focus 樣式、Esc 關閉手機選單與進場動畫、分類按鈕使用 `aria-pressed`、搜尋結果數量以 `aria-live` 播報
- `prefers-reduced-motion`：Motion 的 `reducedMotion="user"` + CSS 全域縮短動畫 + 不播進場動畫
- 外部連結一律 `target="_blank" rel="noopener noreferrer"`，並提示「另開新視窗」
- 圖片封面使用 `loading="lazy"`、`decoding="async"`
- 沒有後端、沒有 API Key、沒有登入或付款

## 8. 下一步可擴充

- 作品詳情加入圖片集、製作紀錄
- 實驗室各筆紀錄加入日期與獨立頁面
- 英文版介面（i18n）
- `sitemap.xml` 自動產生
- 預先產生靜態 HTML（prerender），讓社群預覽能讀到各作品頁的專屬標題
