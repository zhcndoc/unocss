# 变换器

提供统一的接口以变换源代码，以支持约定。

```ts [my-transformer.ts]
import { createFilter } from '@rollup/pluginutils'
import { SourceCodeTransformer } from 'unocss'

export default function myTransformers(options: MyOptions = {}): SourceCodeTransformer {
  return {
    name: 'my-transformer',
    enforce: 'pre', // 在其他变换器之前执行
    idFilter(id) {
      // 仅变换 .tsx 和 .jsx 文件
      return id.match(/\.[tj]sx$/)
    },
    async transform(code, id, { uno }) {
      // code 是一个 MagicString 实例
      code.appendRight(0, '/* 我的变换器 */')
    },
  }
}
```

您可以查看 [官方变换器](/presets/#transformers) 以获取更多示例。
