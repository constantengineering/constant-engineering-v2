<template>
  <div class="min-h-screen">
    <!-- Hero Section - Full Background Office Image with Centered Text -->
    <section class="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[420px] overflow-hidden">
      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          src="/office.jpg"
          alt="CONSTANT ENGINEERING office"
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
            We are CONSTANT ENGINEERING
        </h1>
        </div>
      </div>
    </section>

    <!-- Our Story Section - Redesigned -->
    <section class="px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-white">
      <div class="mx-auto max-w-7xl">
        <!-- Header -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :visible="{ opacity: 1, y: 0 }"
          :delay="100"
          class="text-center mb-12 lg:mb-16"
        >
          <h2 class="text-3xl base:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Founded in
            <span class="relative inline-block text-primary">
              2017
              <!-- Technical-style underline -->
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
            , leading electromechanical solutions.
          </h2>
        </div>

        <!-- Story Content -->
        <div class="max-w-4xl mx-auto">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0 }"
            :delay="150"
            class="space-y-6 lg:space-y-8"
          >
            <p class="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed font-medium">
              CONSTANT ENGINEERING plc has been at the forefront of electromechanical solutions in Ethiopia and beyond. 
              Our journey began with a simple yet powerful mission: to deliver excellence in every project we undertake.
            </p>
            
            <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
              Established with a clear vision to deliver world-class ENGINEERING solutions that power industries and transform communities. 
              What started as a small team of passionate engineers has grown into a trusted partner for businesses across Ethiopia and the region.
            </p>
            
            <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
              Today, we continue to push boundaries, innovate, and set new standards in the electromechanical ENGINEERING industry. 
              Our commitment to quality, integrity, and customer satisfaction remains unwavering.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team & Process Grid (Studio Style) -->
    <section class="px-6 lg:px-12 py-24 bg-gray-50">
      <div class="mx-auto max-w-7xl">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, ease: 'easeOut' }"
          :delay="200"
          class="mb-16 text-center"
        >
          <h2 class="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            How We
            <span class="relative inline-block text-primary">
              Work
              <!-- Technical-style underline -->
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
        </div>

        <div class="space-y-0">
          <!-- Discovery -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible="{ opacity: 1, x: 0 }"
            :delay="500"
            class="grid md:grid-cols-2 gap-8 py-12 border-b border-gray-200 first:border-t"
          >
            <div class="flex items-start">
              <h3 class="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Discovery
              </h3>
            </div>
            <div class="flex items-start">
              <p class="text-lg text-gray-600 leading-relaxed">
                We begin every project with deep understanding. Our team conducts thorough 
                assessments to identify your unique challenges and opportunities.
              </p>
            </div>
          </div>

          <!-- Design -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible="{ opacity: 1, x: 0 }"
            :delay="600"
            class="grid md:grid-cols-2 gap-8 py-12 border-b border-gray-200"
          >
            <div class="flex items-start">
              <h3 class="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Design
              </h3>
            </div>
            <div class="flex items-start">
              <p class="text-lg text-gray-600 leading-relaxed">
                Custom solutions tailored to your specific needs. Our engineers leverage 
                industry best practices and innovative technologies to create optimal designs.
              </p>
            </div>
          </div>

          <!-- Implementation -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible="{ opacity: 1, x: 0 }"
            :delay="700"
            class="grid md:grid-cols-2 gap-8 py-12 border-b border-gray-200"
          >
            <div class="flex items-start">
              <h3 class="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Implementation
              </h3>
            </div>
            <div class="flex items-start">
              <p class="text-lg text-gray-600 leading-relaxed">
                Precise execution with attention to every detail. Our skilled technicians 
                ensure seamless installation and integration of all systems.
              </p>
            </div>
          </div>

          <!-- Support -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible="{ opacity: 1, x: 0 }"
            :delay="800"
            class="grid md:grid-cols-2 gap-8 py-12 border-b border-gray-200"
          >
            <div class="flex items-start">
              <h3 class="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Support
              </h3>
            </div>
            <div class="flex items-start">
              <p class="text-lg text-gray-600 leading-relaxed">
                Long-term partnership through comprehensive maintenance and support. 
                We're committed to your success beyond project completion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Core Values Section -->
    <section class="px-6 lg:px-12 py-24 bg-white">
      <div class="mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Our Core
            <span class="relative inline-block text-primary">
              Values
              <!-- Technical-style underline -->
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
        </div>

        <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div
            v-for="(value, index) in coreValues"
            :key="value.title"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.4, ease: 'easeOut' }"
            :delay="200 + index * 50"
            class="text-center"
          >
            <div class="mb-6 flex justify-center">
              <div class="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon
                  :name="value.icon"
                  class="h-10 w-10 text-primary"
                />
              </div>
            </div>
            <h3 class="text-2xl font-bold mb-4">
              <span class="text-primary">{{ value.title }}</span>
            </h3>
            <p class="text-gray-600 leading-relaxed text-base">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="px-6 lg:px-12 py-24 bg-white">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center">
          <!-- Left Column Wrapper (Desktop only) -->
          <div class="hidden lg:flex lg:flex-col lg:flex-1 lg:self-start">
            <!-- Header Section -->
            <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, ease: 'easeOut' }"
              :delay="200"
            >
              <!-- Tag -->
              <div class="inline-block px-4 py-2 rounded-lg border border-gray-300/40 bg-gray-50 mb-6">
                <span class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Why Choose Us
                </span>
              </div>
              
              <!-- Heading -->
              <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Why Choose
                <span class="relative inline-block text-primary">
                  Us
                  <!-- Technical-style underline -->
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
              
              <!-- Description -->
              <p class="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
                We deliver exceptional ENGINEERING solutions with a commitment to quality, expertise, and customer satisfaction.
              </p>
            </div>

            <!-- Feature Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
              <div
                v-for="(item, index) in whyChooseUs"
                :key="item.title"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.4, ease: 'easeOut' }"
                :delay="300 + index * 50"
                class="bg-gray-50 rounded-xl p-4 border border-gray-200/30 hover:border-gray-300/40 hover:shadow-md transition-all"
              >
                <!-- Icon -->
                <div class="mb-3">
                  <Icon
                    :name="item.icon"
                    class="h-6 w-6 text-gray-900"
                  />
                </div>
                
                <!-- Title -->
                <h3 class="text-lg font-bold text-gray-900 mb-1.5">{{ item.title }}</h3>
                
                <!-- Description -->
                <p class="text-base text-gray-600 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Mobile: Header Section (order 1) -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, ease: 'easeOut' }"
            :delay="200"
            class="order-1 lg:hidden"
          >
            <!-- Tag -->
            <div class="inline-block px-4 py-2 rounded-lg border border-gray-300/40 bg-gray-50 mb-6">
              <span class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Why Choose Us
              </span>
            </div>
            
            <!-- Heading -->
            <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Why Choose
              <span class="relative inline-block text-primary">
                Us
                <!-- Technical-style underline -->
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
            
            <!-- Description -->
            <p class="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
              We deliver exceptional ENGINEERING solutions with a commitment to quality, expertise, and customer satisfaction.
            </p>
          </div>

          <!-- Image Section (Mobile: order 2, Desktop: right column) -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :visible="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, ease: 'easeOut' }"
            :delay="400"
            class="relative flex items-end justify-end order-2 lg:order-2 lg:flex-1 lg:mt-24"
          >
            <div class="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] w-full">
              <img
                src="/Why_choose_us.png"
                alt="Why Choose Us - CONSTANT ENGINEERING"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Mobile: Feature Cards Grid (order 3) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 order-3 lg:hidden">
            <div
              v-for="(item, index) in whyChooseUs"
              :key="item.title"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.4, ease: 'easeOut' }"
              :delay="300 + index * 50"
              class="bg-gray-50 rounded-xl p-4 border border-gray-200/30 hover:border-gray-300/40 hover:shadow-md transition-all"
            >
              <!-- Icon -->
              <div class="mb-3">
                <Icon
                  :name="item.icon"
                  class="h-6 w-6 text-gray-900"
                />
              </div>
              
              <!-- Title -->
              <h3 class="text-base font-bold text-gray-900 mb-1.5">{{ item.title }}</h3>
              
              <!-- Description -->
              <p class="text-xs text-gray-600 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section - With Gradient -->
    <section class="py-24 lg:py-32 relative overflow-hidden" style="background: linear-gradient(to bottom, #ffffff 0%, #fef2f2 20%, #fee2e2 40%, #fef2f2 60%, #ffffff 100%);">
      <div
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :visible="{ opacity: 1, y: 0 }"
        :delay="400"
        class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
          Let's Build Your Next
          <span class="relative inline-block text-primary">
            Project Together
            <!-- Technical-style underline -->
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
        <p class="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether you're planning a new installation, upgrading existing systems, or seeking reliable ENGINEERING support, our team is ready to help.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            Contact Us Today
            <Icon name="heroicons:arrow-right" class="ml-2 h-5 w-5" />
          </NuxtLink>
          <a
            href="https://wa.me/251924909098?text=Hello,%20I%20would%20like%20to%20discuss%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-900 hover:border-slate-400 transition-all hover:bg-white/50"
          >
            <Icon name="heroicons:chat-bubble-left-right" class="h-5 w-5" />
            Quick Chat
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const coreValues = [
  {
    title: 'Reliability',
    icon: 'heroicons:check-badge',
    description: 'We consistently meet deadlines, deliver accurate solutions, and provide dependable products that stand the test of time.'
  },
  {
    title: 'Integrity',
    icon: 'heroicons:shield-check',
    description: 'We uphold ethical practices, honesty, and transparency in all interactions, fostering trust with our partners and clients.'
  },
  {
    title: 'Technical Excellence',
    icon: 'heroicons:academic-cap',
    description: 'We apply cutting-edge ENGINEERING standards, continuously upgrading our skills and embracing innovation to achieve outstanding results.'
  }
]

const whyChooseUs = [
  {
    title: 'Quality',
    icon: 'heroicons:star',
    description: 'We pride ourselves on delivering precision-engineered solutions with a commitment to reliability and innovation.'
  },
  {
    title: 'Expertise',
    icon: 'heroicons:user-group',
    description: 'Our team includes professional engineers specializing in mechanical and electrical ENGINEERING.'
  },
  {
    title: 'Customization',
    icon: 'heroicons:wrench-screwdriver',
    description: 'We offer tailored solutions to meet your specific requirements.'
  },
  {
    title: 'Technical Support',
    icon: 'heroicons:phone',
    description: 'We provide comprehensive after-sales support to keep your operations running smoothly.'
  }
]
</script>
