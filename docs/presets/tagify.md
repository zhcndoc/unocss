---
title: Tagify 预设
description: UnoCSS 的 Tagify 模式 (@unocss/preset-tagify)。
outline: deep
---

# Tagify 预设

这启用了其他预设的 [tagify 模式](#tagify-mode)。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-tagify)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-tagify
```

```bash [yarn]
yarn add -D @unocss/preset-tagify
```

```bash [npm]
npm install -D @unocss/preset-tagify
```

```bash [bun]
bun add -D @unocss/preset-tagify
```

:::

```ts [uno.config.ts]
import presetTagify from '@unocss/preset-tagify'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetTagify({ /* options */ }),
    // ...其他预设
  ],
})
```

## Tagify 模式

当你只需要将一个 unocss 规则应用到元素时，这个预设非常有用。

```html
<span class="text-red"> 红色文本 </span>
<div class="flex">弹性盒子</div>
我今天感觉 <span class="i-line-md-emoji-grin"></span> 很好！
```

在 tagify 模式下，你可以将 CSS 样式嵌入到 HTML 标签中：

```html
<text-red> 红色文本 </text-red>
<flex> 弹性盒子 </flex>
我今天感觉 <i-line-md-emoji-grin /> 很好！
```

上面的 HTML 会如你所预期的那样工作。

## 带前缀

```js
presetTagify({
  prefix: 'un-'
})
```

```html
<!-- 这将被匹配 -->
<un-flex> </un-flex>
<!-- 这将不会被匹配 -->
<flex> </flex>
```

## 额外属性

你可以为匹配的规则注入额外的属性：

```js
presetTagify({
  // 为匹配的图标添加 display: inline-block
  extraProperties: matched => matched.startsWith('i-')
    ? { display: 'inline-block' }
    : { }
})
```

```js
presetTagify({
  // extraProperties 也可以是一个普通对象
  extraProperties: { display: 'block' }
})
```

## 选项

### prefix

- **类型：** `string`

要使用的 tagify 变体的前缀。

### excludedTags

- **类型：** `(string | RegExp)[]`
- **默认值：** `['b', /^h\d+$/, 'table']`

排除处理的标签。

### extraProperties

- **类型：** `Record<string, string> | ((matched: string) => Partial<Record<string, string>>)`

要应用于匹配规则的额外 CSS 属性。

### defaultExtractor

- **类型：** `boolean`
- **默认值：** `true`

启用默认提取器。
