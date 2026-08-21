<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {{ title }}
        </h2>
        <p
          v-if="subtitle"
          class="mt-3 text-sm leading-relaxed text-slate-500 sm:mt-4 sm:text-base"
        >
          {{ subtitle }}
        </p>
      </div>

      <ul
        class="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:mt-12 sm:gap-x-14 sm:gap-y-10 lg:gap-x-16"
        role="list"
      >
        <li
          v-for="partner in resolvedPartners"
          :key="partner.name"
        >
          <img
            :src="partner.src"
            :alt="partner.name"
            :class="[
              'w-auto object-contain',
              partner.heightClass || DEFAULT_PARTNER_HEIGHT_CLASS,
            ]"
            loading="lazy"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  DEFAULT_PARTNER_HEIGHT_CLASS,
  partnerLogos,
  type PartnerLogo,
} from '~/data/partners'

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    partners?: PartnerLogo[]
  }>(),
  {
    title: 'Partners',
    subtitle: 'Authorized with leading global equipment brands.',
  },
)

const resolvedPartners = computed(() => props.partners ?? partnerLogos)
</script>
