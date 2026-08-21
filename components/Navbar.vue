<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full overflow-x-hidden bg-white"
    :class="[{ 'border-b border-slate-200': isScrolled || showMegaMenu }]"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
      <div class="flex h-14 sm:h-16 items-center justify-between w-full">
        <!-- Logo - Left -->
        <NuxtLink to="/" class="flex items-center flex-shrink-0 min-w-0">
          <img 
            src="/new-logo.png" 
            alt="CONSTANT ENGINEERING" 
            class="h-10 sm:h-12 w-auto flex-shrink-0 transition-all"
          />
        </NuxtLink>

        <!-- Menu - Right -->
        <div class="hidden lg:flex lg:items-center lg:space-x-8">
          <NuxtLink
            to="/"
            class="text-sm font-medium transition-colors text-slate-900 hover:text-primary"
          >
            Home
          </NuxtLink>
          
          <!-- Products with Mega Menu -->
          <div
            class="relative"
            @mouseenter="clearMegaMenuTimeout"
            @mouseleave="handleMegaMenuLeave"
          >
            <NuxtLink
              to="/products"
              class="text-sm font-medium transition-colors flex items-center space-x-1 text-slate-900 hover:text-primary"
              @mouseenter="clearMegaMenuTimeout"
              @click="closeMegaMenu"
            >
              <span>Products</span>
              <Icon
                name="heroicons:chevron-down"
                class="h-4 w-4 transition-transform duration-200"
                :class="{ 'rotate-180': showMegaMenu }"
              />
            </NuxtLink>
          </div>
          
          <!-- Mega Menu - Apple Style with Blur (Teleported to body for proper z-index) -->
          <Teleport to="body">
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-4"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-4"
            >
              <div
                v-if="showMegaMenu"
                class="fixed left-0 right-0 z-[60]"
                :style="{ top: `${navbarHeight}px` }"
                @mouseenter="clearMegaMenuTimeout"
                @mouseleave="handleMegaMenuLeave"
              >
                <!-- Backdrop Blur Overlay -->
                <div class="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                
                <!-- Menu Content -->
                <div class="relative bg-white/80 backdrop-blur-md border-b shadow-xl z-[61]">
                  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-12">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <NuxtLink
                        v-for="product in products"
                        :key="product.id"
                        :to="`/products/${product.id}`"
                        @click="closeMegaMenu"
                        class="group"
                      >
                        <!-- Thumbnail Image - Reduced Size -->
                        <div class="mb-4 overflow-hidden rounded-lg bg-gray-100 h-32">
                          <img
                            :src="product.image"
                            :alt="product.name"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <!-- Title -->
                        <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                          {{ product.name }}
                        </h3>
                        <!-- Description -->
                        <p class="text-sm text-gray-600 leading-relaxed">
                          {{ product.description }}
                        </p>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </Teleport>

          <NuxtLink
            to="/about"
            class="text-sm font-medium transition-colors text-slate-900 hover:text-primary"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="text-sm font-medium transition-colors text-slate-900 hover:text-primary"
          >
            Contact
          </NuxtLink>
          <a
            href="https://wa.me/251924909098?text=Hello%2C%20I%27d%20like%20to%20talk%20to%20sales%20about%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            class="flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#25D366]/25 transition-colors hover:bg-[#20BD5A]"
          >
            <Icon name="simple-icons:whatsapp" class="h-4 w-4 shrink-0" />
            Chat on WhatsApp
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="lg:hidden p-2 relative z-50 transition-colors text-slate-900"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Icon :name="mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="h-6 w-6 transition-transform" />
        </button>
      </div>
    </div>

    <!-- Full Screen Mobile Menu -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileMenuOpen"
          class="fixed inset-0 z-[100] lg:hidden overflow-hidden"
        >
          <!-- Elegant White Gradient Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white"></div>
          
          <!-- Subtle Pattern Overlay -->
          <div class="absolute inset-0 opacity-[0.02]">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #000 1px, transparent 0); background-size: 40px 40px;"></div>
          </div>

          <!-- Full Screen Menu Content -->
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-8"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-8"
          >
            <div
              v-if="mobileMenuOpen"
              class="relative h-full w-full flex flex-col overflow-y-auto"
            >
              <!-- Header -->
              <div class="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-200/50">
                <NuxtLink
                  to="/"
                  class="flex items-center"
                  @click="mobileMenuOpen = false"
                >
                  <img src="/new-logo.png" alt="CONSTANT ENGINEERING" class="h-10 w-auto flex-shrink-0" />
                </NuxtLink>
                <button
                  @click="mobileMenuOpen = false"
                  class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <Icon name="heroicons:x-mark" class="h-6 w-6" />
                </button>
              </div>

              <!-- Main Navigation -->
              <div class="flex-1 px-6 py-8 space-y-3">
                <!-- Home -->
                <NuxtLink
                  to="/"
                  class="group flex items-center space-x-4 px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 hover:bg-slate-50 hover:shadow-md transition-all"
                  @click="mobileMenuOpen = false"
                >
                  <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name="heroicons:home" class="h-6 w-6 text-primary" />
                  </div>
                  <div class="flex-1">
                    <div class="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">Home</div>
                    <div class="text-sm text-slate-500">Back to homepage</div>
                  </div>
                  <Icon name="heroicons:arrow-right" class="h-5 w-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </NuxtLink>

                <!-- Products with Expandable Section -->
                <div>
                  <button
                    @click="mobileProductsOpen = !mobileProductsOpen"
                    class="group w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 hover:bg-slate-50 hover:shadow-md transition-all"
                  >
                    <div class="flex items-center space-x-4">
                      <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon name="heroicons:squares-2x2" class="h-6 w-6 text-primary" />
                      </div>
                      <div class="text-left">
                        <div class="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">Products</div>
                        <div class="text-sm text-slate-500">Explore our solutions</div>
                      </div>
                    </div>
                    <Icon
                      name="heroicons:chevron-down"
                      class="h-5 w-5 text-slate-400 transition-all duration-300"
                      :class="{ 'rotate-180 text-primary': mobileProductsOpen }"
                    />
                  </button>
                  
                  <!-- Products Grid -->
                  <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 max-h-0"
                    enter-to-class="opacity-100 max-h-[2000px]"
                    leave-active-class="transition-all duration-300 ease-in"
                    leave-from-class="opacity-100 max-h-[2000px]"
                    leave-to-class="opacity-0 max-h-0"
                  >
                    <div v-if="mobileProductsOpen" class="mt-3 grid grid-cols-2 gap-3 overflow-hidden">
                      <NuxtLink
                        v-for="product in products"
                        :key="product.id"
                        :to="`/products/${product.id}`"
                        class="group relative overflow-hidden rounded-xl bg-white border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all"
                        @click="mobileMenuOpen = false"
                      >
                        <div class="aspect-square overflow-hidden bg-slate-100">
                          <img
                            :src="product.image"
                            :alt="product.name"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div class="p-3">
                          <div class="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                            {{ product.name }}
                          </div>
                          <div class="text-xs text-slate-500 line-clamp-2">
                            {{ product.description }}
                          </div>
                        </div>
                      </NuxtLink>
                    </div>
                  </Transition>
                </div>

                <!-- About -->
                <NuxtLink
                  to="/about"
                  class="group flex items-center space-x-4 px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 hover:bg-slate-50 hover:shadow-md transition-all"
                  @click="mobileMenuOpen = false"
                >
                  <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name="heroicons:information-circle" class="h-6 w-6 text-primary" />
                  </div>
                  <div class="flex-1">
                    <div class="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">About</div>
                    <div class="text-sm text-slate-500">Learn about us</div>
                  </div>
                  <Icon name="heroicons:arrow-right" class="h-5 w-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </NuxtLink>

                <!-- Contact -->
                <NuxtLink
                  to="/contact"
                  class="group flex items-center space-x-4 px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 hover:bg-slate-50 hover:shadow-md transition-all"
                  @click="mobileMenuOpen = false"
                >
                  <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name="heroicons:envelope" class="h-6 w-6 text-primary" />
                  </div>
                  <div class="flex-1">
                    <div class="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">Contact</div>
                    <div class="text-sm text-slate-500">Get in touch</div>
                  </div>
                  <Icon name="heroicons:arrow-right" class="h-5 w-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </NuxtLink>
              </div>

              <!-- Footer CTA -->
              <div class="px-6 pb-8 pt-4 border-t border-slate-200/50">
                <a
                  href="https://wa.me/251924909098?text=Hello%2C%20I%27d%20like%20to%20talk%20to%20sales%20about%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-8 py-4 text-center text-lg font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:bg-[#20BD5A] hover:shadow-xl hover:shadow-[#25D366]/30"
                  @click="mobileMenuOpen = false"
                >
                  <Icon name="simple-icons:whatsapp" class="mr-2 h-5 w-5 shrink-0" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted, watch } from 'vue'
const showMegaMenu = ref(false)
const mobileMenuOpen = ref(false)
const mobileProductsOpen = ref(false)
const isScrolled = ref(false)
const navbarHeight = ref(64) // Default desktop height

// Provide mega menu state for app-level blur effect
provide('megaMenuOpen', showMegaMenu)

// Handle scroll to show/hide border
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
  // Don't close mega menu on scroll - let user interact with it
}

// Handle mega menu leave with delay to prevent flickering
const megaMenuTimeout = ref(null)
const handleMegaMenuLeave = () => {
  if (megaMenuTimeout.value) {
    clearTimeout(megaMenuTimeout.value)
  }
  megaMenuTimeout.value = setTimeout(() => {
    showMegaMenu.value = false
  }, 200) // Increased delay to prevent premature closing
}

const clearMegaMenuTimeout = () => {
  if (megaMenuTimeout.value) {
    clearTimeout(megaMenuTimeout.value)
  }
  // Keep menu open when hovering over it
  showMegaMenu.value = true
}

// Update navbar height based on screen size
const updateNavbarHeight = () => {
  navbarHeight.value = window.innerWidth >= 640 ? 64 : 56 // sm:h-16 = 64px, h-14 = 56px
}

// Prevent body scroll when mobile menu is open
watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    mobileProductsOpen.value = false
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', updateNavbarHeight)
  handleScroll() // Check initial state
  updateNavbarHeight() // Set initial height
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateNavbarHeight)
})

const closeMegaMenu = () => {
  showMegaMenu.value = false
}

const products = [
  {
    id: 'diesel-generator-systems',
    name: 'Diesel Generators',
    image: '/products/diesel-generator-systems.jpg',
    description: 'Capacity: 10 KVA – 2000 KVA. Open & Silent Type (Canopy). Prime & Standby Power for Industrial, Commercial & Utility Applications.'
  },
  {
    id: 'solar-hybrid-energy',
    name: 'Solar & Hybrid Energy Solutions',
    image: '/products/solar-hybrid-energy.png',
    description: 'On-grid & Off-grid Solar Systems, Hybrid Systems (Solar + Generator), Inverters & Charge Controllers, Battery Banks.'
  },
  {
    id: 'power-quality-protection',
    name: 'Power Quality & Protection Systems',
    image: '/products/power-quality-protection.png',
    description: 'UPS Systems, Voltage Stabilizers, Active Harmonic Filters, Capacitor Banks, Surge Protection Devices.'
  },
  {
    id: 'electrical-distribution',
    name: 'Electrical Distribution & Switchgear',
    image: '/products/electrical-distribution.jpg',
    description: 'LV Power Cables, Circuit Breakers, Contactors, Panels, Enclosures & Accessories.'
  },
  {
    id: 'hvac-cooling-systems',
    name: 'HVAC & Cooling Systems',
    image: '/products/hvac-cooling-systems.png',
    description: 'Split, Cassette, Ducted & Central AC, VRF/VRV Systems, Chillers, Cold Rooms & Refrigeration.'
  },
  {
    id: 'pumping-solutions',
    name: 'Pumping Solutions',
    image: '/products/pumping-solutions.png',
    description: 'Submersible Pumps, Surface & Booster Pumps, Solar Powered Pumps, Pump Control Panels.'
  },
  {
    id: 'industrial-automation',
    name: 'Industrial Automation & Control',
    image: '/products/electrical-distribution.png',
    description: 'PLC & Automation Systems, Control Panel Design, Motor Control Centers, Instrumentation & Measurement.'
  },
  {
    id: 'metal-engineering',
    name: 'Metal ENGINEERING & Fabrication',
    image: '/products/metal-engineering.png',
    description: 'Steel Structures, Fuel & Industrial Storage Tanks, Lighting Poles, Stainless Steel Fabrication, Welding.'
  }
]
</script>
