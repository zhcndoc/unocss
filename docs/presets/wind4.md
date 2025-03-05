---
title: Wind4 预设
description: UnoCSS 的 Tailwind4 CSS 紧凑预设 (@unocss/preset-wind4)。
outline: deep
---

# Wind4 预设

UnoCSS 的 Tailwind4 CSS 紧凑预设。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind4)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-wind4
```

```bash [yarn]
yarn add -D @unocss/preset-wind4
```

```bash [npm]
npm install -D @unocss/preset-wind4
```

```bash [bun]
bun add -D @unocss/preset-wind4
```

:::

```ts [uno.config.ts]
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
  ],
})
```

TODO: 在这里添加更多细节。
