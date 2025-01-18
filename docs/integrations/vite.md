---
title: UnoCSS Vite 插件
description: UnoCSS 的 Vite 插件（@unocss/vite）。
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

Vite 插件附带 `unocss` 包。

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
  // ...UnoCSS选项
})
```

将 `virtual:uno.css` 添加到你的主入口：

```ts [main.ts]
import 'virtual:uno.css'
```

## 模式

Vite 插件提供了一组模式以启用不同的行为。

### `global`（默认）

这是插件的默认模式：在此模式下，您需要在入口点添加 `uno.css` 的导入。

此模式为 `build` 和 `dev` 的 Vite 插件启用了一组功能，并支持 `HMR`。

生成的 `css` 将是注入到 `index.html` 的全局样式表。

### `vue-scoped`

此模式将生成的 CSS 注入到 Vue 单文件组件的 `<style scoped>` 中，以实现隔离。

### `svelte-scoped`

`svelte-scoped` 模式已被移至其自己的包，见 [@unocss/svelte-scoped/vite](/integrations/svelte-scoped)。

### `shadow-dom`

由于 `Web Components` 使用 `Shadow DOM`，因此无法直接从全局样式表中为内容设置样式（除非使用 `CSS 自定义属性`，这些将穿透 `Shadow DOM`），您需要将插件生成的 CSS 内联到 `Shadow DOM` 的样式中。

要将生成的 CSS 内联，只需将插件模式配置为 `shadow-dom` 并在每个 Web 组件的样式 CSS 块中包含 `@unocss-placeholder` 魔法占位符。如果您在 Vue 单文件组件中定义 Web 组件，并希望与 UnoCSS 一起定义自定义样式，可以将占位符包裹在 CSS 注释中，以避免在您的 IDE 中出现语法错误。

### `per-module`（实验性）

此模式将为每个模块生成一个 CSS 样式表，可以被作用域化。

### `dist-chunk`（实验性）

此模式将在构建时为每个代码块生成一个 CSS 样式表，非常适合 MPA。

## 在开发者工具中编辑类

由于 "按需" 的限制，开发者工具不知道您在源代码中尚未使用的类。因此，如果您想试着直接在开发者工具中更改类，请将以下行添加到您的主入口。

```ts
import 'uno.css'
import 'virtual:unocss-devtools'
```

::: warning
请谨慎使用，底层我们使用 [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) 来检测类更改。这意味着不仅您的手动更改，还包括您的脚本所做的更改都将被检测并包含在样式表中。当您根据脚本标签中的某些逻辑添加动态类时，可能会导致开发和生产构建之间的某些不对齐。我们建议将动态部分添加到 [safelist](https://github.com/unocss/unocss/issues/511) 或尽可能为您的生产构建设置 UI 回归测试。
:::

## 框架

某些 UI/App 框架存在需要修复的问题，以使其正常工作，如果您使用以下框架之一，请应用相应的建议。

### VanillaJS / TypeScript

使用 VanillaJS 或 TypeScript 时，您需要添加 `js` 和 `ts` 文件扩展名，以便 UnoCSS 读取和解析内容，默认情况下，`js` 和 `ts` 文件被排除，查看 [从构建工具管道中提取](/guide/extracting#extracting-from-build-tools-pipeline) 部分。

### React

如果您使用 `@vitejs/plugin-react`：

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

如果您使用 `@unocss/preset-attributify`，应从 `build` 脚本中移除 `tsc`。

如果您使用 `@vitejs/plugin-react` 和 `@unocss/preset-attributify`，必须在 `@vitejs/plugin-react` 之前添加插件。

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

您可以在 [examples/vite-react](https://github.com/unocss/unocss/tree/main/examples/vite-react) 目录中找到使用这两个插件的 `React` 示例项目，检查 `package.json` 中的脚本及其 Vite 配置文件。

<ContentExample :item="playgrounds['vite-react']"  class="Link" integrations />

### Preact

如果您使用 `@preact/preset-vite`：

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

或者如果您使用 `@prefresh/vite`：

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

如果您使用 `@unocss/preset-attributify`，应从 `build` 脚本中移除 `tsc`。

您可以在 [examples/vite-preact](https://github.com/unocss/unocss/tree/main/examples/vite-preact) 目录中找到使用这两个插件的 `Preact` 示例项目，检查 `package.json` 中的脚本及其 Vite 配置文件。

<ContentExample :item="playgrounds['vite-preact']"  class="Link" integrations />

### Svelte

您必须在 `@sveltejs/vite-plugin-svelte` 之前添加插件。

为了支持 `class:foo` 和 `class:foo={bar}`，添加插件并在 `extractors` 选项中配置 `extractorSvelte`。

您可以使用简单的规则与 `class:` 一起，例如 `class:bg-red-500={foo}` 或使用 `shortcuts` 来包括多个规则，见下面链接的示例项目中的 `src/App.svelte`。

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

为了支持 `class:foo` 和 `class:foo={bar}`，添加插件并在 `extractors` 选项中配置 `extractorSvelte`。

您可以使用简单的规则与 `class:` 一起，例如 `class:bg-red-500={foo}` 或使用 `shortcuts` 来包括多个规则，见下面链接的示例项目中的 `src/routes/+layout.svelte`。

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
      /* 更多选项 */
    }),
    sveltekit(),
  ],
}
```

<ContentExample :item="playgrounds['sveltekit']"  class="Link mb-4" integrations />

<ContentExample :item="playgrounds['sveltekit-preprocess']"  class="Link mb-4" integrations />

<ContentExample :item="playgrounds['sveltekit-scoped']"  class="Link" integrations />

### Web Components

要使 Web 组件正常工作，您需要在插件中启用 `shadow-dom` 模式。

不要忘记移除对于 `uno.css` 的导入，因为 `shadow-dom` 模式将不会暴露它，应用程序将无法正常工作。

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

在每个 `web component` 中，只需将 `@unocss-placeholder` 添加到其样式 CSS 块：

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

如果您使用 [Lit](https://lit.dev/)：

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

您可以在 [examples/vite-lit](https://github.com/unocss/unocss/tree/main/examples/vite-lit) 目录中找到 `Web Components` 示例项目。

#### `::part` 内置支持

您可以使用 `::part`，因为插件支持通过 `shortcuts` 和使用 `part-[<part-name>]:<rule|shortcut>` 规则来自 `preset-mini`，例如使用简单规则 `part-[<part-name>]:bg-green-500` 或使用某些 `shortcut`：检查下面链接示例项目中的 `src/my-element.ts`。

`part-[<part-name>]:<rule|shortcut>` 仅在使用 `shadow-dom` 模式的此插件时有效。

为避免与同一 Web 组件中的多个部分以及不同 Web 组件中的相同部分发生冲突，插件使用 `nth-of-type`，您不必担心，插件会为您处理好。

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

然后在您的 Web 组件中：

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

您需要在 UnoCSS 插件之后添加 `vite-plugin-solid` 插件。

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

您需要在 UnoCSS 插件之前添加 `vite-plugin-elm` 插件。

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

如果使用 `@vitejs/plugin-legacy` 并且 `renderModernChunks: false`，您需要将其添加到 `unocss` 选项中。

```ts
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetUno()],
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
