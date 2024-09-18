---
title: 预设
description: 预设是 UnoCSS 的核心。它们让你能在几分钟内创建自己的自定义框架。
outline: deep
---

# 预设

预设是 UnoCSS 的核心。它们让你能在几分钟内创建自己的自定义框架。

### 使用预设

为你的项目设置 presets：

```ts twoslash [uno.config.ts]
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset 选项 */}),
    presetUno(),
    // ...自定义 presets
  ],
})
```

当指定 `presets` 选项时，将忽略默认的 preset。

若要禁用默认 preset，你可以将 `presets` 设置为空数组：

```ts twoslash [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [], // 禁用默认 preset
  rules: [
    // 你的自定义规则
  ],
})
```

你可以查看[官方预设](/presets/)和[社区预设](/presets/community)以获取更多信息。

### 创建预设

要了解如何创建你自己的自定义 preset，请查看[预设配置](/config/presets)。
