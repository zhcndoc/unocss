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

- `order` - 强制类选择器的特定顺序。
- `order-attributify` - 强制属性化选择器的特定顺序。
- `blocklist` - 禁止特定的类选择器 [可选]。
- `enforce-class-compile` - 强制类编译 [可选]。

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

## 相关工作

感谢 [@devunt](https://github.com/devunt) 提供的 [eslint-plugin-unocss](https://github.com/devunt/eslint-plugin-unocss)。
