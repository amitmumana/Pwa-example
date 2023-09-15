// we use self. which ref. service worker file it's self.

const staticCache = "static-site" // App shall assets
const dynamicCaches = "dynamic-site-v2"

const assetsResources = [
  "/", // storing request url. index file
  "index.html", // same as above both ref. home or index file.
  "js/materialize.min.js",
  "js/ui.js",
  "js/app.js",
  "css/style.css",
  "css/materialize.min.css",
  "img/pizza.png",
  "img/icons",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "pages/fallback.html"
]

// Cache size limit function

const limitCacheSize = (name, size) => {
  caches.open(name).then((caches) => {
    caches.keys().then((keys) => {
      if (keys.length > size) {
        caches.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}

// install service worker

self.addEventListener("install", (event) => {
  console.log("Service Worker has been installed", event)
  event.waitUntil(
    caches.open(staticCache).then((cache) => {
      // cache.add() // add Singal resources
      cache.addAll(assetsResources) // add array of resources
    })
  )
})

//WHATS HAPPENING HERE ?
// waitUntil() helps to perform asynchronous task.

// Activate Servie Worker
// runs when service worker activated

self.addEventListener("activate", (event) => {
  // console.log("Service worker has been activated", event)
  event.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys, "bkbkbkbk ")
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCaches)
          .map((item) => caches.delete(item))
      )
    })
  )
})

//WHATS HAPPENING HERE ?
// key is array and we filter keys. then condition check that if iterated key dose not match
// to staticCaches it will go in filtered array. and then we map on that filtered array and
// delete method take maps' iterated item as argument. and delete it.

// Serving > The fetch event
self.addEventListener("fetch", (event) => {
  // console.log("fetch event", evt)
  // event.respondWith(
  //   caches
  //     .match(event.request)
  //     .then((cachesResponse) => {
  //       return (
  //         cachesResponse ||
  //         fetch(event.request).then((fetchResponse) => {
  //           return caches.open(dynamicCaches).then((cache) => {
  //             cache.put(event.request.url, fetchResponse.clone())
  //             limitCacheSize(dynamicCaches, 15)
  //             return fetchResponse
  //           })
  //         })
  //       )
  //     })
  //     .catch(() => {
  //       // conditional fallbacks
  //       if (event.request.url.indexOf(".html") > -1) {
  //         return caches.match("/pages/fallback.html")
  //       }
  //     })
  // )
})

//WHATS HAPPENING HERE ?

// caches try to match event.requests and if reuests match then retrun it self.
// if not then try to fetch request from server.

// if (event.request.url.indexOf(".html") > -1) {
// return caches.match("/pages/fallback.html")
//}
// it will check index of .html in url. if not found then its return -1
//we can add diffrents condition for image aur any other assets.for conditionally render.
