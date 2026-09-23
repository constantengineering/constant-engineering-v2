declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export default defineNuxtPlugin(() => {
  if (import.meta.dev) return

  const { googleAnalyticsId } = useRuntimeConfig().public
  if (!googleAnalyticsId || typeof window.gtag !== 'function') return

  const router = useRouter()
  let isFirstNavigation = true
  let lastLocation = window.location.href

  router.afterEach((to) => {
    if (isFirstNavigation) {
      isFirstNavigation = false
      lastLocation = window.location.href
      return
    }

    const pageReferrer = lastLocation
    nextTick(() => {
      const pageLocation = window.location.href
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: pageLocation,
        page_path: to.fullPath,
        page_referrer: pageReferrer,
        send_to: googleAnalyticsId
      })
      lastLocation = pageLocation
    })
  })
})
