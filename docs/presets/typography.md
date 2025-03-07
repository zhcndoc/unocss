---
title: 排版预设
description: UnoCSS 的排版类 (@unocss/preset-typography)。
outline: deep
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
import { presetTypography } from 'unocss'
```

:::

## 使用方法

```js [uno.config.js]
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWind3
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // 使用属性模式时必需
    presetWind3(), // 必需
    presetTypography(),
  ],
})
```

::: code-group

```html [类]
<article class="text-base prose prose-truegray xl:text-xl">
  {{ markdown }}
  <p class="not-prose">一些文本</p>
</article>
```

```html [属性]
<article text-base prose prose-truegray xl="text-xl">
  {{ markdown }}
  <p class="not-prose">一些文本</p>
</article>
```

:::

::: warning
注意：`not-prose` 只能用作类，不能用作属性。
:::

## 特点

### 任意字体大小

应用任意你喜欢的正文字体大小，`prose` 将会为相应的 HTML 元素缩放样式。例如，`prose text-lg` 的正文字体大小为 `1.125rem`，`h1` 将按该大小缩放 2.25 倍。查看 [支持的所有 HTML 元素](https://github.com/unocss/unocss/blob/main/packages-presets/preset-typography/src/preflights/default.ts)。

### 任意颜色

通过 UnoCSS 使用 `prose-${colorName}` 应用任意颜色（例如 `prose-coolgray`，`prose-sky`），因为 `prose` 默认没有颜色。查看 [所有可用颜色](#colors)。例如，`prose prose-truegray` 将为相应的 HTML 元素使用相应的颜色。

### 单一工具的深色模式

通过 `prose-invert` 应用排版深色模式（背景颜色需要用户自行处理）。例如，`prose dark:prose-invert` 将在深色模式中使用反转颜色。

### 你自己的样式

`prose` 之外的元素样式将保持不变。没有像 UnoCSS 那样的样式重置。

### 使用 `not` 工具撤销

将 `not-prose` 应用到元素上以撤销排版样式。例如，`<table class="not-prose">` 将跳过该预设对 `table` 元素的样式 **（注意：`not` 工具仅在类中可用，因为它只在 CSS 选择器中使用，并且不会被 UnoCSS 扫描）**。

### 兼容选项

这个预设使用了一些不广泛支持的伪类，但你可以禁用它们。（[#2064](https://github.com/unocss/unocss/pull/2064)）

- 如果你启用 `noColonNot` 或 `noColonWhere`，将无法使用 `not-prose`。
- 如果你启用 `noColonIs`，属性模式将会出现错误的行为。

## 工具

|  规则   |                                                       此规则的样式                                                       |
| :-----: | :----------------------------------------------------------------------------------------------------------------------: |
| `prose` | 查看 [GitHub](https://github.com/unocss/unocss/blob/main/packages-presets/preset-typography/src/preflights/default.ts)。 |

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

这个预设有 `selectorName` 和 `cssExtend` 的配置，供喜欢重写或扩展的用户使用。

:::tip
传递给 `cssExtend` 的 CSS 声明将

- **覆盖** 冲突的内置样式，否则
- **与** 内置样式深度**合并**。
  :::

### selectorName

- **类型：** `string`
- **默认：** `prose`

用于使用排版工具的类名。要撤销元素的样式，请使用 `not-${selectorName}`，默认值为 `not-prose`。

:::tip
`not` 工具仅在类中可用。
:::

### cssExtend

- **类型：** `Record<string, CSSObject>`
- **默认：** `undefined`

用 CSS 声明块扩展或重写 CSS 选择器。

### 兼容性

- **类型：** `TypographyCompatibilityOptions`
- **默认：** `undefined`

查看 [兼容选项](#compatibility-options)。
:::warning
请注意，这将影响某些功能。
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
      selectorName: 'markdown', // 现在使用如 `markdown markdown-gray`，`not-markdown`
      // cssExtend 是一个对象，其 CSS 选择器作为键，
      // CSS 声明块作为值，类似于编写普通 CSS。
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

- [Tailwind CSS 排版](https://github.com/tailwindlabs/tailwindcss-typography)
- [Windi CSS 排版](https://github.com/windicss/windicss/tree/main/src/plugin/typography)
