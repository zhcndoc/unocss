---
title: Legacy Compat 预设
description: 旧版兼容实用工具的集合。
outline: deep
---

# Legacy Compat 预设

旧版兼容实用工具的集合。

该预设不包含任何规则，而是对其他预设生成的 CSS 应用后处理。

默认情况下，没有任何选项被启用，您需要显式地选择每个选项。

[源代码](https://github.com/unocss/unocss/tree/main/packages/preset-legacy-compat)

## 安装

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/preset-legacy-compat
  ```
  ```bash [yarn]
  yarn add -D @unocss/preset-legacy-compat
  ```
  ```bash [npm]
  npm install -D @unocss/preset-legacy-compat
  ```
:::

```ts [uno.config.ts]
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    // ...other presets
    presetLegacyCompat({
      // options
      commaStyleColorFunction: true,
      legacyColorSpace: true
    }),
  ],
})
```

## 选项

### `commaStyleColorFunction`

- **类型：**`boolean`
- **默认值：**`false`

将颜色函数 (`rgb()` 和 `hsl()`) 从空格分隔改为逗号分隔，以更好地与旧版浏览器兼容。在 UnoCSS v0.57.0 之前的行为被改为空格分隔，以与 Tailwind CSS 对齐。

例如：

- `rgb(255 0 0)` -> `rgb(255, 0, 0)`
- `rgb(255 0 0 / 50%)` -> `rgba(255, 0, 0, 50%)`
- `hsl(0 100% 50% / 50%)` -> `hsla(0, 100%, 50%, 50%)`

### `legacyColorSpace`

- **Type:** `boolean`
- **Default:** `false`

Removes color space keywords such as `in oklch` and `in oklab` from the generated styles. This is useful for ensuring compatibility with legacy browsers that do not support these modern color spaces.

To enable this feature, set the `legacyColorSpace` option to `true`.
