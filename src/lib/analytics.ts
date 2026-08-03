declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
let analyticsInitialized = false;

export const isAnalyticsEnabled = Boolean(measurementId);

export function initAnalytics(): void {
  if (!isAnalyticsEnabled || analyticsInitialized || typeof window === 'undefined') {
    return;
  }

  const scriptId = 'ga4-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
  analyticsInitialized = true;
}

export function trackPageView(path: string): void {
  if (!isAnalyticsEnabled || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
