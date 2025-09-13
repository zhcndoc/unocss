# Safelist

Safelist 是 UnoCSS 配置中的一个重要选项，允许你指定一组实用类，这些类无论在你的源代码中是否被检测到，都应始终包含在生成的 CSS 中。

## 基本用法

### 字符串数组

最简单的用法是提供一个包含你想保留的类名的字符串数组：

```ts
// uno.config.ts
export default defineConfig({
  safelist: [
    'p-1',
    'p-2',
    'p-3',
    'text-center',
    'bg-red-500'
  ]
})
```

### 函数形式

Safelist 也可以包含在构建时调用的函数，这些函数能够动态返回类名：

```ts
// uno.config.ts
export default defineConfig({
  safelist: [
    // 静态类名
    'p-1',
    'p-2',
    // 动态函数
    context => ['m-1', 'm-2', 'm-3'],
    (context) => {
      // 基于主题生成类名
      const colors = Object.keys(context.theme.colors || {})
      return colors.map(color => `bg-${color}-500`)
    }
  ]
})
```

### 混合使用

你可以在同一个 safelist 配置中混合使用字符串和函数：

```ts
// uno.config.ts
export default defineConfig({
  safelist: [
    // 静态类名
    'prose',
    'bg-orange-300',
    // 动态生成
    () => ['flex', 'grid', 'block'],
    // 条件动态生成
    (context) => {
      if (process.env.NODE_ENV === 'development') {
        return ['debug-border', 'debug-grid']
      }
      return []
    }
  ]
})
```

## 返回值类型

Safelist 函数可以返回以下类型的值：

- `Arrayable<string>` - 字符串或字符串数组

```ts
safelist: [
  // 返回字符串数组
  () => ['class1', 'class2', 'class3'],

  // 返回单个字符串
  () => 'single-class',

  // 返回嵌套数组（会被拍平）
  () => [['nested1', 'nested2'], 'normal3']
]
```

## 实际应用场景

### 动态生成的类名

当你有动态生成的类名，可能无法被静态分析检测到时：

```ts
safelist: [
  // 动态颜色类
  () => {
    const dynamicColors = ['primary', 'secondary', 'accent']
    return dynamicColors.flatMap(color => [
      `bg-${color}`,
      `text-${color}`,
      `border-${color}`
    ])
  },

  // 动态尺寸类
  () => {
    return Array.from({ length: 12 }, (_, i) => `gap-${i + 1}`)
  }
]
```

### 第三方组件库支持

为第三方组件库提供必要的类名：

```ts
safelist: [
  // 组件库保留类名
  'prose',
  'prose-sm',
  'prose-lg',

  // 动态生成组件变体
  () => {
    const variants = ['primary', 'secondary', 'danger', 'success']
    const sizes = ['sm', 'md', 'lg']

    return variants.flatMap(variant =>
      sizes.map(size => `btn-${variant}-${size}`)
    )
  }
]
```

## 与其他配置的关系

### 与 blocklist 的区别

- **safelist**: 确保指定的类名始终被包含
- **blocklist**: 确保指定的类名始终被排除

```ts
export default defineConfig({
  safelist: ['always-include'],
  blocklist: ['never-include']
})
```

### 与生成选项的关系

生成 CSS 时，可以通过 `GenerateOptions` 控制是否包含 safelist：

```ts
const { css } = await uno.generate('', {
  safelist: true // 包含来自 safelist 的类名
})
```