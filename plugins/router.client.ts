export default defineNuxtPlugin(() => {
  const router = useRouter()
  
  // Suppress router warnings for static assets
  const originalResolve = router.resolve.bind(router)
  router.resolve = (to) => {
    // If the path looks like a static asset, return a mock route
    if (typeof to === 'string' && (to.startsWith('/partners/') || to.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i))) {
      return {
        name: undefined,
        path: to,
        fullPath: to,
        params: {},
        query: {},
        hash: '',
        matched: [],
        meta: {},
        redirectedFrom: undefined
      }
    }
    return originalResolve(to)
  }
})
