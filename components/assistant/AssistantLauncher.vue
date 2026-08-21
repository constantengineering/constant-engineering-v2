<template>
  <div class="fixed bottom-6 right-6 z-[60] flex items-end gap-3">
    <!-- Rotating teaser bubble (desktop) -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="showTeaser && !isOpen"
        role="button"
        tabindex="0"
        class="relative hidden max-w-[280px] cursor-pointer rounded-2xl rounded-br-sm bg-white px-4 py-3.5 shadow-xl ring-1 ring-slate-200/70 transition hover:shadow-2xl hover:ring-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:block"
        aria-label="Open chat assistant"
        @click="openFromTeaser"
        @keydown.enter="openFromTeaser"
        @keydown.space.prevent="openFromTeaser"
      >
        <button
          class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-500 transition hover:bg-slate-300"
          aria-label="Dismiss"
          @click.stop="dismissTeaser"
        >
          <Icon name="heroicons:x-mark" class="h-3 w-3" />
        </button>
        <div class="flex items-start gap-2.5">
          <div class="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full shadow-md ring-2 ring-primary/20">
            <img :src="assistantImage" alt="Assistant" class="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <p class="text-xs font-bold text-slate-800">Constant Project Advisor</p>
            <p class="mt-1 text-sm leading-snug text-slate-600">
              Ask about your project — electrical, mechanical, or industrial.
            </p>
          </div>
        </div>
        <p class="mt-2 pl-[54px] text-xs font-semibold text-primary">Talk to an expert →</p>
      </div>
    </Transition>

    <!-- Launcher button -->
    <button
      v-show="!isOpen"
      type="button"
      class="group relative flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary to-primary-700 text-white shadow-2xl shadow-primary/50 transition-transform duration-300 hover:scale-105 active:scale-95 animate-eng-float"
      aria-label="Open Constant Project Advisor"
      @click="open"
    >
      <span class="pointer-events-none absolute inset-0 rounded-full bg-primary opacity-60 animate-eng-ping" aria-hidden="true"></span>
      <span class="pointer-events-none absolute -inset-2 rounded-full border-2 border-primary/40 animate-eng-ping-delayed" aria-hidden="true"></span>
      <span class="pointer-events-none absolute inset-1 rounded-full border border-white/35" aria-hidden="true"></span>
      <span class="relative z-10 h-[72px] w-[72px] overflow-hidden rounded-full ring-[3px] ring-white shadow-xl">
        <img :src="assistantImage" alt="Open assistant" class="h-full w-full object-cover" loading="lazy" />
      </span>
      <span class="absolute right-1 top-1 z-20 flex h-4 w-4">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span class="relative inline-flex h-4 w-4 rounded-full bg-green-500 ring-2 ring-white"></span>
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useEngineeringChat } from '~/composables/useEngineeringChat'

const { isOpen, open } = useEngineeringChat()
const assistantImage = `${useRuntimeConfig().app.baseURL}assets/assistant/sales-representative.png`

const showTeaser = ref(false)
let showTimer = null

onMounted(() => {
  showTimer = setTimeout(() => {
    showTeaser.value = true
  }, 1500)
})

onUnmounted(() => {
  clearTimeout(showTimer)
})

function dismissTeaser() {
  showTeaser.value = false
}

function openFromTeaser() {
  showTeaser.value = false
  open()
}
</script>

<style scoped>
@keyframes eng-ping {
  75%,
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
.animate-eng-ping {
  animation: eng-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-eng-ping-delayed {
  animation: eng-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite 0.8s;
}

@keyframes eng-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-eng-float {
  animation: eng-float 3s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-eng-ping,
  .animate-eng-ping-delayed,
  .animate-eng-float {
    animation: none;
  }
}
</style>
