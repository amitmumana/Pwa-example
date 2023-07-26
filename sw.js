// install service worker

self.addEventListener("install", (evt) => {
  console.log("Service Worker has been installed", evt)
})

// Activate Servie Worker

self.addEventListener("activate", (evt) => {
  console.log("Service worker has been activated", evt)
})

// Fetch event

self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt)
})
