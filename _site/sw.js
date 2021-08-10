const version = '20210810224127';
const cacheName = `static::${version}`;

const buildContentBlob = () => {
  return ["/cakes/cake-tuesday/2021/08/10/cake-tuesday-1/","/running/c25k/2021/08/06/things-i-wish-i-knew-before-i-started-running/","/cakes/2021/08/03/discworld-cake-tuesday/","/caturday/2021/07/31/top-terry-pratchett-caturday-quotes/","/personal/2021/07/29/i-ve-tried-nothing-and-i-m-all-out-of-ideas/","/cakes/2021/07/27/cake-tuesday/","/personal/2021/07/26/20-things-i-d-tell-20-year-old-me/","/demotivation/2021/07/26/demotivation-monday/","/c25k/depression/2021/07/24/are-we-nearly-there-yet/","/quotes/2021/07/22/pale-blue-dot/","/categories/","/contact/","/blog/","/","/manifest.json","/assets/search.json","/search/","/assets/styles.css","/thanks/","/redirects.json","/sitemap.xml","/robots.txt","/feed.xml","/blog/page2/","/blog/page3/","/blog/page4/","/blog/page5/","/blog/page6/","/blog/page7/","/blog/page8/","/assets/styles.css.map","https://www.freeiconspng.com/uploads/home-page-icon-0.png", "/assets/default-offline-image.png", "/assets/scripts/fetch.js"
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
