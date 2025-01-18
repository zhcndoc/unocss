---
title: UnoCSS CLI
description: UnoCSS 的命令行工具 (@unocss/cli)。
---

# CLI

UnoCSS 的命令行界面：`@unocss/cli`。

- 🍱 适用于 Laravel 或 Kirby 等传统后端
- 👀 包含 [观察模式](#development)
- 🔌 通过 [`uno.config.ts`](#configurations) 支持自定义配置

## 安装

该包与 `unocss` 包一起发布：

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

:::

::: info
如果您无法找到二进制文件（例如，使用 `pnpm` 并且只安装了 `unocss`），您需要显式安装独立的 `@unocss/cli` 包。
:::

## 用法

您还可以将多个 glob 模式传递给 `@unocss/cli`：

```bash
unocss "site/snippets/**/*.php" "site/templates/**/*.php"
```

示例包配置：

::: info
确保在 npm 脚本的 glob 模式中添加转义引号。
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

添加 `--watch`（或 `-w`）标志以启用对文件更改的监视：

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

在项目的根目录下创建 `uno.config.js` 或 `uno.config.ts` 配置文件来定制 UnoCSS。

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
}
```

欲获取选项列表，请查看 [UnoCSS 配置](/config/) 文档。

## 选项

| 选项                       |                                                                          |
| -------------------------- | ------------------------------------------------------------------------ |
| `-v, --version`            | 显示当前的 UnoCSS 版本                                                   |
| `-c, --config-file <file>` | 配置文件                                                                 |
| `-o, --out-file <file>`    | 生成的 UnoCSS 文件的输出文件名。默认为当前工作目录中的 `uno.css`         |
| `--stdout`                 | 将生成的 UnoCSS 文件写入 STDOUT。将导致 `--watch` 和 `--out-file` 被忽略 |
| `-w, --watch`              | 指示 glob 模式找到的文件是否应被监视                                     |
| `--preflights`             | 启用预检样式                                                             |
| `--write-transformed`      | 使用转换后的工具更新源文件                                               |
| `-m, --minify`             | 混淆生成的 CSS                                                           |
| `-h, --help`               | 显示可用的 CLI 选项                                                      |
