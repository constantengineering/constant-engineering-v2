<template>
  <div class="min-h-screen bg-white">
    <div v-if="product">
      <!-- Hero Section - Full Width Image -->
      <section class="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-b border-gray-200 overflow-hidden">
        <!-- Full Width Image Background -->
        <div class="absolute inset-0">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <!-- Dark Overlay -->
          <div class="absolute inset-0 bg-slate-900/60"></div>
        </div>
        
        <!-- Content Overlay -->
        <div class="mx-auto max-w-7xl relative z-10 py-12 lg:py-20">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0 }"
            :delay="50"
            class="max-w-3xl"
          >
            <div class="mb-6">
              <Icon
                :name="product.icon"
                class="h-12 w-12 text-white mb-4"
              />
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {{ product.name }}
            </h1>
            <p class="text-lg sm:text-xl text-white/90 leading-relaxed mb-8">
              {{ product.description }}
            </p>
            
            <!-- Quick Specs -->
            <div v-if="product.quickSpecs" class="mb-8">
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="(spec, index) in product.quickSpecs"
                  :key="index"
                  class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30"
                >
                  {{ spec }}
                </span>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/251924909098?text=Hello,%20I%20would%20like%20to%20request%20a%20quote%20for%20{{ encodeURIComponent(product.name) }}"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 transition-all shadow-lg"
              >
                Request a Quote
                <Icon name="heroicons:arrow-right" class="ml-2 h-5 w-5" />
              </a>
              <NuxtLink
                to="/contact"
                class="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
              >
                Contact Us
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-white">
        <div class="mx-auto max-w-7xl">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0 }"
            :delay="150"
            class="mb-12"
          >
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Key Features & Services</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div
                v-for="(feature, index) in product.features"
                :key="index"
                class="flex items-start space-x-4 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="heroicons:check-circle" class="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ feature.title }}</h3>
                  <p class="text-slate-600 leading-relaxed">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Specifications -->
      <section class="px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-slate-50 border-t border-gray-200">
        <div class="mx-auto max-w-7xl">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0 }"
            :delay="200"
          >
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Specifications</h2>
            <div class="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
              <dl class="grid md:grid-cols-2 gap-6">
                <div
                  v-for="(spec, index) in product.specifications"
                  :key="index"
                  class="flex justify-between items-start py-4 border-b border-gray-100 last:border-0"
                >
                  <dt class="text-base font-semibold text-slate-900 pr-4">{{ spec.label }}</dt>
                  <dd class="text-base text-slate-600 text-right flex-1">{{ spec.value }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <!-- Additional Components & Parts Section (Diesel Generators only) -->
      <section v-if="productId === 'diesel-generator-systems'" class="px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-t border-gray-200" style="background: #ffffff !important;">
        <div class="mx-auto max-w-7xl">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0 }"
            :delay="250"
          >
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-20 text-center">Additional Components & Parts</h2>
            
            <!-- Load Transfer Systems -->
            <div class="mb-24">
              <div class="flex items-baseline gap-4 mb-12">
                <div class="h-1 w-16 bg-primary"></div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-bold text-slate-900">Load Transfer Systems</h3>
                  <p class="text-slate-600 mt-2">Brand: <span class="font-semibold text-slate-900">ASCO</span></p>
                </div>
              </div>
              
              <div class="grid md:grid-cols-2 gap-8 md:gap-12">
                <div class="relative pl-8 border-l-2 border-primary/20">
                  <div class="absolute left-0 top-0 w-2 h-2 bg-primary rounded-full -translate-x-[5px]"></div>
                  <h4 class="text-xl font-bold text-slate-900 mb-3">Automatic Transfer Switch (ATS)</h4>
                  <p class="text-slate-600 leading-relaxed">Seamless automatic switching between main power and generator backup for uninterrupted power supply.</p>
                </div>
                <div class="relative pl-8 border-l-2 border-primary/20">
                  <div class="absolute left-0 top-0 w-2 h-2 bg-primary rounded-full -translate-x-[5px]"></div>
                  <h4 class="text-xl font-bold text-slate-900 mb-3">Manual Load Transfer Switch (LTS)</h4>
                  <p class="text-slate-600 leading-relaxed">Manual switching solution for controlled power transfer between sources.</p>
                </div>
              </div>
            </div>

            <!-- Generator Parts -->
            <div>
              <div class="flex items-baseline gap-4 mb-12">
                <div class="h-1 w-16 bg-primary"></div>
                <h3 class="text-2xl sm:text-3xl font-bold text-slate-900">Generator Parts</h3>
              </div>
              
              <div class="grid lg:grid-cols-3 gap-8 lg:gap-12">
                <!-- Image - Takes 2 columns on large screens -->
                <div class="lg:col-span-2">
                  <img
                    src="/products/diesel-spare-parts.jpg"
                    alt="Generator Parts"
                    class="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
                
                <!-- Spare Parts List -->
                <div class="space-y-6">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 mt-1">
                      <div class="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-slate-900 mb-1.5">Oil, Fuel & Air Filters</h4>
                      <p class="text-sm text-slate-600 leading-relaxed">Essential filtration components to maintain optimal engine performance and longevity.</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 mt-1">
                      <div class="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-slate-900 mb-1.5">Control Modules & Sensors</h4>
                      <p class="text-sm text-slate-600 leading-relaxed">Advanced control systems and monitoring sensors for precise generator operation and diagnostics.</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 mt-1">
                      <div class="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-slate-900 mb-1.5">Batteries, Starters & Alternators</h4>
                      <p class="text-sm text-slate-600 leading-relaxed">Critical electrical components for reliable generator starting and power generation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section - Small Gradient -->
      <section class="px-4 sm:px-6 lg:px-8 py-16 lg:py-24" style="background: linear-gradient(to bottom, #ffffff 0%, #fef2f2 20%, #fee2e2 40%, #fef2f2 60%, #ffffff 100%);">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0 }"
          :delay="300"
          class="mx-auto max-w-4xl text-center"
        >
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Ready to Get Started?
          </h2>
          <p class="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss your requirements and get a customized quote for {{ product.name }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/251924909098?text=Hello,%20I%20would%20like%20to%20request%20a%20quote%20for%20{{ encodeURIComponent(product.name) }}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
                >
                  Get a Quote
                  <Icon name="heroicons:arrow-right" class="ml-2 h-5 w-5" />
                </a>
            <NuxtLink
              to="/products"
              class="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-900 hover:border-slate-400 transition-all bg-white"
            >
              View All Products
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>

    <!-- 404 State -->
    <div v-else class="px-4 sm:px-6 lg:px-8 py-24">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="text-4xl font-bold text-slate-900 mb-4">Product Not Found</h1>
        <p class="text-lg text-slate-600 mb-8">The product you're looking for doesn't exist.</p>
        <NuxtLink
          to="/products"
          class="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 transition-all"
        >
          Browse All Products
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProductByIdForPage } from '~/data/products'

const route = useRoute()
const productId = String(route.params.id)

const product = getProductByIdForPage(productId)

useHead({
  title: product ? `${product.name} - CONSTANT ENGINEERING plc` : 'Product Not Found - CONSTANT ENGINEERING plc',
  meta: [
    {
      name: 'description',
      content: product ? product.description : 'Product not found'
    }
  ]
})
</script>
