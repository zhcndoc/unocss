---
title: 风格预设
description: UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设（@unocss/preset-wind）。
outline: deep
---

# 风格预设

UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind)

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
这个预设包含在 `unocss` 包中，你也可以从那里导入它：

```ts
import { presetWind } from 'unocss'
```

:::

## 规则

这个预设的主要目标是提供与 [Tailwind CSS](https://tailwindcss.com/) 和 [Windi CSS](https://windicss.org/) 的兼容性。需要注意的是，可能无法保证完全兼容。请参考它们的 [文档](https://tailwindcss.com/docs) 以获取详细使用信息。

有关此预设中包含的所有规则和预设，请参考我们的 <a href="/interactive/" target="_blank">交互式文档</a> 或直接访问 [源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind)。

## 与 Tailwind CSS 的区别

### 引号

由于提取器的工作方式，模板（即要处理的文件）中不支持使用引号。例如，你将无法写成 `before:content-['']`。对于这些情况，你可能更愿意引入一个新的实用工具，可以显式设置，例如 `class="before:content-empty"`。

### 带有任意值的背景位置

Tailwind [允许](https://tailwindcss.com/docs/background-position#using-custom-values) 使用裸语法为 `background-position` 指定自定义值：

```html
<div class="bg-[center_top_1rem]"></div>
```

而 Wind 预设会将 `center_top_1rem` 解释为颜色。使用 `position:` 前缀可以实现相同效果：

```html
<div class="bg-[position:center_top_1rem]"></div>
```

### 动画

Tailwind CSS 内置的动画较少，我们完全支持其动画规则，并内部集成了 [Animate.css](https://github.com/animate-css/animate.css) 以提供更多动画效果。

你可以使用 `animate-` 前缀来引导 IntelliSense 快速找到你需要的动画。

:::tip
我们不会合并 Tailwind 和 Animate.css 中的冲突动画名称。如果你需要使用 Animate.css 的动画名称，请使用 `animate-<name>-alt`。
:::

例如

|                                                                                                                                         Tailwind CSS                                                                                                                                          |                                                                                                                                            Animate.css                                                                                                                                            |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                                       `animate-bounce`                                                                                                                                        |                                                                                                                                       `animate-bounce-alt`                                                                                                                                        |
| <div w-full flex="~ items-center justify-center"><div class="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-full flex items-center justify-center"><div text-purple size-5 i-carbon-arrow-down></div></div></div> | <div w-full flex="~ items-center justify-center"><div class="animate-bounce-alt bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-full flex items-center justify-center"><div text-purple size-5 i-carbon-arrow-down></div></div></div> |

如果你想自定义或修改动画效果，我们提供高度可定制的配置项。你可以通过配置项修改动画的持续时间、延迟、速度曲线等。

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
你还可以添加 `category` 来分组动画，以便更好地管理。这将使得下游工具更容易使用动画效果。

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

| Windi CSS | UnoCSS      |
| :-------- | :---------- |
| `<sm:p-1` | `lt-sm:p-1` |
| `@lg:p-1` | `at-lg:p-1` |
| `>xl:p-1` | `xl:p-1`    |

### 括号语法中的空格

此预设使用 `_` 代替 `,` 来尊重括号语法中的空格。

| Windi CSS                          | UnoCSS                             |
| :--------------------------------- | :--------------------------------- |
| `grid-cols-[1fr,10px,max-content]` | `grid-cols-[1fr_10px_max-content]` |

由于某些 CSS 规则要求 `,` 作为值的一部分，例如 `grid-cols-[repeat(3,auto)]`。

## 实验性功能

::: warning
此预设包括可能随时发生重大更改的实验性功能。
:::

### 媒体悬停

媒体悬停解决了 [粘性悬停](https://css-tricks.com/solving-sticky-hover-states-with-media-hover-hover/) 问题，即在移动设备上点击包含悬停样式的目标将持续保持该悬停样式，直到点击其他地方。

由于常规的 `:hover` 样式可能被广泛使用，因此该变体使用 `@hover` 语法将其与常规的 `hover` 伪类区分开来。

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
此预设的选项继承自 [`@unocss/preset-mini`](/presets/mini#options)。
:::

### important

- **类型:** `boolean | string`
- **默认:** `false`

`important` 选项允许你控制 UnoCSS 的工具类是否应标记为 `!important`。在使用 UnoCSS 与现有 CSS 具有高特异性选择器的情况下，这可能非常有用。

::: warning
使用此选项将对 UnoCSS 生成的所有工具类应用重要性。如果你只是想将其应用于特定工具类，可以使用 `important:` 变体。
:::

然而，将 `important` 设置为 `true` 可能在引入会向你的元素添加内联样式的第三方 JS 库时引入一些问题。在那些情况下，UnoCSS 的 `!important` 工具类会击败内联样式，这可能会破坏你预期的设计。

为了解决这个问题，你可以将 `important` 设置为类似 `#app` 的 ID 选择器：

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

这个配置将使你所有的工具类都带有给定选择器的前缀，从而有效地增加它们的特异性，而不必真正将其设置为 `!important`。

实用工具 `dark:bg-blue` 将输出：

```css
#app :is(.dark .dark\:bg-blue) {
  --un-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--un-bg-opacity));
}
```
