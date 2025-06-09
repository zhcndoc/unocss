---
title: UnoCSS PostCSS 插件
outline: deep
---

# PostCSS 插件

UnoCSS 的 PostCSS 插件。支持 `@apply`、`@screen` 和 `theme()` 指令。

[源代码](https://github.com/unocss/unocss/tree/main/packages-integrations/postcss)

::: warning
此包目前处于实验状态。它不遵循语义版本控制，并且可能在补丁版本中引入破坏性更改。
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/postcss
```

```bash [yarn]
yarn add -D unocss @unocss/postcss
```

```bash [npm]
npm install -D unocss @unocss/postcss
```

```bash [bun]
bun add -D unocss @unocss/postcss
```

:::

```ts [postcss.config.mjs]
import UnoCSS from '@unocss/postcss'

export default {
  plugins: [
    UnoCSS(),
  ],
}
```

```ts [uno.config.ts]
import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      '**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
    ],
  },
  presets: [
    presetWind3(),
  ],
})
```

```css [style.css]
@unocss;
```

## 使用

### `@unocss`

`@unocss` 属性是一个占位符。它将被生成的 CSS 替换。

您也可以单独注入每一层：

```css [style.css]
@unocss preflights;
@unocss default;

/*
  回退层。建议始终包括。
  只有未使用的层会在这里注入。
*/
@unocss;
```

如果您想要包含所有层，无论它们之前是否被包含过，可以使用 `@unocss all`。如果您想在多个文件中包含生成的 CSS，这很有用。

```css
@unocss all;
```

或者，如果您想排除特定层，可以使用 `@unocss !<layer>` 指令：

```css
@unocss !preflights, !<other-layer>;
```

### `@apply`

```css
.custom-div {
  @apply text-center my-0 font-medium;
}
```

将被转换为：

```css
.custom-div {
  margin-top: 0rem;
  margin-bottom: 0rem;
  text-align: center;
  font-weight: 500;
}
```

### `@screen`

`@screen` 指令允许您创建媒体查询，按名称引用您的断点，这些名称来自 [`theme.breakpoints`](https://github.com/unocss/unocss/blob/main/README.md#extend-theme)。

```css
.grid {
  @apply grid grid-cols-2;
}
@screen xs {
  .grid {
    @apply grid-cols-1;
  }
}
@screen sm {
  .grid {
    @apply grid-cols-3;
  }
}
/* ... */
```

将被转换为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (min-width: 320px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
/* ... */
```

#### 断点变体支持

`@screen` 还支持 `lt`、`at` 变体

##### `@screen lt`

```css
.grid {
  @apply grid grid-cols-2;
}
@screen lt-xs {
  .grid {
    @apply grid-cols-1;
  }
}
@screen lt-sm {
  .grid {
    @apply grid-cols-3;
  }
}
/* ... */
```

将被转换为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (max-width: 319.9px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (max-width: 639.9px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
/* ... */
```

##### `@screen at`

```css
.grid {
  @apply grid grid-cols-2;
}
@screen at-xs {
  .grid {
    @apply grid-cols-1;
  }
}
@screen at-xl {
  .grid {
    @apply grid-cols-3;
  }
}
@screen at-xxl {
  .grid {
    @apply grid-cols-4;
  }
}
/* ... */
```

将被转换为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (min-width: 320px) and (max-width: 639.9px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (min-width: 1280px) and (max-width: 1535.9px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1536px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
/* ... */
```

### `theme()`

使用 `theme()` 函数通过点号访问您的主题配置值。

```css
.btn-blue {
  background-color: theme('colors.blue.500');
}
```

将被编译为：

```css
.btn-blue {
  background-color: #3b82f6;
}
```
