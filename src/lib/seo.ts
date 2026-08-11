import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  /** Pre-serialized JSON-LD string injected as <script type="application/ld+json">. */
  jsonLd?: string;
}

function upsertMeta(selector: string, attrs: Record<string, string>, content: string): void {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    document.head.appendChild(el);
  }
  el.content = content;
}

const LD_ID = 'structured-data-ld';
const SITE_NAME = 'Aryan Ayyanger | Math Portfolio';

// Imperatively updates <head> — works with Google's JS-executing crawler.
export function useSEO({ title, description, canonical, ogType = 'website', jsonLd }: SEOProps): void {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, title);
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, ogType);
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_NAME);
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary');
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title);

    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description' }, description);
      upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description);
      upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
    }

    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
      upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonical);
    }

    document.getElementById(LD_ID)?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = LD_ID;
      script.textContent = jsonLd;
      document.head.appendChild(script);
    }

    return () => { document.getElementById(LD_ID)?.remove(); };
  }, [title, description, canonical, ogType, jsonLd]);
}
