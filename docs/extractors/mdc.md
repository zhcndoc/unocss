---
title: MDC 提取器
description: UnoCSS 的 MDC 提取器 (@unocss/extractor-mdc)
---

# MDC 提取器

支持从 [MDC (Markdown 组件)](https://content.nuxtjs.org/guide/writing/mdc) 语法中提取类。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/extractor-mdc
```

```bash [yarn]
yarn add -D @unocss/extractor-mdc
```

```bash [npm]
npm install -D @unocss/extractor-mdc
```

:::

```ts [uno.config.ts]
import extractorMdc from '@unocss/extractor-mdc'
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    extractorMdc(),
  ],
})
```

它将对 `.md`、`.mdc` 和 `.markdown` 文件应用提取，以提取类的内联属性用法。例如：

```md
# 标题{.text-2xl.font-bold}

你好 [世界]{.text-blue-500}

![图片](/image.png){.w-32.h-32}
```

将提取 `text-2xl`、`font-bold`、`text-blue-500`、`w-32`、`h-32` 类。
