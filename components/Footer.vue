<template>
  <footer class="bg-slate-900 text-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
        <!-- Contact Information -->
        <div>
          <h3 class="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact Us</h3>
          <div class="space-y-3 sm:space-y-4">
            <a
              href="tel:+251924909098"
              class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-300 hover:text-white transition-colors"
            >
              <Icon name="heroicons:phone" class="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span class="break-all">+251 924 909 098</span>
            </a>
            <a
              href="tel:+251911147101"
              class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-300 hover:text-white transition-colors"
            >
              <Icon name="heroicons:phone" class="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span class="break-all">+251 911 147 101</span>
            </a>
            <a
              href="mailto:info@constanteng.com"
              class="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-300 hover:text-white transition-colors"
            >
              <Icon name="heroicons:envelope" class="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span class="break-all">info@constanteng.com</span>
            </a>
          </div>
        </div>

        <!-- Visit Us -->
        <div>
          <h3 class="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Visit Us</h3>
          <div class="space-y-2 sm:space-y-4 text-sm sm:text-base text-slate-300">
            <p>KKare Building</p>
            <p>Mozambique Street, Mexico Area</p>
            <p>Addis Ababa, Ethiopia</p>
            <a
              href="https://maps.app.goo.gl/FFS3Wvaz4BxTKAje8"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-3 sm:mt-4 text-sm sm:text-base"
            >
              Get Directions
              <Icon name="heroicons:arrow-right" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Follow Us</h3>
          <div class="flex items-center gap-3 sm:gap-4">
            <a
              href="https://t.me/constantENGINEERING"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              class="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-primary hover:text-white transition-colors"
            >
              <Icon name="simple-icons:telegram" class="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61580414953060"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-primary hover:text-white transition-colors"
            >
              <Icon name="simple-icons:facebook" class="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/constant-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-primary hover:text-white transition-colors"
            >
              <Icon name="simple-icons:linkedin" class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

            <!-- Map Section -->
      <div class="mb-8 sm:mb-12">
        <h3 class="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Location</h3>
        <div class="rounded-lg overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps?q=KKare+Building,+Mozambique+Street,+Mexico+Area,+Addis+Ababa,+Ethiopia&output=embed"
            width="100%"
            height="250"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="w-full sm:h-[300px]"
            title="CONSTANT ENGINEERING plc Office Location - KKare Building"
          ></iframe>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-slate-800 pt-6 sm:pt-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400 text-center sm:text-left">
          <p>© CONSTANT ENGINEERING PLC. All Rights Reserved</p>
          <p>Designed by Simplicity inc.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
