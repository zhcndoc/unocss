---
url: 'https://unocss.zhcndoc.com/config/presets.md'
---
# 预设

预设是部分配置，会合并到主配置中。

在编写预设时，我们通常会导出一个构造函数，您可以根据需要提供一些特定于预设的选项。例如：

```ts [my-preset.ts]
import { definePreset, Preset } from 'unocss'

export default definePreset((options?: MyPresetOptions) => {
  return {
    name: 'my-preset',
    rules: [
      // ...
    ],
    variants: [
      // ...
    ],
    // 支持您在根配置中可以拥有的大多数配置
  }
})
```

然后用户可以像这样使用它：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'
import myPreset from './my-preset'

export default defineConfig({
  presets: [
    myPreset({ /* 预设选项 */ }),
  ],
})
```

您可以查看 [官方预设](/presets/) 和 [社区预设](/presets/community) 以获取更多示例。
