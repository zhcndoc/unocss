---
title: 变体
description: 变体允许您对现有规则应用一些变化。
---

# 变体

[变体](https://windicss.org/utilities/general/variants.html)允许您对现有规则应用一些变化，比如来自 Tailwind CSS 的 `hover:` 变体。

## 示例

<!--eslint-skip-->

```ts
variants: [
  // hover:
  (matcher) => {
    if (!matcher.startsWith('hover:'))
      return matcher
    return {
      // 切去 `hover:` 前缀并传递给下一个变体和规则
      matcher: matcher.slice(6),
      selector: s => `${s}:hover`,
    }
  },
],
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
]
```

- `matcher` 控制变体何时被启用。如果返回值是一个字符串，它将用作匹配规则的选择器。
- `selector` 提供了自定义生成的 CSS 选择器的能力。

## 内部原理

让我们看一下在匹配 `hover:m-2` 时发生了什么：

- `hover:m-2` 从用户的用法中提取
- `hover:m-2` 发送到所有变体进行匹配
- `hover:m-2` 被我们的变体匹配并返回 `m-2`
- 结果 `m-2` 将用于下一轮变体匹配
- 如果没有其他变体被匹配，`m-2` 将去匹配规则
- 我们的第一条规则被匹配并生成 `.m-2 { margin: 0.5rem; }`
- 最后，我们将变体的变换应用于生成的 CSS。在这种情况下，我们在 `selector` 钩子前添加了 `:hover`

因此，以下 CSS 将被生成：

```css
.hover\:m-2:hover { margin: 0.5rem; }
```

这样，只有当用户悬停在元素上时，`m-2` 才会被应用。

## 更进一步

变体系统非常强大，在本指南中无法全面覆盖，您可以查看 [默认预设的实现](https://github.com/unocss/unocss/tree/main/packages/preset-mini/src/_variants) 以了解更高级的用法。
