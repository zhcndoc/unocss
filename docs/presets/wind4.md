---
title: Wind4 预设
description: UnoCSS 的 Tailwind4 CSS 精简预设（@unocss/preset-wind4）。
outline: deep
---

# Wind4 预设

UnoCSS 的 Tailwind4 CSS 精简预设。它与 PresetWind3 的所有功能兼容，并且进一步增强了它。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind4)

::: tip
您可以花一点时间阅读此文档以了解变更。
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-wind4
```

```bash [yarn]
yarn add -D @unocss/preset-wind4
```

```bash [npm]
npm install -D @unocss/preset-wind4
```

```bash [bun]
bun add -D @unocss/preset-wind4
```

:::

```ts twoslash [uno.config.ts]
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    //  ^?
  ],
})
```

## 兼容性

请参考 [Tailwind 兼容性](https://tailwindcss.com/docs/compatibility) 以了解浏览器支持和兼容性。

## 主题

`PresetWind4` 的主题几乎与 `PresetWind3` 的主题相同，但某些主题键已进行了调整。

::: warning
请注意在切换到 PresetWind4 时，参考下表检查您的主题键配置并进行适当调整。
:::

|                                            PresetWind3                                            |                          PresetWind4                          |
| :-----------------------------------------------------------------------------------------------: | :-----------------------------------------------------------: |
|                                           `fontFamily`                                            |                            `font`                             |
|                                            `fontSize`                                             |            移至 `text` 中的 `fontSize` 属性                  |
|                                           `lineHeight`                                            |   移至 `text` 中的 `lineHeight` 属性或使用 `leading`      |
|                                          `letterSpacing`                                          | 移至 `text` 中的 `letterSpacing` 属性或使用 `tracking`    |
|                                          `borderRadius`                                           |                           `radius`                            |
|                                             `easing`                                              |                            `ease`                             |
|                                           `breakpoints`                                           |                         `breakpoint`                          |
|                                       `verticalBreakpoints`                                       |                     `verticalBreakpoint`                      |
|                                            `boxShadow`                                            |                           `shadow`                            |
|                                                 -                                                 |                         `insetShadow`                         |
|     像 `width`, `height`, `maxWidth`, `maxHeight`, `minWidth`, `minHeight` 这样的大小属性          |                   统一为使用 `spacing`                       |
|                                       `transitionProperty`                                        |                          `property`                           |
| `gridAutoColumn`, `gridAutoRow`, `gridColumn`, `gridRow`, `gridTemplateColumn`, `gridTemplateRow` |                               -                               |
|                                       `container.maxWidth`                                        |                     `containers.maxWidth`                     |
|                                                 -                                                 |                          `defaults`                           |

### `Theme.defaults`

`Theme.defaults` 是一个全局默认主题配置，将应用于 `reset` 样式或用作某些规则的默认值。

以下是 `Theme.defaults` 的默认值，您可以在主题配置中覆盖它们。

<details>
<summary>点击查看默认值</summary>

```ts twoslash [uno.config.ts]
import type { Theme } from '@unocss/preset-wind4/theme'

export const defaults: Theme['defaults'] = {
  transition: {
    duration: '150ms',
    timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  font: {
    family: 'var(--font-sans)',
    featureSettings: 'var(--font-sans--font-feature-settings)',
    variationSettings: 'var(--font-sans--font-variation-settings)',
  },
  monoFont: {
    family: 'var(--font-mono)',
    featureSettings: 'var(--font-mono--font-feature-settings)',
    variationSettings: 'var(--font-mono--font-variation-settings)',
  },
}
```

</details>

## 选项

PresetWind4 的基本配置与 [PresetWind3](/presets/wind3#options) 相似，具有以下重要变化。

### 重置样式

在 PresetWind4 中，我们将重置样式与 tailwind4 对齐并在内部集成。您无需安装任何额外的 CSS 重置包，如 `@unocss/reset` 或 `normalize.css`。

```ts [main.ts]
import '@unocss/reset/tailwind.css' // [!code --]
import '@unocss/reset/tailwind-compact.css' // [!code --]
```

您只需通过开关来控制是否启用重置样式：

```ts twoslash [uno.config.ts]
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      reset: true, // [!code focus]
      // ^?
    }),
  ],
})
```

### 工具解析器

在 PresetWind4 中，我们升级了 `postProcess` 钩子，以提供更简洁的 API。现在您可以直接在预设中自定义 `utilities`。

例如，如果您想使用 `presetRemToPx` 预设将 `rem` 转换为 `px`，您不再需要单独导入此预设，因为 `presetWind4` 在内部提供了此功能。

```ts twoslash [uno.config.ts]
import { createRemToPxResolver } from '@unocss/preset-wind4/utils' // [!code focus]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      utilityResolver: createRemToPxResolver() // [!code focus]
    }),
  ],
})
```

您可以自定义更多解析器集来处理 `utilities` 并输出所需的 CSS。

有关具体实现方法，请参考 `postProcess` 或 [presetWind4 测试用例](https://github.com/unocss/unocss/blob/60c15bb78d96704a4532e2bf502efa16125fdceb/test/preset-wind4.test.ts#L178-L232)

### 主题预览

选择如何生成主题 CSS 变量。

安装了 `presetWind4` 的 UnoCSS 引擎将在解析工具时自动收集主题依赖项，并在最后生成 CSS 变量。

- `true`: 完全生成主题键。
- `false`: 禁用主题键。（不推荐 ⚠️）
- `'on-demand'`: 仅在使用时生成主题键。 -> ✅ **（默认）**

## 生成的 CSS

在 PresetWind4 的输出中，添加了两个新层：`theme` 和 `cssvar-property`。

|    层名称     |              描述              |  顺序  |
| :-----------: | :-----------------------------: | :----: |
| `cssvar-property` | 通过 `@property` 定义的 CSS 属性 | -200  |
|      `theme`      |        主题相关的 CSS 变量        | -150  |

### `cssvar-property` 层

我们在许多规则中使用 `@property` 定义 CSS 属性，以实现更好的性能和更小的体积。

例如，常用的工具如 `text-op-xx`、`bg-op-xx` 等。

```css
@property --un-text-opacity {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 100%;
}
```

### `theme` 层

我们把主题相关的 CSS 变量放在 `theme` 层，以便于您覆盖和直接使用。
它可以是全面的或按需生成的，始终来源于您的主题配置。

```css
:root,
:host {
  --spacing: 0.25rem;
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  --colors-black: #000;
  --colors-white: #fff;
  /* ... */
}
```

## 与其他预设的兼容性

`PresetWind4` 增强并与 `PresetWind3` 兼容。由于其他包最初是为 `PresetWind3` 开发的，因此在一起使用时可能会出现一些问题。已知问题包括：

### presetWebFonts

当与 `PresetWind4` 一起使用 `presetWebFonts` 时，`fontFamily` 主题键不再支持。
请进行以下调整：

```ts twoslash [uno.config.ts]
import { defineConfig, presetWebFonts, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetWebFonts({
      themeKey: 'font', // [!code ++]
      // ^?
    }),
  ],
})
```

### presetLegacyCompat

In `presetWind4`, we use the `oklch` color model to support better color contrast and color perception. Therefore, it is not compatible with `presetLegacyCompat` and is **not recommended** for use together.

Please refer to the [Compatibility](#compatibility) section for more information.

### transformDirectives

`transformDirectives` 与 `PresetWind4` 的兼容性不佳。存在一些已知问题，因此请谨慎使用。

::: warning

- 当使用 `@apply` 处理具有 `@property` 的规则时，不同层级之间可能会发生冲突。

:::