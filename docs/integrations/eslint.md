---
title: UnoCSS ESLint 配置
description: UnoCSS 的 ESLint 配置 (@unocss/eslint-config)。
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

- `@unocss/order` - 强制类选择器的特定顺序。
- `@unocss/order-attributify` - 强制 attributify 选择器的特定顺序。
- `@unocss/blocklist` - 禁止使用特定的类选择器 [可选]。
- `@unocss/enforce-class-compile` - 强制类编译 [可选]。

### 可选规则

这些规则默认情况下未启用。要启用它，请将以下内容添加到您的 `.eslintrc` 文件中：

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

当使用 `blocklist` 中列出的工具类匹配时，将抛出警告或错误。

您可以通过使用元对象的 `message` 属性自定义被阻止规则的消息，使其更具信息性和上下文特异性：

```ts [unocss.config.ts]
export default defineConfig({
  blocklist: [
    ['bg-red-500', { message: '请改用 bg-red-600' }],
    [/-auto$/, { message: s => `请改用 ${s.replace(/-auto$/, '-a')} 代替` }], // -> "my-auto" 在阻止列表中: 请改用 "my-a" 代替
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
