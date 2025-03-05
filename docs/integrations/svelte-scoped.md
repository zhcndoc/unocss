---
title: UnoCSS Svelte Scoped
description: Svelte Scoped Vite 插件和 UnoCSS 的 Svelte 预处理器。
outline: deep
---

# Svelte Scoped

将为每个 Svelte 组件的工具类生成的 CSS 直接放入 Svelte 组件的 `<style>` 块中，而不是放在全局 CSS 文件中。

这个组件：

```svelte
<div class="mb-1" />
```

被转换成：

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
| 较小的应用 | :x: | 只有 1 个全局 CSS 文件会更方便。使用常规 Vite 插件为 [Svelte](/integrations/vite#svelte)/[SvelteKit](/integrations/vite#sveltekit)。 | [unocss/vite](/integrations/vite#svelte)                 |
| 较大的应用 | ✅  | Svelte Scoped 可以帮助你避免不断增长的全局 CSS 文件。                                                                                | [@unocss/svelte-scoped/vite](#vite-plugin)               |
| 组件库     | ✅  | 生成的样式直接放入构建的组件中，无需在消费应用的构建流程中使用 UnoCSS。                                                              | [@unocss/svelte-scoped/preprocess](#svelte-preprocessor) |

## 工作原理

常规的 UnoCSS/Tailwind CSS 设置将工具类样式放入一个全局 CSS 文件中，并进行适当的排序。相比之下，Svelte Scoped 将你的样式分发到多个任意排序的 Svelte 组件 CSS 文件中。然而，它必须保持工具类样式为全局，以便根据需要对上下文保持感知，例如右到左模式及其他 [用例](#context-aware)。这提出了一个挑战，通过使用 Svelte 的 `:global()` 包装器来解决，选择退出默认的 Svelte CSS 哈希方法，而使用基于文件名 + 类名的哈希来编译独特的类名，从而使它们可以全球使用而不会产生样式冲突。

## 使用

由于 Svelte Scoped 重新编写了你的工具类名，你有限制地只能在以下地方书写它们：

| 支持的语法 | 示例                             |
| ---------- | -------------------------------- |
| 类属性     | `<div class="mb-1" />`           |
| 类指令     | `<div class:mb-1={condition} />` |
| 类指令简写 | `<div class:logo />`             |
| 类 props   | `<Button class="mb-1" />`        |

Svelte Scoped 被设计为对使用工具类样式的项目的即插即用替代。因此，在类属性中找到的表达式也被支持（例如 `<div class="mb-1 {foo ? 'mr-1' : 'mr-2'}" />`），但是我们推荐你今后使用类指令语法。还要注意，如果你使用类名的其他方式，比如将它们放在 `<script>` 块中或使用属性化模式，那么在使用 Svelte Scoped 之前你需要采取额外的步骤。你可以利用 `safelist` 选项，并查看下面的 [presets](#presets-support) 部分以获得更多提示。

### 上下文感知

即使样式分布在应用的 Svelte 组件中，它们仍然是全局类，并且会与位于特定组件之外的元素相互作用。以下是一些示例：

#### 依赖父组件

依赖于在父组件中找到的属性的类：

```svelte
<div class="dark:mb-2 rtl:right-0"></div>
```

转变为：

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

你可以在 3 个子元素之间添加空格，其中一些位于不同的组件中：

```svelte
<div class="space-x-1">
  <div>Status: online</div>
  <Button>FAQ</Button>
  <Button>Login</Button>
</div>
```

转变为：

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

#### 将类传递给子组件

你可以向组件添加 `class` 属性，以便在使用该组件的地方传递自定义类。

```svelte
<Button class="px-2 py-1">Login</Button>
```

转变为：

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

在接收组件中实现类的一个简单方法是将它们放在元素上，使用 `{$$props.class}`，如 `div class="{$$props.class} foo bar" />`。

### 应用指令

你可以在 `<style>` 块中使用应用指令，使用 `--at-apply` 或 `@apply`，或者通过 `applyVariables` 选项设置自定义值。

Svelte Scoped 甚至可以正确处理上下文依赖类，如 `dark:text-white`，因为常规的 [`@unocss/transformer-directives`](/transformers/directives) 包无法正确处理，因为它并不是专为 Svelte 样式块构建的。例如，使用 Svelte Scoped，这个组件：

```svelte
<div />

<style>
  div {
    --at-apply: rtl:ml-2;
  }
</style>
```

将会被转换为：

```svelte
<div />

<style>
  :global([dir=\\"rtl\\"]) div {
    margin-right: 0.5rem;
  }
</style>
```

为了让 `rtl:ml-2` 正常工作，`[dir="rtl"]` 选择器被包裹在 `:global()` 中，以防止 Svelte 编译器在组件没有这个属性的元素时自动将其剥离。然而，`div` 不能包含在 `:global()` 包装器中，因为该样式将影响你应用中的每个 `div`。

### 其他样式块指令

使用 [theme()](https://unocss.dev/transformers/directives#theme) 也是支持的，但 [@screen](https://unocss.dev/transformers/directives#screen) **不支持**。

## Vite 插件

在 Svelte 或 SvelteKit 应用中，将生成的样式直接注入到你的 Svelte 组件中，同时将最少必要的样式放在一个全局样式表中。查看 Stackblitz 中的 [SvelteKit 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-scoped)：

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

将 `@unocss/svelte-scoped/vite` 添加到你的 Vite 配置中：

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from '@unocss/svelte-scoped/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      // injectReset: '@unocss/reset/normalize.css', // 查看类型定义以了解所有包含的重置选项或如何传入自己的
      // ...其他 Svelte Scoped 选项
    }),
    sveltekit(),
  ],
})
```

#### 添加配置文件

按照 [下面](#configuration) 的描述设置你的 `uno.config.ts` 文件。

#### 全局样式

虽然几乎所有的样式都被放置在各个组件中，但仍然有一些样式必须放置在全局样式表中：预飞行（preflights）、安全列表（safelist）以及一个可选的重置（如果你使用 `injectReset` 选项）。

将 `%unocss-svelte-scoped.global%` 占位符放入你的 `<head>` 标签中。在 Svelte 中这是 `index.html`，在 SvelteKit 中将在 `%sveltekit.head%` 之前的 `app.html` 中：

<!-- eslint-skip -->

```html [index.html]
<head>
  <!-- ... -->
  <title>使用 UnoCSS Svelte Scoped 的 SvelteKit</title>
  %unocss-svelte-scoped.global%
  %sveltekit.head%
</head>
```

如果使用 SvelteKit，你还必须在 `src/hooks.server.js` 文件中的 `transformPageChunk` 钩子中添加以下内容：

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

此转换必须在一个其 [路径包括 hooks 和 server](https://github.com/unocss/unocss/blob/main/packages-integrations/svelte-scoped/src/_vite/global.ts#L12) 的文件中（例如 `src/hooks.server.js`，`src/hooks.server.ts`），因为 `svelte-scoped` 将在你的服务器钩子文件中查找以替换 `unocss_svelte_scoped_global_styles` 为你的全局样式。确保不要从另一个文件导入此转换，例如在使用 [sequence](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks-sequence) 从 `@sveltejs/kit/hooks` 时。

_在常规的 Svelte 项目中，Vite 的 `transformIndexHtml` 钩子会自动完成这项工作。_

## Svelte 预处理器

使用工具样式构建一个不依赖于包含伴随 CSS 文件的组件库，通过使用预处理器将生成的样式直接放入构建的组件中。查看 Stackblitz 中的 [SvelteKit Library 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-preprocess)：

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

#### 在开发环境中不要组合类名

在正常的应用中使用 Svelte Scoped 时，Vite 插件会自动检测 `dev` 和 `build`。在开发时，将保持类名的区分度并在所在位置进行哈希，以便在浏览器的开发者工具中方便地切换开/关。`class="mb-1 mr-1"` 将变成类似 `class="_mb-1_9hwi32 _mr-1_84jfy4` 的格式。在生产中，这些将被编译成一个单一的类名，使用你所需的前缀，默认为 `uno-`，以及基于文件名 + 类名的哈希，例如 `class="uno-84dke3`。

如果你希望在使用预处理器时获得相同的行为，必须手动根据环境设置 `combine` 选项。实现此目的的一种方法是安装 [cross-env](https://www.npmjs.com/package/cross-env)，并将你的开发脚本更新为：

```
"dev": "cross-env NODE_ENV=development vite dev"
```

然后调整你的 svelte.config.js：

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

按照 [下面](#configuration) 的描述设置你的 `uno.config.ts` 文件。

### 预飞行（Preflights）

在使用预处理器时，你可以选择在需要的特定组件中包含预飞行，通过添加 `uno-preflights` 作为样式属性。

```html
<style uno-preflights></style>
```

以句点（.）开头的任何特殊预飞行，例如 `.prose :where(a):not(:where(.not-prose, .not-prose *))`，将被包裹在 `:global()` 中，以避免被 Svelte 编译器自动剥离。

_如果你的类不依赖于预飞行，或者你的构建组件仅在已经包含预飞行的应用中被消费，则在单独的组件中添加预飞行是没有必要的。_

### 安全列表（Safelist）

在使用预处理器时，你可以选择通过添加 `uno-safelist` 作为样式属性来在组件中包含安全列表类。

```html
<style uno-safelist></style>
```

你的安全列表样式将被包裹在 `:global()` 中，以避免被 Svelte 编译器自动剥离。

## 配置

将你的 UnoCSS 设置放入 `uno.config.ts` 文件中：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 选项
})
```

提取器不支持，这是由于常规 UnoCSS 全局使用和 Svelte Scoped 使用之间的差异。预设和转换器如以下部分所述是被支持的。有关所有其他详细信息，请参见 [配置文件](/guide/config-file) 和 [配置参考](/config/)。

### 预设支持

由于在全局样式表中有一些必要样式和其他所有样式都包含在各个组件中，预设需要逐个处理：

| 预设                                                                                                                                                                                                                                                                                                                                                                    | 支持 | 注释                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@unocss/preset-uno](https://unocss.dev/presets/uno)、[@unocss/preset-mini](https://unocss.dev/presets/mini)、[@unocss/preset-wind3](https://unocss.dev/presets/wind3)、[@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons)、[@unocss/web-fonts](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons) | ✅   | 这些以及所有社区插件，例如 [unocss-preset-forms](https://github.com/Julien-R44/unocss-preset-forms)，仅依赖于规则/变体/预飞行的将会工作。                                                                          |
| [@unocss/preset-typography](https://github.com/unocss/unocss/tree/main/packages-presets/preset-typography)                                                                                                                                                                                                                                                              | ✅   | 由于此预设将规则集添加到你的预飞行中，所以在使用此预设时必须将 `prose` 类添加到安全列表中，否则预飞行将不会被触发。此预设的其他所有类，例如 `prose-pink`，可以被组件作用域化。                                     |
| [@unocss/preset-rem-to-px](https://github.com/unocss/unocss/tree/main/packages-presets/preset-rem-to-px)                                                                                                                                                                                                                                                                | ✅   | 此类和所有仅修改样式输出的预设将能够工作。                                                                                                                                                                         |
| [@unocss/preset-attributify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-attributify)                                                                                                                                                                                                                                                            | -    | 此预设无法工作。相反，使用 [unplugin-attributify-to-class](https://github.com/MellowCo/unplugin-attributify-to-class) Vite 插件（`attributifyToClass({ include: [/\.svelte$/]})`）在 Svelte Scoped Vite 插件之前。 |
| [@unocss/preset-tagify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-tagify)                                                                                                                                                                                                                                                                      | -    | 添加自定义提取器的预设将无法工作。创建一个预处理器，将 `<text-red>Hi</text-red>` 转换为 `<span class="text-red">Hi</span>`，然后创建一个 PR 将链接添加到这里。                                                     |

对于其他预设，如果它们不依赖于传统的 `class="..."` 使用，你需要首先将这些类名预处理到 `class="..."` 属性中。如果它们添加了如 typography 的 `.prose` 类，则需要将触发预设添加的类放入你的安全列表中。

### 转换器支持

转换器支持你的 CSS 文件（css|postcss|sass|scss|less|stylus|styl）。要使用它们，请在你的 `vite.config.ts` 中的 `cssFileTransformers` 选项中添加转换器：

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
由于 Svelte Scoped 的工作方式，转换器不支持在 Svelte 组件中使用。
:::

## 作用域工具类释放创造力

有关何时可能想要使用作用域样式的一些建议：如果你在大型项目中，每次使用像 `.md:max-w-[50vw]` 这样的类时，你知道它只使用一次，你会感到不安，因为你可以察觉到全局样式表在不断增大，那么就试试这个包。对使用你所需的类的犹豫限制了创造力。当然，你可以在样式块中使用 `--at-apply: md:max-w-[50vw]`，但这会变得繁琐，并且在上下文中的样式是有用的。此外，如果你希望在项目中包含各种图标，你会开始感觉到将它们添加到全局样式表的负担。当每个组件都承载自己的样式和图标时，你可以继续扩展你的项目，而无需分析每个新添加的成本效益。

## 许可证

- MIT 许可证 &copy; 2022-PRESENT [Jacob Bowdoin](https://github.com/jacob-8)
