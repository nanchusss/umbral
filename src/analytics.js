function injectScript(id, src, onLoad) {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  if (onLoad) script.onload = onLoad;
  document.head.appendChild(script);
}

const DEFAULT_GA4_ID = 'G-2W3KMDTWCF';
const DEFAULT_GTM_ID = 'GTM-M9QSF2HK';

function initGtag(measurementId) {
  if (!measurementId || window.__umbralGtagInitialized) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  injectScript('umbral-ga4-script', `https://www.googletagmanager.com/gtag/js?id=${measurementId}`, () => {
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: true,
      anonymize_ip: true,
    });
  });

  window.__umbralGtagInitialized = true;
}

function initGtm(gtmId) {
  if (!gtmId || window.__umbralGtmInitialized) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  injectScript('umbral-gtm-script', `https://www.googletagmanager.com/gtm.js?id=${gtmId}`);

  window.__umbralGtmInitialized = true;
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  const gaMeasurementId = process.env.REACT_APP_GA4_MEASUREMENT_ID || process.env.REACT_APP_GA_MEASUREMENT_ID || DEFAULT_GA4_ID;
  const gtmId = process.env.REACT_APP_GTM_ID || DEFAULT_GTM_ID;

  initGtm(gtmId);
  initGtag(gaMeasurementId);
}
