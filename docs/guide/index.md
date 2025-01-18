---
title: 指南
description: 开始使用 UnoCSS
---

# 什么是 UnoCSS？

UnoCSS 是一个即时原子 CSS 引擎，旨在提供灵活性和可扩展性。其核心设计是无偏见的，所有 CSS 工具类通过预设提供。

例如，您可以通过在本地 [配置文件](/guide/config-file) 中提供规则来定义自定义的 CSS 工具类。

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['m-1', { margin: '1px' }],
  ],
})
```

这将为您的项目添加一个新的 CSS 工具类 `m-1`。由于 UnoCSS 是按需生成的，直到您在代码库中使用它之前，什么都不会发生。假设我们有一个这样的组件：

```html
<div class="m-1">你好</div>
```

`m-1` 将被检测到，生成以下 CSS：

<!-- eslint-skip -->

```css
.m-1 { margin: 1px; }
```

为了使其更加灵活，您可以通过将规则的第一个参数（我们称之为匹配器）更改为 `RegExp`，并将主体改为一个函数，从而使您的规则动态化，例如：

```diff [uno.config.ts]
export default defineConfig({
  rules: [
-    ['m-1', { margin: '1px' }],
+    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
  ],
})
```

通过这样做，现在您可以拥有任意的边距工具类，如 `m-1`、`m-100` 或 `m-52.43`。同样，UnoCSS 只会在您使用它们时生成它们。

```html
<div class="m-1">你好</div>
<div class="m-7.5">世界</div>
```

<!-- eslint-skip -->

```css
.m-1 { margin: 1px; }
.m-7.5 { margin: 7.5px; }
```

## 预设

一旦您创建了几个规则，可以将它们提取到一个预设中，并与其他人分享。例如，您可以为公司的设计系统创建一个预设，并与团队分享。

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

因此，我们同样提供了一些 [官方预设](/presets/) 供您立即使用，您还可以找到许多有趣的 [社区预设](/presets/community)。

## 玩耍

您可以在浏览器中试用 UnoCSS，在 <a href="/play/" target="_blank">Playground</a> 中。或者在 <a href="/interactive/" target="_blank">互动文档</a> 中查找默认预设中的工具类。

## 集成

UnoCSS 提供了与各种框架/工具的集成：

<ContentIntegrations />

## 示例

所有示例的源代码可以在 [/examples](https://github.com/unocss/unocss/tree/main/examples) 目录中找到。

<ContentExamples/>
