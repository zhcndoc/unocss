---
title: UnoCSS Svelte Scoped
description: Svelte Scoped Vite 插件和 Svelte 预处理器，用于 UnoCSS。
outline: deep
---

# Svelte Scoped

将每个 Svelte 组件的工具样式生成的 CSS 直接放入 Svelte 组件的 `<style>` 块中，而不是放在全局 CSS 文件中。

这个组件：

```svelte
<div class="mb-1" />
```

被转换为：

```svelte
<div class="uno-ei382o" />

<style>
  :global(.uno-ei382o) {
    margin-bottom: 0.25rem;
  }
</style>
```

## 何时使用

| 用例       |     | 描述                                                                                                                                 | 要使用的包                                               |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| 较小的应用 | :x: | 只有 1 个全局 CSS 文件更方便。使用常规 Vite 插件处理 [Svelte](/integrations/vite#svelte)/[SvelteKit](/integrations/vite#sveltekit)。 | [unocss/vite](/integrations/vite#svelte)                 |
| 较大的应用 | ✅  | Svelte Scoped 可以帮助您避免不断增长的全局 CSS 文件。                                                                                | [@unocss/svelte-scoped/vite](#vite-plugin)               |
| 组件库     | ✅  | 生成的样式直接放置在构建的组件中，而无需在使用该组件的应用程序的构建管道中使用 UnoCSS。                                              | [@unocss/svelte-scoped/preprocess](#svelte-preprocessor) |

## 工作原理

常规的 UnoCSS/Tailwind CSS 设置会将工具样式放置在一个全局 CSS 文件中，并保持适当的顺序。相反，Svelte Scoped 在许多任意顺序的 Svelte 组件 CSS 文件中分配您的样式。不过，它必须保持工具样式为全局，以使其能够根据需要感知上下文，例如右到左和其他 [用例](#context-aware)。这带来了一个挑战，可以通过使用 Svelte 的 `:global()` 包装器解决，以选择退出默认的 Svelte CSS 哈希方法，转而使用基于文件名 + 类名的哈希来编译独特的类名，使其可以全局使用而不会造成样式冲突。

## 使用方法

因为 Svelte Scoped 会重写您的工具类名，所以您在编写它们的位置受限：

| 支持的语法 | 示例                             |
| ---------- | -------------------------------- |
| 类属性     | `<div class="mb-1" />`           |
| 类指令     | `<div class:mb-1={condition} />` |
| 类指令简写 | `<div class:logo />`             |
| 类属性     | `<Button class="mb-1" />`        |

Svelte Scoped 旨在成为使用工具样式项目的即插即用替代品。因此，类属性中的表达式也得到支持（例如 `<div class="mb-1 {foo ? 'mr-1' : 'mr-2'}" />`），但我们建议您在未来使用类指令语法。请注意，如果您使用其他方式的类名，例如将它们放置在 `<script>` 块中或使用属性模式，则在使用 Svelte Scoped 之前需要采取额外步骤。您可以利用 `safelist` 选项，并查看下面的 [预设](#presets-support) 部分以获取更多提示。

### 上下文感知

尽管样式分布在您应用的 Svelte 组件中，但它们仍然是全局类，并且将在与其特定组件以外的元素的关系中工作。以下是一些示例：

#### 依赖父类

依赖于父组件中找到的属性的类：

```svelte
<div class="dark:mb-2 rtl:right-0"></div>
```

变为：

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

#### 子类影响

您可以在三个子元素之间添加间距，其中一些位于不同的组件中：

```svelte
<div class="space-x-1">
  <div>状态：在线</div>
  <Button>常见问题</Button>
  <Button>登录</Button>
</div>
```

变为：

```svelte
<div class="uno-7haszz">
  <div>状态：在线</div>
  <Button>常见问题</Button>
  <Button>登录</Button>
</div>

<style>
  :global(.uno-7haszz > :not([hidden]) ~ :not([hidden])) {
    --un-space-x-reverse: 0;
    margin-left: calc(0.25rem * calc(1 - var(--un-space-x-reverse)));
    margin-right: calc(0.25rem * var(--un-space-x-reverse));
  }
</style>
```

#### 将类传递给子组件

您可以向组件添加 `class` 属性，以允许在使用该组件的地方传递自定义类。

```svelte
<Button class="px-2 py-1">登录</Button>
```

变为：

```svelte
<Button class="uno-4hshza">登录</Button>

<style>
  :global(.uno-4hshza) {
    padding-left:0.5rem;
    padding-right:0.5rem;
    padding-top:0.25rem;
    padding-bottom:0.25rem;
  }
</style>
```

在接收组件中实现类的简单方法是将其放置在使用 `{$$props.class}` 的元素上，如 `div class="{$$props.class} foo bar" />`。

### 应用指令

您可以在 `<style>` 块中使用应用指令，使用 `--at-apply` 或 `@apply`，或使用 `applyVariables` 选项设置的自定义值。

Svelte Scoped 甚至可以妥善处理上下文依赖的类，如 `dark:text-white`，而常规的 [`@unocss/transformer-directives`](/transformers/directives) 包无法妥善处理，因为它不是专为 Svelte 样式块构建的。例如，使用 Svelte Scoped，该组件：

```svelte
<div />

<style>
  div {
    --at-apply: rtl:ml-2;
  }
</style>
```

将被转换为：

```svelte
<div />

<style>
  :global([dir=\\"rtl\\"]) div {
    margin-right: 0.5rem;
  }
</style>
```

为了让 `rtl:ml-2` 正常工作，`[dir="rtl"]` 选择器被包裹在 `:global()` 中，以防止 Svelte 编译器自动剥离它，因为该组件没有带有该属性的元素。然而，`div` 不能包含在 `:global()` 包裹中，因为该样式会影响您应用中的每个 `div`。

### 其他样式块指令

使用 [theme()](https://unocss.dev/transformers/directives#theme) 也得到支持，但 [@screen](https://unocss.dev/transformers/directives#screen) 是 **不支持** 的。

## Vite 插件

在 Svelte 或 SvelteKit 应用中，直接将生成的样式注入到您的 Svelte 组件中，同时将最小必要的样式放置在全局样式表中。请查看 Stackblitz 中的 [SvelteKit 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-scoped)：

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

:::

#### 添加插件

将 `@unocss/svelte-scoped/vite` 添加到你的 Vite 配置中：

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from '@unocss/svelte-scoped/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      // injectReset: '@unocss/reset/normalize.css', // 请查看类型定义以获取所有包含的重置选项或如何传入您自己的选项
      // ...其他 Svelte Scoped 选项
    }),
    sveltekit(),
  ],
})
```

#### 添加配置文件

按照下述说明设置您的 `uno.config.ts` 文件。

#### 全局样式

尽管几乎所有样式都放置在各个组件中，但仍有一些样式必须放置在全局样式表中：预飞行、保留列表和可选重置（如果您使用 `injectReset` 选项）。

将 `%unocss-svelte-scoped.global%` 占位符添加到您的 `<head>` 标签中。在 Svelte 中这是 `index.html`。在 SvelteKit 中，这将在 `app.html` 中 `%sveltekit.head%` 之前：

<!-- eslint-skip -->

```html [index.html]
<head>
  <!-- ... -->
  <title>使用 UnoCSS Svelte Scoped 的 SvelteKit</title>
  %unocss-svelte-scoped.global%
  %sveltekit.head%
</head>
```

如果使用 SvelteKit，您还必须在 `src/hooks.server.js` 文件中添加以下内容到 `transformPageChunk` 钩子中：

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

此转换必须在一个 [路径包含 `hooks` 和 `server`](https://github.com/unocss/unocss/blob/main/packages-integrations/svelte-scoped/src/_vite/global.ts#L12) 的文件中（例如 `src/hooks.server.js`、`src/hooks.server.ts`），因为 `svelte-scoped` 将在您的服务器钩子文件中查找以替换 `unocss_svelte_scoped_global_styles` 为您的全局样式。确保不从其他文件导入此转换，例如在应用 [sequence](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks-sequence) 时使用 `@sveltejs/kit/hooks`。

_在常规 Svelte 项目中，Vite 的 `transformIndexHtml` 钩子会自动执行此操作。_

## Svelte 预处理器

使用工具样式构建不依赖于包含伴随 CSS 文件的组件库，通过使用预处理器将生成的样式直接放入构建的组件中。请查看 Stackblitz 中的 [SvelteKit 库示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-preprocess)：

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

:::

#### 添加预处理器

将 `@unocss/svelte-scoped/preprocess` 添加到您的 Svelte 配置中：

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

#### 不在开发环境中组合类名

在常规应用中使用 Svelte Scoped 时，Vite 插件将自动检测 `dev` 与 `build`。在开发过程中，类将保持独立并在位置上进行哈希，以便您轻松在浏览器的开发者工具中打开/关闭 `class="mb-1 mr-1"` 将变成类似 `class="_mb-1_9hwi32 _mr-1_84jfy4` 的东西。在生产环境中，这些类将编译为一个使用所需前缀、默认情况下是 `uno-` 和基于文件名 + 类名的哈希的类名，例如 `class="uno-84dke3`。

如果您希望在使用预处理器时获得相同的行为，您必须根据环境手动设置 `combine` 选项。一个方法是安装 [cross-env](https://www.npmjs.com/package/cross-env)，并将您的开发脚本更新为：

```
"dev": "cross-env NODE_ENV=development vite dev"
```

然后调整您的 svelte.config.js：

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

设置您的 `uno.config.ts` 文件，如下所述 [下文](#configuration)。

### 预飞行

使用预处理器时，您可以选择在特定的组件中包含预飞行，通过将 `uno-preflights` 作为样式属性添加。

```html
<style uno-preflights></style>
```

任何以句点开头的特殊预飞行，如 `.prose :where(a):not(:where(.not-prose, .not-prose *))`，将被包裹在 `:global()` 中，以避免被 Svelte 编译器自动剥离。

_如果您的类不依赖于预飞行或您的构建组件仅在已经包含预飞行的应用中使用，则在单个组件中添加预飞行是多余的。_

### 保留列表

使用预处理器时，您可以选择通过将 `uno-safelist` 作为样式属性添加，在组件中包括保留列表类。

```html
<style uno-safelist></style>
```

您的保留列表样式将被包裹在 `:global()` 中，以避免被 Svelte 编译器自动剥离。

## 配置

将您的 UnoCSS 设置放在 `uno.config.ts` 文件中：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 选项
})
```

提取器不支持，因为正常的 UnoCSS 全局使用与 Svelte Scoped 使用之间存在差异。预设和转换器支持，如以下部分所述。请参见 [配置文件](/guide/config-file) 和 [配置参考](/config/) 以获取所有其他详细信息。

### 预设支持

由于在全局样式表中有一些必要的样式以及其他所有样式都包含在每个组件中，因此预设需要逐案处理：

| 预设                                                                                                                                                                                                                                                                                                                                                                  | 支持 | 备注                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@unocss/preset-uno](https://unocss.dev/presets/uno)、[@unocss/preset-mini](https://unocss.dev/presets/mini)、[@unocss/preset-wind](https://unocss.dev/presets/wind)、[@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons)、[@unocss/web-fonts](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons) | ✅   | 这些和所有社区插件，例如 [unocss-preset-forms](https://github.com/Julien-R44/unocss-preset-forms)，只依赖于规则/变体/预飞行的插件将正常工作。                                                                             |
| [@unocss/preset-typography](https://github.com/unocss/unocss/tree/main/packages-presets/preset-typography)                                                                                                                                                                                                                                                            | ✅   | 由于该预设将规则集添加到您的预飞行，使用此预设时必须将 `prose` 类添加到您的保留列表中，否则预飞行将永远不会被触发。此预设的所有其他类，例如 `prose-pink`，可以在组件中作用域。                                            |
| [@unocss/preset-rem-to-px](https://github.com/unocss/unocss/tree/main/packages-presets/preset-rem-to-px)                                                                                                                                                                                                                                                              | ✅   | 此类和所有类仅修改样式输出的预设将正常工作。                                                                                                                                                                              |
| [@unocss/preset-attributify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-attributify)                                                                                                                                                                                                                                                          | -    | 此预设将不起作用。请改用 [unplugin-attributify-to-class](https://github.com/MellowCo/unplugin-attributify-to-class) Vite 插件 (`attributifyToClass({ include: [/\.svelte$/]})`)，它将在 Svelte Scoped Vite 插件之前执行。 |
| [@unocss/preset-tagify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-tagify)                                                                                                                                                                                                                                                                    | -    | 添加自定义提取器的预设将不起作用。创建预处理器，将 `<text-red>Hi</text-red>` 转换为 `<span class="text-red">Hi</span>`，然后创建 PR 将链接添加到这里。                                                                    |

对于其他预设，如果它们不仅依赖于传统的 `class="..."` 使用，则您需要首先将这些类名预处理为 `class="..."` 属性。如果它们添加了像排版的 `.prose` 类，则您需要将触发预设添加的类放入您的保留列表中。

### 转换器支持

转换器支持您的 CSS 文件 (css|postcss|sass|scss|less|stylus|styl)。要使用它们，请将转换器添加到 `vite.config.ts` 中的 `cssFileTransformers` 选项中：

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
由于 Svelte Scoped 的工作方式，Svelte 组件中不支持转换器。
:::

## 作用域实用程序类释放创意

关于何时使用作用域样式的一些建议：如果您在大型项目中已经到了每次使用像 `.md:max-w-[50vw]` 这样的类时，知道只使用一次而感到不安，因为您感觉到全局样式表的体积越来越大，那么请尝试这个包。对使用您需要的确切类的犹豫抑制了创造力。当然，您可以在样式块中使用 `--at-apply: md:max-w-[50vw]`，但这会变得乏味，而上下文样式非常有用。此外，如果您希望在项目中包含多种图标，您会感受到将其添加到全局样式表中的负担。当每个组件承受自己的样式和图标时，您可以继续扩展您的项目，而无需分析每个新添加项的成本效益。

## 许可证

- MIT 许可证 &copy; 2022-PRESENT [Jacob Bowdoin](https://github.com/jacob-8)
