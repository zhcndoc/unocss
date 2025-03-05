---
title: 编译类转换器
description: 将一组类编译成一个类 (@unocss/transformer-compile-class)
outline: deep
---

# 编译类转换器

<!-- @unocss-ignore -->

将一组类编译成一个类。灵感来自 Windi CSS 的 [编译模式](https://windicss.org/posts/modes.html#compilation-mode) 和 [issue #948](https://github.com/unocss/unocss/issues/948) 提出的 [@UltraCakeBakery](https://github.com/UltraCakeBakery)。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/transformer-compile-class
```

```bash [yarn]
yarn add -D @unocss/transformer-compile-class
```

```bash [npm]
npm install -D @unocss/transformer-compile-class
```

```bash [bun]
bun add -D @unocss/transformer-compile-class
```

:::

```ts [uno.config.ts]
import transformerCompileClass from '@unocss/transformer-compile-class'
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...
  transformers: [
    transformerCompileClass(),
  ],
})
```

::: tip
这个预设包含在 `unocss` 包中，你也可以从那里导入：

```ts
import { transformerCompileClass } from 'unocss'
```

:::

## 用法

在类字符串的开头添加 `:uno:` 来标记它们进行编译。

例如：

```html
<div class=":uno: text-center sm:text-left">
  <div class=":uno: text-sm font-bold hover:text-red" />
</div>
```

将编译为：

```html
<div class="uno-qlmcrp">
  <div class="uno-0qw2gr" />
</div>
```

```css
.uno-qlmcrp {
  text-align: center;
}
.uno-0qw2gr {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
}
.uno-0qw2gr:hover {
  --un-text-opacity: 1;
  color: rgb(248 113 113 / var(--un-text-opacity));
}
@media (min-width: 640px) {
  .uno-qlmcrp {
    text-align: left;
  }
}
```

## 选项

你可以通过选项配置触发字符串和编译类的前缀。有关详细信息，请参考 [类型定义](https://github.com/unocss/unocss/blob/main/packages-presets/transformer-compile-class/src/index.ts#L4)。

## 工具支持

### ESLint

有一个 eslint 规则用于强制在整个项目中使用类编译转换器：[@unocss/enforce-class-compile](https://unocss.dev/integrations/eslint#unocss-enforce-class-compile)

**用法：**

```json
{
  "plugins": ["@unocss"],
  "rules": {
    "@unocss/enforce-class-compile": "warn"
  }
}
```

## 许可证

- MIT 许可证 &copy; 2021-现在 [Anthony Fu](https://github.com/antfu)
