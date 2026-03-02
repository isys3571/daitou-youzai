# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## クライアント情報

**大東熔材株式会社（だいとうようざい）**

| 項目 | 内容 |
|------|------|
| 会社名 | 大東熔材株式会社 |
| 所在地 | 〒577-0016 大阪府東大阪市長田西4丁目4番3号 |
| 設立 | 1961年（昭和36年） |
| 業種 | 卸売業・商社（工業用機械専門商社） |
| ターゲット | BtoB（鉄工所、製造業の工場、建設業者など） |

**事業内容**: 溶接機材の販売、工業用高圧ガスの販売（大阪高圧ガス熔材協同組合会員）、工作機械・工具の販売

**デザイン方針**: 「長年の実績」「地域（東大阪のモノづくり）への貢献」「信頼感」をキーワードに。スタイリッシュさより**実用性重視**（取り扱い商品の分かりやすさ、電話番号・アクセスの明瞭さ）。

---

## ⚠️ CRITICAL: Eleventy ビルドシステム

**HTMLファイルを直接編集してはいけない。必ず `src/` のテンプレートを編集してからビルドする。**

`src/`（テンプレート）とビルド済みHTML（ルート直下）の**両方をGit管理**している。ブランチ切り替え時にテンプレートが失われないようにするためこの方式を採用。

```
src/                         # ✅ Git管理（テンプレート）
├── _includes/
│   ├── layouts/base.njk
│   ├── header.njk
│   ├── footer.njk
│   └── mobile-nav.njk
├── index.njk
├── kaisha-joho/index.njk
├── shohin/index.njk
├── access/index.njk
├── contact/index.njk
├── css/tailwind-input.css
└── js/

        ↓ npm run build

index.html, css/, js/ など  # ✅ Git管理（ビルド済み・Cloudflare Pagesへpush）
```

Git管理**外**（.gitignore）: `node_modules/`, `_site/`

### 開発ワークフロー

```bash
# テンプレートを編集
vi src/_includes/header.njk
vi src/index.njk

# ビルド（CSS + Eleventy → ルートにコピー）
npm run build

# 差分確認
git diff index.html

# コミット・push
git add -A
git commit -m "update: ページ更新"
git push
```

### NPM Scripts

```bash
npm install        # 初回のみ
npm run build      # 本番ビルド（CSS→Eleventy→_site/*をルートにコピー→_site削除）
npm run dev        # ローカル開発サーバー（http://localhost:8080）
npm run clean      # _site削除
```

### .gitignore の対象（コミット不要）

```
node_modules/
_site/
```

---

## テクノロジースタック

- **Build**: Eleventy (11ty) v3 + Nunjucks テンプレート
- **CSS**: Tailwind CSS（ローカルでコンパイル → `css/tailwind.css` をコミット）
- **Interactivity**: Alpine.js（CDN）
- **Fonts**: Noto Sans JP（本文）、游ゴシック or Noto Serif JP（見出し）
- **Deploy**: Cloudflare Pages（ビルド済みHTMLをpushするだけ。CF側でのビルドなし）

---

## Eleventy 設定ポイント

```javascript
eleventyConfig.setUseGitIgnore(false);  // src/がgitignoreされていても処理する

// 静的ファイルパススルー
eleventyConfig.addPassthroughCopy("src/css");
eleventyConfig.addPassthroughCopy("src/js");
eleventyConfig.addPassthroughCopy("src/images");

// 出力設定
return {
  dir: { input: "src", output: "_site", includes: "_includes" },
  templateFormats: ["html", "njk"],
  htmlTemplateEngine: "njk"
};
```

---

## ページ構成

| ページ | src ファイル | URL |
|--------|------------|-----|
| トップ | `src/index.njk` | `/` |
| 会社情報 | `src/kaisha-joho/index.njk` | `/kaisha-joho/` |
| 取扱商品 | `src/shohin/index.njk` | `/shohin/` |
| アクセス | `src/access/index.njk` | `/access/` |
| お問い合わせ | `src/contact/index.njk` | `/contact/` |

---

## Alpine.js モバイルメニュー

```html
<!-- base.njk: body に x-data を付与 -->
<body x-data="{ mobileMenuOpen: false }">
  <div id="container" :class="{'translate-x-[270px]': mobileMenuOpen}">

<!-- header.njk: トグルボタン -->
<button @click.prevent="mobileMenuOpen = !mobileMenuOpen">...</button>

<!-- mobile-nav.njk: スライドメニュー -->
<nav :class="{'translate-x-0': mobileMenuOpen, '-translate-x-full': !mobileMenuOpen}">
```

**NG**: `<script>` タグでのバニラJS `toggleMobileMenu()` は使わない。

---

## テキスト視認性ルール

- グラデーション背景 → `text-white`（`text-white/80` などの透明度は使わない）
- 白背景 → `text-gray-900` or カスタムカラー（`text-white` は絶対NG）

---

## デザインシステム（tailwind.config.js）

```js
colors: {
  primary: '...',    // メインカラー（設定時に記入）
  secondary: '...',  // アクセントカラー（設定時に記入）
  body: '#333333',
}
// container.max-width: 960px (center)
```
