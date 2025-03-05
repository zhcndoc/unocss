---
title: UnoCSS CLI
description: UnoCSS 的 CLI (@unocss/cli).
---

# CLI

UnoCSS 的命令行接口：`@unocss/cli`。

- 🍱 适用于传统后端如 Laravel 或 Kirby
- 👀 包含 [观察模式](#development)
- 🔌 通过 [`uno.config.ts`](#configurations) 支持自定义配置

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

有关选项的列表，请查看 [UnoCSS 配置](/config/) 文档。

## 选项

| 选项                       |                                                                          |
| -------------------------- | ------------------------------------------------------------------------ |
| `-v, --version`            | 显示当前版本的 UnoCSS                                                    |
| `-c, --config-file <file>` | 配置文件                                                                 |
| `-o, --out-file <file>`    | 生成的 UnoCSS 文件的输出文件名。默认为当前工作目录中的 `uno.css`         |
| `--stdout`                 | 将生成的 UnoCSS 文件写入 STDOUT。将导致 `--watch` 和 `--out-file` 被忽略 |
| `-w, --watch`              | 指示是否应监听 glob 模式找到的文件                                       |
| `--preflights`             | 启用预检样式                                                             |
| `--write-transformed`      | 使用转换后的工具更新源文件                                               |
| `-m, --minify`             | 压缩生成的 CSS                                                           |
| `-h, --help`               | 显示可用的 CLI 选项                                                      |
