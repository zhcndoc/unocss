---
title: 指南
description: 使用 UnoCSS 入门
---

# 什么是 UnoCSS？

UnoCSS 是一个即时原子 CSS 引擎，旨在灵活和可扩展。核心部分是无偏见的，所有的 CSS 工具通过预设提供。

例如，你可以通过在本地的 [配置文件](/guide/config-file) 中提供规则来定义自定义的 CSS 工具。

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['m-1', { margin: '1px' }],
  ],
})
```

这将向你的项目添加一个新的 CSS 工具 `m-1`。由于 UnoCSS 是按需生成的，直到你在代码库中使用它之前，它不会执行任何操作。假设我们有一个这样的组件：

```html
<div class="m-1">Hello</div>
```

`m-1` 将被检测到，以下 CSS 将被生成：

<!-- eslint-skip -->

```css
.m-1 { margin: 1px; }
```

为了使其更灵活，你可以通过将规则中的第一个参数（我们称之为匹配器）更改为 `RegExp`，并将主体更改为一个函数，从而使你的规则动态化，例如：

```diff [uno.config.ts]
export default defineConfig({
  rules: [
-    ['m-1', { margin: '1px' }],
+    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
  ],
})
```

这样做后，你现在可以拥有任意的边距工具，例如 `m-1`、`m-100` 或 `m-52.43`。同样地，UnoCSS 仅在你使用它们时生成它们。

```html
<div class="m-1">Hello</div>
<div class="m-7.5">World</div>
```

<!-- eslint-skip -->

```css
.m-1 { margin: 1px; }
.m-7.5 { margin: 7.5px; }
```

## 预设

一旦你创建了一些规则，你可以将它们提取到一个预设中，并与其他人分享。例如，你可以为公司的设计系统创建一个预设，并与团队分享。

```ts [my-preset.ts]
import { Preset } from 'unocss'

export const myPreset: Preset = {
  name: 'my-preset',
  rules: [
    [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ],
  variants: [/* ... */],
  shortcuts: [/* ... */],
  // ...
}
```

```ts [uno.config.ts]
import { defineConfig } from 'unocss'
import { myPreset } from './my-preset'

export default defineConfig({
  presets: [
    myPreset, // 你自己的预设
  ],
})
```

因此，我们提供了一些 [官方预设](/presets/) 供你立即开始使用，你也可以找到许多有趣的 [社区预设](/presets/community)。

## 演示

你可以在 <a href="/play/" target="_blank">游乐场</a> 中尝试 UnoCSS。或者在 <a href="/interactive/" target="_blank">互动文档</a> 中查找默认预设中的工具。

## 集成

UnoCSS 提供了与各种框架/工具的集成：

<ContentIntegrations />

## 示例

所有示例的源代码可以在 [/examples](https://github.com/unocss/unocss/tree/main/examples) 目录中找到。

<ContentExamples/>
