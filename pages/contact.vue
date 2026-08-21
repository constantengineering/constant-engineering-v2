<template>
  <div class="min-h-screen">
    <!-- Hero Section - Full Background Office Image with Centered Text -->
    <section class="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[420px] overflow-hidden">
      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          src="/contact.jpg"
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
            Get in Touch
        </h1>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-12 sm:py-16 lg:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16">
          <!-- Contact Form - Takes 3 columns -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0 }"
            :delay="100"
            class="lg:col-span-3"
          >
            <div class="bg-slate-50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/50">
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                Send us a message
              </h2>
              <p class="text-slate-600 mb-8 text-base sm:text-lg">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form @submit.prevent="handleSubmit" class="space-y-5 sm:space-y-6">
                <div class="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label for="name" class="block text-sm font-semibold text-slate-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-semibold text-slate-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label for="phone" class="block text-sm font-semibold text-slate-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+251 9XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label for="subject" class="block text-sm font-semibold text-slate-900 mb-2">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      v-model="form.subject"
                      type="text"
                      required
                      class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label for="message" class="block text-sm font-semibold text-slate-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="6"
                    required
                    class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>

                <!-- Status Message -->
                <div
                  v-if="submitStatus !== 'idle'"
                  :class="[
                    'rounded-lg p-4 flex items-start gap-3',
                    submitStatus === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  ]"
                >
                  <Icon
                    :name="submitStatus === 'success' ? 'heroicons:check-circle' : 'heroicons:exclamation-circle'"
                    :class="[
                      'h-5 w-5 flex-shrink-0 mt-0.5',
                      submitStatus === 'success' ? 'text-green-600' : 'text-red-600'
                    ]"
                  />
                  <p class="text-sm font-medium flex-1">{{ submitMessage }}</p>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full sm:w-auto rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  <span v-if="!isSubmitting" class="flex items-center justify-center gap-2">
                    Send Message
                    <Icon name="heroicons:paper-airplane" class="h-5 w-5" />
                  </span>
                  <span v-else class="flex items-center justify-center gap-2">
                    <Icon name="heroicons:arrow-path" class="h-5 w-5 animate-spin" />
                    Sending...
                  </span>
                </button>
              </form>
            </div>
          </div>

          <!-- Contact Information - Takes 2 columns -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0 }"
            :delay="150"
            class="lg:col-span-2 space-y-6"
          >
            <!-- Quick Contact Info -->
            <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/50 shadow-sm">
              <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Contact Information
              </h3>
              
              <div class="space-y-6">
                <!-- Phone -->
                <div class="flex items-start gap-4">
                  <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="heroicons:phone" class="h-6 w-6 text-primary" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Phone
                    </h4>
                    <div class="space-y-1">
                      <a
                        href="tel:+251924909098"
                        class="block text-base text-slate-900 hover:text-primary transition-colors font-medium"
                      >
                        +251 924 909 098
                      </a>
                      <a
                        href="tel:+251911147101"
                        class="block text-base text-slate-900 hover:text-primary transition-colors font-medium"
                      >
                        +251 911 147 101
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Divider -->
                <div class="border-t border-slate-200"></div>

                <!-- Email -->
                <div class="flex items-start gap-4">
                  <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="heroicons:envelope" class="h-6 w-6 text-primary" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Email
                    </h4>
                    <a
                      href="mailto:info@constanteng.com"
                      class="text-base text-slate-900 hover:text-primary transition-colors break-all font-medium"
                    >
                      info@constanteng.com
                    </a>
                  </div>
                </div>

                <!-- Divider -->
                <div class="border-t border-slate-200"></div>

                <!-- Address -->
                <div class="flex items-start gap-4">
                  <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="heroicons:map-pin" class="h-6 w-6 text-primary" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Office Address
                    </h4>
                    <div class="space-y-1 text-base text-slate-900 font-medium">
                      <p>KKare Building</p>
                      <p>Mozambique Street, Mexico Area</p>
                      <p>Addis Ababa, Ethiopia</p>
                    </div>
                    <a
                      href="https://maps.app.goo.gl/FFS3Wvaz4BxTKAje8"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-3 text-sm font-semibold"
                    >
                      Get Directions
                      <Icon name="heroicons:arrow-right" class="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Business Hours or Additional Info -->
            <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 sm:p-8 border border-primary/20">
              <div class="flex items-start gap-4">
                <div class="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="heroicons:clock" class="h-6 w-6 text-primary" />
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-slate-900 mb-2">
                    We're Here to Help
                  </h4>
                  <p class="text-sm text-slate-600 leading-relaxed">
                    Our team is available to answer your questions and discuss your project needs. 
                    Reach out through any of the channels above, and we'll respond promptly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref('idle')
const submitMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = 'idle'
  submitMessage.value = ''
  
  try {
    console.log('Submitting form to Formspree:', form.value)
    
    // Submit to Formspree
    const response = await $fetch('https://formspree.io/f/xdaakkok', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone || '',
        subject: form.value.subject,
        message: form.value.message
      },
      timeout: 30000 // 30 second timeout
    })
    
    console.log('Form submission successful:', response)
    
    // Success
    submitStatus.value = 'success'
    submitMessage.value = 'Thank you for your message! We will get back to you soon.'
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      submitStatus.value = 'idle'
      submitMessage.value = ''
    }, 5000)
  } catch (error) {
    // Error
    console.error('Form submission error:', error)
    
    submitStatus.value = 'error'
    let errorMessage = 'Failed to send message. Please try again later.'
    
    try {
      if (error && typeof error === 'object') {
        // Handle Formspree error structure
        if ('data' in error && error.data) {
          const data = error.data
          errorMessage = data.error || data.message || data.statusMessage || errorMessage
        } else if ('message' in error && error.message) {
          errorMessage = String(error.message)
        } else if ('statusMessage' in error && error.statusMessage) {
          errorMessage = String(error.statusMessage)
        } else if ('statusText' in error && error.statusText) {
          errorMessage = String(error.statusText)
        }
      } else if (typeof error === 'string') {
        errorMessage = error
      }
    } catch (e) {
      console.error('Error parsing error message:', e)
    }
    
    submitMessage.value = errorMessage
    
    // Clear error message after 5 seconds
    setTimeout(() => {
      submitStatus.value = 'idle'
      submitMessage.value = ''
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>
