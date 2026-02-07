---
url: 'https://unocss.zhcndoc.com/tools/core.md'
description: UnoCSS 的核心引擎，没有任何预设。它可以作为您自己的原子 CSS 框架的引擎。
---

# 核心

UnoCSS 的核心引擎，没有任何预设：`@unocss/core`。它可以作为您自己原子 CSS 框架的引擎。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/core
```

```bash [yarn]
yarn add -D @unocss/core
```

```bash [npm]
npm install -D @unocss/core
```

```bash [bun]
bun add -D @unocss/core
```

:::

## 使用

```ts
import { createGenerator } from '@unocss/core'

const generator = await createGenerator(
  { /* 用户选项 */ },
  { /* 默认选项 */ }
)

const { css } = await generator.generate(code)
```

## 许可证

* MIT 许可证 © 2021-至今 [Anthony Fu](https://github.com/antfu)
