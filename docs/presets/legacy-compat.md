---
title: 传统兼容预设
description: 传统兼容工具集合。
outline: deep
---

# 传统兼容预设

传统兼容工具的集合。

此预设不包含任何规则， 它对来自其他预设生成的 CSS 进行后处理。

默认情况下，没有选项启用，您需要明确选择每个选项。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-legacy-compat)

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

```bash [bun]
bun add -D @unocss/preset-legacy-compat
```

:::

```ts [uno.config.ts]
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    // ...其他预设
    presetLegacyCompat({
      // 选项
      commaStyleColorFunction: true,
      legacyColorSpace: true
    }),
  ],
})
```

## 选项

### `commaStyleColorFunction`

- **类型:** `boolean`
- **默认:** `false`

将颜色函数（`rgb()` 和 `hsl()`）从空格分隔转换为逗号分隔，以更好地兼容传统浏览器。恢复 UnoCSS v0.57.0 之前的旧行为，该行为在 [#3221](https://github.com/unocss/unocss/pull/3221) 中更改为空格分隔，以与 Tailwind CSS 对齐。

示例：

- `rgb(255 0 0)` -> `rgb(255, 0, 0)`
- `rgb(255 0 0 / 50%)` -> `rgba(255, 0, 0, 50%)`
- `hsl(0 100% 50% / 50%)` -> `hsla(0, 100%, 50%, 50%)`

### `legacyColorSpace`

- **类型:** `boolean`
- **默认:** `false`

从生成的样式中移除颜色空间关键字，如 `in oklch` 和 `in oklab`。这对于确保与不支持这些现代颜色空间的传统浏览器的兼容性非常有用。

要启用此功能，请将 `legacyColorSpace` 选项设置为 `true`。
