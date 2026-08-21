<template>
  <section class="py-24 lg:py-32 bg-stone-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="relative overflow-hidden rounded-[2.25rem] sm:rounded-[2.75rem] bg-[#231815] px-10 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-20"
      >
        <div
          class="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(ellipse_at_right,rgba(209,24,0,0.28)_0%,transparent_68%)]"
          aria-hidden="true"
        />

        <div class="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          <div class="max-w-3xl">
            <p class="text-xs sm:text-sm font-medium uppercase tracking-[0.22em] text-white/40 mb-6 sm:mb-8">
              Next step
            </p>
            <p class="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] text-white/95 leading-[1.3] tracking-tight text-balance">
              Ready to power your industry with
              <em class="text-primary italic font-normal">reliable engineering solutions</em>
              built for demanding operations.
            </p>
          </div>

          <div class="shrink-0 lg:text-right">
            <NuxtLink
              to="/contact"
              class="group inline-flex items-center rounded-full bg-stone-100 pl-8 sm:pl-9 pr-2 py-2 transition-colors hover:bg-white"
            >
              <span class="text-base sm:text-lg font-medium text-slate-900 pr-5 sm:pr-6">
                Contact us today
              </span>
              <span class="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary transition-transform group-hover:scale-105">
                <Icon name="heroicons:arrow-right" class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </span>
            </NuxtLink>
            <p class="mt-5 text-xs sm:text-sm text-white/35 tracking-wide">
              CONSTANT ENGINEERING plc
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
