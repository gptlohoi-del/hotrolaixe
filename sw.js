const CACHE_NAME = 'drive-smooth-offline-v2';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sounds.json',
  'https://cdn-icons-png.flaticon.com/512/18307/18307152.png'
];

// Hàm đọc sounds.json và lưu toàn bộ file MP3 vào Cache
async function cacheSoundsFromJson(cache) {
  try {
    const response = await fetch('./sounds.json', { cache: 'no-store' });
    if (response.ok) {
      await cache.put('./sounds.json', response.clone());
      const data = await response.json();
      if (data && data.files) {
        const mp3Urls = Object.values(data.files);
        await Promise.allSettled(
          mp3Urls.map(async (url) => {
            const audioRes = await fetch(url, { cache: 'no-store' });
            if (audioRes.ok) {
              await cache.put(url, audioRes);
            }
          })
        );
      }
    }
  } catch (err) {
    // Nếu đang offline lúc cài đặt thì bỏ qua, dùng cache sẵn có
  }
}

// Cài đặt Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(CORE_ASSETS.map((url) => cache.add(url)));
      await cacheSoundsFromJson(cache);
    })
  );
  self.skipWaiting();
});

// Kích hoạt và dọn cache cũ
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

// Lắng nghe lệnh "Cập nhật âm thanh" từ giao diện người dùng
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'UPDATE_SOUNDS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        await cacheSoundsFromJson(cache);
        if (event.source) {
          event.source.postMessage({ status: 'SOUNDS_UPDATED' });
        }
      })
    );
  }
});

// Chiến lược Network First (Ưu tiên mạng, rớt mạng dùng Cache)
// Sự kiện Fetch: Tự động cập nhật file HTML ngay lập tức mà không cần tăng version sw.js
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Đối với file index.html hoặc trang chủ: Luôn ưu tiên lấy MẠNG TRƯỚC (Network First)
  // Nếu mất mạng mới lấy bản Cache cũ. Nhờ vậy bạn sửa index.html trên GitHub là app nhận luôn.
  if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 2. Đối với các file khác (sounds.json, file mp3, icon...): Dùng chiến lược Cache trước, ngầm cập nhật sau
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cloned = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
        }
        return networkResponse;
      }).catch(() => {});

      // Trả về cache ngay lập tức cho mượt, đồng thời ngầm tải bản mới về cho lần sau
      return cachedResponse || fetchPromise;
    })
  );
});
