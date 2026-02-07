---
url: 'https://unocss.zhcndoc.com/config/autocomplete.md'
---
# 自动补全

自动补全可以为 UnoCSS 的智能建议进行自定义，详见试验场和 [VS Code 插件](/integrations/vscode)。

```ts
autocomplete: {
  templates: [
    // 主题推断
    'bg-$color/<opacity>',
    // 简写
    'text-<font-size>',
    // 逻辑 OR 组
    '(b|border)-(solid|dashed|dotted|double|hidden|none)',
    // 常量
    'w-half',
  ],
  shorthands: {
    // 等同于 `opacity: "(0|10|20|30|40|50|60|70|90|100)"`
    'opacity': Array.from({ length: 11 }, (_, i) => i * 10),
    'font-size': '(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)',
    // 覆盖内置简写
    'num': '(0|1|2|3|4|5|6|7|8|9)',
  },
  extractors: [
      // ...提取器
  ],
}
```

* `templates` 使用简单的 DSL 来指定自动补全建议。

* `shorthands` 是简写名称到其模板的映射。如果是 `Array`，则将形成逻辑 OR 组。

* `extractors` 用来提取可能的类并将类名样式建议转换为正确格式。例如，您可以查看我们是如何实现 [属性化自动补全提取器](https://github.com/unocss/unocss/blob/main/packages-presets/preset-attributify/src/autocomplete.ts)

* 如需额外帮助，请参阅 [此处](/tools/autocomplete)。
