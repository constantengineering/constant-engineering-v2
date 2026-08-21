<template>
  <section id="products" class="py-24 lg:py-16 bg-white scroll-mt-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Section Header - TaxPal Style -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :visible="{ opacity: 1, y: 0 }"
        :delay="50"
        class="text-center mb-16 lg:mb-24"
      >
        <p class="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
          Products
        </p>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
          Advanced
          <span class="relative inline-block text-primary">
            Engineered Solutions
            <!-- Technical-style underline (blueprint line) -->
            <svg
              class="absolute -bottom-2 left-0 w-full h-2 text-primary/50"
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4 L198 4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="4,2"
              />
            </svg>
          </span>
        </h2>
        <p class="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Discover our industry-leading electromechanical products, from high-capacity power generators to advanced solar and HVAC systems.
        </p>
      </div>

      <!-- Interactive Product Index - Studio Style -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- Left Column - Visual with Organic Mask -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :visible="{ opacity: 1 }"
          :delay="100"
          class="relative"
        >
          <div class="relative w-full aspect-[4/3] overflow-hidden">
            <!-- Image with Organic Mask Shape -->
            <Transition
              mode="out-in"
              enter-active-class="transition-opacity duration-300 ease-in-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-300 ease-in-out"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div
                :key="activeProduct.id"
                class="absolute inset-0"
              >
                <img
                  :src="activeProduct.image"
                  :alt="activeProduct.name"
                  class="w-full h-full object-cover"
                  :style="{
                    clipPath: 'polygon(0% 0%, 100% 0%, 96% 8%, 100% 18%, 97% 28%, 100% 38%, 98% 48%, 100% 58%, 97% 68%, 100% 78%, 96% 88%, 100% 100%, 0% 100%, 4% 88%, 0% 78%, 3% 68%, 0% 58%, 2% 48%, 0% 38%, 3% 28%, 0% 18%, 4% 8%)',
                    WebkitClipPath: 'polygon(0% 0%, 100% 0%, 96% 8%, 100% 18%, 97% 28%, 100% 38%, 98% 48%, 100% 58%, 97% 68%, 100% 78%, 96% 88%, 100% 100%, 0% 100%, 4% 88%, 0% 78%, 3% 68%, 0% 58%, 2% 48%, 0% 38%, 3% 28%, 0% 18%, 4% 8%)'
                  }"
                />
              </div>
            </Transition>
          </div>
        </div>

        <!-- Right Column - Interactive List -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :visible="{ opacity: 1 }"
          :delay="150"
          class="space-y-0"
        >
          <div
            v-for="(product, index) in products"
            :key="product.id"
            class="group cursor-pointer"
            @mouseenter="setActiveProduct(product)"
            @click="setActiveProduct(product)"
          >
            <!-- Horizontal Divider -->
            <div
              v-if="index > 0"
              class="border-t border-gray-100 mb-6"
            ></div>

            <!-- Product Item -->
            <div class="pb-6">
              <!-- Title -->
              <h3
                class="text-2xl sm:text-3xl font-bold mb-3 transition-colors duration-300"
                :class="activeProduct.id === product.id ? 'text-primary' : 'text-slate-900'"
              >
                {{ product.name }}
              </h3>

              <!-- Description (Always visible) -->
              <p class="text-base text-gray-600 leading-relaxed mb-4">
                {{ product.description }}
              </p>

              <!-- Technical Spec Summary (Expands on active) -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-32"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 max-h-32"
                leave-to-class="opacity-0 max-h-0"
              >
                <div
                  v-if="activeProduct.id === product.id"
                  class="overflow-hidden"
                >
                  <div class="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                    <Icon name="heroicons:chart-bar" class="h-4 w-4" />
                    <span>{{ product.specs }}</span>
                  </div>
                  <NuxtLink
                    :to="`/products/${product.id}`"
                    class="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all group/link"
                  >
                    Explore
                    <Icon name="heroicons:arrow-right" class="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </NuxtLink>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const products = [
  {
    id: 'diesel-generator-systems',
    name: 'Diesel Generators',
    description: 'Capacity: 10 KVA – 2000 KVA. Open & Silent Type (Canopy). Prime & Standby Power for Industrial, Commercial & Utility Applications.',
    image: '/products/diesel-generator.jpg',
    specs: '10 KVA – 2000 KVA | GUCBIR, TMG, GRUPEL | Perkins & Cummins Engines'
  },
  {
    id: 'solar-hybrid-energy',
    name: 'Solar & Hybrid Energy Solutions',
      description: 'On-grid & Off-grid Solar Systems, Hybrid Systems (Solar + Generator), Inverters & Charge Controllers, Battery Banks (Lead Acid & Lithium-Ion).',
        image: '/products/solar.jpg',
      specs: 'On-grid & Off-grid | ANERN | Energy Analysis & System Design'
  },
  {
    id: 'hvac-cooling-systems',
    name: 'HVAC & Cooling Systems',
    description: 'Split, Cassette, Ducted & Central AC, VRF/VRV Systems, Data Center & Commercial AC, Chillers & Cooling Towers, Cold Rooms & Refrigeration.',
    image: '/products/havc.png',
    specs: 'GREE, MIDEA, TCL | Data Center & Commercial | Ducting & Ventilation'
  },
  {
    id: 'industrial-automation',
    name: 'Industrial Automation & Control',
    description: 'PLC & Automation Systems, Control Panel Design & Manufacturing, Motor Control Centers (MCC), Instrumentation & Measurement, Sensors.',
    image: '/products/automation.jpg',
    specs: 'Schneider, Mitsubishi, ABB, Siemens | PLC & MCC | Sensors & Instrumentation'
  }
]

// Initialize with first product to avoid null during SSR
const activeProduct = ref(products[0])

const setActiveProduct = (product) => {
  activeProduct.value = product
}
</script>

<style scoped>
/* Additional styling for smooth transitions */
.group:hover h3 {
  transition: color 0.3s ease;
}
</style>
