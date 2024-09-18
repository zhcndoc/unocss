import type { DefaultTheme } from 'vitepress/types'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { version } from '../../package.json'

const ogUrl = 'https://unocss.zhcndoc.com/'
const ogImage = `${ogUrl}og.png#1`
const title = 'UnoCSS 中文文档'
const description = '即时按需生成的原子化 CSS 引擎'

const Guides: DefaultTheme.NavItemWithLink[] = [
  { text: '入门指南', link: '/guide/' },
  { text: '为什么选择 UnoCSS？', link: '/guide/why' },
  { text: '预设', link: '/guide/presets' },
  { text: '样式重置', link: '/guide/style-reset' },
  { text: '配置文件', link: '/guide/config-file' },
  { text: '提取 & 安全列表', link: '/guide/extracting' },
]

const Configs: DefaultTheme.NavItemWithLink[] = [
  { text: '概述', link: '/config/' },
  { text: '规则', link: '/config/rules' },
  { text: '快捷方式', link: '/config/shortcuts' },
  { text: '主题', link: '/config/theme' },
  { text: '变体', link: '/config/variants' },
  { text: '提取器', link: '/config/extractors' },
  { text: '转换器', link: '/config/transformers' },
  { text: '预处理', link: '/config/preflights' },
  { text: '层', link: '/config/layers' },
  { text: '自动完成', link: '/config/autocomplete' },
  { text: '预设', link: '/config/presets' },
]

const Integrations: DefaultTheme.NavItemWithLink[] = [
  { text: 'Vite', link: '/integrations/vite' },
  { text: 'Nuxt', link: '/integrations/nuxt' },
  { text: 'Astro', link: '/integrations/astro' },
  { text: 'Svelte Scoped', link: '/integrations/svelte-scoped' },
  { text: 'Webpack', link: '/integrations/webpack' },
  { text: 'Runtime', link: '/integrations/runtime' },
  { text: 'CLI', link: '/integrations/cli' },
  { text: 'PostCSS', link: '/integrations/postcss' },
  { text: 'ESLint', link: '/integrations/eslint' },
  { text: 'VS Code 扩展', link: '/integrations/vscode' },
  { text: 'JetBrains IDE 插件', link: '/integrations/jetbrains' },
]

const Presets: DefaultTheme.NavItemWithLink[] = [
  { text: 'Uno（默认）', link: '/presets/uno' },
  { text: '图标', link: '/presets/icons' },
  { text: 'Attributify', link: '/presets/attributify' },
  { text: '排版', link: '/presets/typography' },
  { text: 'Web 字体', link: '/presets/web-fonts' },
  { text: 'Wind', link: '/presets/wind' },
  { text: 'Mini', link: '/presets/mini' },
  { text: 'Legacy 兼容', link: '/presets/legacy-compat' },
  { text: 'Tagify', link: '/presets/tagify' },
  { text: 'Rem to px', link: '/presets/rem-to-px' },
]

const Transformers: DefaultTheme.NavItemWithLink[] = [
  { text: '变体组', link: '/transformers/variant-group' },
  { text: '指令', link: '/transformers/directives' },
  { text: '编译类', link: '/transformers/compile-class' },
  { text: 'Attributify JSX', link: '/transformers/attributify-jsx' },
]

const Extractors: DefaultTheme.NavItemWithLink[] = [
  { text: 'Pug 提取器', link: '/extractors/pug' },
  { text: 'MDC 提取器', link: '/extractors/mdc' },
  { text: 'Svelte 提取器', link: '/extractors/svelte' },
  { text: '任意变体提取器', link: '/extractors/arbitrary-variants' },
]

const Tools: DefaultTheme.NavItemWithLink[] = [
  { text: '检查器', link: '/tools/inspector' },
  { text: '核心', link: '/tools/core' },
  { text: '自动完成', link: '/tools/autocomplete' },
]

const Nav: DefaultTheme.NavItem[] = [
  {
    text: '指南',
    items: [
      {
        text: '指南',
        items: Guides,
      },
    ],
    activeMatch: '^/guide/',
  },
  {
    text: '集成',
    items: [
      {
        text: '概述',
        link: '/integrations/',
      },
      {
        text: '集成',
        items: Integrations,
      },
      {
        text: '示例',
        link: '/integrations/#examples',
      },
    ],
    activeMatch: '^/integrations/',
  },
  {
    text: '配置',
    items: [
      {
        text: '配置文件',
        link: '/guide/config-file',
      },
      {
        text: '概念',
        items: Configs,
      },
    ],
    activeMatch: '^/config/',
  },
  {
    text: '预设',
    items: [
      {
        text: '概述',
        link: '/presets/',
      },
      {
        text: '社区预设',
        link: '/presets/community',
      },
      {
        text: '预设',
        items: Presets,
      },
      {
        text: '转换器',
        items: Transformers,
      },
      {
        text: '提取器',
        items: Extractors,
      },
    ],
    activeMatch: '^/(presets|transformers|extractors)/',
  },
  { text: '交互式文档', link: '/interactive/', target: '_blank' },
  { text: '在线体验', link: '/play/', target: '_blank' },
  {
    text: `v${version}`,
    items: [
      {
        text: '发行说明',
        link: 'https://github.com/unocss/unocss/releases',
      },
      {
        text: '贡献',
        link: 'https://github.com/unocss/unocss/blob/main/CONTRIBUTING.md',
      },
      {
        component: 'RainbowAnimationSwitcher',
        props: {
          text: 'Rainbow Animation',
        },
      },
    ],
  },
]

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  {
    text: '指南',
    items: Guides,
  },
  {
    text: '集成',
    items: [
      {
        text: '概述',
        link: '/integrations/',
      },
      ...Integrations,
      {
        text: '示例',
        link: '/integrations/#examples',
      },
    ],
  },
  {
    text: '配置',
    link: '/config/',
  },
  {
    text: '预设',
    link: '/presets/',
  },
]

const SidebarPresets: DefaultTheme.SidebarItem[] = [
  {
    text: '概述',
    link: '/presets/',
  },
  {
    text: '预设',
    collapsed: false,
    items: Presets,
  },
  {
    text: '社区预设',
    link: '/presets/community',
  },
  {
    text: '转换器',
    collapsed: false,
    items: Transformers,
  },
  {
    text: '提取器',
    collapsed: false,
    items: Extractors,
  },
  {
    text: '其他工具',
    collapsed: false,
    items: Tools,
  },
]

const SidebarConfig: DefaultTheme.SidebarItem[] = [
  {
    text: '配置',
    collapsed: false,
    items: Configs,
  },
  {
    text: '配置文件',
    link: '/guide/config-file',
  },
]

export default defineConfig({
  lang: 'zh-CN',
  title,
  titleTemplate: ':title - UnoCSS 中文文档',
  description,
  outDir: './dist',
  head: [
    ['meta', { name: 'baidu-site-verification', content: 'codeva-rhcRidvi5r' }],
    [
      'script',
      {
        'defer': '',
        'src': 'https://analytics.ikxin.com/script.js',
        'data-website-id': 'f0e90b0d-e086-4fdc-b173-de4857b71900',
      },
    ],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico', type: 'image/png', sizes: '16x16' }],
    ['meta', { name: 'author', content: 'Anthony Fu' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: title }],
    ['meta', { name: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:site', content: '@antfu7' }],
    ['meta', { name: 'twitter:url', content: ogUrl }],
    ['link', { rel: 'search', type: 'application/opensearchdescription+xml', href: '/search.xml', title: 'UnoCSS' }],
  ],
  lastUpdated: true,
  cleanUrls: false,
  ignoreDeadLinks: [
    /^\/play/,
    /^\/interactive/,
    /:\/\/localhost/,
  ],
  sitemap: {
    hostname: 'https://unocss.zhcndoc.com',
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    codeTransformers: [
      transformerTwoslash({
        processHoverInfo: info => info.replace(/_unocss_core\./g, ''),
      }),
    ],
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
    },
    en: {
      label: 'English',
      lang: 'en',
      link: 'https://unocss.dev/',
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    nav: Nav,
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    localeLinks: {
      text: '简体中文',
      items: [{ text: 'English', link: 'https://unocss.dev/' }],
    },

    search: {
      provider: 'algolia',
      options: {
        appId: 'ZPBCQYOD2S',
        apiKey: '80a4a6cfab63fc127d8c5e8db5728995',
        indexName: 'unocss',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消',
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除',
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接',
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者',
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈',
                },
              },
            },
          },
        },
      },
    },

    sidebar: {
      '/guide/': SidebarGuide,
      '/integrations/': SidebarGuide,

      '/tools/': SidebarPresets,
      '/presets/': SidebarPresets,
      '/transformers/': SidebarPresets,
      '/extractors/': SidebarPresets,

      '/config/': SidebarConfig,
    },
    editLink: {
      text: '在 GitHub 上查看此页面',
      pattern: 'https://github.com/zhcndoc/unocss/tree/main/docs/:path',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/unocss/unocss' },
    ],
    footer: {
      message: `
        <a style="text-decoration: none;" rel="nofollow" target="__blank" href="https://zeabur.com?referralCode=ikxin&amp;utm_source=ikxin">Deployed on Zeabur</a>
        <a style="text-decoration: none; margin-left: 8px;" rel="nofollow" target="__blank" href="https://beian.miit.gov.cn">沪ICP备2024070610号-3</a>
      `,
      copyright: 'Copyright © 2020-2024 Anthony Fu',
    },
  },
})
