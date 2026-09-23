// https://nuxt.com/docs/api/configuration/nuxt-config
const googleAnalyticsIdRaw = process.env.GOOGLE_ANALYTICS_ID || 'G-YMH5SK77PW'
const googleAnalyticsId = /^G-[A-Z0-9]+$/i.test(googleAnalyticsIdRaw)
  ? googleAnalyticsIdRaw
  : 'G-YMH5SK77PW'

export default defineNuxtConfig({
  compatibilityDate: '2026-06-26',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vueuse/motion/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  // Canonical domain for sitemap, robots, and absolute URLs.
  // Override per environment with NUXT_SITE_URL.
  site: {
    url: process.env.NUXT_SITE_URL || 'https://constanteng.com',
    name: 'CONSTANT ENGINEERING plc',
    description:
      'CONSTANT ENGINEERING plc — electromechanical experts in Ethiopia for diesel generators, solar & hybrid energy, HVAC, industrial automation, pumps, and metal engineering.',
    defaultLocale: 'en',
    indexable: true
  },
  sitemap: {
    autoLastmod: true,
    exclude: ['/hero-test', '/api/**'],
    sources: ['/api/__sitemap__/urls'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.7
    },
    // Richer stylesheet columns in /sitemap.xml for debugging crawl coverage
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Images', width: '15%', select: 'count(image:image)' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '20%' },
      { label: 'Priority', select: 'sitemap:priority', width: '15%' }
    ]
  },
  robots: {
    // Allow all crawlers; block non-content surfaces
    disallow: ['/api/', '/hero-test'],
    // Explicit sitemap hint (also auto-injected when site.url is set)
    sitemap: ['/sitemap.xml']
  },
  routeRules: {
    '/': { sitemap: { priority: 1, changefreq: 'weekly' } },
    '/about': { sitemap: { priority: 0.9, changefreq: 'monthly' } },
    '/products': { sitemap: { priority: 0.9, changefreq: 'weekly' } },
    '/products/**': { sitemap: { priority: 0.8, changefreq: 'weekly' } },
    '/contact': { sitemap: { priority: 0.8, changefreq: 'monthly' } },
    '/hero-test': { robots: false, sitemap: false }
  },
  runtimeConfig: {
    formspreeEndpoint: process.env.FORMSPREE_ENDPOINT || '',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    geminiModel: process.env.GEMINI_MODEL || 'gemini-flash-lite-latest',
    public: {
      googleAnalyticsId,
      whatsappNumber: process.env.WHATSAPP_NUMBER || '251924909098',
      supportPhone: process.env.SUPPORT_PHONE || '+251 924 909 098'
    }
  },
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      strict: false
    }
  },
  app: {
    head: {
      title: 'CONSTANT ENGINEERING plc',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'CONSTANT ENGINEERING plc — electromechanical experts in Ethiopia for diesel generators, solar & hybrid energy, HVAC, industrial automation, pumps, and metal engineering.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/Constant-logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap' }
      ],
      // Official Google tag. Production only, so local dev does not send hits.
      // gtag('config') records the first page view. Later client-side route
      // changes are sent from plugins/gtag.client.ts.
      script:
        process.env.NODE_ENV === 'production'
          ? [
              {
                key: 'gtag-src',
                src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
                async: true,
                tagPosition: 'head'
              },
              {
                key: 'gtag-init',
                type: 'text/javascript',
                tagPosition: 'head',
                innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAnalyticsId}',{page_location:location.href,page_path:location.pathname+location.search});`
              }
            ]
          : []
    }
  }
})
