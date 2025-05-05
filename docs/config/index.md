---
title: 配置 UnoCSS
description: 配置使 UnoCSS 强大。
outline: deep
---

# 配置 UnoCSS

## 配置

配置使 UnoCSS 强大。

- [规则](/config/rules) - 定义原子 CSS 工具
- [快捷键](/config/shortcuts) - 将多个规则组合成一个简写。
- [主题](/config/theme) - 定义主题变量。
- [变种](/config/variants) - 将自定义约定应用于规则。
- [提取器](/config/extractors) - 定义工具的使用何处以及如何被提取。
- [预飞行](/config/preflights) - 定义全局原始 CSS。
- [层](/config/layers) - 定义每个工具层的顺序。
- [预设](/config/presets) - 预定义配置以满足常见用例。
- [转换器](/config/transformers) - 代码转换器，以用户源代码支持约定。
- [自动完成](/config/autocomplete) - 定义自定义自动完成建议。

## 选项

### rules

- **类型:** `Rule<Theme>[]`

生成 CSS 工具的规则。后面的条目具有更高的优先级。

### shortcuts

- **类型:** `UserShortcuts<Theme>`

类似于 Windi CSS 的快捷键，允许您通过组合现有工具来创建新的工具。后面的条目具有更高的优先级。

### theme

- **类型:** `Theme`

用于规则之间共享配置的主题对象。

### extendTheme

- **类型:** `Arrayable<ThemeExtender<Theme>>`
  自定义函数变更主题对象。

也可以返回一个新的主题对象以完全替换原始对象。

### variants

- **类型:** `Variant<Theme>[]`

预处理选择器的变种，能够重写 CSS 对象。

### extractors

- **类型:** `Extractor[]`

提取器处理源文件并输出可能的类/选择器。可以是语言感知。

### preflights

- **类型:** `Preflight<Theme>[]`

原始 CSS 注入。

### layers

- **类型:** `Record<string, number>`

层的顺序。默认值为 0。

### outputToCssLayers

- **类型:** `boolean | UseCssLayersOptions`
- **默认:** `false`

将层输出到 CSS 级联层。

#### cssLayerName

- **类型:** `(internalLayer: string) => string | undefined | null`

指定内部层应输出到的 CSS 层的名称（可以是子层，例如 "mylayer.mysublayer"）。

如果返回 `undefined`，则使用内部层名称作为 CSS 层名称。
如果返回 `null`，则内部层将不输出到 CSS 层。

### sortLayers

- **类型:** `(layers: string[]) => string[]`

自定义函数以排序层。

### presets

- **类型:** `(PresetOrFactory<Theme> | PresetOrFactory<Theme>[])[]`

用于常见用例的预定义配置。

### transformers

- **类型:** `SourceCodeTransformer[]`

自定义源代码转换器。

### blocklist

- **类型:** `BlocklistRule[]`

规则，用于排除设计系统的选择器（缩小可能性）。结合 `warnExcluded` 选项也可以帮助您识别错误使用。

### safelist

- **类型:** `string[]`

始终包含的工具。

### preprocess

- **类型:** `Arrayable<Preprocessor>`

预处理传入的工具，返回假值以排除。

### postprocess

- **类型:** `Arrayable<Postprocessor>`

后处理生成的工具对象。

### separators

- **类型:** `Arrayable<string>`
- **默认:** `[':', '-']`

变种分隔符。

### extractorDefault

- **类型:** `Extractor | null | false`
- **默认:** `import('@unocss/core').defaultExtractor`

始终应用的默认提取器。默认情况下，它通过空格和引号拆分源代码。

可以被预设或用户配置替换，仅能有一个默认提取器，后一个将覆盖先前的提取器。

传递 `null` 或 `false` 以禁用默认提取器。

### autocomplete

自动完成的附加选项。

#### templates

- **类型:** `Arrayable<AutoCompleteFunction | AutoCompleteTemplate>`

自定义函数/模板以提供自动完成建议。

#### extractors

- **类型:** `Arrayable<AutoCompleteExtractor>`

自定义提取器以拾取可能的类并将类名样式建议转换为正确格式。

#### shorthands

- **类型:** `Record<string, string | string[]>`

自定义简写以提供自动完成建议。如果值是数组，它将与 `|` 连接并用 `()` 包裹。

### content

用于提取工具用法的源选项。

支持的来源：

- `filesystem` - 从文件系统提取
- `inline` - 从纯行内文本提取
- `pipeline` - 从构建工具的转换管道提取，例如 Vite 和 Webpack

从每个来源提取的用法将被 **合并** 在一起。

#### filesystem

- **类型:** `string[]`
- **默认:** `[]`

从文件系统中提取的全局模式，除了其他内容源。`node_modules` 默认情况下被忽略，但当您指定路径包含 `node_modules` 时，unocss 会从中扫描。

在开发模式下，文件将被监视并触发 HMR。

#### inline

- **类型:** `string | { code: string; id?: string } | (() => Awaitable<string | { code: string; id?: string }>)) []`

要提取的行内文本。

#### pipeline

确定是否从构建工具的转换管道中提取特定模块的过滤器。

当前仅适用于 Vite 和 Webpack 集成。

设置为 `false` 以禁用。

##### include

- **类型:** `FilterPattern`
- **默认:** `[/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/]`

过滤被提取文件的模式。支持正则表达式和 `picomatch` glob 模式。

默认情况下，`.ts` 和 `.js` 文件不会被提取。

##### exclude

- **类型:** `FilterPattern`
- **默认:** `[/\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/]`

不被提取文件的过滤模式。支持正则表达式和 `picomatch` glob 模式。

默认情况下，`node_modules` 和 `dist` 也会被提取。

### configResolved

- **类型:** `(config: ResolvedConfig) => void`

用于修改解析配置的钩子。

首先运行预设，然后是用户配置。

### configFile

- **类型:** `string | false`

从配置文件加载。

设置为 `false` 以禁用。

### configDeps

- **类型:** `string[]`

将触发配置重载的文件列表。

### cli

UnoCSS CLI 选项。

#### entry

- **类型:** `Arrayable<CliEntryItem>`

UnoCSS CLI 入口点。

##### patterns

- **类型:** `string[]`

从文件系统提取的 glob 模式。

##### outFile

- **类型:** `string`

输出文件路径。

### shortcutsLayer

- **类型:** `string`
- **默认:** `'shortcuts'`

快捷键的布局名称。

### envMode

- **类型:** `'dev' | 'build'`
- **默认:** `'build'`

环境模式。

### details

- **类型:** `boolean`

揭示内部细节以进行调试/检查。

### warn

- **类型:** `boolean`
- **默认:** `true`

当匹配的选择器出现在黑名单中时发出警告。
