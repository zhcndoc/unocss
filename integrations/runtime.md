---
url: 'https://unocss.zhcndoc.com/integrations/runtime.md'
description: UnoCSS 的 CSS-in-JS 运行时（@unocss/runtime）。
---

# 运行时

UnoCSS 运行时提供一个 CDN 构建，可以直接在浏览器中运行 UnoCSS。它会检测 DOM 更改并动态生成样式。

## 用法

在你的 `index.html` 中添加以下一行：

```html [index.html]
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
```

运行时可以通过在加载运行时之前定义配置进行配置：

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

默认情况下，会应用 [Wind3 预设](/presets/wind3)。

运行时不包含预设样式，如果你想要样式重置，可以选择添加自己的样式，或者使用 [重置包](/guide/style-reset) 中的样式。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/normalize.min.css" />
<!-- 或者 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css" />
```

## 构建

根据不同的使用场景，提供了几种构建方式。

### Uno（默认）

使用 `@unocss/preset-wind3` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js"></script>
```

### Attributify

使用 `@unocss/preset-wind3` 和 `@unocss/preset-attributify` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/attributify.global.js"></script>
```

### Mini

使用 `@unocss/preset-mini` 和 `@unocss/preset-attributify` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/mini.global.js"></script>
```

### 核心

如果你需要混合使用预设，可以只加载核心运行时，并手动分配预设。从 UnoCSS 中可以使用所有 [官方预设](/presets/#presets)。在初始化核心运行时之前加载你需要的预设。

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

可以使用 `defaults` 属性提供 UnoCSS 配置：

```ts
import initUnocssRuntime from '@unocss/runtime'
import config from './uno.config'

initUnocssRuntime({ defaults: config })
```

可以从 `esm.sh` 导入预设：

```ts
import { defineConfig } from '@unocss/runtime'
import presetIcons from 'https://esm.sh/@unocss/preset-icons/browser'
import presetWind3 from 'https://esm.sh/@unocss/preset-wind3'

export default defineConfig({
  presets: [presetWind3(), presetIcons({ cdn: 'https://esm.sh/' })],
})
```

## 防止 FOUC

由于 UnoCSS 在 DOM 就绪后运行，因此可能会出现“未样式内容闪烁”（FOUC），用户可能会看到页面未应用样式。

使用 `un-cloak` 属性与 CSS 规则，例如 `[un-cloak] { display: none }`，以在 UnoCSS 为其应用样式之前隐藏未样式的元素。

::: code-group

```css
[un-cloak] {
  display: none;
}
```

```html
<div class="text-blue-500" un-cloak>这段文本在蓝色下才可见。</div>
```

:::
