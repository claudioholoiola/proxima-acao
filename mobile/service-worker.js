const CACHE="proxima-acao-mobile-v5";
const ASSETS=["./","./index.html","./mobile.css","./overrides.css?v=1","./mobile.js","./manifest.webmanifest","../classic/constants.js?v=8","../classic/models.js?v=8","../classic/analytics.js?v=8","../classic/recommendation-engine.js?v=8"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("proxima-acao-mobile-")&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request))));
