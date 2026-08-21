<template>
  <section class="py-24 lg:py-32 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Our Clients
        </h2>
        <p class="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
          We are proud of contributing to the success of leading organizations across Ethiopia.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
        <article
          v-for="client in clients"
          :key="client.name"
          class="group relative aspect-[4/5] sm:aspect-[3/4] w-[calc(50%-0.375rem)] sm:w-36 md:w-40 lg:w-44 xl:w-48 border border-slate-200 bg-white overflow-hidden cursor-pointer"
          :class="{ 'is-active': activeClient === client.name }"
          @click="toggleClient(client.name)"
        >
          <!-- Default -->
          <div
            class="absolute inset-0 flex flex-col p-4 sm:p-5 transition-opacity duration-300 ease-out group-hover:opacity-0 group-[.is-active]:opacity-0"
          >
            <div class="flex-1 flex items-center justify-center px-2">
              <img
                :src="client.logo"
                :alt="client.name"
                class="max-h-20 sm:max-h-24 w-full object-contain"
                loading="lazy"
              />
            </div>
            <span class="text-[11px] sm:text-xs text-slate-400 leading-none">
              {{ client.category }}
            </span>
          </div>

          <!-- Hover / active -->
          <div
            class="absolute inset-0 flex flex-col bg-primary p-4 sm:p-5 text-white opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-[.is-active]:opacity-100"
          >
            <div class="flex justify-center mb-3 sm:mb-4">
              <img
                :src="client.logo"
                :alt="client.name"
                class="max-h-12 sm:max-h-14 w-auto object-contain brightness-0 invert"
                loading="lazy"
              />
            </div>
            <p class="flex-1 text-xs sm:text-sm leading-relaxed text-white/95">
              {{ client.services }}
            </p>
            <div class="flex items-end justify-between gap-2 mt-3">
              <span class="text-[11px] sm:text-xs text-white/70 leading-none">
                {{ client.category }}
              </span>
              <Icon
                name="heroicons:arrow-right"
                class="h-4 w-4 shrink-0 text-white/80"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { clientProjects, type ClientProject } from '~/data/clients'

withDefaults(
  defineProps<{
    clients?: ClientProject[]
  }>(),
  {
    clients: () => clientProjects,
  },
)

const activeClient = ref<string | null>(null)

function toggleClient(name: string) {
  activeClient.value = activeClient.value === name ? null : name
}
</script>
