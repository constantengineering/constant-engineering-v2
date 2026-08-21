<template>
  <section 
    class="relative flex items-center overflow-hidden -mt-14 sm:-mt-16"
    style="min-height: calc(100vh + 3.5rem);"
  >
    <!-- Carousel Background -->
    <div class="absolute inset-0 w-full h-full">
      <!-- Carousel Container -->
      <div class="relative w-full h-full">
        <!-- Carousel Slides with Fade + Scale Transition -->
        <div
          v-for="(slide, index) in carouselSlides"
          :key="index"
          :class="[
            'absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out',
            currentSlide === index 
              ? 'opacity-100 z-10 scale-100' 
              : 'opacity-0 z-0 scale-105'
          ]"
        >
          <img
            :src="slide.image"
            :alt="slide.alt"
            class="w-full h-full object-cover object-top"
            loading="eager"
          />
        </div>
        
        <!-- Gradient Overlay at Bottom (neutral, for readability) -->
        <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent z-20 pointer-events-none"></div>
        
        <!-- Dark overlay for better text readability -->
        <div class="absolute inset-0 bg-black/30 z-20 pointer-events-none"></div>
      </div>
    </div>

    <!-- Content Overlay -->
    <div class="relative z-30 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24 h-full flex items-center min-h-0">
      <div class="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center w-full">
        <!-- Text Column with Smooth Animations -->
        <div class="order-2 lg:order-1 relative">
          <!-- Animated Text Container -->
          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-700 ease-out"
            enter-from-class="opacity-0 translate-y-8"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-500 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
          >
            <div :key="currentSlide" class="relative">
              <!-- Slide meta -->
              <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-[10px] sm:text-[11px] md:text-xs font-medium tracking-[0.25em] uppercase text-white/70">
                <span class="flex items-center gap-1">
                  <span class="h-px w-4 sm:w-6 bg-white/70"></span>
                  <span>0{{ currentSlide + 1 }}</span>
                </span>
                <span class="text-white/40">•</span>
                <span>{{ activeSlide.label }}</span>
              </div>

              <!-- Main Heading -->
              <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-5">
                <span class="block">{{ activeSlide.headingPrimary }}</span>
                <span class="block relative mt-1">
                  <span class="relative z-10">{{ activeSlide.headingHighlight }}</span>
                  <span class="absolute -bottom-1 left-0 h-[2px] w-12 sm:w-16 bg-primary/70 rounded-full"></span>
                </span>
                <span v-if="activeSlide.headingSuffix" class="block mt-1 text-white/90">
                  {{ activeSlide.headingSuffix }}
                </span>
              </h1>

              <!-- Description -->
              <p class="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed mb-5 sm:mb-6 max-w-xl">
                {{ activeSlide.description }}
              </p>

              <!-- CTAs -->
              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href="https://wa.me/251924909098?text=Hello,%20I%20would%20like%20to%20request%20a%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex items-center justify-center rounded-full bg-primary px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold text-white hover:bg-primary/90 transition-all duration-300 hover:translate-y-0.5"
                >
                  Request a Quote
                  <Icon name="heroicons:arrow-right" class="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-white group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#products"
                  @click.prevent="scrollToProducts"
                  class="group inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-medium text-white/90 hover:border-white hover:bg-white/5 transition-all duration-300"
                >
                  <Icon name="heroicons:play" class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  View Products
                </a>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Minimal Carousel Indicator -->
        <div class="order-1 lg:order-2 flex items-center justify-center lg:justify-end">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-white/90">
                {{ (currentSlide + 1).toString().padStart(2, '0') }}
              </span>
              <span class="text-white/40">/</span>
              <span class="text-sm font-medium text-white/50">
                {{ carouselSlides.length.toString().padStart(2, '0') }}
              </span>
            </div>

            <div class="h-px w-16 bg-white/20 overflow-hidden">
              <div
                class="h-full bg-white/80 transition-all duration-500 ease-out"
                :style="{ width: `${((currentSlide + 1) / carouselSlides.length) * 100}%` }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const carouselSlides = [
  {
    image: '/Hero3.avif',
    alt: 'Diesel Generators powering an industrial facility',
    label: 'Reliable backup power',
    headingPrimary: 'Engineered for',
    headingHighlight: 'Industry',
    headingSuffix: '',
    description: 'Power | Industrial Automation | HVAC | Metal Engineering'
  },
  {
    image: '/hero-new.jpg',
    alt: 'Modern solar and HVAC installation on a commercial building',
    label: 'Integrated energy solutions',
    headingPrimary: 'Smarter energy',
    headingHighlight: 'for a modern Ethiopia',
    headingSuffix: '',
    description:
      'We design and deliver integrated solar, HVAC, and electrical solutions that reduce costs, improve efficiency, and support sustainable growth.'
  }
]

const currentSlide = ref(0)
let autoSlideInterval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
}

const previousSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselSlides.length) % carouselSlides.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

const activeSlide = computed(() => carouselSlides[currentSlide.value])

const scrollToProducts = () => {
  const productsSection = document.getElementById('products')
  if (productsSection) {
    const elementPosition = productsSection.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - 80 // Account for navbar height
    
    // Custom smooth scroll with easing
    const startPosition = window.pageYOffset
    const distance = offsetPosition - startPosition
    const duration = 1000 // 1 second
    let start = null
    
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }
    
    const animation = (currentTime) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }
    
    requestAnimationFrame(animation)
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>
