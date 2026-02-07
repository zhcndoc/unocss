---
url: 'https://unocss.zhcndoc.com/config/shortcuts.md'
description: UnoCSS 提供的快捷功能类似于 Windi CSS 的功能。
---

# 快捷方式

快捷方式让你将多个规则组合成一个简写，灵感来自于 [Windi CSS](https://windicss.org/features/shortcuts.html)。

## 用法

```ts
shortcuts: {
  // 多个实用工具的快捷方式
  'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
  'btn-green': 'text-white bg-green-500 hover:bg-green-700',
  // 单独的实用程序别名
  'red': 'text-red-100',
}
```

除了简单的映射，UnoCSS 还允许你定义动态快捷方式。

类似于 [规则](/config/rules)，动态快捷方式是一个匹配器 `RegExp` 和一个处理函数的组合。

```ts
shortcuts: [
  // 你仍然可以使用对象风格
  {
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
  },
  // 动态快捷方式
  [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
]
```

这样，我们可以使用 `btn-green` 和 `btn-red` 生成以下 CSS：

```css
.btn-green {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  --un-bg-opacity: 1;
  background-color: rgb(74 222 128 / var(--un-bg-opacity));
  border-radius: 0.5rem;
  --un-text-opacity: 1;
  color: rgb(220 252 231 / var(--un-text-opacity));
}
.btn-red {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  --un-bg-opacity: 1;
  background-color: rgb(248 113 113 / var(--un-bg-opacity));
  border-radius: 0.5rem;
  --un-text-opacity: 1;
  color: rgb(254 226 226 / var(--un-text-opacity));
}
```
