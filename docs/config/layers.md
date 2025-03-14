---
title: 层
icon: ph:stack-bold
description: UnoCSS 允许您自定义层的定义。
---

# 层

CSS 的顺序会影响其优先级。虽然引擎会 [保留规则的顺序](/config/rules#ordering)，有时您可能希望将一些工具组合在一起，以便明确控制它们的顺序。

## 用法

与提供三个固定层（`base`、`components`、`utilities`）的 Tailwind CSS 不同，UnoCSS 允许您按需定义层。要设置层，您可以将元数据作为规则的第三个项目传递：

```ts
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` }), { layer: 'utilities' }],
  // 如果您省略层，它将默认为 `default`
  ['btn', { padding: '4px' }],
]
```

这将生成：

<!-- eslint-skip -->

```css
/* layer: default */
.btn { padding: 4px; }
/* layer: utilities */
.m-2 { margin: 0.5rem; }
```

层也可以在每个预飞行中设置：

```ts
preflights: [
  {
    layer: 'my-layer',
    getCSS: async () => (await fetch('my-style.css')).text(),
  },
]
```

## 排序

您可以通过以下方式控制层的顺序：

<!--eslint-skip-->

```ts
layers: {
  'components': -1,
  'default': 1,
  'utilities': 2,
  'my-layer': 3,
}
```

没有指定顺序的层将按字母顺序排序。

当您希望在层之间添加自定义 CSS 时，可以更新您的入口模块：

```ts
// 'uno:[layer-name].css'
import 'uno:components.css'

// 除了 'components' 和 'utilities' 之外的层将回退到这里
import 'uno.css'

// 您自己的 CSS
import './my-custom.css'

// "utilities" 层具有最高优先级
import 'uno:utilities.css'
```

## CSS 级联层

您可以通过以下方式输出 CSS 级联层：

```ts
outputToCssLayers: true
```

您可以通过以下方式更改 CSS 层的名称：

```ts
outputToCssLayers: {
  cssLayerName: (layer) => {
    // 默认层将输出到 "utilities" CSS 层。
    if (layer === 'default')
      return 'utilities'

    // 快捷方式层将输出到 "utilities" CSS 层的 "shortcuts" 子层。
    if (layer === 'shortcuts')
      return 'utilities.shortcuts'

    // 所有其他层将以其名称作为 CSS 层名称。
  }
}
```

## 使用变体的层

层可以使用变体创建。

`uno-layer-<name>:` 可以用于创建 UnoCSS 层。

```html
<p class="uno-layer-my-layer:text-xl">text</p>
```

<!-- eslint-skip -->

```css
/* layer: my-layer */
.uno-layer-my-layer\:text-xl{ font-size:1.25rem; line-height:1.75rem; }
```

`layer-<name>:` 可以用于创建 CSS @layer。

```html
<p class="layer-my-layer:text-xl">text</p>
```

<!-- eslint-skip -->

```css
/* layer: default */
@layer my-layer{ .layer-my-layer\:text-xl{ font-size:1.25rem; line-height:1.75rem; } }
```
