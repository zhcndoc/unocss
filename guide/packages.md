---
url: 'https://unocss.zhcndoc.com/guide/packages.md'
description: UnoCSS 包：可用包及其包含和启用的内容。
---

# 包

UnoCSS 是一个包含多个包的单体仓库。此页面列出了所有包及其在 `unocss` 包中的包含情况：

| 包                                                                   | 描述                                | 包含在 `unocss` | 启用 |
| -------------------------------------------------------------------- | ----------------------------------- | --------------- | ---- |
| [@unocss/core](/tools/core)                                          | 没有预设的核心库                    | ✅              | -    |
| [@unocss/cli](/integrations/cli)                                     | UnoCSS 的命令行接口                 | ✅              | -    |
| [@unocss/preset-mini](/presets/mini)                                 | 最小但必要的规则和变体              | ✅              | ✅   |
| [@unocss/preset-wind3](/presets/wind3)                               | Tailwind CSS / Windi CSS 精简预设   | ✅              | ✅   |
| [@unocss/preset-wind4](/presets/wind4)                               | Tailwind4 CSS 精简预设              | ✅              | ✅   |
| [@unocss/preset-attributify](/presets/attributify)                   | 启用 Attributify 模式以支持其他规则 | ✅              | 否   |
| [@unocss/preset-tagify](/presets/tagify)                             | 启用 Tagify 模式以支持其他规则      | ✅              | 否   |
| [@unocss/preset-icons](/presets/icons)                               | 基于 Iconify 的纯 CSS 图标解决方案  | ✅              | 否   |
| [@unocss/preset-web-fonts](/presets/web-fonts)                       | 支持网页字体（Google 字体等）       | ✅              | 否   |
| [@unocss/preset-typography](/presets/typography)                     | 排版预设                            | ✅              | 否   |
| [@unocss/preset-rem-to-px](/presets/rem-to-px)                       | 将 rem 转换为 px 用于实用工具       | 否              | 否   |
| [@unocss/preset-legacy-compat](/presets/legacy-compat)               | 用于旧版兼容性的工具集合            | 否              | 否   |
| [@unocss/transformer-variant-group](/transformers/variant-group)     | Windi CSS 的变体组功能的转换器      | ✅              | 否   |
| [@unocss/transformer-directives](/transformers/directives)           | 用于 CSS 指令如 `@apply` 的转换器   | ✅              | 否   |
| [@unocss/transformer-compile-class](/transformers/compile-class)     | 将一组类编译成一个类                | ✅              | 否   |
| [@unocss/transformer-attributify-jsx](/transformers/attributify-jsx) | 支持在 JSX/TSX 中使用无值的属性     | ✅              | 否   |
| [@unocss/extractor-pug](/extractors/pug)                             | Pug 的提取器                        | 否              | -    |
| [@unocss/extractor-svelte](/extractors/svelte)                       | Svelte 的提取器                     | 否              | -    |
| [@unocss/autocomplete](/tools/autocomplete)                          | 自动补全工具                        | 否              | -    |
| [@unocss/config](/guide/config-file)                                 | 配置文件加载器                      | ✅              | -    |
| [@unocss/reset](/guide/style-reset)                                  | 常见 CSS 重置的集合                 | ✅              | 否   |
| [@unocss/vite](/integrations/vite)                                   | Vite 插件                           | ✅              | -    |
| [@unocss/inspector](/tools/inspector)                                | UnoCSS 的检查器 UI                  | ✅              | -    |
| [@unocss/astro](/integrations/astro)                                 | Astro 集成                          | ✅              | -    |
| [@unocss/webpack](/integrations/webpack)                             | Webpack 插件                        | 否              | -    |
| [@unocss/nuxt](/integrations/nuxt)                                   | Nuxt 模块                           | 否              | -    |
| [@unocss/svelte-scoped](/integrations/svelte-scoped)                 | Svelte Scoped Vite 插件 + 预处理器  | 否              | -    |
| [@unocss/next](/integrations/next)                                   | Next.js 插件                        | 否              | -    |
| [@unocss/runtime](/integrations/runtime)                             | UnoCSS 的 CSS-in-JS 运行时          | 否              | -    |
| [@unocss/eslint-plugin](/integrations/eslint)                        | ESLint 插件                         | 否              | -    |
| [@unocss/eslint-config](/integrations/eslint)                        | ESLint 配置                         | 否              | -    |
| [@unocss/postcss](/integrations/postcss)                             | PostCSS 插件                        | 否              | -    |
| [VS Code 扩展](/integrations/vscode)                                 | UnoCSS 的 VS Code 扩展              | -               | -    |
