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

## 以编程方式使用

各集成（Vite、Webpack、CLI 等）会应用转换器。直接使用 [`@unocss/core`](/tools/core) 时，`createGenerator` 会从配置中解析 `transformers`，但不会运行它们，因此在提取工具类之前，需要先自行将转换器应用到源代码：

```ts
import type { UnocssPluginContext } from '@unocss/core'
import { createGenerator } from '@unocss/core'
import MagicString from 'magic-string'
import config from './uno.config'

const uno = await createGenerator(config)
const tokens = new Set<string>()

// the subset of the plugin context used by the official transformers
const ctx = { uno, tokens, invalidate: () => {} } as unknown as UnocssPluginContext

async function applyTransformers(code: string, id: string) {
  for (const enforce of ['pre', 'default', 'post'] as const) {
    for (const t of uno.config.transformers ?? []) {
      if ((t.enforce ?? 'default') !== enforce)
        continue
      if (t.idFilter && !t.idFilter(id))
        continue
      if (t.codeFilter && !t.codeFilter(code, id))
        continue
      const s = new MagicString(code)
      await t.transform(s, id, ctx)
      code = s.toString()
    }
  }
  return code
}

const code = await applyTransformers(source, 'src/App.vue')
await uno.applyExtractors(code, 'src/App.vue', tokens)
const { css } = await uno.generate(tokens)
```

请使用转换后的 `code` 替代原始源代码，因为 [Variant Group](/transformers/variant-group) 和 [Compile Class](/transformers/compile-class) 等转换器会重写其中的类名。使用 [Directives](/transformers/directives) 时，CSS 文件也一样。

这还不包括集成额外提供的功能，例如 `@unocss-ignore` 和 `@unocss-skip` 注释，或源映射。
