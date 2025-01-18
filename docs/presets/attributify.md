---
title: Attributify 预设
description: 启用其他预设的 attributify 模式的 UnoCSS 预设。
outline: deep
---

# Attributify 预设

这启用了其他预设的 [attributify 模式](#attributify-mode)。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-attributify)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-attributify
```

```bash [yarn]
yarn add -D @unocss/preset-attributify
```

```bash [npm]
npm install -D @unocss/preset-attributify
```

:::

```ts [uno.config.ts]
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  presets: [
    presetAttributify({ /* 预设选项 */ }),
    // ...
  ],
})
```

::: tip
此预设包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetAttributify } from 'unocss'
```

:::

## Attributify 模式

想象一下，您有一个使用 Tailwind CSS 的工具的按钮。当列表变得更长时，它变得真的很难阅读和维护。

```html
<button
  class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
>
  Button
</button>
```

通过 attributify 模式，您可以将工具分离为属性：

```html
<button
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="sm white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200"
>
  Button
</button>
```

例如，`text-sm text-white` 可以组合成 `text="sm white"` 而不需重复相同的前缀。

## 前缀自我引用

对于像 `flex`、`grid`、`border` 这样的工具，具有与前缀相同的工具，提供了一个特殊的 `~` 值。

例如：

```html
<button class="border border-red">Button</button>
```

可以写成：

```html
<button border="~ red">Button</button>
```

## 无值的 attributify

除了 Windi CSS 的 attributify 模式外，此预设还支持无值属性。

例如，

```html
<div class="m-2 rounded text-teal-400" />
```

现在可以是

```html
<div m-2 rounded text-teal-400 />
```

::: info
注意：如果您在使用 JSX，`<div foo>` 可能会被转换成 `<div foo={true}>`，这会导致从 UnoCSS 生成的 CSS 无法匹配属性。为了解决这个问题，您可以尝试与此预设一起使用 [`transformer-attributify-jsx`](/transformers/attributify-jsx)。
:::

## 属性冲突

如果属性模式的名称与元素或组件的属性发生冲突，您可以添加 `un-` 前缀以特定于 UnoCSS 的 attributify 模式。

例如：

```html
<a text="red">这与链接的 `text` 属性冲突</a>
<!-- 改为 -->
<a un-text="red">文本颜色为红色</a>
```

前缀默认是可选的，如果您想强制使用前缀，请设置

```ts
presetAttributify({
  prefix: 'un-',
  prefixedOnly: true, // <--
})
```

您也可以通过以下方式禁用对某些属性的扫描：

```ts
presetAttributify({
  ignoreAttributes: [
    'text'
    // ...
  ]
})
```

## TypeScript 支持 (JSX/TSX)

创建 `shims.d.ts`，内容如下：

> 默认情况下，类型包括来自 `@unocss/preset-uno` 的常见属性。如果您需要自定义属性，请参考 [类型源](https://github.com/unocss/unocss/blob/main/packages-presets/preset-attributify/src/jsx.ts) 来实现您自己的类型。

### Vue

自 Volar 0.36 起， [它现在严格对待未知属性](https://github.com/johnsoncodehk/volar/issues/1077#issuecomment-1145361472)。要选择退出，您可以在项目中添加以下文件：

```ts [html.d.ts]
declare module '@vue/runtime-dom' {
  interface HTMLAttributes {
    [key: string]: any
  }
}
declare module '@vue/runtime-core' {
  interface AllowedComponentProps {
    [key: string]: any
  }
}
export {}
```

### React

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
```

### Vue 3

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}
```

### SolidJS

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }
}
```

### Svelte & SvelteKit

```ts
declare namespace svelteHTML {
  import type { AttributifyAttributes } from '@unocss/preset-attributify'

  type HTMLAttributes = AttributifyAttributes
}
```

### Astro

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes extends AttributifyAttributes { }
  }
}
```

### Preact

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'preact' {
  namespace JSX {
    interface HTMLAttributes extends AttributifyAttributes {}
  }
}
```

### 带前缀的 Attributify

```ts
import type { AttributifyNames } from '@unocss/preset-attributify'

type Prefix = 'uno:' // 将其更改为您的前缀

interface HTMLAttributes extends Partial<Record<AttributifyNames<Prefix>, string>> {}
```

## 选项

### strict

- **类型:** `boolean`
- **默认值:** `false`

仅为 attributify 或类生成 CSS。

### prefix

- **类型:** `string`
- **默认值:** `'un-'`

attributify 模式的前缀。

### prefixedOnly

- **类型:** `boolean`
- **默认值:** `false`

仅匹配带前缀的属性。

### nonValuedAttribute

- **类型:** `boolean`
- **默认值:** `true`

支持匹配无值属性。

### ignoreAttributes

- **类型:** `string[]`

要忽略的属性列表。

### trueToNonValued

- **类型:** `boolean`
- **默认值:** `false`

如果 DOM 中表示的实际值为 `true`，无值属性也将匹配。此选项存在是为了支持将无值属性编码为 `true` 的框架。启用此选项将破坏以 `true` 结尾的规则。

## 鸣谢

最初的想法来自 [@Tahul](https://github.com/Tahul) 和 [@antfu](https://github.com/antfu)。先前 [在 Windi CSS 的实现](https://windicss.org/posts/v30.html#attributify-mode) 由 [@voorjaar](https://github.com/voorjaar) 完成。
