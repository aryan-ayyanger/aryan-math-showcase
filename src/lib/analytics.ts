declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const fallbackMeasurementId = 'G-2H93LJLV80';
const configuredMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const measurementId = configuredMeasurementId || fallbackMeasurementId;
const isDev = import.meta.env.DEV;
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
    script.onerror = () => {
      if (isDev) {
        console.warn('GA script failed to load. Tracking may be blocked by network or browser settings.');
      }
    };
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }

  if (!configuredMeasurementId && isDev) {
    console.info(`VITE_GA_MEASUREMENT_ID is not set. Using fallback GA ID: ${fallbackMeasurementId}`);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false, debug_mode: isDev });
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
    debug_mode: isDev,
  });
}
