const CACHE="proxima-acao-mobile-v8";
const ASSETS=["./","./index.html","./mobile.css","./agenda-mobile.css?v=1","./overrides.css?v=2","./agenda-runtime.js?v=1","./mobile.js?v=8","./manifest.webmanifest","../classic/constants.js?v=9","../classic/models.js?v=9","../classic/analytics.js?v=9","../classic/recommendation-engine.js?v=8"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("proxima-acao-mobile-")&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request))));
