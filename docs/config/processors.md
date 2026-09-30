# 处理器

处理器是一组用于转换生成 CSS 的钩子。与在提取前修改源代码的[转换器](/config/transformers)不同，处理器会在 UnoCSS 生成 CSS 层之后运行。

## 定义处理器

处理器接收某一层的 CSS，并返回用于替换它的 CSS。同步和异步结果均受支持。

```ts [uno.config.ts]
import type { CSSProcessor } from '@unocss/core'
import { defineConfig } from 'unocss'

const banner: CSSProcessor = {
  name: 'add-banner',
  order: 10,
  process(css, { layer, envMode }) {
    if (envMode !== 'build')
      return css
    return `/* generated layer: ${layer} */\n${css}`
  },
}

export default defineConfig({
  processors: [banner],
})
```

## 处理流程

对于每个非空 CSS 层，UnoCSS 会执行以下步骤：

1. 生成原始层 CSS，其中包括预检内容，以及已启用的 CSS 层包装器或层标记。
2. 按 `order` 从小到大对处理器排序。
3. 依次将该层传递给每个处理器。前一个处理器的输出会成为下一个处理器的输入。
4. 缓存处理后的层，并通过 `getLayer()`、`getLayers()` 和 `css` 暴露。

不同层可能会并发处理。处理器应避免依赖各层之间共享的可变状态。

`setLayer()` 更改某一层时，其回调会收到未经处理的原始 CSS。随后 UnoCSS 会再次将更新后的 CSS 传入完整的处理器链，避免处理器反复作用于自己上一次的输出。

```text
generated layer
  -> 处理器 1
  -> 处理器 2
  -> 处理后的层输出
```

如果处理器抛出错误，生成过程会失败，并将错误传递给调用方。

## 上下文

传递给 `process()` 的第二个参数是 `CSSProcessorContext`：

```ts
interface CSSProcessorContext<Theme extends object = object> {
  layer: string
  theme: Theme
  envMode: 'dev' | 'build'
}
```

- `layer` 是当前生成层的名称。
- `theme` 是解析后的 UnoCSS 主题。
- `envMode` 表示 UnoCSS 正在为开发环境还是生产构建生成 CSS。

## 处理器顺序

`order` 较小的处理器会先运行。未显式指定顺序的处理器使用 `0`。

```ts
processors: [
  { name: 'minify', order: 20, process: minify },
  { name: 'prefix', order: 10, process: addPrefixes },
]
```

在此示例中，`prefix` 会先于 `minify` 运行。

预设中声明的处理器会与用户配置中的处理器合并。移除重复处理器时，会使用处理器的 `name` 进行识别。

## 官方处理器

- [Lightning CSS 处理器](/processors/lightningcss)
