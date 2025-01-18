---
title: 变体
description: 变体允许您对现有规则应用一些变化。
---

# 变体

[变体](https://windicss.org/utilities/general/variants.html) 允许您对现有规则应用一些变化，例如 Tailwind CSS 的 `hover:` 变体。

## 示例

<!--eslint-skip-->

```ts
variants: [
  // hover:
  (matcher) => {
    if (!matcher.startsWith('hover:'))
      return matcher
    return {
      // 切除 `hover:` 前缀并传递给下一个变体和规则
      matcher: matcher.slice(6),
      selector: s => `${s}:hover`,
    }
  },
],
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
]
```

- `matcher` 控制何时启用变体。如果返回值是一个字符串，它将被用作匹配规则的选择器。
- `selector` 提供了自定义生成的 CSS 选择器的可能性。

## 背后原理

让我们了解一下在匹配 `hover:m-2` 时发生了什么：

- `hover:m-2` 从用户的使用中提取
- `hover:m-2` 发送到所有变体进行匹配
- `hover:m-2` 被我们的变体匹配并返回 `m-2`
- 结果 `m-2` 将用于下一轮的变体匹配
- 如果没有其他变体匹配，`m-2` 将继续匹配规则
- 我们的第一个规则匹配并生成 `.m-2 { margin: 0.5rem; }`
- 最后，我们将变体的转换应用于生成的 CSS。在这种情况下，我们在 `selector` 钩子前加上了 `:hover`

因此，将生成以下 CSS：

<!-- eslint-skip -->

```css
.hover\:m-2:hover { margin: 0.5rem; }
```

这样，我们就可以在用户悬停在元素上时仅应用 `m-2`。

## 深入探讨

变体系统非常强大，无法在本指南中完全覆盖，您可以查看 [默认预设的实现](https://github.com/unocss/unocss/tree/main/packages-presets/preset-mini/src/_variants) 以了解更多高级用法。
