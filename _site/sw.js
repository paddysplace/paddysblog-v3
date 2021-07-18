const version = '20210718192609';
const cacheName = `static::${version}`;

const buildContentBlob = () => {
  return ["/quotes/depression/2021/07/18/quote-of-the-day/","/caturday/2021/07/17/it-s-caturday/","/designs/2021/07/14/it-s-lead-work-wednesday-1/","/running/c25k/2021/07/11/keep-on-running/","/caturday/2021/07/10/it-s-caturday/","/personal/2021/07/08/why-am-i-doing-this/","/personal/2021/07/06/i-hate-time/","/personal/2021/07/05/i-don-t-like-mondays/","/caturday/2021/07/03/its-caturday/","/personal/2021/07/01/the-testing-is-over/","/categories/","/contact/","/blog/","/","/manifest.json","/assets/search.json","/search/","/assets/styles.css","/thanks/","/redirects.json","/sitemap.xml","/robots.txt","/feed.xml","/blog/page2/","/blog/page3/","/blog/page4/","/assets/styles.css.map","https://www.freeiconspng.com/uploads/home-page-icon-0.png", "/assets/default-offline-image.png", "/assets/scripts/fetch.js"
  ]
}

const updateStaticCache = () => {
  return caches.open(cacheName).then(cache => {
    return cache.addAll(buildContentBlob());
  });
};

const clearOldCache = () => {
  return caches.keys().then(keys => {
    // Remove caches whose name is no longer valid.
    return Promise.all(
      keys
        .filter(key => {
          return key !== cacheName;
        })
        .map(key => {
          console.log(`Service Worker: removing cache ${key}`);
          return caches.delete(key);
        })
    );
  });
};

self.addEventListener("install", event => {
  event.waitUntil(
    updateStaticCache().then(() => {
      console.log(`Service Worker: cache updated to version: ${cacheName}`);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(clearOldCache());
});

self.addEventListener("fetch", event => {
  let request = event.request;
  let url = new URL(request.url);

  // Only deal with requests from the same domain.
  if (url.origin !== location.origin) {
    return;
  }

  // Always fetch non-GET requests from the network.
  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  // Default url returned if page isn't cached
  let offlineAsset = "/offline/";

  if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
    // If url requested is an image and isn't cached, return default offline image
    offlineAsset = "/assets/default-offline-image.png";
  }

  // For all urls request image from network, then fallback to cache, then fallback to offline page
  event.respondWith(
    fetch(request).catch(async () => {
      return (await caches.match(request)) || caches.match(offlineAsset);
    })
  );
  return;
});
