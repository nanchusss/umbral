const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const STORAGE_KEY = 'umbral_attribution';

function readStoredAttribution() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStoredAttribution(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage errors in private mode or blocked storage.
  }
}

export function persistAttributionFromUrl() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const stored = readStoredAttribution();
  const next = { ...stored };

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) next[key] = value;
  });

  if (!next.first_landing_path) {
    next.first_landing_path = window.location.pathname;
  }

  if (!next.first_referrer && document.referrer) {
    next.first_referrer = document.referrer;
  }

  if (!next.first_seen_at) {
    next.first_seen_at = new Date().toISOString();
  }

  writeStoredAttribution(next);
}

export function getLeadAttribution() {
  if (typeof window === 'undefined') return {};

  const stored = readStoredAttribution();
  return {
    ...stored,
    current_path: window.location.pathname,
    current_url: window.location.href,
    current_referrer: document.referrer || '',
    submitted_at: new Date().toISOString(),
  };
}

export function trackEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    ...payload,
    path: window.location.pathname,
    timestamp: Date.now(),
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }
}
