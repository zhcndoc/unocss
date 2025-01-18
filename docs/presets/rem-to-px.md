---
title: rem 转 px 预设
description: 为工具转换 rem 到 px（@unocss/preset-rem-to-px）。
outline: deep
---

# Rem 转 px 预设

为所有工具转换 rem 到 px。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-rem-to-px)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-rem-to-px
```

```bash [yarn]
yarn add -D @unocss/preset-rem-to-px
```

```bash [npm]
npm install -D @unocss/preset-rem-to-px
```

:::

```ts [uno.config.ts]
import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetRemToPx(),
    // ...other presets
  ],
})
```

## 用法

```html
<div class="m-2"></div>
```

::: code-group

```css [Without]
.m-2 {
  margin: 0.5rem;
}
```

```css [With]
.m-2 {
  margin: 8px;
}
```

:::

## 选项

### baseFontSize

- **类型:** `number`
- **默认值:** `16`

用于转换 rem 到 px 的基础字体大小（`1rem = n px`）。
