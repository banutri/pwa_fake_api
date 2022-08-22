var CACHE_NAME = 'coba_pwa_cache_v1'
var urlsToCache = [
    '/',
    '/assets',
    '/main.js'
]

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('Opened Cache');
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch',function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                return response
            }

            return fetch(event.request)
        })
    )
})


self.addEventListener('active', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName != CACHE_NAME
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            )
        })
    )
})