<template>
  <div class="relative z-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div v-if="status === 'success'" class="flex flex-col items-center gap-2 py-3 text-center">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <Icon name="heroicons:check-circle" class="h-7 w-7 text-green-600" />
      </div>
      <p class="text-sm font-medium text-slate-700">{{ message }}</p>
    </div>

    <form v-else class="space-y-3" @submit.prevent="onSubmit">
      <p class="text-sm font-bold text-slate-900">Your contact details</p>
      <p class="text-xs leading-relaxed text-slate-500">Our sales team will follow up shortly after you submit.</p>
      <input
        v-model.trim="form.name"
        type="text"
        name="name"
        autocomplete="name"
        required
        placeholder="Full Name *"
        class="eng-input"
      />
      <input
        v-model.trim="form.phone"
        type="tel"
        name="phone"
        autocomplete="tel"
        required
        placeholder="Phone Number *"
        class="eng-input"
      />
      <input
        v-model.trim="form.email"
        type="email"
        name="email"
        autocomplete="email"
        required
        placeholder="Email Address *"
        class="eng-input"
      />
      <input
        v-model.trim="form.company"
        type="text"
        name="company"
        autocomplete="organization"
        placeholder="Company (optional)"
        class="eng-input"
      />

      <p v-if="status === 'error'" class="text-xs font-medium text-red-600">{{ message }}</p>

      <button
        type="submit"
        :disabled="submitting"
        class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Icon v-if="submitting" name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
        <span>{{ submitting ? 'Sending...' : 'Submit & request callback' }}</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

defineProps({
  submitting: { type: Boolean, default: false },
  status: { type: String, default: 'idle' },
  message: { type: String, default: '' }
})

const emit = defineEmits(['submit'])

const form = reactive({ name: '', phone: '', email: '', company: '' })

function onSubmit() {
  emit('submit', { ...form })
}
</script>

<style scoped>
.eng-input {
  display: block;
  width: 100%;
  border-radius: 0.65rem;
  border: 1px solid rgb(203 213 225);
  background: #fff;
  padding: 0.6rem 0.8rem;
  font-size: 0.875rem;
  color: rgb(15 23 42);
  pointer-events: auto;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.eng-input::placeholder {
  color: rgb(148 163 184);
}
.eng-input:focus {
  outline: none;
  border-color: #d11800;
  box-shadow: 0 0 0 3px rgba(209, 24, 0, 0.15);
}
</style>
