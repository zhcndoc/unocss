---
title: UnoCSS Rollup 与 Rolldown 插件
description: 在 Rollup 或 Rolldown 中使用 UnoCSS。
outline: deep
---

# Rollup 与 Rolldown 插件

无需使用 Vite，即可在 Rollup 或 Rolldown 中使用 UnoCSS。该插件支持 `global` 模式；当你在入口模块中导入 `uno.css` 时，它会输出 CSS 资源。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss rollup
```

```bash [yarn]
yarn add -D unocss rollup
```

```bash [npm]
npm install -D unocss rollup
```

```bash [bun]
bun add -D unocss rollup
```

:::

使用 Rolldown 时，将 `rollup` 替换为 `rolldown`。

## Rollup 集成

```ts [rollup.config.ts]
import UnoCSS from 'unocss/rollup'

export default {
  input: 'src/main.ts',
  plugins: [
    UnoCSS(),
  ],
}
```

## Rolldown 集成

```ts [rolldown.config.ts]
import UnoCSS from 'unocss/rolldown'

export default {
  input: 'src/main.ts',
  plugins: [
    UnoCSS(),
  ],
}
```

在入口模块中导入 `uno.css`：

```ts [src/main.ts]
import 'uno.css'
```

插件会将生成的 CSS 作为输出资源发出。请通过部署流程或 HTML 流程将该资源包含在应用中。

## 配置

创建 `uno.config.ts` 文件：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
})
```

你也可以直接将配置传递给插件：

```ts
import UnoCSS from 'unocss/rollup'

UnoCSS({
  // ...UnoCSS options
})
```
