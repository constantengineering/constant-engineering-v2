<template>
  <div class="min-h-screen bg-white flex flex-col overflow-x-hidden">
    <Navbar />
    <main 
      class="flex-1 transition-all duration-300 w-full overflow-x-hidden pt-14 sm:pt-16"
      :class="[{ 'blur-md': megaMenuOpen }]"
      :style="{ filter: megaMenuOpen ? 'blur(8px)' : 'none', transition: 'filter 0.3s ease' }"
    >
      <NuxtPage :key="$route.fullPath" />
    </main>
    <Footer 
      :class="{ 'blur-md': megaMenuOpen }"
      :style="{ filter: megaMenuOpen ? 'blur(8px)' : 'none', transition: 'filter 0.3s ease' }"
    />
    <EngineeringAssistant />
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'

const megaMenuOpen = inject('megaMenuOpen', ref(false))
</script>
