declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export default defineNuxtPlugin(() => {
  const { googleAnalyticsId } = useRuntimeConfig().public

  if (!googleAnalyticsId || import.meta.dev) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', googleAnalyticsId)

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
        async: true
      }
    ]
  })

  const router = useRouter()
  router.afterEach((to) => {
    window.gtag('config', googleAnalyticsId, {
      page_path: to.fullPath
    })
  })
})
