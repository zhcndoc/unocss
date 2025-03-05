---
title: Wind3 预设
description: UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设 (@unocss/preset-wind3)。
outline: deep
---

# Wind3 预设

UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind3)

::: info
`@unocss/preset-wind` 和 `@unocss/preset-uno` 已被弃用并重命名为 `@unocss/preset-wind3`。该预设继承自 [`@unocss/preset-mini`](/presets/mini)。
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-wind3
```

```bash [yarn]
yarn add -D @unocss/preset-wind3
```

```bash [npm]
npm install -D @unocss/preset-wind3
```

```bash [bun]
bun add -D @unocss/preset-wind3
```

:::

```ts [uno.config.ts]
import presetWind3 from '@unocss/preset-wind3'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetWind3 } from 'unocss'
```

:::

## 规则

该预设的主要目标是提供与 [Tailwind CSS](https://tailwindcss.com/) 和 [Windi CSS](https://windicss.org/) 的兼容性。需要注意的是，无法保证完全兼容。请参考他们的 [文档](https://tailwindcss.com/docs) 以获取详细用法。

有关该预设中包含的所有规则和预设，请参阅我们的 <a href="/interactive/" target="_blank">交互式文档</a> 或直接查看 [源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind)。

## 特性

### 暗黑模式

默认情况下，该预设生成基于类的暗黑模式，使用 `dark:` 变体。

```html
<div class="dark:bg-red:10" />
```

将生成：

```css
.dark .dark\:bg-red\:10 {
  background-color: rgb(248 113 113 / 0.1);
}
```

#### 基于媒体查询的暗黑模式

要在全局使用基于媒体查询的暗黑模式，您可以更改 `dark:` 变体的配置：

```ts
presetWind3({
  dark: 'media'
})
```

现在

```html
<div class="dark:bg-red:10" />
```

将生成：

```css
@media (prefers-color-scheme: dark) {
  .dark\:bg-red\:10 {
    background-color: rgb(248 113 113 / 0.1);
  }
}
```

#### 可选的基于媒体查询的暗黑模式

要使用可选的基于媒体查询的暗黑模式，您可以使用 `@dark:` 变体：

```html
<div class="@dark:bg-red:10" />
```

```css
@media (prefers-color-scheme: dark) {
  .\@dark\:bg-red\:10 {
    background-color: rgb(248 113 113 / 0.1);
  }
}
```

## 与 Tailwind CSS 的区别

### 引号

在模板（用于处理的文件）中使用引号是不支持的，原因在于提取器的工作方式。例如，您将无法写 `before:content-['']`。在这些情况下，您可以考虑引入一个新工具，以便可以明确设置，例如 `class="before:content-empty"`。

### 背景位置与任意值

Tailwind [允许](https://tailwindcss.com/docs/background-position#using-custom-values) 使用裸语法为 `background-position` 使用自定义值：

```html
<div class="bg-[center_top_1rem]"></div>
```

Wind 预设将解读 `center_top_1rem` 为颜色。使用 `position:` 前缀可以实现同样的效果：

```html
<div class="bg-[position:center_top_1rem]"></div>
```

### 动画

Tailwind CSS 内置的动画较少，我们完全支持其动画规则，并内部整合了 [Animate.css](https://github.com/animate-css/animate.css) 以提供更多动画效果。

您可以使用 `animate-` 前缀来引导 IntelliSense 快速找到您需要的动画。

:::tip
我们不会合并 Tailwind 和 Animate.css 中冲突的动画名称。如果您需要使用 Animate.css 的动画名称，请使用 `animate-<name>-alt`。
:::

例如

|                                                                                                                                         Tailwind CSS                                                                                                                                          |                                                                                                                                            Animate.css                                                                                                                                            |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                                       `animate-bounce`                                                                                                                                        |                                                                                                                                       `animate-bounce-alt`                                                                                                                                        |
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
您还可以添加 `category` 来对动画进行分组以便于管理。这将使下游工具更容易使用动画效果。

```ts [uno.config.ts] {9}
export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        custom: '{0%, 100% { transform: scale(0.5); } 50% { transform: scale(1); }}',
      },
      // ...
      category: {
        custom: 'Zooming',
      },
    }
  }
})
```

:::

## 与 Windi CSS 的区别

### 断点

| Windi CSS | UnoCSS      |
| :-------- | :---------- |
| `<sm:p-1` | `lt-sm:p-1` |
| `@lg:p-1` | `at-lg:p-1` |
| `>xl:p-1` | `xl:p-1`    |

### 括号语法空格

该预设使用 `_` 代替 `,` 来保留括号语法中的空格。

| Windi CSS                          | UnoCSS                             |
| :--------------------------------- | :--------------------------------- |
| `grid-cols-[1fr,10px,max-content]` | `grid-cols-[1fr_10px_max-content]` |

由于某些 CSS 规则要求 `,` 作为值的一部分，例如 `grid-cols-[repeat(3,auto)]`

## 实验特性

::: warning
该预设包含实验特性，这些特性可能在任何时候发生重大变化。
:::

### 媒体悬停

媒体悬停解决了 [粘性悬停](https://css-tricks.com/solving-sticky-hover-states-with-media-hover-hover/) 问题，其中在移动设备上点击包括悬停样式的目标会持续保持该悬停样式，直到点击其他位置。

由于常规 `:hover` 样式通常会被广泛使用，因此该变体使用 `@hover` 语法来将其与常规 `hover` 伪类区分开。

变体 `@hover-text-red` 将输出：

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
该预设选项继承自 [`@unocss/preset-mini`](/presets/mini#options)。
:::

### important

- **类型：** `boolean | string`
- **默认值：** `false`

`important` 选项让您控制 UnoCSS 的实用工具是否应该标记为 `!important`。在使用带有高特异性选择器的现有 CSS 时，这可能非常有用。

::: warning
使用此选项将使 UnoCSS 生成的所有实用工具均应用 `!important`。如果您只想将其应用于特定的实用工具，您可以使用 `important:` 变体。
:::

然而，将 `important` 设置为 `true` 可能会在合并第三方 JS 库时引入一些问题，这些库会向您的元素添加内联样式。在这些情况下，UnoCSS 的 `!important` 实用工具会覆盖内联样式，从而可能破坏您想要的设计。

为了绕过这个问题，您可以将 important 设置为 ID 选择器，例如 `#app` ：

```ts [uno.config.ts]
import presetWind3 from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3({
      important: '#app',
    }),
  ],
})
```

此配置将为您所有的实用工具添加给定选择器的前缀，从而有效地提高它们的特异性，而无需实际将它们设置为 `!important`。

实用工具 `dark:bg-blue` 将输出：

```css
#app :is(.dark .dark\:bg-blue) {
  --un-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--un-bg-opacity));
}
```
