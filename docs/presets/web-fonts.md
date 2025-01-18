---
title: 网络字体预设
description: UnoCSS 的网络字体支持（@unocss/preset-web-fonts）。
outline: deep
---

# 网络字体预设

通过简单提供字体名称来使用来自 [Google Fonts](https://fonts.google.com/) 和 [FontShare](https://www.fontshare.com/) 的网络字体。

查看 [所有支持的提供商](#providers)。

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

:::

```ts [uno.config.ts]
import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({ /* options */ }),
  ],
})
```

::: tip
此预设已包含在 `unocss` 包中，您也可以从那里导入：

```ts
import { presetWebFonts } from 'unocss'
```

:::

## 提供商

当前支持的提供商：

- `none` - 不执行操作，将字体视为系统字体
- `google` - [Google Fonts](https://fonts.google.com/)
- `bunny` - [隐私友好的 Google Fonts](https://fonts.bunny.net/)
- `fontshare` - [ITF 提供的高质量字体服务](https://www.fontshare.com/)

::: info
欢迎提出 PR 以添加更多提供商。🙌
:::

### 自定义获取函数

使用您自己的函数来获取字体源。

```ts [uno.config.ts]
import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'
import axios from 'axios'
import ProxyAgent from 'proxy-agent'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
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

- **类型：** `WebFontsProviders`
- **默认值：** `google`

网络字体的提供商服务。

```ts
type WebFontsProviders = 'google' | 'bunny' | 'fontshare' | 'none'
```

### fonts

- **类型：** `Record<string, WebFontMeta | string | (WebFontMeta | string)[]>`

字体。有关更多详细信息，请参见 [示例](#example)。

```ts
interface WebFontMeta {
  name: string
  weights?: (string | number)[]
  italic?: boolean
  /**
   * 覆盖提供商
   * @default <匹配根配置>
   */
  provider?: WebFontsProviders
}
```

### extendTheme

- **类型：** `boolean`
- **默认值：** `true`

扩展主题对象。

### themeKey

- **类型：** `string`
- **默认值：** `fontFamily`

主题对象的键。

### inlineImports

- **类型：** `boolean`
- **默认值：** `true`

内联 CSS `@import()`。

### customFetch

- **类型：** `(url: string) => Promise<string>`
- **默认值：** `undefined`

使用您自己的函数获取字体源。请参见 [自定义获取函数](#custom-fetch-function)。

## 示例

```ts
presetWebFonts({
  provider: 'google', // 默认提供商
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

/* layer: default */
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

## 本地提供字体

默认情况下，预设将从提供商的 CDN 中获取字体。如果您想本地提供字体，可以下载字体并使用来自 `@unocss/preset-web-fonts/local` 的处理器在自己的服务器上提供它们。

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

        // 保存字体资产的目录
        fontAssetsDir: 'public/assets/fonts',

        // 为客户端提供字体的基本 URL
        fontServeBaseUrl: '/assets/fonts'
      })
    }),
  ],
})
```

这将把字体资产下载到 `public/assets/fonts` 并通过 `/assets/fonts` 从客户端提供它们。在这样做时，请确保字体的许可证允许您重新分发，因此该工具对此没有任何法律责任。

::: info

此功能特定于 Node.js，无法在浏览器中使用。

:::
