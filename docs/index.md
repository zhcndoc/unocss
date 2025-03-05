---
layout: home
title: "UnoCSS：即需即用的原子 CSS 引擎"

hero:
  image:
    src: /logo.svg
    alt: UnoCSS
  name: "UnoCSS"
  text: 即需即用的原子 CSS 引擎
  tagline: 可定制 · 强大 · 快速 · 愉悦
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/
    - theme: alt
      text: 互动文档
      link: https://unocss.dev/interactive/
      target: _blank
    - theme: alt
      text: 游乐场
      link: https://unocss.dev/play/
      target: _blank
    - theme: alt
      text: 教程
      link: https://tutorial.unocss.dev/
      target: _blank

features:
  - icon: <span class="i-carbon:ibm-toolchain"></span>
    title: 完全可定制
    details: 没有核心工具，所有功能通过预设提供。
    link: /guide/
    linkText: 开始使用
  - icon: <span class="i-carbon-meter-alt"></span>
    title: 即时
    details: 无需解析，无需 AST，无需扫描。速度是 Windi CSS 或 Tailwind CSS JIT 的 5 倍。
  - icon: <span class="i-carbon-wind-gusts"></span>
    title: 轻量级
    details: "零依赖，浏览器友好：~6kb min+brotli"
  - icon: <span class="i-carbon-ibm-cloud-transit-gateway"></span>
    title: 丰富的集成
    details: "对 Vite、Webpack、PostCSS、CLI、VS Code、ESLint 等的优质支持。"
    link: /integrations/vite
    linkText: "了解更多"
  - icon: <span class="i-carbon-asset"></span>
    title: 快捷方式
    details: "别名或动态分组工具"
    link: /config/shortcuts
    linkText: "配置和使用"
  - icon: <span class="i-carbon:code"></span>
    title: 属性模式
    details: "在属性中分组工具"
    link: /presets/attributify
    linkText: "@unocss/preset-attributify"
  - icon: <span class="i-carbon-face-wink hover:i-carbon-face-satisfied"></span>
    title: 纯 CSS 图标
    details: "将任何图标作为单一类使用"
    link: /presets/icons
    linkText: "@unocss/preset-icons"
  - icon: <span class="i-carbon:group-objects"></span>
    title: 变体组
    details: "带有公共前缀的工具组的简写"
    link: /transformers/variant-group
    linkText: "@unocss/transformer-variant-group"
  - icon: <span class="i-carbon:at"></span>
    title: CSS 指令
    details: "使用 @apply 指令在 CSS 中重用工具"
    link: /transformers/directives
    linkText: "@unocss/transformer-directives"
  - icon: <span class="i-carbon-tree-view-alt scale-x--100"></span>
    title: 编译模式
    details: "在构建时将多个类合成为一个"
    link: /transformers/compile-class
    linkText: "@unocss/transformer-compile-class"
  - icon: <span class="i-carbon:inspection"></span>
    title: 检查器
    details: "互动式检查和调试"
    link: /tools/inspector
    linkText: "@unocss/inspector"
  - icon: <span class="i-carbon:executable-program"></span>
    title: CDN 运行时构建
    details: "使用一行 CDN 导入 UnoCSS"
    link: /integrations/runtime
    linkText: "@unocss/runtime"
---
