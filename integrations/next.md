---
url: 'https://unocss.zhcndoc.com/integrations/next.md'
description: 开始使用 UnoCSS 和 Next.js。
---

# Next.js

开始使用 UnoCSS 和 Next.js。查看 [示例](https://github.com/unocss/unocss/tree/main/examples/next)。

## 设置

### 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/postcss @unocss/reset
```

```bash [yarn]
yarn add -D unocss @unocss/postcss @unocss/reset
```

```bash [npm]
npm install -D unocss @unocss/postcss @unocss/reset
```

```bash [bun]
bun add -D unocss @unocss/postcss @unocss/reset
```

:::

### 配置

在项目根目录下创建 `uno.config.ts` 或 `uno.config.js`。

::: code-group

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

```js [uno.config.js]
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

:::

在项目根目录下创建 `postcss.config.mjs`。

```js [postcss.config.mjs]
export default {
  plugins: {
    '@unocss/postcss': {
      content: ['./app/**/*.{html,js,ts,jsx,tsx}'],
    },
  },
}
```

### 导入样式表

在 `globals.css` 中添加 `@unocss all;`。

```css [globals.css]
@unocss all;

/* ... */
```

然后在布局文件中导入 `@unocss/reset/tailwind.css`。

::: code-group

```tsx [layout.tsx]
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@unocss/reset/tailwind.css'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '创建 Next 应用',
  description: '由 create next app 生成',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
```

```js [layout.js]
import { Geist, Geist_Mono } from 'next/font/google'
import '@unocss/reset/tailwind.css'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: '创建 Next 应用',
  description: '由 create next app 生成',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

:::

## 使用方法

使用 unocss 给你的组件添加样式！

::: code-group

```tsx [page.tsx]
export default function Home() {
  return (
    <main className="py-20 px-12 text-center flex flex-col items-center gap-20px">
      <span className="text-blue text-5xl text-hover:red cursor-default">Nextjs</span>
      <div className="i-carbon-car inline-block text-4xl" />
      <button className="btn w-10rem">按钮</button>
    </main>
  )
}
```

```js [page.js]
export default function Home() {
  return (
    <main className="py-20 px-12 text-center flex flex-col items-center gap-20px">
      <span className="text-blue text-5xl text-hover:red cursor-default">Nextjs</span>
      <div className="i-carbon-car inline-block text-4xl" />
      <button className="btn w-10rem">按钮</button>
    </main>
  )
}
```

:::

## 许可证

* MIT 许可证 © 2021-至今 [Anthony Fu](https://github.com/antfu)
