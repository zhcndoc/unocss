# 自动完成

自动完成功能可以为 UnoCSS 的智能建议进行自定义，您可以在<a href="/play" target="_blank" rel="noreferrer">游乐场</a>和 [VS Code 插件](/integrations/vscode) 中使用。

<!--eslint-skip-->

```ts
autocomplete: {
  templates: [
    // 主题推断
    'bg-$color/<opacity>',
    // 简写
    'text-<font-size>',
    // 逻辑或组合
    '(b|border)-(solid|dashed|dotted|double|hidden|none)',
    // 常量
    'w-half',
  ],
  shorthands: {
    // 等同于 `opacity: "(0|10|20|30|40|50|60|70|90|100)"`
    'opacity': Array.from({ length: 11 }, (_, i) => i * 10),
    'font-size': '(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)',
    // 重写内置的简写
    'num': '(0|1|2|3|4|5|6|7|8|9)',
  },
  extractors: [
      // ...提取器
  ],
}
```

- `templates` 使用简单的 DSL 来指定自动完成建议。

- `shorthands` 是简写名称与其模板的映射。如果是 `Array`，则会是逻辑或组合。

- `extractors` 用于拾取可能的类并将类名样式建议转换为正确的格式。例如，您可以查看我们如何实现 [attributify 自动完成提取器](https://github.com/unocss/unocss/blob/main/packages-presets/preset-attributify/src/autocomplete.ts)

- 如需更多帮助，请参考 [这里](/tools/autocomplete)。
