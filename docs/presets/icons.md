---
title: 图标预设
description: 使用纯 CSS 在 UnoCSS 中使用任何图标 (@unocss/preset-icons)。
outline: deep
---

<script setup>
const toggleDark = () => {
  document.querySelector('.VPSwitchAppearance')?.click()
}
</script>

# 图标预设

使用纯 CSS 在 UnoCSS 中使用任何图标。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons)

::: tip
推荐阅读：[纯 CSS 中的图标](https://antfu.me/posts/icons-in-pure-css)
:::

遵循以下约定以使用图标

- `<prefix><collection>-<icon>`
- `<prefix><collection>:<icon>`

例如：

```html
<!-- 来自 Phosphor 图标的基本锚点图标 -->
<div class="i-ph-anchor-simple-thin" />
<!-- 来自 Material Design 图标的橙色警报 -->
<div class="i-mdi-alarm text-orange-400" />
<!-- 大型 Vue 徽标 -->
<div class="i-logos-vue text-3xl" />
<!-- 光模式下的太阳，暗模式下的月亮，来自 Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- 微笑的 Twemoji，悬停时变成流泪 -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
```

<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-ph:anchor-simple-thin" />
  <div class="i-mdi:alarm text-orange-400 hover:text-teal-400" />
  <div class="w-2em h-2em i-logos:vue transform transition-800 hover:rotate-180" />
  <button class="i-carbon:sun dark:i-carbon:moon !w-2em !h-2em" @click="toggleDark()" title="切换暗模式"/>
  <div class="i-twemoji:grinning-face-with-smiling-eyes hover:i-twemoji:face-with-tears-of-joy" />
  <div class="text-base my-auto flex"><div class="i-carbon:arrow-left my-auto mr-1" /> 悬停它</div>
</div>

检查 [所有可用图标](https://icones.js.org/)。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-icons @iconify-json/[你想要的集合]
```

```bash [yarn]
yarn add -D @unocss/preset-icons @iconify-json/[你想要的集合]
```

```bash [npm]
npm install -D @unocss/preset-icons @iconify-json/[你想要的集合]
```

```bash [bun]
bun add -D @unocss/preset-icons @iconify-json/[你想要的集合]
```

:::

我们使用 [Iconify](https://iconify.design) 作为我们的图标数据源。你需要通过遵循 `@iconify-json/*` 模式在 `devDependencies` 中安装相应的图标集。例如，使用 `@iconify-json/mdi` 来获取 [Material Design Icons](https://materialdesignicons.com/)，使用 `@iconify-json/tabler` 来获取 [Tabler](https://tabler-icons.io/)。你可以参考 [Icônes](https://icones.js.org/) 或 [Iconify](https://icon-sets.iconify.design/) 获取所有可用的集合。

```ts [uno.config.ts]
import presetIcons from '@unocss/preset-icons'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({ /* 选项 */ }),
    // ...其他预设
  ],
})
```

::: tip
这个预设包含在 `unocss` 包中，你也可以从那里导入它：

```ts
import { presetIcons } from 'unocss'
```

:::

::: info
你也可以单独使用这个预设来补充你现有的 UI 框架，以获得纯 CSS 图标！
:::

如果你希望一次安装 Iconify 上所有可用的图标集（~130MB）：

::: code-group

```bash [pnpm]
pnpm add -D @iconify/json
```

```bash [yarn]
yarn add -D @iconify/json
```

```bash [npm]
npm install -D @iconify/json
```

```bash [bun]
bun add -D @iconify/json
```

:::

### 额外属性

你可以提供额外的 CSS 属性来控制图标的默认行为。以下是将图标默认设置为内联的示例：

```ts
presetIcons({
  extraProperties: {
    'display': 'inline-block',
    'vertical-align': 'middle',
    // ...
  },
})
```

## 模式覆盖

默认情况下，此预设将根据图标的特性自动选择每个图标的渲染模式。你可以在这篇 [博客文章](https://antfu.me/posts/icons-in-pure-css) 中了解更多。在某些情况下，你可能希望显式设置每个图标的渲染模式。

- `?bg` 表示 `background-img` - 将图标渲染为背景图像
- `?mask` 表示 `mask` - 将图标渲染为蒙版图像

例如，`vscode-icons:file-type-light-pnpm` 是一个带有颜色的图标（`svg` 不包含 `currentColor`），将作为背景图像渲染。使用 `vscode-icons:file-type-light-pnpm?mask` 来将其渲染为蒙版图像并忽略其颜色。

```html
<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-vscode-icons:file-type-light-pnpm" />
  <div class="i-vscode-icons:file-type-light-pnpm?mask text-red-300" />
</div>
```

<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-vscode-icons:file-type-light-pnpm" />
  <div class="i-vscode-icons:file-type-light-pnpm?mask text-red-300" />
</div>

## 配置集合和图标解析器

你可以通过 `@iconify-json/[你想要的集合]`、`@iconify/json` 或使用自定义的图标解析器，通过在 `UnoCSS` 配置中的 `collections` 选项提供集合。

### 浏览器

要加载 `iconify` 集合，你应该使用 `@iconify-json/[你想要的集合]` 而不是 `@iconify/json` 因为 `json` 文件非常大。

#### 打包工具

使用打包工具时，可以通过 `动态导入` 提供集合，这样它们将作为异步块进行打包并按需加载。

```ts
import presetIcons from '@unocss/preset-icons/browser'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        logos: () => import('@iconify-json/logos/icons.json').then(i => i.default),
      }
    })
  ]
})
```

#### CDN

或者，如果你更愿意从 CDN 获取它们，你可以指定 `cdn` 选项，自 v0.32.10 版本开始。我们推荐使用 [esm.sh](https://esm.sh/) 作为 CDN 供应商。

```ts
presetIcons({
  cdn: 'https://esm.sh/'
})
```

#### 自定义

你还可以使用 [CustomIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L17) 或 [InlineCollection](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L86) 提供你自己的自定义集合，例如使用 `InlineCollection`：

```ts
presetIcons({
  collections: {
    custom: {
      circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
      /* ... */
    },
    carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default as any),
    /* ... */
  }
})
```

然后，你可以在你的 HTML 中使用它：`<span class="i-custom:circle"></span>`

### Node.js

在 `Node.js` 中，该预设会自动搜索已安装的 iconify 数据集，因此你无需注册 `iconify` 集合。

你也可以使用 [CustomIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L24) 或 [InlineCollection](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L100) 提供你自己的自定义集合。

#### FileSystemIconLoader

此外，你还可以使用 [FileSystemIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/node-loaders.ts#L9) 从文件系统加载自定义图标。你需要将 `@iconify/utils` 包安装为开发依赖。

```ts [unocss.config.ts]
import fs from 'node:fs/promises'
// 加载器助手
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        // key 作为集合名称
        'my-icons': {
          account: '<svg><!-- ... --></svg>',
          // 懒加载你的自定义图标
          settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
          /* ... */
        },
        'my-other-icons': async (iconName) => {
          // 你的自定义加载器。随你所愿。
          // 例如，从远程服务器获取：
          return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
        },
        // 从文件系统加载图标的助手
        // `./assets/icons` 目录下的文件将作为其文件名加载，且仅限 `.svg` 扩展名
        // 你也可以提供一个转换回调来更改每个图标（可选）
        'my-yet-other-icons': FileSystemIconLoader(
          './assets/icons',
          svg => svg.replace(/#fff/, 'currentColor')
        )
      }
    })
  ]
})
```

#### ExternalPackageIconLoader

从 `@iconify/utils v2.1.20` 开始，你可以使用其他包通过新的 [createExternalPackageIconLoader](https://github.com/iconify/iconify/blob/main/packages/utils/src/loader/external-pkg.ts#L13) 助手从其他作者加载图标。

::: warning 警告
外部包必须包含 `icons.json` 文件，并将图标数据以 `IconifyJSON` 格式保存，具体可使用 Iconify Tools 导出。详细信息请查看 [导出图标集为 JSON 包](https://iconify.design/docs/libraries/tools/export/json-package.html)。
:::

例如，你可以使用 `an-awesome-collection` 或 `@my-awesome-collections/some-collection` 加载你的自定义或第三方图标：

```ts [unocss.config.ts]
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: createExternalPackageIconLoader('an-awesome-collection')
    })
  ]
})
```

你还可以将其与其他自定义图标加载器结合使用，例如：

```ts [unocss.config.ts]
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons } from 'unocss'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        ...createExternalPackageIconLoader('other-awesome-collection'),
        ...createExternalPackageIconLoader('@my-awesome-collections/some-collection'),
        ...createExternalPackageIconLoader('@my-awesome-collections/some-other-collection'),
        'my-yet-other-icons': FileSystemIconLoader(
          './assets/icons',
          svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      }
    })
  ]
})
```

## 图标自定义

你可以使用 `customizations` 配置选项自定义所有图标。

可用的自定义函数：

- `transform`: 转换原始 `svg`，仅在使用 `custom` 图标集合时应用（不包括 iconify 集合）。
- `customize`: 更改默认图标自定义值。
- `iconCustomizer`: 更改默认图标自定义值。

对每个加载的图标，自定义将按此顺序应用：

- 如果提供了 `transform`，则对原始 `svg` 应用转换（使用自定义图标集合时）
- 如果提供了 `customize`，则使用默认自定义值
- 如果提供了 `iconCustomizer`，则使用 `customize` 自定义值

### 全局自定义图标转换

加载自定义图标时，你可以对其进行转换，例如添加 `fill` 属性并设置为 `currentColor`：

```ts
presetIcons({
  customizations: {
    transform(svg) {
      return svg.replace(/#fff/, 'currentColor')
    }
  }
})
```

从版本 `0.30.8` 开始，`transform` 提供 `collection` 和 `icon` 名称：

```ts
presetIcons({
  customizations: {
    transform(svg, collection, icon) {
      // 不对该集合中的此图标应用填充
      if (collection === 'custom' && icon === 'my-icon')
        return svg
      return svg.replace(/#fff/, 'currentColor')
    }
  }
})
```

### 全局图标自定义

在加载任何图标时，你可以为所有图标自定义通用属性，例如配置相同的大小：

```ts
presetIcons({
  customizations: {
    customize(props) {
      props.width = '2em'
      props.height = '2em'
      return props
    }
  }
})
```

### 图标/集合自定义

你可以使用 `iconCustomizer` 配置选项自定义每个图标。

`iconCustomizer` 将优先于配置。

`iconCustomizer` 将应用于任何集合，即从自定义加载器、在自定义集合中的内联图标或来自 `@iconify` 的图标。

例如，你可以配置 `iconCustomizer` 来更改一个集合中的所有图标或集合中的个别图标：

```ts
presetIcons({
  customizations: {
    iconCustomizer(collection, icon, props) {
      // 自定义此集合中的所有图标
      if (collection === 'my-other-icons') {
        props.width = '4em'
        props.height = '4em'
      }
      // 自定义此集合中的此图标
      if (collection === 'my-icons' && icon === 'account') {
        props.width = '6em'
        props.height = '6em'
      }
      // 自定义此集合中的此 @iconify 图标
      if (collection === 'mdi' && icon === 'account') {
        props.width = '2em'
        props.height = '2em'
      }
    }
  }
})
```

## 指令

你可以在 CSS 中使用 `icon()` 指令获取图标的元数据。

```css
.icon {
  background-image: icon('i-carbon-sun');
}
```

::: warning
`icon()` 依赖于 `@unocss/preset-icons`，并将使用配置，确保你已添加该预设。
:::

关于 `icon()` 指令的更多信息，请查看 [指令](/transformers/directives#icon)。

## 选项

### scale

- 类型：`number`
- 默认值：`1`

与当前字体大小 (1em) 相关的缩放值。

### mode

- 类型：`'mask' | 'bg' | 'auto'`
- 默认值：`'auto'`
- 参见：https://antfu.me/posts/icons-in-pure-css

生成的 CSS 图标的模式。

:::tip

- `mask` - 使用背景颜色和 `mask` 属性适用于单色图标
- `bg` - 使用背景图像作为图标，颜色是静态的
- `auto` - 根据每个图标的样式智能地决定 `mask` 和 `bg` 模式

:::

### prefix

- 类型：`string | string[]`
- 默认值：`'i-'`

匹配图标规则的类前缀。

### extraProperties

- 类型：`Record<string, string>`
- 默认值：`{}`

应用于生成 CSS 的额外 CSS 属性。

### warn

- 类型：`boolean`
- 默认值：`false`

在缺少匹配图标时发出警告。

### iconifyCollectionsNames

- 类型：`string[]`
- 默认值：`undefined`

要使用的额外 `@iconify-json` 集合。此选项应在新 `@iconify-json` 集合未列入默认图标预设集合名称时使用。

### collections

- 类型：`Record<string, (() => Awaitable<IconifyJSON>) | undefined | CustomIconLoader | InlineCollection>`
- 默认值：`undefined`

在 Node.js 环境中，预设将自动搜索已安装的 iconify 数据集。在浏览器中使用时，此选项用于提供具有自定义加载机制的数据集。

### layer

- 类型：`string`
- 默认值：`'icons'`

规则层。

### customizations

- 类型：`Omit<IconCustomizations, 'additionalProps' | 'trimCustomSvg'>`
- 默认值：`undefined`

自定义图标自定义。

### autoInstall

- 类型：`boolean`
- 默认值：`false`

当检测到使用时自动安装图标源包。

:::warning
仅在 `node` 环境中使用，浏览器中将忽略此选项。
:::

### unit

- 类型：`string`
- 默认值：`'em'`

自定义图标单位。

### cdn

- 类型：`string`
- 默认值：`undefined`

从 CDN 加载图标。应以 `https://` 开头并以 `/` 结尾。

推荐：

- `https://esm.sh/`
- `https://cdn.skypack.dev/`

### customFetch

- 类型：`(url: string) => Promise<any>`
- 默认值：`undefined`

预设使用 [`ofetch`](https://github.com/unjs/ofetch) 作为默认获取器，你也可以自定义获取函数来提供图标数据。

### processor

- 类型：`(cssObject: CSSObject, meta: Required<IconMeta>) => void`
- 默认值：`undefined`

```ts
interface IconMeta {
  collection: string
  icon: string
  svg: string
  mode?: IconsOptions['mode']
}
```

在字符串化之前处理 CSS 对象。参见 [示例](https://github.com/unocss/unocss/blob/7d83789b0dee8c72c401db24263ea429086de95d/test/preset-icons.test.ts#L66-L82)。

## 高级自定义图标集清理

使用此预设与自定义图标时，请考虑进行类似于 [Iconify](https://iconify.design/) 对任何图标集进行的清理过程。你所需的所有工具都可以在 [Iconify Tools](https://iconify.design/docs/libraries/tools/) 中找到。

你可以查看这个仓库，使用此预设在 `Vue 3` 项目中的例子：[@iconify/tools/@iconify-demo/unocss](https://github.com/iconify/tools/tree/main/%40iconify-demo/unocss)。

阅读 [清理图标](https://iconify.design/docs/articles/cleaning-up-icons/) 文章以获取更多详细信息。

## 可访问性问题

使用图标时，重要的是考虑到所有潜在用户。其中一些用户可能正在使用屏幕阅读器，他们需要替代文本以理解图标的含义。你可以使用 `aria-label` 属性提供图标的描述：

```html
<a href="/profile" aria-label="个人资料" class="i-ph:user-duotone"></a>
```

如果图标纯粹是装饰性的，并且不需要替代文本，你可以使用 `aria-hidden="true"` 将其隐藏以避免屏幕阅读器读取：

```html
<a href="/profile">
  <span aria-hidden="true" class="i-ph:user-duotone"></span>
  我的个人资料
</a>
```

还有许多其他技术可以为屏幕阅读器提供提示文本，例如， [Wind3 预设](./wind3) 包含 [sr-only](/interactive/?s=sr-only)，隐藏元素以视觉上不可见但对屏幕阅读器可访问。

你可以在网上找到一些关于图标可访问性的良好资源，并且 CSS 图标的行为类似于图标字体，因此你可以使用与图标字体相同的技术。

## 鸣谢

- 此预设的灵感来自由 [@husayt](https://github.com/husayt) 创建的 [此问题](https://github.com/antfu/unplugin-icons/issues/88)。
- 基于 [@userquin](https://github.com/userquin) 在 [此 PR](https://github.com/antfu/unplugin-icons/pull/90) 中的工作。
