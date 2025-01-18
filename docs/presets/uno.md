---
title: Uno 预设
description: UnoCSS 的默认预设 (@unocss/preset-uno)。
outline: deep
---

# Uno 预设

UnoCSS 的默认预设。目前等同于 [`@unocss/preset-wind`](/presets/wind)。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-uno)

::: info
该预设继承了 [`@unocss/preset-wind`](/presets/wind) 和 [`@unocss/preset-mini`](/presets/mini)。
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-uno
```

```bash [yarn]
yarn add -D @unocss/preset-uno
```

```bash [npm]
npm install -D @unocss/preset-uno
```

:::

```ts [uno.config.ts]
import presetUno from '@unocss/preset-uno'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，您也可以从中导入：

```ts
import { presetUno } from 'unocss'
```

:::

## 用法

该预设尝试提供流行的实用优先框架的常见超集，包括 Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等。

例如，`ml-3`（Tailwind CSS）、`ms-2`（Bootstrap）、`ma4`（Tachyons）和 `mt-10px`（Windi CSS）都是有效的。

```css
.ma4 {
  margin: 1rem;
}
.ml-3 {
  margin-left: 0.75rem;
}
.ms-2 {
  margin-inline-start: 0.5rem;
}
.mt-10px {
  margin-top: 10px;
}
```

## 规则

该预设与 [Tailwind CSS](https://tailwindcss.com/) 和 [Windi CSS](https://windicss.org/) 兼容，您可以参考它们的 [文档](https://tailwindcss.com/docs) 获取详细用法。

关于该预设中包含的所有规则和预设，请参考我们的 [互动文档](https://unocss.dev/interactive/) 或直接访问 [源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-uno)。

## 选项

::: info
该预设的选项继承自 [`@unocss/preset-mini`](/presets/mini#options)。
:::

有关默认预设的更多详细信息，您可以查看我们的 [游乐场](/play/) 并尝试它。同时，您也可以查看 [实现](https://github.com/unocss/unocss/tree/main/packages)。
