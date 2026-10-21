---
title: Svelte 提取器
---

# Svelte 提取器

支持从 `class:` 指令以及 `.svelte` 文件中不带引号的静态 `class` 属性提取类。

```svelte
<div class:text-orange-400={foo} />
```

将被提取为 `text-orange-400` 并生成：

```css
.text-orange-400 {
  color: #f6993f;
}
```

不带引号的属性支持单个静态类名：

```svelte
<div class=text-orange-400 />
<div class=hover:bg-red-500></div>
```

多个类名或包含空白、引号、反引号、`=`、`<` 或 `>` 的值需要使用引号。Svelte 表达式（如 `class={active}`）仍按常规提取逻辑处理。

无论是 `class=foo />` 还是 `class=foo/>`，都会按 Svelte 自闭合标签语法提取 `foo`。其他斜杠仍属于类名的一部分，例如 `class=w-1/2`。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/extractor-svelte
```

```bash [yarn]
yarn add -D @unocss/extractor-svelte
```

```bash [npm]
npm install -D @unocss/extractor-svelte
```

```bash [bun]
bun add -D @unocss/extractor-svelte
```

:::

```ts [uno.config.ts]
import extractorSvelte from '@unocss/extractor-svelte'
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    extractorSvelte(),
  ],
})
```
