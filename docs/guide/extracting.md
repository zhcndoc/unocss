---
outline: deep
---

# 提取

UnoCSS 通过从您的代码库中搜索实用程序的使用情况并按需生成相应的 CSS 来工作。我们称这个过程为 **提取**。

## 内容来源

UnoCSS 支持从多个来源提取实用程序的使用情况：

- [管道](#从构建工具管道提取) - 直接从您的构建工具管道提取
- [文件系统](#从文件系统提取) - 通过读取和监视文件从您的文件系统提取
- [内联](#从内联文本提取) - 从内联纯文本中提取

来自不同来源的实用程序使用情况将被合并在一起，并生成最终的 CSS。

### 从构建工具管道提取

在 [Vite](/integrations/vite) 和 [Webpack](/integrations/webpack) 集成中支持此功能。

UnoCSS 将读取通过您构建工具管道的内容并从中提取实用程序的使用情况。这是提取的最有效和最准确的方法，因为我们只提取在您的应用中实际使用的用法，提取过程中不会进行额外的文件 I/O。

默认情况下，UnoCSS 将从构建管道中扩展名为 `.jsx`、`.tsx`、`.vue`、`.md`、`.html`、`.svelte`、`.astro` 的文件中提取实用程序使用情况，然后按需生成相应的 CSS。`.js` 和 `.ts` 文件**默认不包含**。

要配置它们，您可以更新您的 `uno.config.ts`：

```ts [uno.config.ts]
export default defineConfig({
  content: {
    pipeline: {
      include: [
        // 默认
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // 包含 js/ts 文件
        'src/**/*.{js,ts}',
      ],
      // 排除文件
      // exclude: []
    },
  },
})
```

您还可以在文件的任何位置添加 `@unocss-include` 魔法注释，以便逐个文件地让 UnoCSS 扫描。如果您需要扫描 `*.js` 或 `*.ts` 文件，请在配置中将它们包括为扫描目标。

```ts
// ./some-utils.js

// 由于 `.js` 文件默认不包含，
// 以下注释告知 UnoCSS 强制扫描此文件。
// @unocss-include
export const classes = {
  active: 'bg-primary text-white',
  inactive: 'bg-gray-200 text-gray-500',
}
```

类似地，您也可以添加 `@unocss-ignore` 来绕过整个文件的扫描和转换。

如果您希望 UnoCSS 跳过某段代码而不在任何提取文件中被提取，可以成对使用 `@unocss-skip-start` `@unocss-skip-end`。请注意，它必须成对使用才能生效。

```html
<p class="text-green text-xl">绿色大号</p>

<!-- @unocss-skip-start -->
<!-- `text-red` 将不会被提取 -->
<p class="text-red">红色</p>
<!-- @unocss-skip-end -->
```

### 从文件系统提取

在使用不具备访问构建工具管道的集成时（例如， [PostCSS](/integrations/postcss) 插件），或者您与后台框架集成，使代码未经过管道时，您可以手动指定要提取的文件。

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

匹配的文件将直接从文件系统读取，并在开发模式下监视更改。

### 从内联文本提取

此外，您还可以从可能从其他地方获取的内联文本中提取实用程序的使用情况。

您还可以传递一个异步函数来返回内容。但请注意，该函数仅在构建时调用一次。

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

由于 UnoCSS 在 **构建时** 工作，这意味着只有静态呈现的实用程序将被生成并发送到您的应用。动态使用或在运行时从外部资源获取的实用程序可能**无法**被检测或应用。

### 安全列表

有时您可能希望使用动态串联，例如：

```html
<div class="p-${size}"></div>
<!-- 这不起作用！ -->
```

由于 UnoCSS 在构建时通过静态提取工作，因此在编译时它无法知道所有实用程序的组合。为此，您可以配置 `safelist` 选项。

```ts [uno.config.ts]
safelist: 'p-1 p-2 p-3 p-4'.split(' ')
```

相应的 CSS 将始终被生成：

<!-- eslint-skip -->

```css
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
```

或者更加灵活：

```ts [uno.config.ts]
safelist: [
  ...Array.from({ length: 4 }, (_, i) => `p-${i + 1}`),
]
```

如果您希望在运行时进行真正的动态生成，可以查看 [@unocss/runtime](/integrations/runtime) 包。

### 静态列表组合

处理动态构建的实用程序限制的另一种方法是使用一个对象来列出所有组合 **静态**。例如，如果您想要这个：

```html
<div class="text-${color} border-${color}"></div>
<!-- 这不起作用！ -->
```

您可以创建一个列出所有组合的对象（假设您知道任何可能使用的 `color` 值）

```ts
// 由于它们是静态的，UnoCSS 将能够在构建时提取它们
const classes = {
  red: 'text-red border-red',
  green: 'text-green border-green',
  blue: 'text-blue border-blue',
}
```

然后在模板中使用它：

```html
<div class="${classes[color]}"></div>
```

### 阻止列表

与 `safelist` 类似，您也可以配置 `blocklist` 来排除一些实用程序的生成。这对于排除一些提取的假阳性非常有用。与 `safelist` 不同，`blocklist` 接受字符串的精确匹配和正则表达式的模式匹配。

```ts [uno.config.ts]
blocklist: [
  'p-1',
  /^p-[2-4]$/,
]
```

这将排除 `p-1` 和 `p-2`、`p-3`、`p-4` 的生成。
