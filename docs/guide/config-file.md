# 配置文件

我们**强烈建议使用专用的 `uno.config.ts` 文件**来配置你的 UnoCSS，以便在 IDE 和其他集成方面获得最佳体验。

一个功能齐全的配置文件如下所示：

```ts twoslash [uno.config.ts]
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
```

与您在 `vite.config.ts` 或其他工具配置中使用的内联配置相比，专用配置文件将更好地与[IDEs](/integrations/vscode)和集成工具（例如[ESLint 插件](/integrations/eslint)）配合使用，并且使热模块替换（HMR）工作得更好。

默认情况下，UnoCSS 会自动寻找项目根目录下的 `uno.config.{js,ts,mjs,mts}` 或 `unocss.config.{js,ts,mjs,mts}`。您也可以手动指定配置文件，例如在 Vite 中：

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      configFile: '../my-uno.config.ts',
    }),
  ],
})
```

有关支持的配置选项的完整列表，请参考[配置参考](/config/)。
