import Vue from '@vitejs/plugin-vue'
// import SimpleGit from 'simple-git'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { alias } from '../alias'
import { importMapPlugin } from './vite-plugin-import-map'

const GITHUB_REPO = 'unocss/unocss'
const GITHUB_API = 'https://api.github.com'

async function getGitHubInfo() {
  const [commitRes, tagsRes] = await Promise.all([
    fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/commits/main`),
    fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/tags`),
  ])

  const commitData = await commitRes.json()
  const tagsData = await tagsRes.json()

  const SHA = commitData.sha
  const LASTEST_TAG = tagsData[0].name.replace('v', '')
  const LASTEST_TAG_SHA = tagsData[0].commit.sha

  return { SHA, LASTEST_TAG, LASTEST_TAG_SHA }
}

const { SHA, LASTEST_TAG, LASTEST_TAG_SHA } = await getGitHubInfo()

export default defineConfig({
  base: '/play/',
  resolve: {
    alias,
  },
  define: {
    '__SHA__': JSON.stringify(SHA),
    '__LASTEST_TAG__': JSON.stringify(LASTEST_TAG),
    '__LASTEST_TAG_SHA__': JSON.stringify(LASTEST_TAG_SHA),
    'process.env.BABEL_TYPES_8_BREAKING': 'false',
  },
  plugins: [
    Vue(),
    UnoCSS({
      // hmrTopLevelAwait: false, // Related to #2066
    }),
    Inspect(),
    Components({
      dirs: [
        'src/components',
        '../packages-integrations/inspector/client/components',
      ],
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        '@vueuse/math',
      ],
      dirs: [
        'src/composables',
      ],
      vueTemplate: true,
      dts: 'src/auto-imports.d.ts',
    }),
    importMapPlugin(),
  ],
  optimizeDeps: {
    exclude: [
      '@iconify/utils/lib/loader/fs',
      '@iconify/utils/lib/loader/install-pkg',
      '@iconify/utils/lib/loader/node-loader',
      '@iconify/utils/lib/loader/node-loaders',
    ],
  },
  build: {
    outDir: '../docs/dist/play',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        '@iconify/utils/lib/loader/fs',
        '@iconify/utils/lib/loader/install-pkg',
        '@iconify/utils/lib/loader/node-loader',
        '@iconify/utils/lib/loader/node-loaders',
      ],
      input: [
        './index.html',
        './__play.html',
      ],
    },
  },
})
