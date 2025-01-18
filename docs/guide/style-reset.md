---
title: 样式重置
description: UnoCSS 默认不提供样式重置或预飞行，以实现最大的灵活性，并且不会填充你的全局 CSS。
outline: deep
---

# 浏览器样式重置

UnoCSS 默认不提供样式重置或预飞行，以避免填充你的全局 CSS，并且为了实现最大的灵活性。如果你将 UnoCSS 与其他 CSS 框架一起使用，它们可能已经为你进行了样式重置。如果你单独使用 UnoCSS，可以使用重置库，例如 [Normalize.css](https://github.com/csstools/normalize.css)。

我们也提供了一个小集合，供你快速获取：

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

:::

## 用法

你可以将以下重置样式表中的一个添加到你的 `main.js` 中。

### Normalize.css

源： https://github.com/csstools/normalize.css

```ts
import '@unocss/reset/normalize.css'
```

### sanitize.css

源： https://github.com/csstools/sanitize.css

```ts
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
```

### Eric Meyer

源： https://meyerweb.com/eric/tools/css/reset/index.html

```ts
import '@unocss/reset/eric-meyer.css'
```

### Tailwind

```ts
import '@unocss/reset/tailwind.css'
```

### Tailwind 兼容

```ts
import '@unocss/reset/tailwind-compat.css'
```

此重置基于 [Tailwind reset](#tailwind)，去掉了按钮的背景颜色覆盖，以避免与 UI 框架的冲突。参见 [相关问题](https://github.com/unocss/unocss/issues/2127)。

::: code-group

```css [Before]
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}
```

```css [After]
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
