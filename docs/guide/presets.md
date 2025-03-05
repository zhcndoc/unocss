---
title: 预设
description: 预设是 UnoCSS 的核心。它们让您在几分钟内创建自己的自定义框架。
outline: deep
---

# 预设

预设是 UnoCSS 的核心。它们让您在几分钟内创建自己的自定义框架。

### 使用预设

要将预设设置到您的项目中：

```ts twoslash [uno.config.ts]
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({ /* 预设选项 */}),
    presetUno(),
    // ...自定义预设
  ],
})
```

当指定 `presets` 选项时，将忽略默认预设。

要禁用默认预设，您可以将 `presets` 设置为空数组：

```ts twoslash [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [], // 禁用默认预设
  rules: [
    // 您的自定义规则
  ],
})
```

您可以查看 [官方预设](/presets/) 和 [社区预设](/presets/community) 以获取更多信息。

### 创建预设

要了解如何创建您自己的自定义预设，请参见 [配置：预设](/config/presets)。
