---
title: UnoCSS Svelte Scoped
description: Svelte Scoped Vite 插件和 UnoCSS 的 Svelte 预处理器。
outline: deep
---

# Svelte Scoped

为每个 Svelte 组件的工具类生成的 CSS 会直接放入 Svelte 组件的 `<style>` 块中，而非置于全局 CSS 文件中。

这个组件：

```svelte
<div class="mb-1" />
```

会被转化为：

```svelte
<div class="uno-ei382o" />

<style>
  :global(.uno-ei382o) {
    margin-bottom: 0.25rem;
  }
</style>
```

## 何时使用

| 使用场景   |     | 描述                                                                                                                                 | 使用的包                                                 |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| 较小的应用 | :x: | 只有 1 个全局 CSS 文件会更方便。为 [Svelte](/integrations/vite#svelte)/[SvelteKit](/integrations/vite#sveltekit) 使用常规 Vite 插件。 | [unocss/vite](/integrations/vite#svelte)                 |
| 较大的应用 | ✅  | Svelte Scoped 可以帮助你避免全局 CSS 文件不断增长。                                                                                | [@unocss/svelte-scoped/vite](#vite-plugin)               |
| 组件库     | ✅  | 生成的样式直接嵌入构建的组件中，无需在消费应用的构建流程中使用 UnoCSS。                                                              | [@unocss/svelte-scoped/preprocess](#svelte-preprocessor) |

## 工作原理

常规 UnoCSS/Tailwind CSS 配置将工具类样式放入全局 CSS 文件，并保持正确的顺序。相比之下，Svelte Scoped 将样式分散至多个无序的 Svelte 组件 CSS 文件中。但是，它必须保持工具类样式为全局样式，以便根据需要支持如从右到左等上下文感知功能以及下文所述的其他[用例](#context-aware)。这一挑战通过使用 Svelte 的 `:global()` 包裹器得以解决，放弃默认的 Svelte CSS 哈希方法，改为基于文件名 + 类名(s) 生成哈希，编译出唯一的类名，这样可以全局使用且避免样式冲突。

## 用法

由于 Svelte Scoped 会重写你的工具类名，所以你只能在以下位置编写它们：

| 支持的语法               | 示例                                                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| 类属性                  | `<div class="mb-1" />`                                                                                                     |
| 类指令                  | `<div class:mb-1={condition} />`                                                                                           |
| 类指令简写              | `<div class:logo />`                                                                                                        |
| 类属性（Prop）           | `<Button class="mb-1" />`                                                                                                  |
| 类似 `clsx` 的写法      | `<div class={["mb-1", { logo, 'font-bold': isBold() }, isUnderlined() && 'underline' ]} />`                                  |

Svelte Scoped 设计成可无缝替代你当前使用工具样式的项目，因此类属性中的表达式也被支持（例如 `<div class="mb-1 {foo ? 'mr-1' : 'mr-2'}" />`），但我们建议你以后使用 `clsx` 语法。注意，如果你以其他方式使用类名，比如放在 `<script>` 块内或启用了 attributify 模式，则在使用 Svelte Scoped 前需采取额外措施。你可以使用 `safelist` 选项，也可以查看下面的[预设](#presets-support)部分了解更多技巧。

### 上下文感知

尽管样式分布在应用中不同的 Svelte 组件，但它们仍是全局类，并能相互作用于组件外的元素。示例如下：

#### 依赖父元素

依赖父组件属性的类：

```svelte
<div class="dark:mb-2 rtl:right-0"></div>
```

转化为：

```svelte
<div class="uno-3hashz"></div>

<style>
  :global(.dark .uno-3hashz) {
    margin-bottom: 0.5rem;
  }
  :global([dir="rtl"] .uno-3hashz) {
    right: 0rem;
  }
</style>
```

#### 影响子组件

你可以让三个子元素之间有水平间距，其中有些子元素在不同组件中：

```svelte
<div class="space-x-1">
  <div>Status: online</div>
  <Button>FAQ</Button>
  <Button>Login</Button>
</div>
```

转化为：

```svelte
<div class="uno-7haszz">
  <div>Status: online</div>
  <Button>FAQ</Button>
  <Button>Login</Button>
</div>

<style>
  :global(.uno-7haszz > :not([hidden]) ~ :not([hidden])) {
    --un-space-x-reverse: 0;
    margin-left: calc(0.25rem * calc(1 - var(--un-space-x-reverse)));
    margin-right: calc(0.25rem * var(--un-space-x-reverse));
  }
</style>
```

#### 向子组件传递类

你可以给组件添加 `class` 属性，从而在使用组件处传递自定义类。

```svelte
<Button class="px-2 py-1">Login</Button>
```

转化为：

```svelte
<Button class="uno-4hshza">Login</Button>

<style>
  :global(.uno-4hshza) {
    padding-left:0.5rem;
    padding-right:0.5rem;
    padding-top:0.25rem;
    padding-bottom:0.25rem;
  }
</style>
```

实现接收组件中类的简单方法是将其放在元素上，使用 `{$$props.class}`，例如 `div class="{$$props.class} foo bar" />`。

### 应用指令

你可以在 `<style>` 块中使用应用指令，支持 `--at-apply` 或 `@apply`，或者通过 `applyVariables` 选项传入自定义值。

Svelte Scoped 甚至能够正确处理上下文相关类如 `dark:text-white`，而普通的 [`@unocss/transformer-directives`](/transformers/directives) 包处理不了，因为它不是专门为 Svelte 样式块设计的。例如，使用 Svelte Scoped，这个组件：

```svelte
<div />

<style>
  div {
    --at-apply: rtl:ml-2;
  }
</style>
```

将被转化为：

```svelte
<div />

<style>
  :global([dir=\\"rtl\\"]) div {
    margin-right: 0.5rem;
  }
</style>
```

为使 `rtl:ml-2` 正常工作，`[dir="rtl"]` 选择器被包裹在 `:global()` 中，防止 Svelte 编译器在当前组件没有该属性的元素时自动剥离它。然而，`div` 不能被包含在 `:global()` 中，因为该样式将影响你应用中的所有 `div`。

### 其他样式块指令

支持使用 [theme()](https://unocss.dev/transformers/directives#theme)，但 **不支持** [@screen](https://unocss.dev/transformers/directives#screen)。

## Vite 插件

在 Svelte 或 SvelteKit 应用中，生成的样式会直接注入各自的 Svelte 组件，同时只把最少必要的样式放入一个全局样式表。查看 Stackblitz 中的 [SvelteKit 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-scoped)：

[![在 StackBlitz 中打开](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/unocss/unocss/tree/main/examples/sveltekit-scoped)

### 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/svelte-scoped
```

```bash [yarn]
yarn add -D unocss @unocss/svelte-scoped
```

```bash [npm]
npm install -D unocss @unocss/svelte-scoped
```

```bash [bun]
bun add -D unocss @unocss/svelte-scoped
```

:::

#### 添加插件

将 `@unocss/svelte-scoped/vite` 加入你的 Vite 配置中：

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from '@unocss/svelte-scoped/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      // injectReset: '@unocss/reset/normalize.css', // 查看类型定义了解所有支持的重置选项或如何传入自定义重置
      // ...其他 Svelte Scoped 选项
    }),
    sveltekit(),
  ],
})
```

#### 添加配置文件

按照[下方](#configuration)的说明设置你的 `uno.config.ts` 文件。

#### 全局样式

虽然几乎所有样式都放在各组件内，但仍有部分样式必须放置全局样式表：预飞行 (preflights)、安全列表 (safelist) 以及可选的重置样式（如果你使用 `injectReset` 选项）。

将 `%unocss-svelte-scoped.global%` 占位符放入你的 `<head>` 标签内。Svelte 中通常在 `index.html`，SvelteKit 中则是在 `%sveltekit.head%` 之前的 `app.html` 文件中：

<!-- eslint-skip -->

```html [index.html]
<head>
  <!-- ... -->
  <title>使用 UnoCSS Svelte Scoped 的 SvelteKit</title>
  %unocss-svelte-scoped.global%
  %sveltekit.head%
</head>
```

若是使用 SvelteKit，则必须在 `src/hooks.server.js` 文件中的 `transformPageChunk` 钩子添加如下内容：

```js [src/hooks.server.js]
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace(
        '%unocss-svelte-scoped.global%',
        'unocss_svelte_scoped_global_styles'
      ),
  })
  return response
}
```

此转换必须在路径含有 hooks 和 server 的文件内（例如 `src/hooks.server.js`、`src/hooks.server.ts`），因为 `svelte-scoped` 会在你的服务器钩子文件中查找，将 `unocss_svelte_scoped_global_styles` 替换为你的全局样式。确保不要将此转换从其他文件导入，比如在使用 [sequence](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks-sequence) 组合多个钩子时不要混用。

_在普通 Svelte 项目中，Vite 的 `transformIndexHtml` 钩子会自动处理此事。_

## Svelte 预处理器

使用工具类构建一个不依赖外部 CSS 文件的组件库，通过预处理器将生成样式直接嵌入构建组件中。查看 Stackblitz 中的 [SvelteKit Library 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-preprocess)：

[![在 StackBlitz 中打开](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/unocss/unocss/tree/main/examples/sveltekit-preprocess)

### 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/svelte-scoped
```

```bash [yarn]
yarn add -D unocss @unocss/svelte-scoped
```

```bash [npm]
npm install -D unocss @unocss/svelte-scoped
```

```bash [bun]
bun add -D unocss @unocss/svelte-scoped
```

:::

#### 添加预处理器

将 `@unocss/svelte-scoped/preprocess` 添加到你的 Svelte 配置中：

```ts [svelte.config.js]
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from '@unocss/svelte-scoped/preprocess'

const config = {
  preprocess: [
    vitePreprocess(),
    UnoCSS({
      // ... 预处理器选项
    }),
  ],
  // 其他 Svelte 配置
}
```

#### 开发环境中禁用类合并

使用 Svelte Scoped 的 Vite 插件时，它会自动区分 `dev` 与 `build` 环境。开发时，类名保持区分度并且会根据位置哈希，方便在浏览器开发工具中启用或禁用。举例，`class="mb-1 mr-1"` 会变成类似 `class="_mb-1_9hwi32 _mr-1_84jfy4"`。生产环境中，这些会被编译成一个单一的哈希类名，默认前缀为 `uno-`，根据文件名+类名生成，例如 `class="uno-84dke3"`。

如果你希望预处理器在开发时也保持此行为，必须显式根据环境设置 `combine` 选项。一个做法是安装 [cross-env](https://www.npmjs.com/package/cross-env)，并将开发脚本改为：

```
"dev": "cross-env NODE_ENV=development vite dev"
```

然后调整 svelte.config.js：

```diff
+const prod = process.env.NODE_ENV !== 'development'
const config = {
  preprocess: [
    vitePreprocess(),
    UnoCSS({
+      combine: prod,
    }),
  ],
}
```

#### 添加配置文件

请根据[下方](#configuration)说明设置你的 `uno.config.ts` 文件。

### 预飞行（Preflights）

使用预处理器时，你可以选择在需要的组件里包含预飞行样式，方法是在 `<style>` 标签加入 `uno-preflights` 属性：

```html
<style uno-preflights></style>
```

任何以句点开头的特殊预飞行样式（如 `.prose :where(a):not(:where(.not-prose, .not-prose *))`）会被包裹在 `:global()` 中，以避免被 Svelte 编译器自动移除。

_如果你的类不依赖预飞行，或者组件仅在包含预飞行的应用里被消费，则不必为单个组件额外添加预飞行。_

### 安全列表（Safelist）

使用预处理器时，可通过加入 `uno-safelist` 样式属性，在组件内包含安全列表类：

```html
<style uno-safelist></style>
```

安全列表样式会被包裹在 `:global()` 中，避免被 Svelte 编译器自动剥离。

## 配置

请将你的 UnoCSS 配置写入 `uno.config.ts` 文件中：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 配置选项
})
```

提取器不被支持，这是因常规 UnoCSS 全局用法和 Svelte Scoped 使用方式不同所致。预设和转换器支持情况如下节所述。更多详细信息请参见 [配置文件](/guide/config-file) 和 [配置参考](/config/)。

### 预设支持

由于部分必须样式放在全局样式表，而其他样式放于组件内，预设须分开处理：

| 预设                                                                                                                                                                                                                                                                                                                                                                         | 支持 | 说明                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~~[@unocss/preset-uno](https://unocss.dev/presets/uno)~~、[@unocss/preset-mini](https://unocss.dev/presets/mini)、[@unocss/preset-wind3](https://unocss.dev/presets/wind3)、[@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons)、[@unocss/web-fonts](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons) | ✅   | 这些及所有社区插件，如 [unocss-preset-forms](https://github.com/Julien-R44/unocss-preset-forms)，只要它们仅依赖规则、变体和预飞行均可正常工作。                                                                                       |
| [@unocss/preset-typography](https://github.com/unocss/unocss/tree/main/packages-presets/preset-typography)                                                                                                                                                                                                                                                                    | ✅   | 由于此预设将规则集添加至预飞行，使用时必须将 `prose` 类加入安全列表，否则预飞行不会生效。此预设的其他类，如 `prose-pink` 等都可以被组件作用域化。                                                                                     |
| [@unocss/preset-rem-to-px](https://github.com/unocss/unocss/tree/main/packages-presets/preset-rem-to-px)                                                                                                                                                                                                                                                                      | ✅   | 该类和所有仅对样式输出做修改的预设可正常工作。                                                                                                                                                                       |
| [@unocss/preset-attributify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-attributify)                                                                                                                                                                                                                                                                  | -    | 该预设无法配合使用。建议改用 [unplugin-attributify-to-class](https://github.com/MellowCo/unplugin-attributify-to-class) Vite 插件（`attributifyToClass({ include: [/\.svelte$/]})`），并确保该插件在 Svelte Scoped Vite 插件之前执行。 |
| [@unocss/preset-tagify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-tagify)                                                                                                                                                                                                                                                                            | -    | 添加自定义提取器的预设不支持。你可以制作预处理器，将 `<text-red>Hi</text-red>` 转为 `<span class="text-red">Hi</span>`，并创建 PR 将其链接添加至此。                                                                               |

其他预设如果不依赖常规的 `class="..."` 使用，需先将类名转换到 `class="..."` 属性中；如果预设添加了如 `.prose` 的类，则需将触发预设的类加到安全列表中。

### 转换器支持

转换器支持 `.css`、`.postcss`、`.sass`、`.scss`、`.less`、`.stylus`、`.styl` 等 CSS 文件。使用时，在你的 `vite.config.ts` 里 `cssFileTransformers` 选项添加转换器：

```ts [vite.config.ts]
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  plugins: [
    UnoCSS({
      cssFileTransformers: [transformerDirectives()],
    }),
    sveltekit(),
  ],
})
```

::: info
由于 Svelte Scoped 工作机制，转换器在 Svelte 组件中不被支持。
:::

## 作用域工具类激发创造力

关于何时考虑使用作用域样式的建议：在大型项目中，如果你每次使用类似 `.md:max-w-[50vw]` 的类时，都只用一次，你可能会不安，因为这让你感觉全局样式表持续膨胀，试试这个包吧。对工具类的犹豫限制了创造力。当然，你可以在样式块里用 `--at-apply: md:max-w-[50vw]`，但这很繁琐，而且上下文中的样式很有用。此外，如果想在项目中包含许多图标，感觉将它们加入全局样式表压力很大。将样式和图标都内置于组件，可以让你无需分析每个新加内容的成本收益，尽情扩展项目。

## 许可证

- MIT 许可证 &copy; 2022-PRESENT [Jacob Bowdoin](https://github.com/jacob-8)