---
title: 配置 UnoCSS
description: 配置使 UnoCSS 功能强大。
outline: deep
---

# 配置 UnoCSS

## 配置

配置使 UnoCSS 功能强大。

- [规则](/config/rules) - 定义原子 CSS 工具类
- [快捷方式](/config/shortcuts) - 将多个规则组合成一个简写。
- [主题](/config/theme) - 定义主题变量。
- [变体](/config/variants) - 将自定义约定应用于规则。
- [提取器](/config/extractors) - 定义工具类的使用位置和提取方式。
- [预飞行](/config/preflights) - 定义全局原生 CSS。
- [层](/config/layers) - 定义每个工具类层的顺序。
- [预设](/config/presets) - 常用案例的预定义配置。
- [转换器](/config/transformers) - 代码转换器以用户源代码支持约定。
- [自动补全](/config/autocomplete) - 定义自定义的自动补全建议。

## 选项

### rules

- **类型：** `Rule<Theme>[]`

生成 CSS 工具类的规则。后面的条目优先级更高。

### shortcuts

- **类型：** `UserShortcuts<Theme>`

类似于 Windi CSS 的快捷方式，允许您通过组合现有规则来创建新的工具类。后面的条目优先级更高。

### theme

- **类型：** `Theme`

主题对象，用于规则之间的共享配置。

### extendTheme

- **类型：** `Arrayable<ThemeExtender<Theme>>`
  自定义函数变更主题对象。

也可以返回一个新的主题对象以完全替换原始主题。

### variants

- **类型：** `Variant<Theme>[]`

变体可对选择器进行预处理，有能力重写 CSS 对象。

### extractors

- **类型：** `Extractor[]`

提取器用于处理源文件并输出可能的类/选择器。可以感知语言。

### preflights

- **类型：** `Preflight<Theme>[]`

原生 CSS 注入。

### layers

- **类型：** `Record<string, number>`

层顺序。默认为 0。

### outputToCssLayers

- **类型：** `boolean | UseCssLayersOptions`
- **默认：** `false`

将层输出到 CSS Cascade Layers。

#### cssLayerName

- **类型：** `(internalLayer: string) => string | undefined | null`

指定内部层应输出到的 CSS 层的名称（可以是子层，例如 "mylayer.mysublayer"）。

如果返回 `undefined`，将使用内部层名称作为 CSS 层名称。
如果返回 `null`，内部层将不会输出到 CSS 层。

### sortLayers

- **类型：** `(layers: string[]) => string[]`

自定义函数以排序层。

### presets

- **类型：** `(PresetOrFactory<Theme> | PresetOrFactory<Theme>[])[]`

常用案例的预定义配置。

### transformers

- **类型：** `SourceCodeTransformer[]`

对源代码的自定义转换器。

### blocklist

- **类型：** `BlocklistRule[]`

排除设计系统的选择器的规则（以缩小可能性）。结合 `warnExcluded` 选项也可以帮助您识别错误的使用。

### safelist

- **类型：** `string[]`

始终包含的工具类。

### preprocess

- **类型：** `Arrayable<Preprocessor>`

对传入的工具类进行预处理，返回假值以排除。

### postprocess

- **类型：** `Arrayable<Postprocessor>`

对生成的工具对象进行后处理。

### separators

- **类型：** `Arrayable<string>`
- **默认：** `[':', '-']`

变体分隔符。

### extractorDefault

- **类型：** `Extractor | null | false`
- **默认：** `import('@unocss/core').defaultExtractor`

始终应用的默认提取器。默认情况下，它通过空格和引号拆分源代码。

可以被预设或用户配置替换，只有一个默认提取器可以存在，后来的会覆盖之前的。

传入 `null` 或 `false` 以禁用默认提取器。

### autocomplete

自动补全的附加选项。

#### templates

- **类型：** `Arrayable<AutoCompleteFunction | AutoCompleteTemplate>`

自定义函数/模板以提供自动补全建议。

#### extractors

- **类型：** `Arrayable<AutoCompleteExtractor>`

自定义提取器以获取可能的类，并将类名称样式建议转换为正确格式。

#### shorthands

- **类型：** `Record<string, string | string[]>`

自定义简写以提供自动补全建议。如果值是一个数组，将用 `|` 连接并用 `()` 包裹。

### content

用于提取为工具类使用的源的选项。

支持的源：

- `filesystem` - 从文件系统提取
- `plain` - 从纯文本提取
- `pipeline` - 从构建工具的转换管道提取，例如 Vite 和 Webpack

从每个源提取的使用将被 **合并** 在一起。

#### filesystem

- **类型：** `string[]`
- **默认：** `[]`

从文件系统提取的全局模式，除了其他内容源。

在开发模式下，文件将被监视并触发 HMR。

#### inline

- **类型：** `string | { code: string; id?: string } | (() => Awaitable<string | { code: string; id?: string }>)) []`

要提取的内联文本。

#### pipeline

过滤器以确定是否从构建工具的转换管道中提取某些模块。

目前仅适用于 Vite 和 Webpack 集成。

设置为 `false` 以禁用。

##### include

- **类型：** `FilterPattern`
- **默认：** `[/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/]`

过滤被提取文件的模式。支持正则表达式和 `picomatch` 全局模式。

默认情况下，不提取 `.ts` 和 `.js` 文件。

##### exclude

- **类型：** `FilterPattern`
- **默认：** `[/\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/]`

过滤不被提取文件的模式。支持正则表达式和 `picomatch` 全局模式。

默认情况下，`node_modules` 和 `dist` 也会被提取。

### configResolved

- **类型：** `(config: ResolvedConfig) => void`

修改已解析配置的钩子。

首次运行预设，然后是用户配置。

### configFile

- **类型：** `string | false`

从配置文件加载。

设置为 `false` 以禁用。

### configDeps

- **类型：** `string[]`

将触发配置重新加载的文件列表。

### cli

UnoCSS CLI 选项。

#### entry

- **类型：** `Arrayable<CliEntryItem>`

UnoCSS cli 入口点。

##### patterns

- **类型：** `string[]`

从文件系统提取的全局模式。

##### outFile

- **类型：** `string`

输出文件路径。

### shortcutsLayer

- **类型：** `string`
- **默认：** `'shortcuts'`

快捷方式的布局名称。

### envMode

- **类型：** `'dev' | 'build'`
- **默认：** `'build'`

环境模式。

### details

- **类型：** `boolean`

公开内部细节以便于调试/检查。

### warn

- **类型：** `boolean`
- **默认：** `true`

在匹配到的选择器出现在黑名单中时发出警告。
