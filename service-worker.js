/**
 * Service Worker - Finanze Personali
 * Architettura Local-First & 100% Offline Resilience (Apple HIG)
 */

const CACHE_NAME = 'finanze-cache-v2026.51';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './apple-touch-icon.png',
  './css/apple-design.css',
  './js/vendor/chart.umd.min.js',
  './js/app.js',
  './js/app.bundle.js',
  './js/config/environment.js',
  './js/data/assetCatalog.js',
  './js/data/mockData.js',
  './js/data/demoData.js',
  './js/services/googleSheetsService.js',
  './js/services/financialAssistantService.js',
  './js/services/smartCategorizer.js',
  './js/services/biometricService.js',
  './js/components/icons.js',
  './js/components/uiComponents.js',
  './js/components/dashboardView.js',
  './js/components/speseView.js',
  './js/components/movimentiView.js',
  './js/components/investimentiView.js',
  './js/components/storicoView.js',
  './js/components/assistenteView.js',
  './js/components/impostazioniView.js',
  './js/components/monthlyClosingModal.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-cache partial failure, ignoring missing optional assets:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Solo richieste GET possono essere gestite dalla cache del Service Worker
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignora le richieste alle API esterne di Google Apps Script
  if (url.origin.includes('script.google.com') || url.origin.includes('google.com')) {
    return;
  }

  // Strategia Network-First: con rete l'app carica sempre l'ultima versione (nessuna UI "vecchia" in cache);
  // senza rete ricade sulla cache, preservando la resilienza offline.
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
