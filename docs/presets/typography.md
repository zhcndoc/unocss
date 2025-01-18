---
title: 排版预设
description: UnoCSS 的排版类（@unocss/preset-typography）。
outline: deep
---

# 排版预设

提供一组散文类，您可以使用这些类为普通 HTML 添加排版默认值。

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

:::

::: tip
该预设已包含在 `unocss` 包中，您也可以从那里导入它：

```ts
import { presetTypography } from 'unocss'
```

:::

## 用法

```js [uno.config.js]
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // 使用属性模式时必需
    presetUno(), // 必需
    presetTypography(),
  ],
})
```

::: code-group

```html [Classes]
<article class="text-base prose prose-truegray xl:text-xl">
  {{ markdown }}
  <p class="not-prose">一些文本</p>
</article>
```

```html [Attributes]
<article text-base prose prose-truegray xl="text-xl">
  {{ markdown }}
  <p class="not-prose">一些文本</p>
</article>
```

:::

::: warning
注意：`not-prose` 只能作为类使用，而不能作为属性使用。
:::

## 亮点

### 任意字体大小

为您喜欢的正文应用任意字体大小，`prose` 将为相应的 HTML 元素缩放样式。例如，`prose text-lg` 的正文字体大小为 `1.125rem`，`h1` 将缩放至该大小的 2.25 倍。参见 [所有支持的 HTML 元素](https://github.com/unocss/unocss/blob/main/packages-presets/preset-typography/src/preflights/default.ts)。

### 任意颜色

使用 UnoCSS 的 `prose-${colorName}` 应用任意颜色（例如 `prose-coolgray`，`prose-sky`），因为 `prose` 默认没有任何颜色。参见 [所有可用颜色](#colors)。例如，`prose prose-truegray` 将为相应的 HTML 元素使用相应的颜色。

### 单个工具的暗模式

使用 `prose-invert` 应用排版暗模式（背景颜色需要由用户处理）。例如，`prose dark:prose-invert` 将在暗模式下使用反转的颜色。

### 您自己的样式

不在 `prose` 中的元素样式将保持不变。与 UnoCSS 一样没有样式重置。

### 使用 `not` 工具撤销

将 `not-prose` 应用于元素以撤销排版样式。例如，`<table class="not-prose">` 将跳过此预设对 `table` 元素的样式 **（注意：`not` 工具只能在类中使用，因为它只能用在 CSS 选择器中，并且不被 UnoCSS 扫描）**。

### 兼容性选项

该预设使用了一些不广泛支持的伪类，但您可以禁用它们。 ([#2064](https://github.com/unocss/unocss/pull/2064))

- 如果启用 `noColonNot` 或 `noColonWhere`，`not-prose` 将不可用。
- 如果启用 `noColonIs`，属性模式将有错误的行为。

## 工具

|  规则   |                                                      此规则的样式                                                      |
| :-----: | :--------------------------------------------------------------------------------------------------------------------: |
| `prose` | 见 [GitHub](https://github.com/unocss/unocss/blob/main/packages-presets/preset-typography/src/preflights/default.ts)。 |

### 颜色

| 规则（颜色）    |
| --------------- |
| `prose-rose`    |
| `prose-pink`    |
| `prose-fuchsia` |
| `prose-purple`  |
| `prose-violet`  |
| `prose-indigo`  |
| `prose-blue`    |
| `prose-sky`     |
| `prose-cyan`    |
| `prose-teal`    |
| `prose-emerald` |
| `prose-green`   |
| `prose-lime`    |
| `prose-yellow`  |
| `prose-amber`   |
| `prose-orange`  |
| `prose-red`     |
| `prose-gray`    |
| `prose-slate`   |
| `prose-zinc`    |
| `prose-neutral` |
| `prose-stone`   |

## 选项

此预设具有 `selectorName` 和 `cssExtend` 配置，供希望覆盖或扩展的用户使用。

:::tip
传递给 `cssExtend` 的 CSS 声明将

- **覆盖** 冲突值的内置样式，否则
- 与内置样式深度**合并**。
  :::

### selectorName

- **类型：** `string`
- **默认：** `prose`

用于排版工具的类名。要撤销元素的样式，请使用 `not-${selectorName}`，默认值为 `not-prose`。

:::tip
`not` 工具仅在类中可用。
:::

### cssExtend

- **类型：** `Record<string, CSSObject>`
- **默认：** `undefined`

扩展或覆盖 CSS 选择器的 CSS 声明块。

### compatibility

- **类型：** `TypographyCompatibilityOptions`
- **默认：** `undefined`

见 [兼容性选项](#compatibility-options)。
:::warning
注意，这将影响某些功能。
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
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // 如果使用属性模式则必需
    presetUno(), // 必需
    presetTypography({
      selectorName: 'markdown', // 现在使用类似于 `markdown markdown-gray`，`not-markdown`
      // cssExtend 是一个以 CSS 选择器为键，CSS 声明块为值的对象，类似于编写普通 CSS。
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

## 鸣谢

- [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [Windi CSS Typography](https://github.com/windicss/windicss/tree/main/src/plugin/typography)
