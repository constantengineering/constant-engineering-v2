<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="h-1 bg-gradient-to-r from-primary via-primary-600 to-primary-800"></div>
    <div class="px-4 py-4">
      <div class="mb-3 flex items-center gap-2.5 rounded-xl bg-slate-50 p-2.5 ring-1 ring-slate-200/70">
        <div class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200">
          <img :src="assistantImage" alt="Constant Project Advisor" class="h-full w-full object-cover" loading="lazy" />
        </div>
        <div class="min-w-0">
          <p class="truncate text-xs font-bold uppercase tracking-[0.09em] text-primary">Constant Project Advisor</p>
          <p class="truncate text-xs text-slate-500">Online now for project consultation</p>
        </div>
      </div>
      <p class="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">Constant Engineering</p>
      <h4 class="mt-1 text-base font-bold text-slate-900">Hi, I am here to help with your project</h4>
      <p class="mt-2 text-sm leading-relaxed text-slate-600">
        Share your electrical, mechanical, or industrial requirements and I will guide you to the right next step.
      </p>
    </div>
  </div>
</template>

<script setup>
const assistantImage = `${useRuntimeConfig().app.baseURL}assets/assistant/sales-representative.png`
</script>
