---
title: 套件
description: "UnoCSS 套件：可用的套件及其在 unocss 中包含和启用的内容。"
outline: deep
---

# 套件

UnoCSS 是一个包含多个套件的单一代码库。此页面列出了所有套件及其在 `unocss` 套件中的内容：

| 套件                                                                 | 描述                                 | 包含在 `unocss`中 | 启用 |
| -------------------------------------------------------------------- | ------------------------------------ | ----------------- | ---- |
| [@unocss/core](/tools/core)                                          | 无预设的核心库                       | ✅                | -    |
| [@unocss/cli](/integrations/cli)                                     | UnoCSS 的命令行界面                  | ✅                | -    |
| [@unocss/preset-uno](/presets/uno)                                   | 默认预设                             | ✅                | ✅   |
| [@unocss/preset-mini](/presets/mini)                                 | 最小但必需的规则和变体               | ✅                | ✅   |
| [@unocss/preset-wind](/presets/wind)                                 | Tailwind CSS / Windi CSS 紧凑预设    | ✅                | ✅   |
| [@unocss/preset-attributify](/presets/attributify)                   | 启用其他规则的 Attributify 模式      | ✅                | 否   |
| [@unocss/preset-tagify](/presets/tagify)                             | 启用其他规则的 Tagify 模式           | ✅                | 否   |
| [@unocss/preset-icons](/presets/icons)                               | 由 Iconify 提供的纯 CSS 图标解决方案 | ✅                | 否   |
| [@unocss/preset-web-fonts](/presets/web-fonts)                       | Web 字体（Google Fonts 等）支持      | ✅                | 否   |
| [@unocss/preset-typography](/presets/typography)                     | 排版预设                             | ✅                | 否   |
| [@unocss/preset-rem-to-px](/presets/rem-to-px)                       | 将 rem 转换为 px 的工具              | 否                | 否   |
| [@unocss/preset-legacy-compat](/presets/legacy-compat)               | 旧版兼容性工具集合                   | 否                | 否   |
| [@unocss/transformer-variant-group](/transformers/variant-group)     | Windi CSS 的变体组功能的转换器       | ✅                | 否   |
| [@unocss/transformer-directives](/transformers/directives)           | CSS 指令如 `@apply` 的转换器         | ✅                | 否   |
| [@unocss/transformer-compile-class](/transformers/compile-class)     | 将一组类编译成一个类                 | ✅                | 否   |
| [@unocss/transformer-attributify-jsx](/transformers/attributify-jsx) | 支持 JSX/TSX 中的无值属性            | ✅                | 否   |
| [@unocss/extractor-pug](/extractors/pug)                             | Pug 提取器                           | 否                | -    |
| [@unocss/extractor-svelte](/extractors/svelte)                       | Svelte 提取器                        | 否                | -    |
| [@unocss/autocomplete](/tools/autocomplete)                          | 自动完成的工具                       | 否                | -    |
| [@unocss/config](/guide/config-file)                                 | 配置文件加载器                       | ✅                | -    |
| [@unocss/reset](/guide/style-reset)                                  | 常见 CSS 重置集合                    | ✅                | 否   |
| [@unocss/vite](/integrations/vite)                                   | Vite 插件                            | ✅                | -    |
| [@unocss/inspector](/tools/inspector)                                | UnoCSS 的检查器 UI                   | ✅                | -    |
| [@unocss/astro](/integrations/astro)                                 | Astro 集成                           | ✅                | -    |
| [@unocss/webpack](/integrations/webpack)                             | Webpack 插件                         | 否                | -    |
| [@unocss/nuxt](/integrations/nuxt)                                   | Nuxt 模块                            | 否                | -    |
| [@unocss/svelte-scoped](/integrations/svelte-scoped)                 | Svelte Scoped Vite 插件 + 预处理器   | 否                | -    |
| [@unocss/next](/integrations/next)                                   | Next.js 插件                         | 否                | -    |
| [@unocss/runtime](/integrations/runtime)                             | UnoCSS 的 CSS-in-JS 运行时           | 否                | -    |
| [@unocss/eslint-plugin](/integrations/eslint)                        | ESLint 插件                          | 否                | -    |
| [@unocss/eslint-config](/integrations/eslint)                        | ESLint 配置                          | 否                | -    |
| [@unocss/postcss](/integrations/postcss)                             | PostCSS 插件                         | 否                | -    |
| [VS Code 扩展](/integrations/vscode)                                 | UnoCSS for VS Code                   | -                 | -    |
