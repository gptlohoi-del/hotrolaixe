const CACHE_NAME = 'smoodri-offline-v4';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/1126/1126585.png'
];

// Cài đặt Service Worker và lưu trữ các file cốt lõi
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(CORE_ASSETS.map((url) => cache.add(url)));
    })
  );
  self.skipWaiting();
});

// Kích hoạt và dọn sạch cache cũ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Chiến lược Network First cho HTML, CSS, JS (Sửa code trên GitHub là tự cập nhật ngay, mất mạng dùng Cache)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isCodeFile =
    url.pathname.endsWith('/') ||
    url.pathname.endsWith('index.html') ||
    url.pathname.endsWith('style.css') ||
    url.pathname.endsWith('app.js');

  if (isCodeFile) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request) || caches.match('./index.html'))
    );
    return;
  }

  // Các tài nguyên khác (manifest, icon): Ưu tiên Cache, ngầm cập nhật mới
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          }
          return networkResponse;
        })
        .catch(() => {});

      return cachedResponse || fetchPromise;
    })
  );
});
