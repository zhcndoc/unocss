---
title: 规则
description: 为 UnoCSS 编写自定义规则非常简单。
---

# 规则

规则定义了实用程序类及其生成的 CSS。UnoCSS 有许多内置规则，但也允许轻松添加自定义规则。

## 静态规则

以下示例：

```ts
rules: [
  ['m-1', { margin: '0.25rem' }],
]
```

每当在用户的代码库中检测到 `m-1` 时，将生成以下 CSS：

```css
.m-1 { margin: 0.25rem; }
```

> **注意**：主体语法遵循 CSS 属性语法，例如使用 `font-weight` 而不是 `fontWeight`。如果属性名称中包含连字符 `-`，则应将其引号括起来。
>
> ```ts
> rules: [
>   ['font-bold', { 'font-weight': 700 }],
> ]
> ```

## 动态规则

为了使其更智能，可以将匹配器更改为 `RegExp`，并将主体更改为一个函数：

```ts
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
  [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
]
```

主体函数的第一个参数是 `RegExp` 匹配结果，可以通过解构获取匹配的组。

例如，使用以下用法：

```html
<div class="m-100">
  <button class="m-3">
    <icon class="p-5" />
    我的按钮
  </button>
</div>
```

将生成相应的 CSS：

```css
.m-100 { margin: 25rem; }
.m-3 { margin: 0.75rem; }
.p-5 { padding: 1.25rem; }
```

恭喜你！现在你拥有了自己的强大原子 CSS 实用工具。好好享受吧！

## CSS 规则回退

在某些情况下，您可能希望利用 CSS 规则回退，以使用新 CSS 功能，同时能够回退以支持旧浏览器，您可以选择在具有相同键的规则中返回二维数组作为 CSS 表示。例如：

```ts
rules: [
  [/^h-(\d+)dvh$/, ([_, d]) => {
    return [
      ['height', `${d}vh`],
      ['height', `${d}dvh`],
    ]
  }],
]
```

这将使 `h-100dvh` 生成：

```css
.h-100dvh { height: 100vh; height: 100dvh; }
```

## 排序

UnoCSS 尊重您在生成的 CSS 中定义的规则顺序。后面的规则优先级更高。

在使用动态规则时，它可能会匹配多个标记。默认情况下，单个动态规则下匹配的输出将在组内按字母顺序排序。

## 规则合并

默认情况下，UnoCSS 将合并具有相同主体的 CSS 规则，以减少 CSS 大小。

例如，`<div class="m-2 hover:m2">` 将生成：

```css
.hover\:m2:hover, .m-2 { margin: 0.5rem; }
```

而不是两个单独的规则：

```css
.hover\:m2:hover { margin: 0.5rem; }
.m-2 { margin: 0.5rem; }
```

## 特殊符号

自 v0.61 起，UnoCSS 支持特殊符号来定义生成 CSS 的附加元信息。您可以从动态规则匹配函数的第二个参数访问符号。

例如：

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

将生成：

```css
@supports (display: grid) {
  .grid {
    display: grid;
  }
}
```

### 可用符号

- `symbols.parent`：生成的 CSS 规则的父包装器（例如，`@supports`，`@media` 等）
- `symbols.selector`：一个函数，用来修改生成的 CSS 规则的选择器（见下面的示例）
- `symbols.layer`：一个字符串/函数/正则表达式匹配，它设置生成的 CSS 规则的 UnoCSS 层
- `symbols.variants`：一个变量处理器数组，应用于当前 CSS 对象
- `symbols.shortcutsNoMerge`：一个布尔值，用于禁用合并当前规则至快捷方式

## 多选择器规则

自 v0.61 起，UnoCSS 通过 [JavaScript 生成器函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) 支持多选择器。

例如：

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

将生成多个 CSS 规则：

```css
.button-red {
  background: red;
}
.button-red:hover {
  background: color-mix(in srgb, red 90%, black);
}
```

## 完全控制规则

::: tip
这是一个高级功能，在大多数情况下不需要。
:::

当您真正需要一些不在 [动态规则](#dynamic-rules) 和 [变体](/config/variants) 组合覆盖的高级规则时，UnoCSS 也提供了一种方式，让您完全控制生成 CSS 的过程。

它允许您从动态规则的主体函数返回一个字符串，该字符串将**直接**传递给生成的 CSS（这也意味着您需要处理诸如 CSS 转义、变体应用、CSS 构建等事务）。

```ts [uno.config.ts]
import { defineConfig, toEscapedSelector as e } from 'unocss'

export default defineConfig({
  rules: [
    [/^custom-(.+)$/, ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
      // 丢弃不匹配的规则
      if (name.includes('something'))
        return

      // 如果需要，您可以禁用此规则的变体
      if (variantHandlers.length)
        return
      const selector = e(rawSelector)
      // 返回一个字符串而不是对象
      return `
${selector} {
  font-size: ${theme.fontSize.sm};
}
/* 你可以有多个规则 */
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
