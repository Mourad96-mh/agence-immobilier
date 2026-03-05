import { useEffect } from 'react'

/**
 * Updates document <title>, meta description, Open Graph and canonical URL
 * for each page to maximise SEO on a per-route basis.
 */
export default function useSEO({ title, description, canonical }) {
  useEffect(() => {
    if (title) document.title = title

    const setMeta = (attr, attrVal, content) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, attrVal)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }

    if (title) {
      setMeta('property', 'og:title', title)
      setMeta('name', 'twitter:title', title)
    }

    if (canonical) {
      let el = document.querySelector('link[rel="canonical"]')
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        document.head.appendChild(el)
      }
      el.setAttribute('href', canonical)

      setMeta('property', 'og:url', canonical)
    }
  }, [title, description, canonical])
}
