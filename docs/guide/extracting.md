---
outline: deep
---

# 提取

UnoCSS 通过在你的代码库中搜索工具的使用，按需生成相应的 CSS。我们称这一过程为 **提取**。

## 内容来源

UnoCSS 支持从多个来源提取工具的使用：

- [构建工具管道](#extracting-from-build-tools-pipeline) - 直接从构建工具管道中提取
- [文件系统](#extracting-from-filesystem) - 通过读取和监视文件从文件系统中提取
- [内联](#extracting-from-inline-text) - 从内联纯文本中提取

来自不同来源的工具使用将合并在一起，生成最终的 CSS。

### 从构建工具管道提取

这在 [Vite](/integrations/vite) 和 [Webpack](/integrations/webpack) 集成中受支持。

UnoCSS 将读取经过构建工具管道的内容，并从中提取工具的使用。这是提取的最有效和准确的方法，因为我们仅智能地提取在你的应用中实际使用的工具，且提取过程中不进行额外的文件 I/O 操作。

默认情况下，UnoCSS 将从构建管道中的扩展名为 `.jsx`、`.tsx`、`.vue`、`.md`、`.html`、`.svelte`、`.astro` 的文件中提取工具使用，并按需生成适当的 CSS。`.js` 和 `.ts` 文件默认为 **不包括**。

要配置它们，你可以更新你的 `uno.config.ts`：

```ts [uno.config.ts]
export default defineConfig({
  content: {
    pipeline: {
      include: [
        // 默认
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // 包括 js/ts 文件
        'src/**/*.{js,ts}',
      ],
      // 排除文件
      // exclude: []
    },
  },
})
```

你还可以在需要 UnoCSS 扫描的文件中的任意位置添加 `@unocss-include` 魔法注释，以逐个文件为单位。这对于需要扫描 `*.js` 或 `*.ts` 文件时尤其有用，需在配置中包含所有 js/ts 文件作为扫描目标。

```ts
// ./some-utils.js

// 由于 `.js` 文件未默认包含，
// 以下注释告知 UnoCSS 强制扫描此文件。
// @unocss-include
export const classes = {
  active: 'bg-primary text-white',
  inactive: 'bg-gray-200 text-gray-500',
}
```

同样，你也可以添加 `@unocss-ignore` 来跳过整个文件的扫描和转换。

如果你想让 UnoCSS 跳过一块代码而不在任何提取文件中被提取，你可以使用 `@unocss-skip-start` 和 `@unocss-skip-end` 作为成对使用。请注意，它必须 **成对使用** 才能生效。

```html
<p class="text-green text-xl">绿色大号</p>

<!-- @unocss-skip-start -->
<!-- `text-red` 将不会被提取 -->
<p class="text-red">红色</p>
<!-- @unocss-skip-end -->
```

### 从文件系统提取

在使用没有访问构建工具管道的集成的情况下（例如 [PostCSS](/integrations/postcss) 插件），或者在与后端框架集成时，因为代码没有经过管道，你可以手动指定要提取的文件。

```ts [uno.config.ts]
export default defineConfig({
  content: {
    filesystem: [
      'src/**/*.php',
      'public/*.html',
    ],
  },
})
```

符合条件的文件将直接从文件系统读取，并在开发模式下监视其变化。

### 从内联文本提取

此外，你还可以从可能从其他地方检索到的内联文本中提取工具的使用。

你也可以传递一个异步函数以返回内容。但请注意，该函数将在构建时只调用一次。

```ts [uno.config.ts]
export default defineConfig({
  content: {
    inline: [
      // 纯文本
      '<div class="p-4 text-red">一些文本</div>',
      // 异步获取器
      async () => {
        const response = await fetch('https://example.com')
        return response.text()
      },
    ],
  },
})
```

## 限制

由于 UnoCSS 在 **构建时** 工作，这意味着只有静态呈现的工具将被生成并打包到你的应用中。动态使用或在运行时从外部资源获取的工具可能 **不会** 被检测或应用。

### 安全列表

有时你可能想使用动态连接，例如：

```html
<div class="p-${size}"></div>
<!-- 这将不起作用！ -->
```

由于 UnoCSS 在构建时使用静态提取，因此在编译时它无法知道所有工具的组合。为此，你可以配置 `safelist` 选项。

```ts [uno.config.ts]
safelist: 'p-1 p-2 p-3 p-4'.split(' ')
```

对应的 CSS 将始终生成：

<!-- eslint-skip -->

```css
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
```

或者更灵活地：

```ts [uno.config.ts]
safelist: [
  ...Array.from({ length: 4 }, (_, i) => `p-${i + 1}`),
]
```

如果你寻求在运行时进行真正的动态生成，你可能需要查看 [@unocss/runtime](/integrations/runtime) 包。

### 静态列表组合

解决动态构造工具限制的另一种方法是，你可以使用一个对象列出所有组合 **静态**。例如，如果你想要这个：

```html
<div class="text-${color} border-${color}"></div>
<!-- 这将不起作用！ -->
```

你可以创建一个对象，列出所有组合（假设你知道想要使用的 `color` 的所有可能值）

```ts
// 由于它们是静态的，UnoCSS 将能够在构建时提取它们
const classes = {
  red: 'text-red border-red',
  green: 'text-green border-green',
  blue: 'text-blue border-blue',
}
```

然后在你的模板中使用它：

```html
<div class="${classes[color]}"></div>
```

### 黑名单

类似于 `safelist`，你也可以配置 `blocklist` 以排除一些工具的生成。这对于排除一些提取的误报非常有用。与 `safelist` 不同，`blocklist` 同时接受字符串以进行精确匹配和正则表达式以进行模式匹配。

```ts [uno.config.ts]
blocklist: [
  'p-1',
  /^p-[2-4]$/,
]
```

这将排除 `p-1` 以及 `p-2`、`p-3`、`p-4` 的生成。
