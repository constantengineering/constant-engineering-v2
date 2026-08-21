<template>
  <div class="bg-slate-50 min-h-screen">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-6">
      <p class="text-xs font-semibold tracking-[0.25em] uppercase text-slate-500 mb-3">
        Exploration
      </p>
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-3">
        Hero section exploration
      </h1>
      <p class="max-w-2xl text-sm sm:text-base text-slate-600">
        Three reusable hero variants for a modern SaaS / tech product landing page. Each block is isolated so
        you can swap, refine, or wire in real content later.
      </p>
    </div>

    <!-- Hero Variant C -->
    <HeroVariantC />
  </div>
</template>

<script setup>
import HeroVariantC from '~/components/HeroVariantC.vue'

definePageMeta({
  robots: false,
  sitemap: false
})
</script>

