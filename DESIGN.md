---
version: alpha
name: 大東熔材株式会社 Corporate Site
description: 東大阪の工業用機材専門商社（1961年創業）。BtoB。信頼感と実用性を最優先。
colors:
  primary: "#2c3e50"
  dark: "#1a2633"
  accent: "#1976d2"
  strong: "#333333"
  body: "#555555"
  muted: "#888888"
  faint: "#b3b3b3"
  cream: "#ffffff"
  bg: "#ffffff"
  border: "#d9dde1"
typography:
  display:
    fontFamily: "\"Shippori Mincho B1\", serif"
    usage: "見出し（h1, h2, セクションタイトル）"
  sans:
    fontFamily: "\"Zen Kaku Gothic New\", sans-serif"
    usage: "本文・UI"
  en:
    fontFamily: "Barlow, sans-serif"
    usage: "数字・英字のみ（年号、型番、TEL）"
rounded:
  none: "0"
  sm: "2px"
  max: "4px"
spacing:
  section-y: "80px"
  section-y-sm: "56px"
  gutter: "24px"
container:
  maxWidth: "1280px"
  padding: "24px"
components:
  button-primary:
    background: "{colors.primary}"
    color: "{colors.cream}"
    radius: "0"
    border: "none"
    padding: "14px 28px"
  button-ghost:
    background: "transparent"
    color: "{colors.primary}"
    border: "1px solid {colors.primary}"
    radius: "0"
  card:
    background: "{colors.cream}"
    border: "1px solid {colors.border}"
    radius: "0"
    shadow: "none"
---

## Overview

大東熔材株式会社は1961年創業、大阪府東大阪市の工業用機材専門商社。溶接機材・工業用高圧ガス・工作機械を鉄工所／製造業／建設業者に卸す BtoB 企業。

**このサイトが達成すべき情緒**：
- 「**ここに頼めば確実だ**」という安心感
- 65年続く老舗の**重み**
- 東大阪のモノづくり現場に馴染む**質実剛健さ**

**避けるべき情緒**：
- スタートアップ的なイノベーション感
- 消費者向けブランドのおしゃれ感
- 「AIが作った汎用コーポレートサイト」の既視感

訪問者は「問題が起きた現場の責任者」であって、デザインを鑑賞しに来た人ではない。電話番号・取扱商品・アクセスが最短で見つかることが正義。

## Colors

| トークン | 値 | 用途 |
|----------|-----|------|
| `primary` | `#2c3e50` | 見出し、CTA背景、ヘッダー、縦罫（情報ブロック識別） |
| `dark` | `#1a2633` | 濃色背景、フッター、primary CTA のhover |
| `accent` | `#1976d2` | **限定点使い**。リンクホバー、見出し下の装飾線（`w-10 h-0.5` 等）。大面積NG、縦罫NG |
| `strong` | `#333333` | dd値、重要テキスト（社名・住所・TEL等、情報の本体） |
| `body` | `#555555` | 本文・説明段落のデフォルト |
| `muted` | `#888888` | dt（定義語）、補助メモ |
| `faint` | `#b3b3b3` | 英字サブラベル（SERVICE, COMPANY 等）、小注記（※〜） |
| `cream` | `#ffffff` | 反転文字 |
| `border` | `#d9dde1` | 罫線・区切り |

**Palette ルール**：基本は**白・濃紺系・グレー階調**。accent青は「点」で効かせる道具であって、ページを青にするものではない。色数を増やさない。グレーは `strong → body → muted → faint` の4階調で情報階層を表現する。インライン `style="color:#xxx"` は禁止、必ずtokenのclassで指定する。

## Typography

階層は**少なく、差を大きく**。AIが出す「各要素が少しずつ違うサイズで並ぶ」のを避ける。

| レベル | フォント | サイズ目安 | weight |
|--------|----------|-----------|--------|
| h1 | display (明朝) | 40-56px | 800 |
| h2 | display (明朝) | 28-36px | 600 |
| h3 | sans | 18-20px | 700 |
| body | sans | 16px | 400 |
| caption | sans | 13-14px | 400 |
| 数字・TEL・年号 | en (Barlow) | ケース別 | 500-700 |

**和欧混植**：本文中の数字・英字は自動で Barlow になるよう `font-sans` に英語フォールバックを仕込む。和文と数字を並べたとき数字の存在感を上げる（型番・TEL・創業年が主役になる）。

**見出しは明朝**：業界慣習（工業系BtoB）と「老舗感」に合う。AIのデフォルト（ゴシックonly）から外れる一番効く一打。

## Layout

- **container**: 最大1280px、左右padding 24px
- **section vertical**: desktop 80px / mobile 56px
- **グリッド**: 左揃え基本。中央寄せは h1 / セクションタイトル / CTAのみ
- **カラム**: 2〜3カラム中心。4カラム以上のアイコン＋説明タイルは禁止（AI感の温床）
- **情報密度**: BtoB なので**詰めてよい**。スカスカの余白は「何も言っていない」印象になる

## Elevation & Depth

**影は原則使わない**。階層は以下の順で表現：

1. **罫線**（1px solid border）
2. **背景色の違い**（白 / #f5f6f7 / primary）
3. **余白**
4. 影 ← ここまで来ない

許可される影：
- ドロップダウン・モバイルメニューなど**物理的に重なっているUI**のみ `shadow-md` まで
- カード・セクション・ボタンに影をつけるのは禁止

## Shapes

**全面的に直角**。`radius: 0` がデフォルト。

| 用途 | radius |
|------|--------|
| ボタン | 0 |
| カード | 0 |
| 入力フィールド | 0 |
| 画像 | 0 |
| アイコン背景 | 0 |
| 例外 | ロゴ内の円、丸アイコン（本来丸いもの）のみ |

直線・直角は「工業」「精密」「信頼」のコードと直結する。AIが好んで出す `rounded-lg` / `rounded-xl` / `rounded-2xl` を採用した時点で「やわらかいSaaS感」が侵入する。

## Components

### Button
- **primary**: `bg-primary text-white` / padding `14px 28px` / radius 0 / hover: bg-dark
- **ghost**: `border border-primary text-primary` / radius 0 / hover: bg-primary text-white
- **禁止**: グラデーション背景、shadow、rounded-full、アイコン+矢印の装飾リッチボタン

### Card
- 白背景 + 1px border（`#d9dde1`）
- radius 0、shadow なし
- ホバーで border を primary に変える程度

### Link
- 本文中: `text-primary underline underline-offset-2`
- ホバーで `text-accent`（ここが accent 青の主な使いどころ）

### Icon
- 線画（stroke-based、1.5〜2px）のみ
- ソリッド塗りつぶし、絵文字、3D風アイコン、カラフルイラストは禁止

### Section Heading
- 日本語タイトル（明朝、大）＋ 小さな英語サブ（Barlow、tracking広め、uppercase）の二段
- 左に primary の細い縦罫（3px × 24px）を付ける or 下に細い横罫。毎セクションで共通

## Do's and Don'ts

### DO

- **数字を主役にする**：「1961年創業」「取扱メーカー◯◯社」「TEL 06-…」を具体値のまま大きく出す
- **写真は現場・商品・建物**：モノクロ寄せ／コントラスト強め。スタジオ撮影より倉庫・工場の実写
- **情報密度を上げる**：取扱商品一覧は表形式で詰める。カード化で1商品1タイル×12枚にしない
- **電話番号をヘッダーに固定**：BtoBの最重要UI
- **罫線で区切る**：セクションの境界、表の境界、カードの縁
- **明朝見出しとゴシック本文の対比**で紙面にリズムを作る

### DON'T

- **角丸を使わない**（`rounded` 系クラスは原則禁止。radius 0）
- **グラデーションを使わない**（`bg-gradient-*` 全面禁止。特に青→紫、青→シアン、primary→accent）
- **大面積の shadow を使わない**（カードに shadow-xl、ボタンに shadow-lg など論外）
- **青のCTA大ブロックを作らない**（accent 青をヒーロー全面や巨大ボタンに使わない）
- **絵文字・カラフルアイコンを使わない**（🚀 ⚡ 💡 等は即AI臭）
- **「アイコン＋見出し＋1行説明」のカード4枚並び構成を使わない**（AIランディングページの典型）
- **"Innovation" "Future" "Solutions" 等の汎用英語キャッチを使わない**（意味がなく既視感の塊）
- **ヒーローに「企業名の英訳をでかい英字で置く」をやらない**（Barlow で "DAITO YOZAI" を画面いっぱいに出すやつ）
- **`text-white/70` など文字に透明度をかけない**（可読性が落ちる。CLAUDE.md既出）
- **Inter / Poppins / Montserrat を足さない**（Barlow / Zen Kaku / Shippori の3書体で固定）
- **ダークモードを提供しない**（BtoBコーポレートには不要。範囲を広げない）
- **パーティクル・パララックス・グラスモーフィズム等の装飾演出を入れない**

### グレーゾーン判定

迷ったら「**町工場の工場長が朝イチで開いて違和感がないか**」で判断する。違和感があれば削る。スタイリッシュさと実用性が競合したら**常に実用性を取る**。
