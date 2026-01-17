<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'
// import HomePage from './components/HomePage.vue'

const { isDark } = useData()

function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      fill: 'forwards',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})
</script>

<template>
  <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
  <DefaultTheme.Layout>
    <!-- <template #home-features-after>
      <HomePage />
    </template> -->

    <template #doc-before>
      <div
        class="flex w-full justify-center rounded-2 border border-gray-950/5 p-2 dark:border-white/10 cursor-pointer mb-4"
      >
        <div class="wwads-cn wwads-horizontal" data-id="354" data-umami-event="ads-wwads" />
      </div>
    </template>

    <template #aside-outline-after>
      <div
        data-umami-event="ads-rainyun"
        class="flex w-full justify-center rounded-2 border border-gray-950/5 p-2 dark:border-white/10 cursor-pointer mt-4"
      >
        <!-- <div class="wwads-cn wwads-horizontal wwads-sticky" data-id="354" /> -->
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
