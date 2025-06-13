---
title: UnoCSS VS Code 扩展
description: UnoCSS 的 VS Code 扩展。
---

# VS Code 扩展

[在市场中安装](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)

- 匹配工具类的装饰和提示
- 自动加载配置
- 匹配工具类的计数

## 命令

<!-- commands -->

| 命令                            | 说明                                              |
| ------------------------------- | ------------------------------------------------- |
| `unocss.reload`                 | UnoCSS：重新加载 UnoCSS                           |
| `unocss.insert-skip-annotation` | UnoCSS：为选中内容插入 `@unocss-skip` 注释         |

<!-- commands -->

## 配置项

<!-- configs -->

| 键                             | 说明                                                     | 类型            | 默认值       |
| ------------------------------- | -------------------------------------------------------- | -------------- | ---------- |
| `unocss.disable`                | 禁用 UnoCSS 扩展                                         | `boolean`      | `false`    |
| `unocss.languageIds`            |                                                          | `array`        | ``         |
| `unocss.root`                   | 包含 UnoCSS 配置文件的项目根目录                         | `array,string` | ``         |
| `unocss.include`                | 需要检测的文件目录                                       | `array,string` | ``         |
| `unocss.exclude`                | 不需要检测的文件目录                                     | `array,string` | ``         |
| `unocss.underline`              | 启用/禁用类名的下划线装饰                               | `boolean`      | `true`     |
| `unocss.colorPreview`           | 启用/禁用颜色预览装饰                                   | `boolean`      | `true`     |
| `unocss.colorPreviewRadius`     | 颜色预览的圆角半径                                      | `string`       | `"50%"`    |
| `unocss.remToPxPreview`         | 启用/禁用 hover 提示中的 rem 转 px                      | `boolean`      | `true`     |
| `unocss.remToPxRatio`           | rem 转 px 比例                                          | `number`       | `16`       |
| `unocss.selectionStyle`         | 启用/禁用选中样式装饰                                   | `boolean`      | `true`     |
| `unocss.strictAnnotationMatch`  | 严格控制注释显示的位置                                  | `boolean`      | `false`    |
| `unocss.autocomplete.matchType` | 自动补全的匹配类型                                     | `string`       | `"prefix"` |
| `unocss.autocomplete.strict`    | 严格控制自动补全显示的位置                              | `boolean`      | `false`    |
| `unocss.autocomplete.maxItems`  | 自动补全显示的最大项数                                 | `number`       | `1000`     |

<!-- configs -->

## 配置

为了获得最佳的 IDE 体验，建议您[使用单独的 `uno.config.ts` 文件](/guide/config-file) 来配置 UnoCSS。

扩展会尝试在您的项目中查找 UnoCSS 配置文件。如果未找到配置，扩展将被禁用。

## 图标预设

如果您正在使用[图标预设](/presets/icons)，还可以安装[Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)，以获得图标的内联预览、自动补全和悬停提示信息。