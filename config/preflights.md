---
url: 'https://unocss.zhcndoc.com/config/preflights.md'
description: 你可以从配置中注入原始 CSS 作为预处理。已解析的主题可用于自定义 CSS。
---

# 预处理

你可以从配置中注入原始 CSS 作为预处理。已解析的 `theme` 可用于自定义 CSS。

```ts
preflights: [
  {
    getCSS: ({ theme }) => `
      * {
        color: ${theme.colors.gray?.[700] ?? '#333'};
        padding: 0;
        margin: 0;
      }
    `,
  },
]
```
