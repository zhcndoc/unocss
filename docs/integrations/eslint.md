---
title: UnoCSS ESLint 配置
description: UnoCSS 的 ESLint 配置（@unocss/eslint-config）。
---

# ESLint 配置

UnoCSS 的 ESLint 配置：`@unocss/eslint-config`。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/eslint-config
```

```bash [yarn]
yarn add -D @unocss/eslint-config
```

```bash [npm]
npm install -D @unocss/eslint-config
```

```bash [bun]
bun add -D @unocss/eslint-config
```

:::

在 [扁平配置样式](https://eslint.org/docs/latest/use/configure/configuration-files-new) 中：

```js [eslint.config.js]
import unocss from '@unocss/eslint-config/flat'

export default [
  unocss,
  // 其他配置
]
```

在传统 `.eslintrc` 样式中：

```json [.eslintrc]
{
  "extends": [
    "@unocss"
  ]
}
```

## 规则

规则前缀取决于 ESLint 配置样式：

- 扁平配置：`unocss/<rule-name>`
- 传统 `.eslintrc`：`@unocss/<rule-name>`

可用规则：

- `order` - 强制类选择器按特定顺序排列，包括带前缀的属性化属性值（例如 `un-before="..."`）。
- `order-attributify` - 强制属性化选择器按特定顺序排列。
- `blocklist` - 禁止使用特定类选择器 [可选]。
- `enforce-class-compile` - 强制执行类编译 [可选]。

`order-attributify` 会对属性化属性本身排序。带前缀的属性化属性值中的工具类（例如 `un-before="text-center font-sans color-gray"`）则由 `order` 规则排序。前缀从 UnoCSS 配置中 `presetAttributify` 的 `prefix` 选项读取，默认为 `un-`。设置空前缀后，除 `class` 外的属性值将不再排序。目前尚不支持对其他属性化属性值排序。

### 规则选项

#### `order`

- `unoFunctions` (string[]) - 标记名称匹配的函数调用，以强制执行此规则。这些是普通名称，而不是模式，不区分大小写。默认值：`['clsx', 'classnames']`。
- `unoVariables` (string[]) - 标记名称匹配的变量声明，以强制执行此规则。这些是带有标志 `i` 的正则表达式模式。默认值：`['^cls', 'classNames?$']`。例如，将匹配变量名称 `clsButton` 和 `buttonClassNames`。

### 可选规则

这些规则默认未启用。要启用它们，请在 flat config 或 `.eslintrc` 中添加以下内容：

```js [eslint.config.js]
import unocss from '@unocss/eslint-config/flat'

export default [
  unocss,
  {
    rules: {
      'unocss/<rule-name>': 'warn', // 或 "error",
      'unocss/<another-rule-name>': ['warn' /* 或 "error" */, { /* 选项 */ }],
    },
  },
]
```

```json [.eslintrc]
{
  "extends": [
    "@unocss"
  ],
  "rules": {
    "@unocss/<rule-name>": "warn", // 或 "error",
    "@unocss/<another-rule-name>": ["warn" /* 或 "error" */, { /* 选项 */ }]
  }
}
```

#### `@unocss/blocklist`

当使用 `blocklist` 中列出的工具类进行匹配时，将抛出警告或错误。

您可以通过使用元对象的 `message` 属性自定义被阻止规则的消息，使其更具信息性和上下文相关性：

```ts [unocss.config.ts]
export default defineConfig({
  blocklist: [
    ['bg-red-500', { message: '请改用 bg-red-600' }],
    [/-auto$/, { message: s => `请改用 ${s.replace(/-auto$/, '-a')} 代替` }], // -> "my-auto" 在阻止列表中：请改用 "my-a" 代替
  ],
})
```

#### `@unocss/enforce-class-compile` :wrench:

_此规则旨在与 [编译类转换器](https://unocss.dev/transformers/compile-class) 配合使用。_

当类属性或指令未以 `:uno:` 开头时，将抛出警告或错误。

:wrench: 将自动为所有类属性和指令添加前缀 `:uno:`。

选项：

- `prefix` (string) - 可与 [自定义前缀](https://github.com/unocss/unocss/blob/main/packages-presets/transformer-compile-class/src/index.ts#L34) 配合使用。默认值：`:uno:`
- `enableFix` (boolean) - 在 `false` 时可用于渐进迁移。默认值：`true`

**注意**：目前仅支持 Vue。_如果您希望在 JSX 中使用，请贡献一个 PR。_ 如果您在寻找 Svelte 中的此功能，您可能需要 [`svelte-scoped`](https://unocss.dev/integrations/svelte-scoped) 模式。

## 在 Oxlint 中使用

该插件也可以通过 [JS 插件](https://oxc.rs/docs/guide/usage/linter/js-plugins)支持在 [Oxlint](https://oxc.rs/docs/guide/usage/linter) 中运行。请直接安装 `@unocss/eslint-plugin`：

::: code-group

```bash [pnpm]
pnpm add -D oxlint @unocss/eslint-plugin
```

```bash [yarn]
yarn add -D oxlint @unocss/eslint-plugin
```

```bash [npm]
npm install -D oxlint @unocss/eslint-plugin
```

```bash [bun]
bun add -D oxlint @unocss/eslint-plugin
```

:::

::: tip
使用 Yarn Berry 时，请在 `.yarnrc.yml` 中设置 `nodeLinker: node-modules`。Oxlint 无法在 Yarn Plug'n'Play 模式下加载 JS 插件。
:::

然后在 Oxlint 配置中启用规则。规则前缀为 `unocss/`：

```json [.oxlintrc.json]
{
  "jsPlugins": ["@unocss/eslint-plugin"],
  "rules": {
    "unocss/order": "warn",
    "unocss/blocklist": "error"
  }
}
```

如需指定 UnoCSS 配置文件路径，请在 `settings` 中设置。该路径相对于 Oxlint 的运行目录解析，而非相对于配置文件：

```json [.oxlintrc.json]
{
  "jsPlugins": ["@unocss/eslint-plugin"],
  "settings": {
    "unocss": {
      "configPath": "./config/uno.config.ts"
    }
  }
}
```

::: warning
Oxlint 中的 JS 插件仍处于实验阶段。支持通过 `oxlint --fix` 自动修复。

目前只会检查脚本代码：JS、TS、JSX 和 TSX 文件，以及 Vue 和 Svelte 文件中的 `<script>` 块与 Astro frontmatter。Vue、Svelte 和 Astro 模板暂不检查，因为 Oxlint 尚不支持自定义解析器（[oxc#15761](https://github.com/oxc-project/oxc/issues/15761)）。

脚本代码中的规则覆盖范围：

- `unocss/order`：类属性、类似 `clsx()` 的调用，以及名称匹配 `cls*` 和 `*className(s)` 的变量（可通过 `unoVariables` 配置）。这些变量中的字符串和模板字面量都会被检查，包括对象值、函数返回值和调用参数，但不包括三元表达式。
- `unocss/blocklist`：仅检查 JSX `class` 和 `className` 属性中的字符串字面量。
- `unocss/order-attributify` 和 `unocss/enforce-class-compile`：暂不支持，它们仅适用于 Vue 模板。

:::

## 相关工作

感谢 [@devunt](https://github.com/devunt) 提供的 [eslint-plugin-unocss](https://github.com/devunt/eslint-plugin-unocss)。
