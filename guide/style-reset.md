---
url: 'https://unocss.zhcndoc.com/guide/style-reset.md'
description: UnoCSS 默认不提供样式重置或预飞行，以实现最大灵活性，并且不会填充您的全局 CSS。
---

# 浏览器样式重置

UnoCSS 默认不提供样式重置或预飞行，以避免填充您的全局 CSS，并且为了实现最大灵活性。如果您将 UnoCSS 与其他 CSS 框架一起使用，它们可能已经为您进行了样式重置。如果您单独使用 UnoCSS，则可以使用像 [Normalize.css](https://github.com/csstools/normalize.css) 这样的重置库。

我们还提供了一小部分库供您快速获取：

## 安装

::: code-group

```bash [pnpm]
pnpm add @unocss/reset
```

```bash [yarn]
yarn add @unocss/reset
```

```bash [npm]
npm install @unocss/reset
```

```bash [bun]
bun add @unocss/reset
```

:::

## 使用方法

您可以将以下重置样式表之一添加到您的 `main.js` 中。

### Normalize.css

来源: https://github.com/csstools/normalize.css

```ts
import '@unocss/reset/normalize.css'
```

### sanitize.css

来源: https://github.com/csstools/sanitize.css

```ts
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
```

### Eric Meyer

来源: https://meyerweb.com/eric/tools/css/reset/index.html

```ts
import '@unocss/reset/eric-meyer.css'
```

### Tailwind

基于较早的 [Preflight](https://github.com/tailwindlabs/tailwindcss/blob/v3.4.18/src/css/preflight.css)，并包含部分近期变更

```ts
import '@unocss/reset/tailwind.css'
```

### Tailwind v4

基于 [Preflight](https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/preflight.css)

```ts
import '@unocss/reset/tailwind-v4.css'
```

### Tailwind 兼容

```ts
import '@unocss/reset/tailwind-compat.css'
```

该重置基于 [Tailwind reset](#tailwind)，去掉了按钮的背景颜色重写，以避免与 UI 框架冲突。请参见 [相关问题](https://github.com/unocss/unocss/issues/2127)。

::: code-group

```css [之前]
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}
```

```css [之后]
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  /*background-color: transparent; !* 2 *!*/
  background-image: none; /* 2 */
}
```

:::
