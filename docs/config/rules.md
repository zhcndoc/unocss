---
title: 规则
description: 为 UnoCSS 编写自定义规则非常简单。
---

# 规则

规则定义了实用类和生成的 CSS。UnoCSS 有许多内置规则，但也允许轻松添加自定义规则。

## 静态规则

使用这个例子：

```ts
rules: [
  ['m-1', { margin: '0.25rem' }],
]
```

每当在用户代码中检测到 `m-1` 时，将生成以下 CSS：

```css
.m-1 { margin: 0.25rem; }
```

> **注意**：属性语法遵循 CSS 属性语法，例如 `font-weight` 而不是 `fontWeight`。如果属性名中有连字符 `-`，应该用引号括起来。
>
> ```ts
> rules: [
>   ['font-bold', { 'font-weight': 700 }],
> ]
> ```

## 动态规则

为了使其更智能，将匹配器更改为 `RegExp`，将主体更改为函数：

```ts
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
  [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
]
```

主体函数的第一个参数是 `RegExp` 匹配结果，可以解构以获取匹配的组。

例如，使用以下用法：

```html
<div class="m-100">
  <button class="m-3">
    <icon class="p-5" />
    My Button
  </button>
</div>
```

将生成相应的 CSS：

```css
.m-100 { margin: 25rem; }
.m-3 { margin: 0.75rem; }
.p-5 { padding: 1.25rem; }
```

恭喜！现在你拥有了自己强大的原子 CSS 实用程序。享受吧！

## Ordering

UnoCSS respects the order of the rules you defined in the generated CSS. Latter ones come with higher priority.

When using dynamic rules, it may match multiple tokens. By default, the output of those matched under a single dynamic rule will be sorted alphabetically within the group.

## Rules merging

By default, UnoCSS will merge CSS rules with the same body to minimize the CSS size.

For example, `<div class="m-2 hover:m2">` will generate:

```css
.hover\:m2:hover, .m-2 { margin: 0.5rem; }
```

Instead of two separate rules:

```css
.hover\:m2:hover { margin: 0.5rem; }
.m-2 { margin: 0.5rem; }
```

## Special symbols

Since v0.61, UnoCSS supports special symbols to define additional meta information for your generated CSS. You can access symbols from the second argument of the dynamic rule matcher function.

For example:

```ts
rules: [
  [/^grid$/, ([, d], { symbols }) => {
    return {
      [symbols.parent]: '@supports (display: grid)',
      display: 'grid',
    }
  }],
]
```

Will generate:

```css
@supports (display: grid) {
  .grid {
    display: grid;
  }
}
```

### Available symbols

- `symbols.parent`: The parent wrapper of the generated CSS rule (eg. `@supports`, `@media`, etc.)
- `symbols.selector`: A function to modify the selector of the generated CSS rule (see the example below)
- `symbols.variants`: An array of variant handler that are applied to the current CSS object
- `symbols.shortcutsNoMerge`: A boolean to disable the merging of the current rule in shortcuts

## Multi-selector rules

Since v0.61, UnoCSS supports multi-selector via [JavaScript Generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).

For example:

```ts
rules: [
  [/^button-(.*)$/, function* ([, color], { symbols }) {
    yield {
      background: color
    }
    yield {
      [symbols.selector]: selector => `${selector}:hover`,
      // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
      background: `color-mix(in srgb, ${color} 90%, black)`
    }
  }],
]
```

Will generate multiple CSS rules:

```css
.button-red {
  background: red;
}
.button-red:hover {
  background: color-mix(in srgb, red 90%, black);
}
```

## 完全控制的规则

::: tip
这是一个高级特性，在大多数情况下不会需要。
:::

当您确实需要一些高级规则，这些规则不被[动态规则](#dynamic-rules)和[变体](/config/variants)的组合所覆盖时，UnoCSS 还提供了一种完全控制生成 CSS 的方法。

它允许您从动态规则的主体函数中返回一个字符串，该字符串将**直接**传递给生成的 CSS (这也意味着您需要处理诸如 CSS 转义、变体应用、CSS 构建等问题)。

```ts [uno.config.ts]
import { defineConfig, toEscapedSelector as e } from 'unocss'

export default defineConfig({
  rules: [
    [/^custom-(.+)$/, ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
      // 丢弃不匹配的规则
      if (name.includes('something'))
        return

      // 如果您愿意，您可以禁用此规则的变体
      if (variantHandlers.length)
        return
      const selector = e(rawSelector)
      // 返回字符串而不是对象
      return `
${selector} {
  font-size: ${theme.fontSize.sm};
}
/* 您可以有多个规则 */
${selector}::after {
  content: 'after';
}
.foo > ${selector} {
  color: red;
}
/* 或者媒体查询 */
@media (min-width: ${theme.breakpoints.sm}) {
  ${selector} {
    font-size: ${theme.fontSize.sm};
  }
}
`
    }],
  ],
})
```
