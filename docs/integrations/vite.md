---
title: UnoCSS Vite 插件
description: UnoCSS 的 Vite 插件 (@unocss/vite)。
outline: deep
---

<script setup lang="ts">
import { examples } from '../.vitepress/content'

const playgrounds = examples.reduce((acc, cur) => {
  acc[cur.name] = cur
  return acc
}, {})
</script>

# Vite 插件

Vite 插件随 `unocss` 包一起提供。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss
```

```bash [yarn]
yarn add -D unocss
```

```bash [npm]
npm install -D unocss
```

```bash [bun]
bun add -D unocss
```

:::

安装插件：

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
```

创建一个 `uno.config.ts` 文件：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 选项
})
```

在你的主入口中添加 `virtual:uno.css`：

```ts [main.ts]
import 'virtual:uno.css'
```

## 模式

Vite 插件提供了一组模式以启用不同的行为。

### `global`（默认）

这是插件的默认模式：在此模式下，你需要在入口点添加 `uno.css` 的导入。

此模式启用了一组 Vite 插件用于 `build` 和 `dev`，并支持 `HMR`。

生成的 `css` 将是注入到 `index.html` 的全局样式表。

### `vue-scoped`

此模式将生成的 CSS 注入到 Vue 单文件组件的 `<style scoped>` 中以实现隔离。

### `svelte-scoped`

`svelte-scoped` 模式已被移至其自己的包中，查看 [@unocss/svelte-scoped/vite](/integrations/svelte-scoped)。

### `shadow-dom`

由于 `Web Components` 使用 `Shadow DOM`，无法直接从全局样式表为内容设定样式（除非你使用 `CSS 自定义属性`，这些属性将渗透到 `Shadow DOM` 中），你需要将插件生成的 CSS 内联到 `Shadow DOM` 样式中。

要内联生成的 CSS，你只需将插件模式配置为 `shadow-dom` 并在每个 Web 组件样式 CSS 块中包含 `@unocss-placeholder` 魔法占位符。如果你在 Vue 单文件组件中定义 Web 组件，并希望在 UnoCSS 旁边定义自定义样式，你可以将占位符包裹在 CSS 注释中，以避免你 IDE 中的语法错误。

### `per-module`（实验性）

此模式将为每个模块生成一个 CSS 表，可以是 scoped。

### `dist-chunk`（实验性）

此模式将在构建时为每个代码块生成一个 CSS 表，适用于 MPA。

## 在开发者工具中编辑类

因为 "按需" 的限制，开发者工具不知道你尚未在源代码中使用的类。因此，如果你想通过直接更改开发者工具中的类来尝试功能，只需在主入口中添加以下行。

```ts
import 'uno.css'
import 'virtual:unocss-devtools'
```

::: warning
请谨慎使用，在底层我们使用 [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) 来检测类的变化。这意味着不仅你手动的更改，但也由你的脚本进行的更改将被检测并包含在样式表中。当你根据某些逻辑在脚本标签中添加动态类时，这可能导致开发版和生产构建之间的某些不一致性。如果可能的话，我们建议将你的动态部分添加到 [safelist](https://github.com/unocss/unocss/issues/511) 或为你的生产构建设置 UI 回归测试。
:::

## 框架

一些 UI/App 框架有一些注意事项，必须解决才能使其正常工作，如果你使用以下框架之一，只需应用建议。

### VanillaJS / TypeScript

使用 VanillaJS 或 TypeScript 时，你需要添加 `js` 和 `ts` 文件扩展名，以允许 UnoCSS 阅读和解析内容，默认情况下 `js` 和 `ts` 文件被排除，查看 [从构建工具管道提取](/guide/extracting#extracting-from-build-tools-pipeline) 部分。

### React

如果你正在使用 `@vitejs/plugin-react`：

```ts [vite.config.ts]
import React from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    React(),
    UnoCSS(),
  ],
}
```

如果你正在使用 `@unocss/preset-attributify`，你应该从 `build` 脚本中删除 `tsc`。

如果你正在使用 `babel-plugin-react-compiler`，或者在使用 `@vitejs/plugin-react` 搭配 `@unocss/preset-attributify`，你必须在 `@vitejs/plugin-react` 之前添加该插件。

```ts [vite.config.ts]
import React from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    React(),
  ],
}
```

你可以在 [examples/vite-react](https://github.com/unocss/unocss/tree/main/examples/vite-react) 目录中查看一个使用这两个插件的 `React` 示例项目，查看 `package.json` 中的脚本和其 Vite 配置文件。

<ContentExample :item="playgrounds['vite-react']"  class="Link" integrations />

### Preact

如果你正在使用 `@preact/preset-vite`：

```ts [vite.config.ts]
import Preact from '@preact/preset-vite'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    Preact(),
  ],
}
```

或者如果你正在使用 `@prefresh/vite`：

```ts [vite.config.ts]
import Prefresh from '@prefresh/vite'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    Prefresh(),
  ],
}
```

如果你正在使用 `@unocss/preset-attributify`，你应该从 `build` 脚本中删除 `tsc`。

你可以在 [examples/vite-preact](https://github.com/unocss/unocss/tree/main/examples/vite-preact) 目录中查看一个使用这两个插件的 `Preact` 示例项目，查看 `package.json` 中的脚本和其 Vite 配置文件。

<ContentExample :item="playgrounds['vite-preact']"  class="Link" integrations />

### Svelte

你必须在 `@sveltejs/vite-plugin-svelte` 之前添加插件。

要支持 `class:foo` 和 `class:foo={bar}`，请添加插件并在 `extractors` 选项上配置 `extractorSvelte`。

你可以使用带有 `class:` 的简单规则，例如 `class:bg-red-500={foo}`，或使用 `shortcuts` 包含多个规则，查看下面链接的示例项目中的 `src/App.svelte`。

```ts [vite.config.ts]
import { svelte } from '@sveltejs/vite-plugin-svelte'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
      /* 更多选项 */
    }),
    svelte(),
  ],
}
```

<ContentExample :item="playgrounds['vite-svelte']"  class="Link" integrations />

### Sveltekit

要支持 `class:foo` 和 `class:foo={bar}`，请添加插件并在 `extractors` 选项上配置 `extractorSvelte`。

你可以使用带有 `class:` 的简单规则，例如 `class:bg-red-500={foo}`，或使用 `shortcuts` 包含多个规则，查看下面链接的示例项目中的 `src/routes/+layout.svelte`。

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
      /* 更多选项 */
    }),
    sveltekit(),
  ],
})
```

<ContentExample :item="playgrounds['sveltekit']"  class="Link mb-4" integrations />

<ContentExample :item="playgrounds['sveltekit-preprocess']"  class="Link mb-4" integrations />

<ContentExample :item="playgrounds['sveltekit-scoped']"  class="Link" integrations />

### Web Components

要与 Web 组件一起工作，你需要在插件上启用 `shadow-dom` 模式。

不要忘记移除 `uno.css` 的导入，因为 `shadow-dom` 模式不会暴露它，程序将无法工作。

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      /* 更多选项 */
    }),
  ],
}
```

在每个 `web component` 中，只需在其样式 CSS 块中添加 `@unocss-placeholder`：

```ts
const template = document.createElement('template')
template.innerHTML = `
<style>
:host {...}
@unocss-placeholder
</style>
<div class="m-1em">
...
</div>
`
```

如果你正在使用 [Lit](https://lit.dev/)：

```ts
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {...}
    @unocss-placeholder
  `
  // ...
}
```

你可以在 [examples/vite-lit](https://github.com/unocss/unocss/tree/main/examples/vite-lit) 目录中查看一个 `Web Components` 示例项目。

#### `::part` 内置支持

你可以使用 `::part`，因为插件通过 `shortcuts` 和使用来自 `preset-mini` 的 `part-[<part-name>]:<rule|shortcut>` 规则支持它，例如，使用简单规则如 `part-[<part-name>]:bg-green-500` 或使用一些 `shortcut`：查看以下链接示例项目中的 `src/my-element.ts`。

`part-[<part-name>]:<rule|shortcut>` 仅在使用 `shadow-dom` 模式时与此插件一起工作。

该插件使用 `nth-of-type` 来避免在相同 Web 组件中的多个部分之间的碰撞，对于不同 Web 组件中的相同部分，你不必担心，插件会为你处理。

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      shortcuts: [
        { 'cool-blue': 'bg-blue-500 text-white' },
        { 'cool-green': 'bg-green-500 text-black' },
      ],
      /* 更多选项 */
    }),
  ],
}
```

然后在你的 Web 组件中：

```ts
// my-container-wc.ts
const template = document.createElement('template')
template.innerHTML = `
<style>
@unocss-placeholder
</style>
<my-wc-with-parts class="part-[cool-part]:cool-blue part-[another-cool-part]:cool-green">...</my-wc-with-parts>
`
```

```ts
// my-wc-with-parts.ts
const template = document.createElement('template')
template.innerHTML = `
<style>
@unocss-placeholder
</style>
<div>
  <div part="cool-part">...</div>
  <div part="another-cool-part">...</div>
</div>
`
```

<ContentExample :item="playgrounds['vite-lit']"  class="Link" integrations />

### Solid

你需要在 UnoCSS 的插件之后添加 `vite-plugin-solid` 插件。

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import solidPlugin from 'vite-plugin-solid'

export default {
  plugins: [
    UnoCSS({
      /* 选项 */
    }),
    solidPlugin(),
  ],
}
```

<ContentExample :item="playgrounds['vite-solid']"  class="Link" integrations />

### Elm

你需要在 UnoCSS 的插件之前添加 `vite-plugin-elm` 插件。

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import Elm from 'vite-plugin-elm'

export default defineConfig({
  plugins: [
    Elm(),
    UnoCSS(),
  ],
})
```

<ContentExample :item="playgrounds['vite-elm']"  class="Link" integrations />

## 传统

如果 `@vitejs/plugin-legacy` 的 `renderModernChunks: false`，你需要将其添加到 `unocss` 选项中。

```ts
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { presetWind3 } from 'unocss'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetWind3()],
      legacy: {
        renderModernChunks: false,
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      renderModernChunks: false,
    }),
  ],
})
```

## 许可证

- MIT 许可证 &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
