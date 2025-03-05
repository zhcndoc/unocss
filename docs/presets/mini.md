---
title: 迷你预设
description: UnoCSS 的最小预设 (@unocss/preset-mini)。
outline: deep
---

# 迷你预设

UnoCSS 的基本预设，仅包含最基本的实用工具。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-mini)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-mini
```

```bash [yarn]
yarn add -D @unocss/preset-mini
```

```bash [npm]
npm install -D @unocss/preset-mini
```

```bash [bun]
bun add -D @unocss/preset-mini
```

:::

```ts [uno.config.ts]
import presetMini from '@unocss/preset-mini'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
    // ...其他预设
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，你也可以从那里导入：

```ts
import { presetMini } from 'unocss'
```

:::

## 规则

该预设是 [`@unocss/preset-wind3`](/presets/wind3) 的子集，仅包含与 CSS 属性对齐的最基本实用工具，排除了在 Tailwind CSS 中引入的有主观或复杂的实用工具（例如 `container`、`animation`、`gradient` 等）。这可以作为你在 Tailwind CSS 或 Windi CSS 基础上自定义预设的良好起点。

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

要全局使用基于媒体查询的暗黑模式，可以更改 `dark:` 变体的配置：

```ts
presetMini({
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

### CSS @layer

支持 CSS 原生的 @layer 变体 `layer-xx:`：

```html
<div class="layer-foo:p4" />
<div class="layer-bar:m4" />
```

将生成：

```css
@layer foo {
  .layer-foo\:p4 {
    padding: 1rem;
  }
}
@layer bar {
  .layer-bar\:m4 {
    margin: 1rem;
  }
}
```

### 主题

你可以在配置中完全自定义你的主题属性，UnoCSS 会最终将其深度合并到默认主题中。

:::warning
`breakpoints` 属性不会深度合并，而是被覆盖，参见 [断点](/config/theme#breakpoints)。
:::

```ts
presetMini({
  theme: {
    // ...
    colors: {
      veryCool: '#0000ff', // class="text-very-cool"
      brand: {
        primary: 'hsl(var(--hue, 217) 78% 51%)', // class="bg-brand-primary"
      }
    },
  }
})
```

## 选项

### dark

- **类型:** `class | media | DarkModeSelectors`
- **默认:** `class`

暗黑模式选项。可以是 `class`、`media` 或自定义选择器对象（`DarkModeSelectors`）。

```ts
interface DarkModeSelectors {
  /**
   * 光亮变体的选择器。
   *
   * @default '.light'
   */
  light?: string

  /**
   * 暗黑变体的选择器。
   *
   * @default '.dark'
   */
  dark?: string
}
```

### attributifyPseudo

- **类型:** `Boolean`
- **默认:** `false`

生成伪选择器为 `[group=""]` 而不是 `.group`。

### variablePrefix

- **类型:** `string`
- **默认:** `un-`

CSS 自定义属性的前缀。

### prefix

- **类型:** `string | string[]`
- **默认:** `undefined`

工具的前缀。

### preflight

- **类型:** `boolean` | `on-demand`
- **默认:** `true`

生成基础样式 CSS。可以是：

- `true`: 始终生成基础样式。
- `false`: 不生成基础样式。
- `on-demand`: 仅为使用的工具生成基础样式。
