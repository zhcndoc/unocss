---
outline: deep
---

# 为什么选择 UnoCSS？

## 动机

我们建议您阅读 UnoCSS 的创始人 [Anthony Fu](https://antfu.me/) 撰写的博文 [重新想象原子 CSS](https://antfu.me/posts/reimagine-atomic-css)，以更好地理解 UnoCSS 背后的动机。

## UnoCSS 与 X 的区别？

### Windi CSS

UnoCSS 是由 [Windi CSS](https://windicss.org/) 的一名团队成员发起的，受到了我们在 Windi CSS 中所做工作的很大启发。Windi CSS 已不再积极维护（截至 2023 年 3 月），您可以将 UnoCSS 视为 Windi CSS 的 _“精神继承者”_。

UnoCSS 继承了 Windi CSS 的按需特性、[属性模式](/presets/attributify)、[快捷方式](/config/shortcuts)、[变体组](/transformers/variant-group)、[编译模式](/transformers/compile-class) 等等。除此之外，UnoCSS 从零开始构建，最大限度考虑了可扩展性和性能，使我们能够引入诸如 [纯 CSS 图标](/presets/icons)、[无值属性化](/presets/attributify#valueless-attributify)、[标签化](/presets/tagify)、[网页字体](/presets/web-fonts) 等新功能。

最重要的是，UnoCSS 被提炼为一个原子 CSS 引擎，所有功能都是可选的，使得创建您自己的约定、设计系统和预设变得简单 —— 结合您想要的功能组合。

### Tailwind CSS

Windi CSS 和 UnoCSS 都受到 [Tailwind CSS](https://tailwindcss.com/) 的大量启发。由于 UnoCSS 是从零开始构建的，我们有能力全面审视原子 CSS 如何根据先前的艺术设计并抽象成一个优雅而强大的 API。由于设计目标有很大不同，因此与 Tailwind CSS 进行直接比较并不完全公平。但我们会尝试列出一些区别。

Tailwind CSS 是一个 PostCSS 插件，而 UnoCSS 是一个具有一流集成的同构引擎（包括 [PostCSS 插件](/integrations/postcss)）。这意味着 UnoCSS 可以更灵活地用于不同场合（例如，[CDN 运行时](/integrations/runtime)，可实时生成 CSS），并与构建工具深度集成，以提供更好的热模块重载、性能和开发者体验（例如，[检查器](/tools/inspector)）。

除了技术权衡之外，UnoCSS 还旨在完全可扩展和可自定义，而 Tailwind CSS 则更加主观。在 Tailwind CSS 的基础上构建自定义设计系统（或设计令牌）可能比较困难，并且您无法真正摆脱 Tailwind CSS 的约定。使用 UnoCSS，您几乎可以完全控制构建自己想要的内容。例如，我们在 [单个预设](/presets/wind) 中实现了整个 Tailwind CSS 兼容的实用工具，还有许多基于其他有趣哲学的 [优秀社区预设](/presets/community)。

得益于 UnoCSS 提供的灵活性，我们能够在其基础上实验许多创新功能，例如：

- [纯 CSS 图标](/presets/icons)
- [属性化模式](/presets/attributify)
- [变体组](/transformers/variant-group)
- [快捷方式](/config/shortcuts)
- [标签化](/presets/tagify)
- [网页字体](/presets/web-fonts)
- [CDN 运行时](/integrations/runtime)
- [检查器](/tools/inspector)

由于与 Tailwind CSS 的设计目标不同，UnoCSS 不支持 Tailwind CSS 的插件系统或配置，这可能使得从高度自定义的 Tailwind CSS 项目迁移变得更加困难。这是为了使 UnoCSS 性能高效且可扩展的决策，我们相信这个权衡是值得的。
