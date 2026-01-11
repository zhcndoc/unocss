---
url: 'https://unocss.zhcndoc.com/presets/typography.md'
description: UnoCSS 的排版类 (@unocss/preset-typography)。
---

# 排版预设

提供一组散文类，可以用来为普通 HTML 添加排版默认值。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-typography)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-typography
```

```bash [yarn]
yarn add -D @unocss/preset-typography
```

```bash [npm]
npm install -D @unocss/preset-typography
```

```bash [bun]
bun add -D @unocss/preset-typography
```

:::

::: tip
这个预设包含在 `unocss` 包中，你也可以从那里导入：

```ts
import presetTypography from '@unocss/preset-typography'
// 或者
import { presetTypography } from 'unocss'
```

:::

## 使用方法

```ts [uno.config.ts]
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWind3 // 或 presetWind4
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(), // 必需！
    presetAttributify(), // 使用属性模式时必需
    presetTypography(),
  ],
})
```

::: code-group

```html [Classes]
<article class="text-base prose dark:prose-invert xl:text-xl">
  {{ markdown }}
  <p class="not-prose">一些文本</p>
</article>
```

```html [Attributes]
<article text-base prose="~ dark:invert" xl="text-xl">
  {{ markdown }}
  <p class="not-prose">一些文本</p>
</article>
```

:::

::: warning
注意：`not-prose` 只能用作类，不能用作属性。
:::

## 特点

### 任意尺寸

使用内置的尺寸变体应用不同的排版大小：`prose-sm`、`prose-base`、`prose-lg`、`prose-xl` 和 `prose-2xl`。默认的 `prose` 类使用基础大小，你也可以用特定的尺寸工具类覆盖它。

```html
<!-- 不同尺寸 -->
<article class="prose prose-sm">小号排版</article>
<article class="prose prose-base">基础排版（默认）</article>
<article class="prose prose-lg">大号排版</article>
<article class="prose prose-xl">超大号排版</article>
<article class="prose prose-2xl">两倍大排版</article>
```

你还可以将尺寸工具类与响应式变体结合使用：

```html
<!-- 响应式排版尺寸 -->
<article class="prose prose-sm md:prose-base lg:prose-lg xl:prose-xl">
  根据屏幕尺寸缩放的响应式排版
</article>

<!-- 与其他工具类结合使用 -->
<article class="prose prose-lg prose-gray dark:prose-invert">带颜色和暗色模式的大号排版</article>
```

### 任意颜色

通过 `presetWind3/4` 提供的 `prose-${colorName}` 工具类应用任意颜色。它们的颜色来自主题的 `colors` 键，推荐这些颜色具有从 `50` 到 `950` 的色阶以便于渐变效果。因此，`presetWind3/4` 是 **必需** 的。

而 `prose` 的默认颜色是 `prose-gray`。排版颜色工具类会应用到各种排版元素，如标题、链接、引用块和代码块。

```html
<!-- 不同的颜色主题 -->
<article class="prose prose-gray">灰色主题排版</article>
<article class="prose prose-blue">蓝色主题排版</article>
<article class="prose prose-green">绿色主题排版</article>
<article class="prose prose-purple">紫色主题排版</article>
```

| 自然色系                                                                       | 强调色系                                                       |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| 这些有不同的颜色调度范围，影响全局排版颜色应用。                              | 这些只改变链接颜色，不影响其他颜色。                           |
| `prose-slate`                                                                  | `prose-rose`                                                   |
| `prose-slate`                                                                  | `prose-red`                                                    |
| `prose-gray`                                                                   | `prose-orange`                                                 |
| `prose-zinc`                                                                   | `prose-amber`                                                  |
| `prose-neutral`                                                                | `prose-yellow`                                                 |
| `prose-stone`                                                                  | `prose-lime`                                                   |
|                                                                                | `prose-green`                                                  |
|                                                                                | `prose-emerald`                                                |
|                                                                                | `prose-teal`                                                   |
|                                                                                | `prose-cyan`                                                   |
|                                                                                | `prose-sky`                                                    |
|                                                                                | `prose-blue`                                                   |
|                                                                                | `prose-indigo`                                                 |
|                                                                                | `prose-violet`                                                 |
|                                                                                | `prose-purple`                                                 |
|                                                                                | `prose-fuchsia`                                                |
|                                                                                | `prose-pink`                                                   |
|                                                                                | `prose-rose`                                                   |

您可以将颜色与尺寸和响应式变体组合使用：

```html
<!-- 响应式颜色变化 -->
<article class="prose prose-gray md:prose-blue lg:prose-green">
  在不同断点下颜色变化的排版
</article>

<!-- 颜色、尺寸和暗色模式结合 -->
<article class="prose prose-lg prose-slate dark:prose-invert">
  带石板色和暗色模式支持的大号排版
</article>
```

### 通过单个工具类支持暗色模式

通过 `prose-invert` 应用排版暗色模式（背景色需要用户自行处理）。例如，`prose dark:prose-invert` 会在暗色模式下使用反色。

### 你自己的风格

不是 `prose` 内的元素样式保持原样，没有样式重置，类似于 UnoCSS。

### 使用 `not` 工具撤销

对元素应用 `not-prose` 可撤销排版样式。例如，`<table class="not-prose">` 将跳过本预设为 `table` 元素应用的样式 **（注意：`not` 工具仅能作为类使用，因为它仅用于 CSS 选择器且不被 UnoCSS 扫描）**。

### 兼容性选项

该预设使用了一些不被广泛支持的伪类，但你可以禁用它们。（[#2064](https://github.com/unocss/unocss/pull/2064)）

* 启用 `noColonNot` 或 `noColonWhere` 时，`not-prose` 将不可用。
* 启用 `noColonIs` 时，属性模式会有错误表现。

## 选项

此预设提供全面的配置选项以自定义排版样式、颜色、尺寸和行为。

:::tip
传递给 `cssExtend` 的 CSS 声明将：

* **覆盖** 冲突的内置样式，否则
* **与** 内置样式深度**合并**。
  :::

### selectorName

* **类型：** `string`
* **默认值：** `prose`

用于应用排版工具的类名。若要撤销元素样式，请使用 `not-${selectorName}`，默认即为 `not-prose`。

:::tip
`not` 工具仅在类中可用。
:::

### cssExtend

* **类型:** `Record<string, CSSObject> | ((theme: T) => Record<string, CSSObject>)`
* **默认:** `undefined`

扩展或覆盖 CSS 选择器的样式块。可以是静态对象，也可以是接收主题参数返回 CSS 选择器的函数。

### important

* **类型:** `boolean | string`
* **默认:** `false`

控制是否为排版工具类加入 `!important`。当设置为 `true` 时，所有排版样式都会添加 `!important`。当设置为字符串时，作为 CSS 选择器作用域。

### colorScheme

* **类型:** `TypographyColorScheme`
* **默认:** 如下所示

排版元素的颜色方案。每个键表示一个排版元素，值的格式为 `[光模式颜色, 暗模式颜色]`，即 `[color, invert-color]`。

**默认颜色方案：**

```json
{
  "body": [700, 300],
  "headings": [900, "white"],
  "lead": [600, 400],
  "links": [900, "white"],
  "bold": [900, "white"],
  "counters": [500, 400],
  "bullets": [300, 600],
  "hr": [200, 700],
  "quotes": [900, 100],
  "quote-borders": [200, 700],
  "captions": [500, 400],
  "kbd": [900, "white"],
  "kbd-shadows": [900, "white"],
  "code": [900, "white"],
  "pre-code": [200, 300],
  "pre-bg": [800, "rgb(0 0 0 / 50%)"],
  "th-borders": [300, 600],
  "td-borders": [200, 700]
}
```

### sizeScheme

* **类型:** `TypographySizeScheme`
* **默认:** `undefined`

排版元素的尺寸方案。允许自定义不同尺寸下各种排版元素的 CSS 样式。类似于 `cssExtend`，但可针对不同文字大小精细覆盖。

**示例：**

```json
{
  "sm": {
    "h1": { "font-size": "1.5rem" },
    "p": { "font-size": "0.875rem" }
  },
  "base": {
    "h1": { "font-size": "2rem" },
    "p": { "font-size": "1rem" }
  },
  "lg": {
    "h1": { "font-size": "2.5rem" },
    "p": { "font-size": "1.125rem" }
  }
}
```

### cssVarPrefix

* **类型:** `string`
* **默认:** `--un-prose`

生成的 CSS 自定义属性（CSS 变量）的前缀。允许自定义预设内部使用的 CSS 变量命名。

### 兼容性

* **类型:** `TypographyCompatibilityOptions`
* **默认:** `undefined`

请参见 [兼容选项](#兼容性选项)。

:::warning
请注意，这会影响某些功能。
:::

```ts
interface TypographyCompatibilityOptions {
  noColonWhere?: boolean
  noColonIs?: boolean
  noColonNot?: boolean
}
```

## 示例

```ts [uno.config.ts]
import { presetTypography } from '@unocss/preset-typography'
import { defineConfig, presetAttributify, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // 使用属性模式时必需
    presetWind3(), // 必需
    presetTypography({
      selectorName: 'markdown', // 现在类名为 `markdown markdown-gray`，撤销用 `not-markdown`
      // cssExtend 是一个对象，键为 CSS 选择器，
      // 值为 CSS 声明块，类似于写普通 CSS。
      cssExtend: {
        'code': {
          color: '#8b5cf6',
        },
        'a:hover': {
          color: '#f43f5e',
        },
        'a:visited': {
          color: '#14b8a6',
        },
      },
    }),
  ],
})
```

## 致谢

* [Tailwind CSS 排版](https://github.com/tailwindlabs/tailwindcss-typography)
* [Windi CSS 排版](https://github.com/windicss/windicss/tree/main/src/plugin/typography)
