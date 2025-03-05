---
title: Attributify JSX 转换器
description: 支持 JSX/TSX 中的无值属性化 (@unocss/transformer-attributify-jsx)
---

# Attributify JSX 转换器

支持 [无值属性化](/presets/attributify#valueless-attributify) 在 JSX/TSX 中: `@unocss/transformer-attributify-jsx`。

## 介绍

<!-- @unocss-ignore -->

```jsx
export function Component() {
  return (
    <div text-red text-center text-5xl animate-bounce>
      unocss
    </div>
  )
}
```

将转换为：

```jsx
export function Component() {
  return (
    <div text-red="" text-center="" text-5xl="" animate-bounce="">
      unocss
    </div>
  )
}
```

::: details 没有这个转换器时，JSX 将无值属性视为布尔属性。

```jsx
export function Component() {
  return (
    <div text-red={true} text-center={true} text-5xl={true} animate-bounce={true}>
      unocss
    </div>
  )
}
```

:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/transformer-attributify-jsx
```

```bash [yarn]
yarn add -D @unocss/transformer-attributify-jsx
```

```bash [npm]
npm install -D @unocss/transformer-attributify-jsx
```

```bash [bun]
bun add -D @unocss/transformer-attributify-jsx
```

:::

```ts{11} [uno.config.ts]
import { defineConfig, presetAttributify } from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
  // ...
  presets: [
    // ...
    presetAttributify(),
  ],
  transformers: [
    transformerAttributifyJsx(), // <--
  ],
})
```

::: tip
此预设包含在 `unocss` 包中，您也可以直接从那里导入：

```ts
import { transformerAttributifyJsx } from 'unocss'
```

:::

## 注意事项

::: warning
规则几乎与 [Attributify 预设](/presets/attributify) 相同，但有一些注意事项。
:::

```html
<div translate-x-100% />
<!-- 不能以 `%` 结尾 -->

<div translate-x-[100px] />
<!-- 不能包含 `[` 或 `]` -->
```

相反，您可能希望使用有值属性：

```html
<div translate="x-100%" />

<div translate="x-[100px]" />
```

## 黑名单

此转换器将仅转换有效的 UnoCSS 实用工具属性。
您还可以通过 `blocklist` 来排除某些属性不被转换。

```js
transformerAttributifyJsx({
  blocklist: [/text-[a-zA-Z]*/, 'text-5xl']
})
```

```jsx
<div text-red text-center text-5xl animate-bounce>
  unocss
</div>
```

将编译为：

```html
<div text-red text-center text-5xl animate-bounce="">unocss</div>
```
