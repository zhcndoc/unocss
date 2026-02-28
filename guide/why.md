---
url: 'https://unocss.zhcndoc.com/guide/why.md'
---

# 为什么选择 UnoCSS？

## 动机

我们建议您阅读由 UnoCSS 的创建者 [Anthony Fu](https://antfu.me/) 撰写的博客文章 [重新构想原子 CSS](https://antfu.me/posts/reimagine-atomic-css)，以更好地理解 UnoCSS 背后的动机。

## UnoCSS 与 X 的不同之处

### Windi CSS

UnoCSS 是由 [Windi CSS](https://windicss.org/) 的一位团队成员发起的，许多灵感来自于我们在 Windi CSS 中所做的工作。尽管 Windi CSS 在 2023 年 3 月之后不再积极维护，但您可以将 UnoCSS 视为 Windi CSS 的 *“精神继承者”*。

UnoCSS 继承了 Windi CSS 的按需特性、[属性化模式](/presets/attributify)、[快捷方式](/config/shortcuts)、[变体组](/transformers/variant-group)、[编译模式](/transformers/compile-class)等诸多功能。更重要的是，UnoCSS 从头开始构建，最大限度地考虑了可扩展性和性能，使我们能够引入新的功能，如 [纯 CSS 图标](/presets/icons)、[无值属性化](/presets/attributify#valueless-attributify)、[标签化](/presets/tagify)、[网页字体](/presets/web-fonts) 等等。

最重要的是，UnoCSS 被提取为一个原子 CSS 引擎，所有功能都是可选的，可以轻松创建您自己的约定、自己的设计系统和自己的预设 - 结合您想要的功能。

### Tailwind CSS

Windi CSS 和 UnoCSS 均受到 [Tailwind CSS](https://tailwindcss.com/) 的启发。由于 UnoCSS 从头开始构建，我们能够很好地概述原子 CSS 如何通过先前的艺术进行设计并抽象成优雅而强大的 API。由于设计目标的不同，很难与 Tailwind CSS 进行直接比较。但我们会尝试列出一些不同之处。

Tailwind CSS 是一个 PostCSS 插件，而 UnoCSS 是一个具有一系列一流集成的同构引擎（包括 [PostCSS 插件](/integrations/postcss)）。这意味着 UnoCSS 在不同地方使用时灵活性更高（例如，[CDN 运行时](/integrations/runtime)，可以动态生成 CSS）并与构建工具深度集成，以提供更好的 HMR、性能和开发者体验（例如，[检查器](/tools/inspector)）。

抛开技术权衡不谈，UnoCSS 也被设计为完全可扩展和可定制，而 Tailwind CSS 更加规范。基于 Tailwind CSS 构建自定义设计系统（或设计令牌）可能比较困难，您无法真正脱离 Tailwind CSS 的约定。而使用 UnoCSS，您几乎可以用完全的控制构建任何您想要的东西。例如，我们在 [一个单一预设](/presets/wind3) 中实现了整个 Tailwind CSS 兼容的实用工具，并且还有许多采用其他有趣理念的 [优秀社区预设](/presets/community)。

得益于 UnoCSS 提供的灵活性，我们能够在其基础上实验许多创新功能，例如：

* [纯 CSS 图标](/presets/icons)
* [属性化模式](/presets/attributify)
* [变体组](/transformers/variant-group)
* [快捷方式](/config/shortcuts)
* [标签化](/presets/tagify)
* [网页字体](/presets/web-fonts)
* [CDN 运行时](/integrations/runtime)
* [检查器](/tools/inspector)

由于与 Tailwind CSS 的设计目标不同，UnoCSS 不支持 Tailwind CSS 的插件系统或配置，这意味着从一个 heavily customized 的 Tailwind CSS 项目迁移可能会更加困难。这是为了使 UnoCSS 在性能和可扩展性上达到高标准而做出的有意决策，我们相信这个权衡是值得的。
