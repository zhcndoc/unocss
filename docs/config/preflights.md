---
title: 预飞行
description: 您可以从配置中注入原始 CSS 作为预飞行。已解析的主题可用于自定义 CSS。
---

# 预飞行

您可以从配置中注入原始 CSS 作为预飞行。已解析的 `theme` 可用于自定义 CSS。

<!--eslint-skip-->

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
