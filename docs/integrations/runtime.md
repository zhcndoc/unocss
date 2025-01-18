---
title: UnoCSS CDN 运行时
description: UnoCSS 的 CSS-in-JS 运行时 (@unocss/runtime)。
outline: deep
---

# 运行时

UnoCSS 运行时提供了一个 CDN 构建，能够在浏览器中直接运行 UnoCSS。它会检测 DOM 更改并动态生成样式。

## 用法

在 `index.html` 中添加以下行：

```html [index.html]
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
```

运行时可以通过在加载运行时之前定义配置来进行配置：

```html
<!-- 定义 unocss 选项... -->
<script>
  window.__unocss = {
    rules: [
      // 自定义规则...
    ],
    presets: [
      // 自定义预设...
    ],
    // ...
  }
</script>
<!-- ... 然后加载运行时 -->
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
```

默认情况下，[Uno 预设](/presets/uno) 将被应用。

运行时不包含预设样式，如果你想要样式重置，可以添加你自己的样式或者使用 [重置包](/guide/style-reset) 中的一个。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/normalize.min.css" />
<!-- 或者 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css" />
```

## 构建

针对不同的使用场景，有多种构建可供选择。

### Uno（默认）

使用 `@unocss/preset-uno` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js"></script>
```

### Attributify

使用 `@unocss/preset-uno` 和 `@unocss/preset-attributify` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/attributify.global.js"></script>
```

### Mini

使用 `@unocss/preset-mini` 和 `@unocss/preset-attributify` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/mini.global.js"></script>
```

### Core

如果需要混合使用预设，可以仅加载核心运行时并手动分配预设。所有来自 UnoCSS 的 [官方预设](/presets/#presets) 都可用。在初始化核心运行时之前加载所需的预设。

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-icons.global.js"></script>
<script>
  window.__unocss = {
    presets: [
      () =>
        window.__unocss_runtime.presets.presetIcons({
          scale: 1.2,
          cdn: 'https://esm.sh/',
        }),
    ],
  }
</script>
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/core.global.js"></script>
```

## 打包器用法

```bash
npm i @unocss/runtime
```

```ts
import initUnocssRuntime from '@unocss/runtime'

initUnocssRuntime({ /* 选项 */ })
```

可以通过 `defaults` 属性提供 UnoCSS 配置：

```ts
import initUnocssRuntime from '@unocss/runtime'
import config from './uno.config'

initUnocssRuntime({ defaults: config })
```

预设可以从 `esm.sh` 导入：

```ts
import { defineConfig } from '@unocss/runtime'
import presetIcons from 'https://esm.sh/@unocss/preset-icons/browser'
import presetUno from 'https://esm.sh/@unocss/preset-uno'

export default defineConfig({
  presets: [presetUno(), presetIcons({ cdn: 'https://esm.sh/' })],
})
```

## 防止 FOUC

由于 UnoCSS 在 DOM 准备好后运行，可能会出现“未样式内容闪烁”（FOUC），这可能导致用户看到样式未应用的页面。

使用 `un-cloak` 属性和 CSS 规则，如 `[un-cloak] { display: none }` 来隐藏未样式元素，直到 UnoCSS 为其应用样式。

::: code-group

```css
[un-cloak] {
  display: none;
}
```

```html
<div class="text-blue-500" un-cloak>这段文字将只以蓝色可见。</div>
```

:::
