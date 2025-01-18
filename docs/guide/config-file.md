# 配置文件

我们**强烈建议使用专用的 `uno.config.ts` 文件**来配置你的 UnoCSS，以获得最佳的 IDE 和其他集成体验。

一个完整的配置文件如下所示：

```ts twoslash [uno.config.ts]
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
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
    presetUno(),
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

与在你的 `vite.config.ts` 或其他工具配置中的内联配置相比，专用的配置文件与 [IDE](/integrations/vscode) 和其他工具的集成（如 [ESLint 插件](/integrations/eslint)）的兼容性更好，并且可以使 HMR 工作得更好。

默认情况下，UnoCSS 会自动在项目的根目录中查找 `uno.config.{js,ts,mjs,mts}` 或 `unocss.config.{js,ts,mjs,mts}`。你也可以手动指定配置文件，例如在 Vite 中：

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

有关支持的配置选项的完整列表，请参阅 [配置参考](/config/)。
