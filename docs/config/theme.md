---
title: 主题
description: UnoCSS 还支持您可能熟悉的 Tailwind CSS / Windi CSS 的主题系统。
outline: deep
---

# 主题

UnoCSS 还支持您可能熟悉的 Tailwind CSS / Windi CSS 的主题系统。在用户层面，您可以在配置中指定 `theme` 属性，它将被深度合并到默认主题中。

## 使用

<!--eslint-skip-->

```ts
theme: {
  // ...
  colors: {
    veryCool: '#0000ff', // class="text-very-cool"
    brand: {
      primary: 'hsl(var(--hue, 217) 78% 51%)', //class="bg-brand-primary"
      DEFAULT: '#942192' //class="bg-brand"
    },
  },
}
```

::: tip
在解析过程中，`theme` 将始终存在于 `context` 中。
:::

### 在 `rules` 中使用

要在规则中使用主题：

```ts
rules: [
  [/^text-(.*)$/, ([, c], { theme }) => {
    if (theme.colors[c])
      return { color: theme.colors[c] }
  }],
]
```

### 在 `variants` 中使用

要在变体中使用主题：

```ts
variants: [
  {
    name: 'variant-name',
    match(matcher, { theme }) {
      // ...
    },
  },
]
```

### 在 `shortcuts` 中使用

要在动态快捷方式中使用主题：

```ts
shortcuts: [
  [/^badge-(.*)$/, ([, c], { theme }) => {
    if (Object.keys(theme.colors).includes(c))
      return `bg-${c}4:10 text-${c}5 rounded`
  }],
]
```

## 断点

::: warning
当提供自定义的 `breakpoints` 对象时，默认值将被覆盖，而不是合并。
:::

在以下示例中，您将只能使用 `sm:` 和 `md:` 断点变体：

<!--eslint-skip-->

```ts
theme: {
  // ...
  breakpoints: {
    sm: '320px',
    md: '640px',
  },
}
```

如果您想继承 `original` 主题的断点，可以使用 `extendTheme`：

```ts
extendTheme: (theme) => {
  return {
    ...theme,
    breakpoints: {
      ...theme.breakpoints,
      sm: '320px',
      md: '640px',
    },
  }
}
```

::: info
`verticalBreakpoints` 与 `breakpoints` 相同，但用于垂直布局。
:::

此外，我们将按大小（相同单位）对屏幕点进行排序。对于不同单位的屏幕点，为了避免错误，请在配置中使用统一的单位。

<!--eslint-skip-->

```ts
theme: {
  // ...
  breakpoints: {
    sm: '320px',
    // 因为 uno 不支持不同单位大小的比较排序，请转换为相同单位。
    // md: '40rem',
    md: `${40 * 16}px`,
    lg: '960px',
  },
}
```

## 扩展主题

`ExtendTheme` 允许您编辑 **深度合并的主题** 以获取完整的主题对象。

自定义函数会修改主题对象。

```ts
extendTheme: (theme) => {
  theme.colors.veryCool = '#0000ff' // class="text-very-cool"
  theme.colors.brand = {
    primary: 'hsl(var(--hue, 217) 78% 51%)', // class="bg-brand-primary"
  }
}
```

也可以返回一个新的主题对象以完全替换原始对象。

```ts
extendTheme: (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      veryCool: '#0000ff', // class="text-very-cool"
      brand: {
        primary: 'hsl(var(--hue, 217) 78% 51%)', // class="bg-brand-primary"
      },
    },
  }
}
```
