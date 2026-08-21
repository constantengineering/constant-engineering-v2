<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-6 sm:translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-95"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[70] flex flex-col sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[calc(100vh-3rem)] sm:w-[384px]"
    >
      <div class="flex h-full w-full flex-col overflow-hidden bg-slate-50 text-slate-800 shadow-2xl ring-1 ring-slate-900/10 sm:rounded-[26px]">
        <!-- Header -->
        <header class="flex items-center gap-2.5 border-b border-slate-200/80 bg-white px-3.5 py-3.5">
          <button
            v-if="messages.length > 0"
            class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Restart conversation"
            @click="restart"
          >
            <Icon name="heroicons:chevron-left" class="h-5 w-5" />
          </button>
          <div class="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg shadow-sm ring-1 ring-slate-200">
            <img :src="assistantImage" alt="Assistant" class="h-full w-full object-cover" loading="lazy" />
          </div>
          <div class="min-w-0 flex-1 leading-tight">
            <h3 class="truncate text-[15px] font-bold text-slate-900">Constant Project Advisor</h3>
            <p class="truncate text-xs text-slate-500">Live assistant · usually replies in under a minute</p>
          </div>
          <button
            class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close chat"
            @click="close"
          >
            <Icon name="heroicons:x-mark" class="h-5 w-5" />
          </button>
        </header>

        <!-- Conversation -->
        <div ref="scrollEl" class="flex-1 space-y-3 overflow-y-auto px-3 py-3">
          <WelcomeCard v-if="showWelcome" />

          <template v-for="(msg, i) in messages" :key="msg.id">
            <!-- Bot -->
            <div v-if="msg.role === 'bot'" class="flex items-start gap-2">
              <div class="mt-1 h-7 w-7 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-slate-200">
                <img :src="assistantImage" alt="Assistant" class="h-full w-full object-cover" loading="lazy" />
              </div>
              <div class="min-w-0 max-w-[85%]">
                <p v-if="isLastBotInGroup(i)" class="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Constant Project Advisor</p>
                <div class="rounded-2xl rounded-tl-sm border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-800 shadow-sm">
                  <span class="whitespace-pre-wrap">{{ msg.content }}</span>
                </div>
                <p class="mt-1 text-[10px] text-slate-400">{{ msg.time }}</p>
              </div>
            </div>

            <!-- User -->
            <div v-else class="flex justify-end">
              <div class="max-w-[85%]">
                <div class="rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-sm">
                  {{ msg.content }}
                </div>
                <p class="mt-1 text-right text-[10px] text-slate-400">{{ msg.time }}</p>
              </div>
            </div>
          </template>

          <!-- Typing -->
          <div v-if="isTyping" class="flex items-start gap-2">
            <div class="mt-1 h-7 w-7 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-slate-200">
              <img :src="assistantImage" alt="Assistant" class="h-full w-full object-cover" loading="lazy" />
            </div>
            <div class="rounded-2xl rounded-tl-sm border border-slate-200/80 bg-white px-3.5 py-2.5 shadow-sm">
              <p class="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Constant Project Advisor is typing</p>
              <div class="flex items-center gap-1">
                <span class="h-1.5 w-1.5 animate-eng-bounce rounded-full bg-slate-400" style="animation-delay: 0ms"></span>
                <span class="h-1.5 w-1.5 animate-eng-bounce rounded-full bg-slate-400" style="animation-delay: 150ms"></span>
                <span class="h-1.5 w-1.5 animate-eng-bounce rounded-full bg-slate-400" style="animation-delay: 300ms"></span>
              </div>
            </div>
          </div>

          <!-- Conversion actions only (not entry suggestions during free-text chat) -->
          <div v-if="options.length && !showWelcome" class="pt-1">
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="opt in options"
                :key="opt.label"
                class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:border-primary hover:text-primary"
                @click="selectOption(opt)"
              >
                <Icon v-if="opt.icon" :name="opt.icon" class="h-3.5 w-3.5 text-primary" />
                {{ opt.label }}
              </button>
            </div>
          </div>

          <LeadForm
            v-if="isCapture"
            class="relative z-10"
            :submitting="leadSubmitting"
            :status="leadStatus"
            :message="leadMessage"
            @submit="submitLead"
          />
        </div>

        <!-- Input -->
        <div class="relative z-0 border-t border-slate-200/80 bg-white px-3 pb-2 pt-2">
          <form
            class="flex items-center gap-2 rounded-xl border bg-slate-50 px-3 py-2 transition"
            :class="inputFocused ? 'border-primary ring-2 ring-primary/10' : 'border-slate-200'"
            @submit.prevent="onSubmit"
          >
            <input
              v-model="draft"
              type="text"
              :disabled="isDone"
              placeholder="Ask about your project..."
              class="min-w-0 flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none disabled:opacity-50"
              @focus="inputFocused = true"
              @blur="inputFocused = false"
            />
            <button
              type="submit"
              :disabled="!draft.trim() || isTyping || isStreaming || isDone"
              class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              aria-label="Send"
            >
              <Icon name="heroicons:paper-airplane" class="h-4 w-4" />
            </button>
          </form>
          <p class="py-1.5 text-center text-[10px] text-slate-400">
            Chat with your Constant Project Advisor
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useEngineeringChat } from '~/composables/useEngineeringChat'
import LeadForm from '~/components/assistant/LeadForm.vue'
import WelcomeCard from '~/components/assistant/WelcomeCard.vue'

const {
  isOpen,
  isTyping,
  isStreaming,
  messages,
  options,
  showWelcome,
  isCapture,
  isDone,
  leadSubmitting,
  leadStatus,
  leadMessage,
  close,
  restart,
  selectOption,
  sendText,
  submitLead
} = useEngineeringChat()

const draft = ref('')
const inputFocused = ref(false)
const scrollEl = ref(null)
const assistantImage = `${useRuntimeConfig().app.baseURL}assets/assistant/sales-representative.png`

function isLastBotInGroup(i) {
  const next = messages.value[i + 1]
  return !next || next.role !== 'bot'
}

function scrollToBottom() {
  nextTick(() => {
    if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight
  })
}

watch(() => messages.value.length, scrollToBottom)
watch(messages, scrollToBottom, { deep: true })
watch([isTyping, isStreaming, isCapture, showWelcome], scrollToBottom)
watch(isOpen, (v) => {
  if (v) scrollToBottom()
})

function onSubmit() {
  const text = draft.value
  if (!text.trim()) return
  draft.value = ''
  sendText(text)
}
</script>

<style scoped>
@keyframes eng-bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}
.animate-eng-bounce {
  animation: eng-bounce 1.2s ease-in-out infinite;
}
</style>
