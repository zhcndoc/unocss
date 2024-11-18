---
title: Wind 预设
description: UnoCSS 的 Tailwind CSS / Windi CSS 精简预设（@unocss/preset-wind）。
outline: deep
---

# Wind 预设

UnoCSS 的 Tailwind CSS / Windi CSS 精简预设。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-wind)

::: info
此预设继承自 [`@unocss/preset-mini`](/presets/mini)。
:::

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/preset-wind
  ```
  ```bash [yarn]
  yarn add -D @unocss/preset-wind
  ```
  ```bash [npm]
  npm install -D @unocss/preset-wind
  ```
:::

```ts [uno.config.ts]
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetWind } from 'unocss'
```
:::

## 规则
此预设的主要目标是提供与 [Tailwind CSS](https://tailwindcss.com/) 和 [Windi CSS](https://windicss.org/) 的兼容性。需要注意的是，完全的兼容性可能无法得到保证。请参阅它们的 [文档](https://tailwindcss.com/docs) 以获取详细用法。

有关此预设中包含的所有规则和预设，请参考我们的 <a href="/interactive/" target="_blank">交互式文档</a> 或直接访问 [源代码](https://github.com/unocss/unocss/tree/main/packages/preset-wind)。

## 与 Tailwind CSS 的区别

### 引号

由于提取器的工作方式，在模板（旨在被处理的文件）中使用引号是不支持的。例如，您无法编写 `before:content-['']`。对于这种情况，您可能更喜欢引入一个新的实用工具，您可以明确设置，例如 `class="before:content-empty"`。

### 带有任意值的背景位置

Tailwind [允许](https://tailwindcss.com/docs/background-position#using-custom-values) 使用裸语法为 `background-position` 使用自定义值：

```html
<div class="bg-[center_top_1rem]">
```

Wind 预设将把 `center_top_1rem` 解释为颜色。要完成相同的操作，请使用 `position:` 前缀：

```html
<div class="bg-[position:center_top_1rem]">
```

### 动画

Tailwind CSS 具有较少的内置动画，我们完全支持其动画规则，并内部集成了 [Animate.css](https://github.com/animate-css/animate.css) 以提供更多动画效果。

您可以使用 `animate-` 前缀来帮助 IntelliSense 快速找到您需要的动画。

:::tip
我们不会合并来自 Tailwind 和 Animate.css 的冲突动画名称。如果您需要使用 Animate.css 的动画名称，请使用 `animate-<name>-alt`。
:::

例如

| Tailwind CSS | Animate.css |
|:--:|:--:|
| `animate-bounce` | `animate-bounce-alt` |
| <div w-full flex="~ items-center justify-center"><div class="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-full flex items-center justify-center"><div text-purple size-5 i-carbon-arrow-down></div></div></div> | <div w-full flex="~ items-center justify-center"><div class="animate-bounce-alt bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-full flex items-center justify-center"><div text-purple size-5 i-carbon-arrow-down></div></div></div> |

如果您想自定义或修改动画效果，我们提供高度可定制的配置项。您可以通过配置项修改动画的持续时间、延迟、速度曲线等。

```ts [uno.config.ts]
export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        custom: '{0%, 100% { transform: scale(0.5); } 50% { transform: scale(1); }}',
      },
      durations: {
        custom: '1s',
      },
      timingFns: {
        custom: 'cubic-bezier(0.4,0,.6,1)',
      },
      properties: {
        custom: { 'transform-origin': 'center' },
      },
      counts: {
        custom: 'infinite',
      },
    }
  }
})
```

预览自定义动画：

<div class="animate-custom bg-white dark:bg-slate-800 p-2 w-fit ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-md flex items-center justify-center">animate-custom</div>

:::tip
您还可以添加 `category` 来对动画进行分组以便更好地管理。这将使下游工具更容易使用动画效果。

```ts [uno.config.ts] {9}
export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        custom: '{0%, 100% { transform: scale(0.5); } 50% { transform: scale(1); }}',
      },
      // ...
      category: {
        custom: '缩放',
      },
    }
  }
})
```
:::

## 与 Windi CSS 的区别

### 断点

| Windi CSS | UnoCSS |
|:--|:--|
| `<sm:p-1` | `lt-sm:p-1` |
| `@lg:p-1` | `at-lg:p-1` |
| `>xl:p-1` | `xl:p-1`    |

### 括号语法的空格

此预设使用 `_` 而不是 `,` 来尊重括号语法中的空格。

| Windi CSS | UnoCSS |
|:--|:--|
| `grid-cols-[1fr,10px,max-content]` | `grid-cols-[1fr_10px_max-content]` |

由于某些 CSS 规则需要 `,` 作为值的一部分，例如 `grid-cols-[repeat(3,auto)]`。

## 实验性功能

::: warning
此预设包括实验性功能，可能会在任何时候以破坏性的方式进行更改。
:::

### 媒体悬停

媒体悬停解决了 [粘性悬停](https://css-tricks.com/solving-sticky-hover-states-with-media-hover-hover/) 问题，用户在移动设备上点按包含悬停样式的目标后，悬停样式会持续存在，直到在别处点按。

由于常规的 `:hover` 样式被广泛使用，因此变体使用 `@hover` 语法将其与普通 `hover` 伪类区分开。

变体 `@hover-text-red` 的输出将是：

```css
@media (hover: hover) and (pointer: fine) {
  .\@hover-text-red:hover {
    --un-text-opacity: 1;
    color: rgb(248 113 113 / var(--un-text-opacity));
  }
}
```

## 选项

::: info
此预设选项继承自 [`@unocss/preset-mini`](/presets/mini#options)。
:::

### important
- **类型:** `boolean | string`
- **默认值:** `false`

`important` 选项允许您控制 UnoCSS 的工具是否应标记为 `!important`。这在将 UnoCSS 与具有高特异性选择器的现有 CSS 一起使用时非常有用。

::: warning
使用此选项将对 UnoCSS 生成的所有工具应用重要性。如果您只想将其应用于特定工具，可以改用 `important:` 变体。
:::

然而，将 `important` 设置为 `true` 可能会在引入添加内联样式的第三方 JS 库时引入一些问题。在这种情况下，UnoCSS 的 `!important` 工具将击败内联样式，可能会破坏您想要的设计。

为了解决这个问题，您可以将重要性设置为 ID 选择器，例如 `#app`：

```ts [uno.config.ts]
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind({
      important: '#app',
    }),
  ],
})
```

此配置将使用给定选择器前缀所有工具，有效地提高其特异性，而实际上并不使它们变为 `!important`。

实用工具 `dark:bg-blue` 将输出：

```css
#app :is(.dark .dark\:bg-blue) {
  --un-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--un-bg-opacity));
}
```
