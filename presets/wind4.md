---
url: 'https://unocss.zhcndoc.com/presets/wind4.md'
description: 用于 UnoCSS 的 Tailwind4 CSS 紧凑预设（@unocss/preset-wind4）。
---

# Wind4 预设

用于 UnoCSS 的 Tailwind4 CSS 紧凑预设。它与 PresetWind3 的所有功能兼容，并进一步增强。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind4)

::: tip
您可以花一点时间阅读本文档以了解更改
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
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    //  ^?
  ],
})
```

## 兼容性

请参考 [Tailwind 兼容性](https://tailwindcss.com/docs/compatibility) 了解浏览器支持和兼容性。

## 主题

`PresetWind4` 的主题几乎与 `PresetWind3` 的主题相同，但某些主题键已进行了调整。

::: warning
请注意在切换到 PresetWind4 时，参阅下表检查您的主题键配置并进行适当的调整。
:::

|                                            PresetWind3                                            |                          PresetWind4                          |
| :-----------------------------------------------------------------------------------------------: | :-----------------------------------------------------------: |
|                                           `fontFamily`                                            |                            `font`                             |
|                                            `fontSize`                                             |            移至 `text` 中的 `fontSize` 属性                    |
|                                           `lineHeight`                                            |   移至 `text` 中的 `lineHeight` 属性或使用 `leading`         |
|                                          `letterSpacing`                                          | 移至 `text` 中的 `letterSpacing` 属性或使用 `tracking`      |
|                                          `borderRadius`                                           |                           `radius`                            |
|                                             `easing`                                              |                            `ease`                             |
|                                           `breakpoints`                                           |                         `breakpoint`                          |
|                                       `verticalBreakpoints`                                       |                     `verticalBreakpoint`                      |
|                                            `boxShadow`                                            |                           `shadow`                            |
|                                                 -                                                 |                         `insetShadow`                         |
|     像 `width`, `height`, `maxWidth`, `maxHeight`, `minWidth`, `minHeight` 这样的尺寸属性      |                   统一为使用 `spacing`                        |
|                                       `transitionProperty`                                        |                          `property`                           |
| `gridAutoColumn`, `gridAutoRow`, `gridColumn`, `gridRow`, `gridTemplateColumn`, `gridTemplateRow` |                               -                               |
|                                       `container.maxWidth`                                        |                     `containers.maxWidth`                     |
|                                                 -                                                 |                          `defaults`                           |

### `Theme.defaults`

`Theme.defaults` 是一个全局默认主题配置，将应用于 `reset` 样式或作为某些规则的默认值。

以下是 `Theme.defaults` 的默认值，您可以在主题配置中覆盖它们。

```ts twoslash [uno.config.ts]
import type { Theme } from '@unocss/preset-wind4/theme'

export const defaults: Theme['default'] = {
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

## 选项

PresetWind4 的基本配置与 [PresetWind3](/presets/wind3#options) 类似，但有以下重要更改。

### Preflights

我们在 `PresetWind4` 中添加了 `preflights` 配置选项，以控制是否启用预设样式。

#### Reset

在 PresetWind4 中，我们使重置样式与 tailwind4 对齐并进行了内部集成。您无需安装任何额外的 CSS 重置包，如 `@unocss/reset` 或 `normalize.css`。

```ts [main.ts]
import '@unocss/reset/tailwind.css' // [!code --]
import '@unocss/reset/tailwind-compat.css' // [!code --]
```

您只需通过开关控制是否启用重置样式：

```ts twoslash [uno.config.ts]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { // [!code ++]
        reset: true, // [!code ++]
      } // [!code ++]
    }),
  ],
})
```

#### 主题

选择如何生成主题 CSS 变量。

##### 模式

安装了 `presetWind4` 的 UnoCSS 引擎会在解析工具时自动收集主题的依赖关系，并在最后生成 CSS 变量。

* `true`: 完全生成主题键。
* `false`: 禁用主题键。 (不推荐 ⚠️)
* `'on-demand'`: 仅在使用时生成主题键。-> ✅ **(默认)**

```ts twoslash [uno.config.ts]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { // [!code ++]
        theme: true, // [!code ++]
      }, // [!code ++]
    }),
  ],
})
```

##### 处理

您可以进一步控制主题变量的输出。例如，如果您想将 `rem` 转换为 `px` 的主题变量，我们提供了 `createRemToPxProcessor` 函数来处理您的主题变量。

```ts twoslash [uno.config.ts]
import { createRemToPxProcessor } from '@unocss/preset-wind4/utils' // [!code ++]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { // [!code ++]
        theme: { // [!code ++]
          mode: 'on-demand', // 默认为 'on-demand' // [!code ++]
          process: createRemToPxProcessor(), // [!code ++]
        } // [!code ++]
      }, // [!code ++]
    }),
  ],
})
```

顺便说一下，如果您想使用 `presetRemToPx` 预设将 `rem` 转换为 `px`，您不再需要单独导入这个预设，因为 `presetWind4` 已经在内部提供了这个功能。

```ts twoslash [uno.config.ts]
import { createRemToPxProcessor } from '@unocss/preset-wind4/utils' // [!code ++]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { // [!code ++]
        theme: { // [!code ++]
          process: createRemToPxProcessor(), // [!code ++]
        } // [!code ++]
      }, // [!code ++]
    }),
  ],
  postprocess: [createRemToPxProcessor()], // [!code ++]
})
```

#### 属性

控制在 `properties` 层中生成 `@property` CSS 规则。

默认情况下，PresetWind4 使用 `@property` 来定义 CSS 自定义属性，以实现更好的浏览器优化。这些属性会根据你对工具类的使用自动生成，并包裹在 `@supports` 查询中，以实现渐进增强。

```ts twoslash [uno.config.ts]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        property: true, // Enable (default) | `false` to disable [!code ++]
      },
    }),
  ],
})
```

##### 父级和选择器

您可以自定义父级包装器和选择器：

```ts twoslash [uno.config.ts]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        property: {
          // Custom parent selector (e.g., use @layer instead of @supports)
          parent: '@layer custom-properties',
          // Custom selector for applying properties
          selector: ':where(*, ::before, ::after)',
        },
      },
    }),
  ],
})
```

如果你不想要 `@supports` 包裹，并希望属性被直接应用：

```ts twoslash [uno.config.ts]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        property: {
          parent: false, // No parent wrapper
        },
      },
    }),
  ],
})
```

**默认输出：**

```css
@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or
  ((-moz-orient: inline) and (not (color: rgb(from red r g b)))) {
  *,
  ::before,
  ::after,
  ::backdrop {
    --un-text-opacity: 100%;
    /* ... */
  }
}
```

**使用 `parent: false`：**

```css
*,
::before,
::after,
::backdrop {
  --un-text-opacity: 100%;
  /* ... */
}
```

## 生成的 CSS

在 PresetWind4 的输出中，新增了三个层：`base`、`theme` 和 `properties`。

|  层名称  |              描述              | 顺序 |
| :----------: | :-----------------------------------: | :---: |
| `properties` | 由 `@property` 定义的 CSS 属性 | -200  |
|   `theme`    |      主题相关的 CSS 变量      | -150  |
|    `base`    |      基础预设/重置样式       | -100  |

### `properties` 层

我们在许多规则中使用 `@property` 来定义 CSS 属性，以实现更好的性能和更小的体积。

例如，常用的实用程序如 `text-op-xx`、`bg-op-xx` 等。

```css
@property --un-text-opacity {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 100%;
}
```

### `theme` 层

我们将与主题相关的 CSS 变量放在 `theme` 层中，以便您更容易覆盖和直接使用。
它可以是全面的或按需的。它始终来自您的主题配置。

::: info
生成的键名称可能与 `Tailwind4` 的不完全相同。我们尽量避免在主题中对键名称进行重大更改，以尊重从 `presetWind3` 迁移的用户。
您还可以在 [Preflights 主题处理](#process) 中自定义想要的输出。
:::

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

`PresetWind4` 在增强和兼容 `PresetWind3` 的基础上进行。由于其他包最初是为 `PresetWind3` 开发的，在一起使用时可能会出现一些问题。已知问题包括：

### presetRemToPx

在 `PresetWind4` 中，不再需要 `presetRemToPx`，因为它已在内部包含。您可以将其从配置中删除。

请参阅选项中的 [`process`](#process) 选项。

### presetLegacyCompat

在 `presetWind4` 中，我们使用 `oklch` 颜色模型以支持更好的颜色对比和颜色感知。因此，它与 `presetLegacyCompat` 不兼容，不推荐一起使用。

请参阅 [兼容性](#compatibility) 部分以获取更多信息。
