/**
 * 打包後的 SEO 產生器（npm run build 會在 vite build 之後自動執行）
 * ------------------------------------------------------------
 * GitHub Pages 是靜態主機，單頁應用程式的子頁（例如 /studio/archive/null）
 * 原本只能靠 404.html 撐著，Google 會看到 404 狀態而不收錄。
 * 這支腳本會：
 *   1. 替每一頁產生自己的 index.html（標題、簡介、canonical、分享卡、結構化資料）
 *   2. 產生 sitemap.xml、llms.txt
 *   3. 產生帶 noindex 的 404.html
 *
 * 新增作品只要改 src/data/works.js，這裡會自動跟上，不用動這支檔案。
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { site } from '../src/config/site.js'
import { getLink } from '../src/config/links.js'
import { works } from '../src/data/works.js'
import { experiments } from '../src/data/lab.js'
import { getCategory, getStatus } from '../src/data/taxonomy.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const base = site.url.replace(/\/?$/, '/') // https://margin-protocol.github.io/studio/
const ogImage = `${base}og-image.png`
const logo = `${base}apple-touch-icon.png`
const today = new Date().toISOString().slice(0, 10)

const brand = `${site.name} ${site.nameZh}`
const homeTitle = `${site.name}｜${site.nameZh}`
const homeDescription = `${brand}——${site.description}${site.taglineEn}`

const sameAs = [
  'https://www.threads.net/@xiaxia_7575',
  'https://github.com/margin-protocol',
]

/* ---------- 小工具 ---------- */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// JSON-LD 放在 <script> 裡，要避免字串中的 </script> 提前結束標籤
const ld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

const url = (path) => base + path.replace(/^\//, '')

const orgId = `${base}#organization`
const webId = `${base}#website`

const organization = {
  '@type': 'Organization',
  '@id': orgId,
  name: site.name,
  alternateName: [site.nameZh, 'MARGIN PROTOCOL', 'Margin Protocol'],
  url: base,
  logo,
  image: ogImage,
  email: site.email,
  slogan: site.taglineEn,
  description: `${site.description}${site.taglineZh}`,
  foundingDate: String(site.since),
  knowsAbout: ['文學', '互動敘事', '藝術與設計', '創意程式', '數位產品'],
  sameAs,
}

const website = {
  '@type': 'WebSite',
  '@id': webId,
  name: site.name,
  alternateName: site.nameZh,
  url: base,
  inLanguage: 'zh-Hant-TW',
  publisher: { '@id': orgId },
}

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: url(path),
    })),
  }
}

/* ---------- 每一頁的資料 ---------- */

const pages = [
  {
    path: '',
    title: homeTitle,
    description: homeDescription,
    ogType: 'website',
    graph: [organization, website],
    body: `
      <h1>${esc(brand)}</h1>
      <p>${esc(site.taglineEn)} ${esc(site.taglineZh)}</p>
      <p>${esc(site.description)}</p>
      <h2>作品</h2>
      <ul>${works
        .map((w) => `<li><a href="${url(`archive/${w.id}/`)}">${esc(w.title)}</a>：${esc(w.summary)}</li>`)
        .join('')}</ul>`,
  },
  {
    path: 'archive/',
    title: `作品檔案館｜${site.name}`,
    description: '瀏覽 MARGIN PROTOCOL. 的作品檔案：數位產品、互動敘事、知識系統與實驗作品。',
    graph: [
      {
        '@type': 'CollectionPage',
        name: '作品檔案館',
        url: url('archive/'),
        isPartOf: { '@id': webId },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: works.map((w, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: url(`archive/${w.id}/`),
            name: w.title,
          })),
        },
      },
      breadcrumb([[site.name, ''], ['作品檔案館', 'archive/']]),
    ],
    body: `
      <h1>作品檔案館</h1>
      <ul>${works
        .map((w) => `<li><a href="${url(`archive/${w.id}/`)}">${esc(w.code)} ${esc(w.title)}</a>：${esc(w.summary)}</li>`)
        .join('')}</ul>`,
  },
  ...works.map((w) => {
    const name = w.subtitle ? `${w.title}｜${w.subtitle}` : w.title
    const ext = getLink(w.linkKey)
    const cat = getCategory(w.category)
    return {
      path: `archive/${w.id}/`,
      title: `${w.code} ${w.title}｜${site.name}`,
      description: w.summary,
      ogType: 'article',
      graph: [
        {
          '@type': 'CreativeWork',
          name,
          alternateName: w.subtitle || undefined,
          description: w.summary,
          abstract: w.description.join(''),
          url: url(`archive/${w.id}/`),
          sameAs: ext || undefined,
          genre: cat.labelZh,
          keywords: w.tags.join(', '),
          inLanguage: 'zh-Hant-TW',
          image: ogImage,
          creator: { '@id': orgId },
          publisher: { '@id': orgId },
        },
        breadcrumb([[site.name, ''], ['作品檔案館', 'archive/'], [w.title, `archive/${w.id}/`]]),
      ],
      body: `
        <h1>${esc(name)}</h1>
        <p>${esc(w.summary)}</p>
        ${w.description.map((p) => `<p>${esc(p)}</p>`).join('')}
        <p>分類：${esc(cat.labelZh)}｜狀態：${esc(getStatus(w.status).label)}</p>
        ${ext ? `<p><a href="${esc(ext)}">前往作品</a></p>` : ''}`,
    }
  }),
  {
    path: 'laboratory/',
    title: `實驗室｜${site.name}`,
    description: '尚未正式發布的作品、互動原型、AI 實驗與創意工具的研究紀錄。',
    graph: [breadcrumb([[site.name, ''], ['實驗室', 'laboratory/']])],
    body: `
      <h1>實驗室</h1>
      <ul>${experiments
        .map((e) => `<li>${esc(e.code)} ${esc(e.title)}（${esc(e.kind)}）：${esc(e.abstract)}</li>`)
        .join('')}</ul>`,
  },
  {
    path: 'manifesto/',
    title: `工作室宣言｜${site.name}`,
    description: `${site.motto}——MARGIN PROTOCOL. 的創作理念。`,
    graph: [breadcrumb([[site.name, ''], ['工作室宣言', 'manifesto/']])],
    body: `<h1>工作室宣言</h1><p>${esc(site.motto)}</p>`,
  },
  {
    path: 'contact/',
    title: `聯絡與委託｜${site.name}`,
    description: '合作邀約、數位工具與網站開發、互動敘事設計、角色與世界觀創作。',
    graph: [
      {
        '@type': 'ContactPage',
        name: '聯絡與委託',
        url: url('contact/'),
        isPartOf: { '@id': webId },
        about: { '@id': orgId },
      },
      breadcrumb([[site.name, ''], ['聯絡與委託', 'contact/']]),
    ],
    body: `<h1>聯絡與委託</h1><p>合作邀約、數位工具與網站開發、互動敘事設計、角色與世界觀創作。</p><p>信箱：<a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>`,
  },
]

/* ---------- 產生 HTML ---------- */

const template = readFileSync(join(dist, 'index.html'), 'utf8')

function seoBlock({ path, title, description, ogType = 'website', graph, noindex = false }) {
  const canonical = url(path)
  const g = graph.map((n) => JSON.parse(JSON.stringify(n))) // 去掉 undefined 欄位
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    noindex
      ? `<meta name="robots" content="noindex" />`
      : `<link rel="canonical" href="${canonical}" />`,
    `<meta name="author" content="${esc(site.name)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    noindex ? '' : `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${brand}｜${site.taglineEn}`)}" />`,
    `<meta property="og:locale" content="zh_TW" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    g.length ? ld({ '@context': 'https://schema.org', '@graph': g }) : '',
  ]
    .filter(Boolean)
    .map((l) => `    ${l}`)
    .join('\n')
}

function render(page) {
  const html = template
    .replace(/[ \t]*<!-- SEO:START[\s\S]*?<!-- SEO:END -->/, seoBlock(page))
    .replace(
      /[ \t]*<!-- NOSCRIPT:START -->[\s\S]*?<!-- NOSCRIPT:END -->/,
      `    <noscript>
      <div style="padding:2rem;color:#F0EAE0;background:#17191F;font-family:serif;line-height:1.8">
        ${page.body.trim()}
        <p>（此網站需要啟用 JavaScript 才能完整瀏覽檔案館。）</p>
      </div>
    </noscript>`,
    )
  if (html === template) throw new Error('找不到 SEO 標記，請確認 index.html 裡的 SEO:START / SEO:END 還在')
  return html
}

function write(rel, content) {
  const file = join(dist, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

for (const page of pages) {
  write(join(page.path, 'index.html'), render(page))
}

// 404：給 SPA 備援用，但不讓搜尋引擎收錄
write(
  '404.html',
  render({
    path: '',
    title: `找不到檔案｜${site.name}`,
    description: homeDescription,
    graph: [],
    noindex: true,
    body: `<h1>FILE NOT FOUND</h1><p><a href="${base}">回到 ${esc(site.name)}</a></p>`,
  }),
)

/* ---------- sitemap.xml ---------- */

const priority = (p) => (p === '' ? '1.0' : p === 'archive/' ? '0.9' : p.startsWith('archive/') ? '0.8' : '0.6')
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${url(p.path)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(p.path)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
)

/* ---------- llms.txt（給 AI 搜尋與助理看的網站說明） ---------- */

write(
  'llms.txt',
  `# ${brand}

> ${site.taglineEn} ${site.taglineZh}

${brand} 是${site.description}${site.motto}

- 官網：${base}
- 聯絡信箱：${site.email}
- Threads：@xiaxia_7575
- 所有作品皆以 ${site.name} 名義出品。

## 作品

${works
  .map((w) => {
    const ext = getLink(w.linkKey)
    return `- [${w.title}${w.subtitle ? `｜${w.subtitle}` : ''}](${url(`archive/${w.id}/`)})：${w.summary}${ext ? `（作品網址：${ext}）` : ''}`
  })
  .join('\n')}

## 實驗室

${experiments.map((e) => `- ${e.title}（${e.kind}）：${e.abstract}`).join('\n')}

## 頁面

- [作品檔案館](${url('archive/')})
- [實驗室](${url('laboratory/')})
- [工作室宣言](${url('manifesto/')})
- [聯絡與委託](${url('contact/')})
`,
)

console.log(`build-seo：已產生 ${pages.length} 個頁面、404.html、sitemap.xml、llms.txt`)
