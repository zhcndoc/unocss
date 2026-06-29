---
title: Web 字体预设
description: UnoCSS 的 Web 字体支持（@unocss/preset-web-fonts）。
outline: deep
---

# Web 字体预设

通过简单地提供字体名称来使用来自 [Google Fonts](https://fonts.google.com/) 和 [FontShare](https://www.fontshare.com/) 的 Web 字体。

查看 [所有支持的提供者](#providers)。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-web-fonts)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-web-fonts
```

```bash [yarn]
yarn add -D @unocss/preset-web-fonts
```

```bash [npm]
npm install -D @unocss/preset-web-fonts
```

```bash [bun]
bun add -D @unocss/preset-web-fonts
```

:::

```ts [uno.config.ts]
import presetWebFonts from '@unocss/preset-web-fonts'
import presetWind3 from '@unocss/preset-wind3'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetWebFonts({ /* 选项 */ }),
  ],
})
```

::: tip
此预设包含在 `unocss` 包中，您也可以从那里导入它：

```ts
import { presetWebFonts } from 'unocss'
```

:::

## 提供者

当前支持的提供者：

- `none` - 不执行任何操作，将字体视为系统字体
- `google` - [Google Fonts](https://fonts.google.com/)
- `bunny` - [隐私友好的 Google Fonts](https://fonts.bunny.net/)
- `fontshare` - [ITF 提供的优质字体服务](https://www.fontshare.com/)
- `fontsource` - [自托管开源字体，整齐打包的 NPM 包](https://fontsource.org/)
- `coollabs` - [隐私友好的 Google Fonts 替代品](https://fonts.coollabs.io/)

::: info
欢迎提交 PR 以添加更多提供者。🙌
:::

### 自定义获取函数

使用您自己的函数获取字体源。

```ts [uno.config.ts]
import presetWebFonts from '@unocss/preset-web-fonts'
import presetWind3 from '@unocss/preset-wind3'
import axios from 'axios'
import ProxyAgent from 'proxy-agent'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetWebFonts({
      // 使用带有 https 代理的 axios
      customFetch: (url: string) => axios.get(url, { httpsAgent: new ProxyAgent('https://localhost:7890') }).then(it => it.data),
      provider: 'google',
      fonts: {
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
})
```

## 选项

### provider

- **类型:** `WebFontsProviders`
- **默认:** `google`

Web 字体的提供者服务。

```ts
type WebFontsProviders = 'google' | 'bunny' | 'fontshare' | 'fontsource' | 'coollabs' | 'none'
```

### fonts

- **类型:** `Record<string, WebFontMeta | string | (WebFontMeta | string)[]>`

字体。有关更多详细信息，请参见 [示例](#example)。

```ts
interface WebFontMeta {
  name: string
  weights?: (string | number)[]
  italic?: boolean
  /**
   * 覆盖提供者
   * @default <匹配根配置>
   */
  provider?: WebFontsProviders
}
```

### extendTheme

- **类型:** `boolean`
- **默认:** `true`

扩展主题对象。

### themeKey

- **类型:** `string`
- **默认:** `fontFamily`

主题对象的键。

### inlineImports

- **类型:** `boolean`
- **默认:** `true`

内联 CSS `@import()`。

### customFetch

- **类型:** `(url: string) => Promise<string>`
- **默认:** `undefined`

使用您自己的函数获取字体源。有关更多信息，请参见 [自定义获取函数](#custom-fetch-function)。

## 示例

```ts
presetWebFonts({
  provider: 'google', // 默认提供者
  fonts: {
    // 这些将扩展默认主题
    sans: 'Roboto',
    mono: ['Fira Code', 'Fira Mono:400,700'],
    // 自定义字体
    lobster: 'Lobster',
    lato: [
      {
        name: 'Lato',
        weights: ['400', '700'],
        italic: true,
      },
      {
        name: 'sans-serif',
        provider: 'none',
      },
    ],
  },
})
```

将自动生成以下 CSS：

<!-- eslint-skip -->

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Fira+Code&family=Fira+Mono:wght@400;700&family=Lobster&family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');

/* 层级：默认 */
.font-lato {
  font-family: "Lato", sans-serif;
}
.font-lobster {
  font-family: "Lobster";
}
.font-mono {
  font-family: "Fira Code", "Fira Mono", ui-monospace, SFMono-Regular, Menlo,
    Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.font-sans {
  font-family: "Roboto", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
}
```

## 本地服务字体

默认情况下，预设将从提供者的 CDN 中获取字体。如果您想要在本地提供字体，可以下载字体并使用 `@unocss/preset-web-fonts/local` 中的处理器从您自己的服务器提供它们。

```ts
import presetWebFonts from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Roboto',
        mono: 'Fira Code',
      },
      // 这将下载字体并在本地提供
      processors: createLocalFontProcessor({
        // 缓存字体的目录
        cacheDir: 'node_modules/.cache/unocss/fonts',

        // 保存字体资源的目录
        fontAssetsDir: 'public/assets/fonts',

        // 客户端提供字体的基本 URL
        fontServeBaseUrl: '/assets/fonts',

        // 用于下载字体的自定义 fetch 函数
        fetch: async url => axios.get(url)
      })
    }),
  ],
})
```

这将把字体资源下载到 `public/assets/fonts`，并从客户端的 `/assets/fonts` 提供它们。在执行此操作时，请确保字体的许可证允许您如此重新分发，工具不对任何法律问题负责。

::: info

此功能特定于 Node.js，无法在浏览器中使用。

:::

## 将字体输出到构建产物

在 CI 环境中或首次构建时，下载到 `public` 目录中的字体可能不会在构建完成前复制到 `dist`。为了确保字体始终包含在生产构建中，请将 `onDownload` 回调与自定义 Vite 插件一起使用。

**vite.config.ts**

```ts
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { defineConfig } from 'vite'

const emittedFonts = new Map()

// 1. 创建带有 onDownload 钩子的处理器
export const fontProcessor = createLocalFontProcessor({
  onDownload(filename, buf) {
    emittedFonts.set(filename, buf)
  }
})

export default defineConfig({
  plugins: [
    UnoCSS(),
    // 2. 在构建期间将收集到的字体作为资源输出
    {
      name: 'unocss:font-emit',
      apply: 'build',
      generateBundle() {
        for (const [filename, source] of emittedFonts) {
          this.emitFile({ type: 'asset', fileName: `assets/fonts/${filename}`, source })
        }
        emittedFonts.clear()
      }
    },
  ],
})
```

**uno.config.ts**

```ts
import presetWebFonts from '@unocss/preset-web-fonts'
import { fontProcessor } from './vite.config'

export default defineConfig({
  presets: [
    presetWebFonts({
      provider: 'google',
      fonts: { sans: 'Roboto' },
      processors: [fontProcessor],
    }),
  ],
})
```
