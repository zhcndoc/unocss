---
title: Tagify 预设
description: UnoCSS 的 Tagify 模式 (@unocss/preset-tagify)。
outline: deep
---

# Tagify 预设

这使得其他预设可以启用 [tagify 模式](#tagify-mode)。

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

:::

```ts [uno.config.ts]
import presetTagify from '@unocss/preset-tagify'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetTagify({ /* 选项 */ }),
    // ...其他预设
  ],
})
```

## Tagify 模式

当您只需要将单个 unocss 规则应用于元素时，这个预设将非常方便。

```html
<span class="text-red"> red text </span>
<div class="flex">flexbox</div>
I'm feeling <span class="i-line-md-emoji-grin"></span> today!
```

使用 tagify 模式，您可以将 CSS 样式嵌入到 HTML 标签中：

```html
<text-red> red text </text-red>
<flex> flexbox </flex>
I'm feeling <i-line-md-emoji-grin /> today!
```

上述 HTML 的工作方式与您预期的一致。

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

## 附加属性

您可以向匹配的规则注入额外的属性：

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

- **类型:** `string`

用于 tagify 变体的前缀。

### excludedTags

- **类型:** `string[] | RegExp[]`
- **默认值:** `['b', /^h\d+$/, 'table']`

被排除在处理之外的标签。

### extraProperties

- **类型:** `Record<string, string> | ((matched: string) => Partial<Record<string, string>>)`

要应用于匹配规则的额外 CSS 属性。

### defaultExtractor

- **类型:** `boolean`
- **默认值:** `true`

启用默认提取器。
