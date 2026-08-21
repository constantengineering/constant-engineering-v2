<template>
  <ClientOnly>
    <AssistantLauncher />
    <AssistantPanel />
  </ClientOnly>
</template>

<script setup>
import AssistantLauncher from '~/components/assistant/AssistantLauncher.vue'
import AssistantPanel from '~/components/assistant/AssistantPanel.vue'
</script>
