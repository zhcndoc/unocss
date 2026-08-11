---
title: Twoslash 集成
---

# Twoslash 集成

`@unocss/twoslash` 为 UnoCSS 提供 [twoslash](https://twoslash.netlify.app/) 集成，可使用生成的 CSS 输出为代码块添加注释，适用于由 [VitePress](https://vitepress.dev) 驱动的文档网站。

```ts twoslash [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['m-1', { margin: '1px' }],
  ],
})
```

## 安装

```bash
npm add @unocss/twoslash
```

## 在 VitePress 中使用

在你的 `.vitepress/config.ts` 中：

```ts
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createTwoslasher } from '@unocss/twoslash'
import { defineConfig } from 'vitepress'

export default defineConfig({
  markdown: {
    codeTransformers: [
      transformerTwoslash({
        langs: ['vue', 'html'],
        twoslasher: createTwoslasher(),
      }),
    ],
  },
})
```

然后在围栏代码块中使用 `twoslash`：

```html twoslash
<div class="p-4 text-red"></div>
```

## 选项

### `configPath`

UnoCSS 配置文件的路径。如果未提供，则会自动向上搜索目录树。

```ts
createTwoslasher({
  configPath: './my-uno.config.ts',
})
```

### `preprocess`

在发送至 UnoCSS 生成之前执行的自定义代码转换。此操作不会影响渲染后的代码。

```ts
createTwoslasher({
  preprocess: code => code.replace(/\/\/.*$/gm, ''),
})
```
