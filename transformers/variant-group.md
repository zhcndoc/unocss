---
url: 'https://unocss.zhcndoc.com/transformers/variant-group.md'
description: 启用 UnoCSS 的 Windi CSS 的变体组功能 (@unocss/transformer-variant-group)
---

# 变体组转换器

启用 [Windi CSS 的变体组功能](https://windicss.org/features/variant-groups.html) 供 UnoCSS 使用。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/transformer-variant-group
```

```bash [yarn]
yarn add -D @unocss/transformer-variant-group
```

```bash [npm]
npm install -D @unocss/transformer-variant-group
```

```bash [bun]
bun add -D @unocss/transformer-variant-group
```

:::

```ts [uno.config.ts]
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...
  transformers: [
    transformerVariantGroup(),
  ],
})
```

::: tip
此预设包含在 `unocss` 包中，你也可以从那里导入：

```ts
import { transformerVariantGroup } from 'unocss'
```

:::

## 使用

```html
<div class="hover:(bg-gray-400 font-medium) font-(light mono)" />
```

将被转换为：

```html
<div class="hover:bg-gray-400 hover:font-medium font-light font-mono" />
```

## 许可证

* MIT 许可证 © 2021-至今 [Anthony Fu](https://github.com/antfu)
