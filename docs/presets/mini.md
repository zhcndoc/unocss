---
title: Mini preset
description: UnoCSS 的最小预设 (@unocss/preset-mini)。
outline: deep
---

# Mini preset

UnoCSS 的基本预设，仅包含最基本的工具。

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
此预设已包含在 `unocss` 包中，您也可以从那里导入它：

```ts
import { presetMini } from 'unocss'
```

:::

## 规则

此预设是 [`@unocss/preset-wind`](/presets/wind) 的一个子集，仅包含与 CSS 属性相对应的最基本的工具，但排除了 Tailwind CSS 中引入的有偏见或复杂的工具（`container`、`animation`、`gradient` 等等）。这可以是您基于 Tailwind CSS 或 Windi CSS 中熟悉的工具的自定义预设的良好起点。

## 特性

### 黑暗模式

默认情况下，此预设生成基于类的黑暗模式，带有 `dark:` 变体。

```html
<div class="dark:bg-red:10" />
```

将生成：

```css
.dark .dark\:bg-red\:10 {
  background-color: rgb(248 113 113 / 0.1);
}
```

要选择基于媒体查询的黑暗模式，可以使用 `@dark:` 变体：

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

或通过配置全局设置 `dark:` 变体

```ts
presetMini({
  dark: 'media'
})
```

### CSS @layer

支持 [CSS 的原生 @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)，带有变体 `layer-xx:`。

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

您可以在配置中完全自定义主题属性，UnoCSS 最终会将其深度合并到默认主题中。

:::warning
`breakpoints` 属性没有被深度合并，而是被覆盖，见 [断点](/config/theme#breakpoints)。
:::

```ts
presetMini({
  theme: {
    // ...
    colors: {
      veryCool: '#0000ff', // 类名="text-very-cool"
      brand: {
        primary: 'hsl(var(--hue, 217) 78% 51%)', // 类名="bg-brand-primary"
      }
    },
  }
})
```

## 选项

### dark

- **类型:** `class | media | DarkModeSelectors`
- **默认值:** `class`

黑暗模式选项。可以是 `class`、`media` 或自定义选择器对象 (`DarkModeSelectors`)。

```ts
interface DarkModeSelectors {
  /**
   * 用于浅色变体的选择器。
   *
   * @default '.light'
   */
  light?: string

  /**
   * 用于黑暗变体的选择器。
   *
   * @default '.dark'
   */
  dark?: string
}
```

### attributifyPseudo

- **类型:** `Boolean`
- **默认值:** `false`

生成伪选择器，如 `[group=""]`，而不是 `.group`。

### variablePrefix

- **类型:** `string`
- **默认值:** `un-`

CSS 自定义属性的前缀。

### prefix

- **类型:** `string | string[]`
- **默认值:** `undefined`

工具前缀。

### preflight

- **类型:** `boolean | on-demand`
- **默认值:** `true`

生成预飞行 CSS。可以是：

- `true`: 总是生成预飞行。
- `false`: 不生成预飞行。
- `on-demand`: 仅为已使用的工具生成预飞行。
