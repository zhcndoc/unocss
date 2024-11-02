# 自动完成功能

自动完成功能可以为 UnoCSS 的智能建议进行定制，适用于<a href="/play" target="_blank" rel="noreferrer">在线编辑器</a>和[VS Code 插件](/integrations/vscode)。
<!--eslint-skip-->
```ts
autocomplete: {
  templates: [
    // 主题推断
    'bg-$color/<opacity>',
    // 简写
    'text-<font-size>',
    // 逻辑或分组
    '(b|border)-(solid|dashed|dotted|double|hidden|none)',
    // 常量
    'w-half',
  ],
  shorthands: {
    // 等同于 `opacity: "(0|10|20|30|40|50|60|70|90|100)"`
    'opacity': Array.from({ length: 11 }, (_, i) => i * 10),
    'font-size': '(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)',
    // 重写内置简写
    'num': '(0|1|2|3|4|5|6|7|8|9)',
  },
  extractors: [
      // ...提取器
  ],
}
```

- `templates` 使用简单的 DSL 来指定自动完成的建议。

- `shorthands` 是简写名称到其模板的映射。如果是 `Array`，它将是逻辑或分组。

- `extractors` 用于获取可能的类并将类名样式建议转换为正确的格式。例如，您可以查看我们如何实现 [属性化自动完成功能提取器](https://github.com/unocss/unocss/blob/main/packages/preset-attributify/src/autocomplete.ts)。

- 有关更多帮助，请参阅 [此处](/tools/autocomplete)。
