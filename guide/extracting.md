---
url: 'https://unocss.zhcndoc.com/guide/extracting.md'
---

# 提取

UnoCSS 通过在你的代码库中搜索工具的使用，按需生成相应的 CSS。我们称这一过程为 **提取**。

## 内容来源

UnoCSS 支持从多个来源提取工具的使用：

* [构建工具管道](#从构建工具管道提取) - 直接从构建工具管道中提取
* [文件系统](#从文件系统提取) - 通过读取和监视文件从文件系统中提取
* [内联](#从内联文本提取) - 从内联纯文本中提取

来自不同来源的工具使用将合并在一起，生成最终的 CSS。

### 从构建工具管道提取

这在 [Vite](/integrations/vite) 和 [Webpack](/integrations/webpack) 集成中受支持。

UnoCSS 将读取经过构建工具管道的内容，并从中提取工具的使用。这是提取的最有效和准确的方法，因为我们仅智能地提取在你的应用中实际使用的工具，且提取过程中不进行额外的文件 I/O 操作。

默认情况下，UnoCSS 会从构建流程中的 `.jsx`、`.tsx`、`.vue`、`.md`、`.html`、`.svelte`、`.astro`、`.marko` 等扩展名的文件中提取工具类的使用，并按需生成相应的 CSS。`.js` 和 `.ts` 文件**默认不包含**。

要配置它们，你可以更新你的 `uno.config.ts`：

```ts [uno.config.ts]
export default defineConfig({
  content: {
    pipeline: {
      include: [
        // 默认
        /\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|marko|html)($|\?)/,
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
  'p-1', // 精确匹配并阻止 p-1
  'tab', // 精确匹配并阻止 tab
]
```

这将排除 `p-1` 以及 `p-2`、`p-3`、`p-4` 的生成。

**正则表达式** — 模式匹配（使用 `.test()`）：

```ts [uno.config.ts]
blocklist: [
  /^p-[2-4]$/, // 阻止 p-2、p-3、p-4
  /^border$/, // 阻止 "border" 但不阻止 "border-2"
]
```

**函数** — 自定义逻辑，返回真值即阻止：

```ts [uno.config.ts]
blocklist: [
  s => s.endsWith('px'), // 阻止所有以 px 结尾的类名
  s => s.split('-').length > 4, // 阻止嵌套层级过深的工具类
]
```

#### 消息提示

每个匹配器可以可选地用一个包含说明阻止原因的 `message` 的元组包装。消息可以是静态字符串，也可以是接收被匹配选择器的回调：

```ts [uno.config.ts]
blocklist: [
  // 静态消息
  [/^border$/, { message: '请使用更短的 "b"' }],

  // 动态消息 — 接收被阻止的选择器
  [/^border(?:-[btrlxy])?$/, {
    // 例如 "border-y" → '请使用更短的 "b-y"'
    message: v => `请使用更短的 "${v.replace(/^border/, 'b')}"`
  }],
]
```

与 `@unocss/eslint-plugin` 配合使用时，消息会显示在 lint 输出中：

```shell
"border" 在黑名单中：请使用更短的 "b"
```

如果没有 ESLint 插件，被阻止的工具类将静默地从 CSS 生成中排除，开发者不会收到反馈。
**建议结合使用 `@unocss/eslint-plugin` 和 blocklist 规则**，以便在开发期间显示可操作的消息。

#### 变体处理

黑名单会在 **去除变体之前和之后** 检查选择器。
阻止 `p-1` 的规则也会阻止 `hover:p-1`、`md:p-1`、`dark:p-1` 等。
你不需要在黑名单模式中考虑变体前缀。

#### 合并行为

所有预设和用户配置的黑名单规则会被 **合并** — 它们会累积，不会相互覆盖。
任何在任一预设或用户配置中被阻止的工具都会保持被阻止状态。

#### 类型参考

```ts
type BlocklistValue = string | RegExp | ((selector: string) => boolean | null | undefined)
type BlocklistRule = BlocklistValue | [BlocklistValue, BlocklistMeta]

interface BlocklistMeta {
  /**
   * 用于显示阻止原因的自定义消息。
   */
  message?: string | ((selector: string) => string)
}
```

### 黑名单模式示例

以下是一些常见的黑名单使用模式，帮助你更有效地使用黑名单。

#### 强制使用更简短的别名

由于 UnoCSS 支持多种语法实现相同的 CSS 输出，你可以阻止冗长形式，推荐更简洁的形式：

```ts [uno.config.ts]
blocklist: [
  // "border" → "b", "border-t" → "b-t"
  [/^border(?:-[btrlxy])?$/, {
    message: v => `请使用更短的 "${v.replace(/^border/, 'b')}"`
  }],

  // "opacity-50" → "op-50"
  // "backdrop-opacity-50" → "backdrop-op-50"
  [/^(?:backdrop-)?opacity-(.+)$/, {
    message: v => `请使用更短的 "${v.replace(/opacity-/, 'op-')}"`
  }],

  // "whitespace-nowrap" → "ws-nowrap"
  [/^whitespace-.+$/, {
    message: v => `请使用更短的 "${v.replace(/^whitespace-/, 'ws-')}"`
  }],

  // 简单的静态别名非常适合一一替换
  [/^flex-grow$/, { message: '请使用更短的 "grow"' }],
  [/^flex-shrink$/, { message: '请使用更短的 "shrink"' }],
  [/^inline-block$/, { message: '请使用更短的 "i-block"' }], // 你也可以指向自定义快捷方式
]
```

#### 限制为设计系统的令牌

你可以根据设计系统配置动态生成黑名单模式，确保只使用有效令牌。
使用负向前瞻来允许有效值，其它全部阻止：

```ts [uno.config.ts]
import { theme } from './my-design-system'

// 辅助函数，将对象的键连接成正则表达式的或匹配
const keys = (obj: Record<string, any>) => Object.keys(obj).join('|')

blocklist: [
  // 仅允许设计系统中定义的字体系列
  [new RegExp(`^font-(?!(?:${keys(theme.fontFamily)}|\\$)$).+$`), {
    message: `请使用设计系统字体系列：${Object.keys(theme.fontFamily).join(', ')}`
  }],

  // 仅允许设计系统中定义的阴影值
  [new RegExp(`^shadow-(?!(?:${keys(theme.boxShadow)}|\\$)).+$`), {
    message: `只允许使用设计系统的阴影值。`
  }],
]
```

::: tip
正则中的 `\\$` 允许 CSS 变量引用（例如 `font-$myVar`）通过，因为它们在运行时解析，无法静态验证。
:::

#### 将原生单位转换为刻度值

如果你的项目使用 UnoCSS 默认的间距刻度（1 单位 = 0.25rem = 4px），你可以阻止原生的 `px` 和 `rem` 值，并建议使用刻度等价的值：

```ts [uno.config.ts]
blocklist: [
  // "mt-16px" → "mt-4"
  // "p-[8px]" → "p-2"
  // "w-2rem" → "w-8"
  [/^.+-\[?[\d.]+(?:px|rem)\]?$/, {
    message: (s) => {
      // 由于 message() 只接受匹配的选择器字符串，而不接受正则表达式，
      // 所以需要再次匹配以提取捕获组
      const m = s.match(/\[?(?<v>[\d.]+)(?<u>px|rem)\]?$/)!
      const { v, u } = m.groups!
      const scale = u === 'rem' ? +v * 4 : +v / 4
      return `请使用间距刻度值：${s.slice(0, -m[0].length)}${scale}`
    }
  }],
]
```

#### 移除不必要的方括号

UnoCSS 的任意值括号 `[...]` 经常不必要，当值本身已经合法时可以省略：

```ts [uno.config.ts]
blocklist: [
  // "w-[50%]" → "w-50%"
  [/^(w|h|min-[wh]|max-[wh]|top|right|bottom|left)-\[\d+%\]$/, {
    message: (v) => {
      const value = v.match(/\[(\d+%)\]/)?.[1] || ''
      return `请使用更简短的 ${v.replace(/-\[\d+%\]/, `-${value}`)}`
    }
  }],

  // "outline-[#ff0000]" → "outline-#ff0000"
  [/^[a-z-]+-\[#[0-9a-fA-F]{3,6}\]$/, {
    message: v => `请使用更简短的 ${v.replace(/\[#/, '#').replace(/\]/, '')}`
  }],
]
```

#### 强制约定

阻止违反项目特定架构决策的模式：

```ts [uno.config.ts]
blocklist: [
  // 防止冗余断点 — 如果 "sm" 等于 0，则它总是生效
  // 在移动优先响应设计中应避免指定
  [/^sm:/, {
    message: v => `sm: 断点是冗余的，请使用 "${v.replace(/^sm:/, '')}"`
  }],

  // 强制使用分离的工具类，而非斜杠不透明度标记。
  // 分离的工具类更可能重用，帮助减少最终 CSS 包大小
  // "bg-red-500/50" → "bg-red-500 bg-op-50"
  [/^(c|bg)-.+\/\d+$/, {
    message: '请使用分离的透明度类代替斜杠标记（例如 "bg-red bg-op-50"）。'
  }],

  // 将简写拆解为可重用的独立属性。
  // 同理，分离工具类有助于减少 CSS 包大小
  // "size-4" → "w-4 h-4"
  [/^size-(.+)$/, {
    message: (v) => {
      const size = v.match(/^size-(.+)$/)?.[1]
      return `请使用 "w-${size} h-${size}" 来独立控制`
    }
  }],
]
```
