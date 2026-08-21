import { asSitemapUrl, defineSitemapEventHandler } from '#imports'
import { PRODUCT_CATALOG } from '~/data/products'

/**
 * Product detail URLs for the sitemap (dynamic [id] routes are not
 * auto-discovered unless prerendered). Includes image metadata so
 * Google Image Search can associate product pages with brand assets.
 */
export default defineSitemapEventHandler(() => {
  return PRODUCT_CATALOG.map((product) =>
    asSitemapUrl({
      loc: `/products/${product.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      images: [
        {
          loc: product.image,
          title: `${product.name} | CONSTANT ENGINEERING plc`,
          caption: product.description
        }
      ]
    })
  )
})
