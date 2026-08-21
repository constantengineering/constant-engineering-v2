<template>
  <div class="min-h-screen">
    <!-- Hero Section - Full Background Image with Centered Text -->
    <section class="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[420px] overflow-hidden">
      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          src="/products.jpg"
          alt="CONSTANT ENGINEERING products"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <!-- Dark overlay for text readability -->
        <div class="absolute inset-0 bg-black/40"></div>
      </div>

      <!-- Centered text -->
      <div class="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :visible="{ opacity: 1, y: 0 }"
          :delay="80"
          class="text-center"
      >
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Our Products
        </h1>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="px-6 lg:px-12 py-24">
      <div class="mx-auto max-w-7xl">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(product, index) in products"
            :key="product.id"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0 }"
            :delay="200 + index * 100"
            class="group"
          >
            <NuxtLink
              :to="`/products/${product.id}`"
              class="block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 h-full"
            >
              <!-- Product Image -->
              <div class="w-full h-48 overflow-hidden bg-gray-100">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div class="p-6">
                <div class="mb-4">
                  <Icon
                    :name="product.icon"
                    class="h-10 w-10 text-primary mb-3"
                  />
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {{ product.name }}
                </h3>
                <p class="text-gray-600 leading-relaxed mb-4 text-sm">
                  {{ product.description }}
                </p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="tag in product.tags"
                    :key="tag"
                    class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
                <span class="inline-flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                  View Details
                  <Icon name="heroicons:arrow-right" class="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section - Small Gradient -->
    <section class="px-6 lg:px-12 py-24" style="background: linear-gradient(to bottom, #ffffff 0%, #fef2f2 20%, #fee2e2 40%, #fef2f2 60%, #ffffff 100%);">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0 }"
        :delay="800"
        class="mx-auto max-w-4xl text-center"
      >
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          Need a Custom Solution?
        </h2>
        <p class="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Our ENGINEERING team can design and implement solutions tailored to your specific requirements
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            Contact Our Team
            <Icon name="heroicons:arrow-right" class="ml-2 h-5 w-5" />
          </NuxtLink>
          <a
            href="https://wa.me/251924909098?text=Hello,%20I%20would%20like%20to%20discuss%20a%20custom%20solution"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-900 hover:border-slate-400 transition-all bg-white"
          >
            Quick Chat
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getProductListings } from '~/data/products'

const products = getProductListings()
</script>
