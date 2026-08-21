<template>
  <div class="min-h-screen">
    <!-- Hero Section - Variant C -->
    <HeroVariantC />

    <PartnerLogos />

    <!-- Our Foundation Section -->
    <section class="relative py-24 lg:py-32 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :visible="{ opacity: 1, y: 0 }"
          :delay="50"
          class="mx-auto max-w-2xl mb-12 lg:mb-16 text-center"
        >
          <p class="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
            Foundation
          </p>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Built on principles that drive
            <span class="text-primary">excellence</span>
            in every project.
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-5 lg:gap-6">
          <article
            v-for="(principle, index) in principles"
            :key="principle.title"
            v-motion
            :initial="{ opacity: 0, y: 12 }"
            :visible="{ opacity: 1, y: 0 }"
            :delay="100 + index * 50"
            class="border border-slate-200 bg-slate-50/50 p-6 sm:p-7 lg:p-8"
          >
            <div class="flex items-baseline justify-between gap-4 mb-5">
              <span class="text-xs font-semibold tracking-[0.2em] text-primary">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <span class="text-xs font-medium uppercase tracking-wider text-slate-400">
                {{ principle.label }}
              </span>
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-3 tracking-tight">
              {{ principle.title }}
            </h3>
            <p class="text-sm font-medium text-slate-800 mb-3 leading-relaxed">
              {{ principle.summary }}
            </p>
            <p class="text-sm text-slate-500 leading-relaxed">
              {{ principle.detail }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <FeaturedProducts />

    <ClientsSection />

    <CtaSection />
  </div>
</template>

<script setup>
import { onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const principles = [
  {
    label: 'Conduct',
    title: 'Integrity',
    summary: 'Built on unwavering ethical standards and transparent business practices.',
    detail:
      'Every project is delivered with complete honesty and accountability, ensuring trust and reliability in every interaction.',
  },
  {
    label: 'Relationships',
    title: 'Partnerships',
    summary: 'Long-term relationships with clients, suppliers, and communities built on mutual trust.',
    detail:
      'We grow together through shared success, creating lasting value for all stakeholders involved in our projects.',
  },
  {
    label: 'Delivery',
    title: 'Excellence',
    summary: 'Uncompromising quality in every detail, from design to delivery.',
    detail:
      'We set the standard for industrial engineering excellence, ensuring every solution meets the highest quality benchmarks.',
  },
]

onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'))
  }, 100)
})

watch(() => route.path, async () => {
  await nextTick()
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'))
  }, 100)
}, { immediate: false })
</script>
