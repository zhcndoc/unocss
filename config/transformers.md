---
url: 'https://unocss.zhcndoc.com/config/transformers.md'
---
# 转换器

提供统一的接口来转换源代码，以支持约定。

```ts [my-transformer.ts]
import { SourceCodeTransformer } from 'unocss'
import { createFilter } from 'unplugin-utils'

export default function myTransformers(options: MyOptions = {}): SourceCodeTransformer {
  return {
    name: 'my-transformer',
    enforce: 'pre', // 在其他转换器之前执行
    idFilter(id) {
      // 仅转换 .tsx 和 .jsx 文件
      return id.match(/\.[tj]sx$/)
    },
    async transform(code, id, { uno }) {
      // code 是一个 MagicString 实例
      code.appendRight(0, '/* 我的转换器 */')
    },
  }
}
```

你可以查看 [官方转换器](/presets/#transformers) 获取更多示例。
