import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import Vue from '@vitejs/plugin-vue'
// import SimpleGit from 'simple-git'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { alias } from '../alias'
import packageJson from '../package.json' with { type: 'json' }
import { importMapPlugin } from './vite-plugin-import-map'

const GITHUB_REPO = 'unocss/unocss'
const execFileAsync = promisify(execFile)

async function getGitHubInfo() {
  const tag = `v${packageJson.version}`
  const { stdout } = await execFileAsync('git', [
    'ls-remote',
    `https://github.com/${GITHUB_REPO}.git`,
    'refs/heads/main',
    `refs/tags/${tag}`,
    `refs/tags/${tag}^{}`,
  ])
  const refs = new Map<string, string>()
  for (const line of stdout.trim().split('\n')) {
    if (!line)
      continue
    const [sha, ref] = line.split('\t')
    refs.set(ref, sha)
  }

  const SHA = refs.get('refs/heads/main')
  const LASTEST_TAG_SHA = refs.get(`refs/tags/${tag}^{}`) ?? refs.get(`refs/tags/${tag}`)
  if (!SHA || !LASTEST_TAG_SHA)
    throw new Error(`Could not resolve main and ${tag} from ${GITHUB_REPO}`)

  return { SHA, LASTEST_TAG: packageJson.version, LASTEST_TAG_SHA }
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
      'oxc-parser',
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
