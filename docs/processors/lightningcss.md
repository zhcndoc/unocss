---
title: Lightning CSS 处理器
description: 在 Node.js 中使用 Lightning CSS 处理 UnoCSS 生成内容（@unocss/processor-lightningcss）。
outline: deep
---

# Lightning CSS 处理器

`@unocss/processor-lightningcss` 使用 [Lightning CSS](https://lightningcss.dev/) 处理 UnoCSS 生成的各个层。它可以压缩 CSS、编译现代 CSS 语法，并根据浏览器目标添加兼容性转换。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/processor-lightningcss)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/processor-lightningcss
```

```bash [yarn]
yarn add -D @unocss/processor-lightningcss
```

```bash [npm]
npm install -D @unocss/processor-lightningcss
```

```bash [bun]
bun add -D @unocss/processor-lightningcss
```

:::

## 使用

将处理器添加到 UnoCSS 配置中的 [`processors`](/config/processors) 数组：

```ts [uno.config.ts]
import processorLightningCSS from '@unocss/processor-lightningcss'
import { defineConfig } from 'unocss'

export default defineConfig({
  processors: [
    processorLightningCSS({
      targets: {
        chrome: 111 << 16,
        safari: 15 << 16,
      },
    }),
  ],
})
```

UnoCSS 生成每个非空层后会运行此处理器。处理结果可通过 `getLayer()`、`getLayers()` 和生成的 `css` 结果获取。

## 选项

该处理器接受 Lightning CSS 的 [`TransformOptions`](https://github.com/parcel-bundler/lightningcss/blob/master/node/index.d.ts)，但不包括 `code` 和 `filename`。UnoCSS 会为每个生成的层提供这两个值。

当前层名称会用作文件名。例如，`utilities` 层会以 `utilities.css` 的名称传递给 Lightning CSS，便于定位转换错误。

### 压缩

默认情况下，`envMode` 为 `build` 时会启用压缩，为 `dev` 时则会禁用。显式设置 `minify` 可以覆盖此行为：

```ts [uno.config.ts]
processorLightningCSS({
  minify: true,
})
```

### 浏览器目标

使用 `targets` 控制 Lightning CSS 应用哪些兼容性转换：

```ts [uno.config.ts]
processorLightningCSS({
  targets: {
    chrome: 111 << 16,
    firefox: 113 << 16,
    safari: 15 << 16,
  },
})
```

## 仅限 Node.js

此处理器使用 Lightning CSS 的原生 Node.js 构建版本，适用于构建阶段。在 Node.js 之外调用时，UnoCSS 只会发出一次警告，并原样返回 CSS。

## 许可证

- MIT 许可证 &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
