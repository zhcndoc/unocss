---
title: Inspector
description: The inspector UI for UnoCSS (@unocss/inspector).
---

# Inspector

The inspector UI for UnoCSS: `@unocss/inspector`.
它随 `unocss` 和 `@unocss/vite` 一同提供。

检查器可用于查看生成的 CSS 规则以及各文件应用的类。它还提供 REPL，可根据当前配置测试工具类。

检查器基于 [devframe](https://devfra.me/) 构建，可通过多种方式托管。

## Vite DevTools（推荐）

安装 [Vite DevTools](https://devtools.vite.dev/)（`@vitejs/devtools`）后，检查器会自动作为 **UnoCSS 停靠面板**挂载其中，无需身份验证提示，并支持实时更新。

使用 DevTools 的静态构建运行 `vite build` 时，也会将预先计算的检查器数据快照打包到导出内容中，因此无需开发服务器即可查看分析结果。

## 独立 URL

在 Vite 开发服务器中访问 <a href="http://localhost:5173/__unocss" target="_blank" rel="noreferrer">localhost:5173/\_\_unocss</a> 即可查看检查器。

首次使用时，请输入开发服务器终端中显示的一次性 6 位验证码以解锁（令牌会按浏览器记忆）。启用 Vite DevTools 时，此 URL 会改为跳转到 DevTools 界面。

::: info
独立 URL 已弃用；今后建议通过 Vite DevTools 停靠面板使用检查器。
:::

## 其他托管方式

`@unocss/inspector/devframe` 将检查器导出为可移植的 [devframe 定义](https://devfra.me/)，可挂载到任何 devframe 宿主：

- `createInspectorDevframe(ctx)` — 将检查器绑定到现有 UnoCSS 插件上下文。
- `createStandaloneInspectorDevframe(options)` — 扫描项目文件并构建独立上下文，供没有集成打包器 UnoCSS 上下文的宿主使用（例如通过 [`@devframes/next`](https://devfra.me/frameworks/next) 使用 `@unocss/postcss` 的 Next.js 应用）。

<img src="https://user-images.githubusercontent.com/11247099/140885990-1827f5ce-f12a-4ed4-9d63-e5145a65fb4a.png" loading="lazy" alt="UnoCSS Inspector" />
<img src="https://user-images.githubusercontent.com/11247099/140886020-7014f412-f020-4aed-a169-d025cc1bbcd3.png" loading="lazy" alt="UnoCSS Inspector REPL" />
