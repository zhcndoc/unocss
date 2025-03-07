---
title: Next.js
description: 开始使用 UnoCSS 和 Next.js。
---

# Next.js

// TODO: 链接到示例

开始使用 UnoCSS 和 Next.js。

## 设置

### 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/webpack
```

```bash [yarn]
yarn add -D unocss @unocss/webpack
```

```bash [npm]
npm install -D unocss @unocss/webpack
```

```bash [bun]
bun add -D unocss @unocss/webpack
```

:::

### 配置

在项目根目录下创建 `uno.config.ts`。

```ts [uno.config.ts]
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetWind3
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    // ...
  ],
})
```

### 添加插件

然后通过 `next.config.js` 将 UnoCSS 添加为 webpack 插件。

```js{9}
// next.config.js
const UnoCSS = require('@unocss/webpack').default

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      UnoCSS(),
    )
    return config
  },
}

module.exports = nextConfig
```

### 导入样式表

然后在 `_app.tsx` 中导入 `uno.css`。

```tsx
import type { AppProps } from 'next/app'
// _app.tsx
import '@unocss/reset/tailwind.css'

import 'uno.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
```

## 用法

使用 unocss 给你的组件添加样式！

```tsx
/* index.tsx */
const Home: NextPage = () => {
  return (
    <>
      <main className="py-20 px-12 text-center flex flex-col items-center gap-20px">
        <span text="blue 5xl hover:red" cursor="default">Nextjs</span>
        <div className="i-carbon-car inline-block" text="4xl" />
        <button className="btn w-10rem">按钮</button>
      </main>
    </>
  )
}
```

## 热模块替换

为了支持 HMR，你需要退出 webpack 的缓存。

```js{5}
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
+   config.cache = false
    config.plugins.push(UnoCSS())
    return config
  }
}
```

## 故障排除

### 与虚拟模块相关的错误

```bash
Error: ENOENT: no such file or directory, open '.../_virtual_/__uno.css'
```

尝试删除 `.next` 目录并重新启动开发服务器。

### 其他

你可能需要将你的目标版本提升到至少 `es2015`，以便构建你的项目。

默认情况下不支持 `.js` 扩展名的文件。将你的文件扩展名更改为 `.jsx` 或尝试用 `include: /\.js$/` 将 js 文件包含在配置中。[了解更多](/guide/extracting#extracting-from-build-tools-pipeline)。
