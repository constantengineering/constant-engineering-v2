export default defineNuxtPlugin(() => {
  // Reinitialize motion animations on route changes
  const router = useRouter()
  
  router.afterEach(async () => {
    // Wait for DOM to update
    await nextTick()
    // Trigger scroll event to reinitialize intersection observers
    // This ensures @vueuse/motion animations work on client-side navigation
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'))
      // Also trigger a resize event to ensure all observers are active
      window.dispatchEvent(new Event('resize'))
    }, 200)
  })
  
  // Also handle initial load
  if (process.client) {
    nextTick(() => {
      setTimeout(() => {
        window.dispatchEvent(new Event('scroll'))
      }, 300)
    })
  }
})
