---
title: UnoCSS CLI
description: UnoCSS 的 CLI (@unocss/cli).
---

# CLI

UnoCSS 的命令行接口：`@unocss/cli`。

- 🍱 从作用域文件中提取工具类
- 👀 包含 [观察模式](#development)
- 🔌 通过 [`uno.config.ts`](#configurations) 支持自定义配置
- ⚙️ 多种[选项](#options)以定制输出结果
- 🚀 支持多个[入口模式](#usage)

## 安装

该包与 `unocss` 一起发布：

::: code-group

```bash [pnpm]
pnpm add -D unocss
```

```bash [yarn]
yarn add -D unocss
```

```bash [npm]
npm install -D unocss
```

```bash [bun]
bun add -D unocss
```

:::

您也可以安装独立包：

::: code-group

```bash [pnpm]
pnpm add -D @unocss/cli
```

```bash [yarn]
yarn add -D @unocss/cli
```

```bash [npm]
npm install -D @unocss/cli
```

```bash [bun]
bun add -D @unocss/cli
```

:::

::: info
如果您无法找到二进制文件（例如使用 `pnpm` 而只安装了 `unocss`），您需要显式安装 `@unocss/cli` 独立包。
:::

## 用法

您也可以将多个 glob 模式传递给 `@unocss/cli`：

```bash
unocss "site/snippets/**/*.php" "site/templates/**/*.php"
```

示例包配置：

::: info
确保在您的 npm 脚本 glob 模式中添加转义引号。
:::

```json [package.json]
{
  "scripts": {
    "dev": "unocss \"site/{snippets,templates}/**/*.php\" --watch",
    "build": "unocss \"site/{snippets,templates}/**/*.php\""
  },
  "devDependencies": {
    "@unocss/cli": "latest"
  }
}
```

### 开发

添加 `--watch`（或 `-w`）标志以启用文件更改的监听：

```bash
unocss "site/{snippets,templates}/**/*.php" --watch
```

### 生产

```bash
unocss "site/{snippets,templates}/**/*.php"
```

最终的 `uno.css` 默认将生成到当前目录。

## 内置功能

### 配置

在项目根目录创建 `uno.config.js` 或 `uno.config.ts` 配置文件以自定义 UnoCSS。

::: tip
为了实现更细粒度的配置管理，我们推荐使用配置文件。它还支持对扫描的文件进行不同层级的打包和重写。
:::

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  cli: {
    entry: {}, // CliEntryItem | CliEntryItem[]
  },
  // ...
})

interface CliEntryItem {
  /**
   * 匹配文件的 glob 模式
   */
  patterns: string[]
  /**
   * 生成的 UnoCSS 文件的输出文件名
   */
  outFile: string
  /**
   * 是否重写转换后的工具类。
   *
   * - 对于 CSS：如果 rewrite 为 true，将不生成新文件，而是直接修改原文件内容。
   * - 对于其他文件：如果 rewrite 为 true，则用转换后的内容替换原文件。
   *
   * @default false
   */
  rewrite?: boolean

  /**
   * 是否将从模式扫描到的 CSS 文件输出到 outFile
   *
   * - false：不输出 CSS 文件
   * - true：转换并输出扫描的 CSS 文件内容到 outFile
   * - 'multi'：分别输出每个 CSS 文件，文件名格式为 `${originFile}-[hash]`
   * - 'single'：将多个 CSS 文件合并成一个，输出文件名为 `outFile-merged.css`
   *
   * @default true
   */
  splitCss?: boolean | 'multi' | 'single'
}
```

### 重写源文件

使用 `--rewrite` 标志可使用转换后的工具类更新源文件。当您希望直接在代码上应用诸如[变体组](/transformers/variant-group)或[编译类](/transformers/compile-class)等转换器时，这很有用。

```bash
unocss "src/**/*.vue" --rewrite
```

### CSS 拆分

当定义的模式中包含 CSS 文件时，可以使用 `--split-css` 标志控制 CSS 的输出。

- false：不输出 CSS 文件
- true：转换并输出扫描的 CSS 文件内容到 outFile
- 'multi'：分别输出每个 CSS 文件，文件名格式为 `${originFile}-[hash]`
- 'single'：将多个 CSS 文件合并成一个，输出文件名为 `outFile-merged.css`

```bash
unocss "src/**/*.vue" --split-css true|false|multi|single
```

### 默认预设

如果未找到 `uno.config.ts` 文件，CLI 会使用默认预设。您可以通过 `--preset` 标志指定使用哪个版本的默认预设。

- `wind4`：使用 `preset-wind4`
- `wind3`：使用 `preset-wind3`

```bash
unocss "src/**/*.vue" --preset wind3|wind4
```

> 注意：如果存在配置文件，该选项将被忽略。

::: warning
从版本 `v66.6.0` 起，`@unocss/cli` 不再提供默认预设。用户需要显式指定 `--preset` 选项或在配置文件中配置预设。
:::

有关选项的列表，请查看 [UnoCSS 配置](/config/) 文档。

## 选项

| 选项                        |                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------- |
| `-v, --version`             | 显示当前版本的 UnoCSS                                                                   |
| `-c, --config [file]`       | 配置文件                                                                                |
| `-o, --out-file <file>`     | 生成的 UnoCSS 文件的输出文件名。默认为当前工作目录中的 `uno.css`                        |
| `--stdout`                  | 将生成的 UnoCSS 文件写入标准输出。将导致 `--watch` 和 `--out-file` 被忽略               |
| `-w, --watch`               | 指示是否应监听 glob 模式找到的文件                                                      |
| `--preflights`              | 启用预检样式                                                                            |
| `--rewrite`                 | 使用转换后的工具类更新源文件                                                            |
| `--write-transformed`       | 使用转换后的工具类更新源文件（已弃用，请使用 `--rewrite`）                              |
| `-m, --minify`              | 压缩生成的 CSS                                                                          |
| `--debug`                   | 启用调试模式                                                                            |
| `--split-css [mode]`        | 是否将从模式中扫描到的 CSS 文件输出到 outFile。选项：`true`、`false`、`multi`、`single` |
| `--preset [default-preset]` | 选择 `wind3` 或 `wind4` 作为默认预设。如果已经配置了 `uno.config`，该选项将被忽略。     |
| `-h, --help`                | 显示可用的 CLI 选项                                                                     |
