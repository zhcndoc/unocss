<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { Pane, Splitpanes } from 'splitpanes'

const bp = useBreakpoints(breakpointsTailwind)

const isMobile = bp.smaller('sm')
const isResizing = ref(false)
</script>

<template>
  <Splitpanes
    class="size-screen"
    :horizontal="isMobile"
    @resized="isResizing = false"
    @resize="isResizing = true"
  >
    <Pane>
      <Preview :resizing="isResizing" />
    </Pane>
    <Pane>
      <Editor />
    </Pane>
  </Splitpanes>
</template>
