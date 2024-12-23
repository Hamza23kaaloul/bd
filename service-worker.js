const CACHE_NAME = "billet-app-cache-v1";
const urlsToCache = [
    "/",
    "./index.html",
     // تأكد من إضافة كافة الملفات المهمة التي يحتاجها الموقع

    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

// تثبيت الخدمة (Install)
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// تفعيل الخدمة (Activate)
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// توفير المحتوى من الكاش (Fetch)
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
