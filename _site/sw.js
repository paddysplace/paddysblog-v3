const version = '20210711142102';
const cacheName = `static::${version}`;

const buildContentBlob = () => {
  return ["/caturday/2021/07/10/it-s-caturday/","/personal/2021/07/08/why-am-i-doing-this/","/personal/2021/07/06/i-hate-time/","/personal/2021/07/05/i-don-t-like-mondays/","/caturday/2021/07/03/its-caturday/","/personal/2021/07/01/the-testing-is-over/","/test/2021/06/30/lets-try-again/","/test/2021/06/27/first-test/","/website/projects/2012/04/24/helping-hand/","/newyork/2011/11/13/sunset/","/categories/","/contact/","/blog/","/","/manifest.json","/assets/search.json","/search/","/assets/styles.css","/thanks/","/redirects.json","/sitemap.xml","/robots.txt","/feed.xml","/blog/page2/","/blog/page3/","/blog/page4/","/blog/page5/","/blog/page6/","/blog/page7/","/blog/page8/","/blog/page9/","/blog/page10/","/blog/page11/","/blog/page12/","/blog/page13/","/blog/page14/","/blog/page15/","/blog/page16/","/blog/page17/","/blog/page18/","/blog/page19/","/blog/page20/","/blog/page21/","/blog/page22/","/blog/page23/","/blog/page24/","/blog/page25/","/blog/page26/","/blog/page27/","/blog/page28/","/blog/page29/","/blog/page30/","/blog/page31/","/blog/page32/","/blog/page33/","/blog/page34/","/blog/page35/","/blog/page36/","/blog/page37/","/blog/page38/","/blog/page39/","/blog/page40/","/blog/page41/","/blog/page42/","/blog/page43/","/blog/page44/","/blog/page45/","/blog/page46/","/blog/page47/","/blog/page48/","/blog/page49/","/blog/page50/","/blog/page51/","/blog/page52/","/blog/page53/","/blog/page54/","/blog/page55/","/blog/page56/","/blog/page57/","/blog/page58/","/blog/page59/","/blog/page60/","/blog/page61/","/blog/page62/","/blog/page63/","/blog/page64/","/blog/page65/","/blog/page66/","/blog/page67/","/blog/page68/","/blog/page69/","/blog/page70/","/blog/page71/","/blog/page72/","/blog/page73/","/blog/page74/","/blog/page75/","/blog/page76/","/blog/page77/","/blog/page78/","/blog/page79/","/blog/page80/","/blog/page81/","/blog/page82/","/blog/page83/","/blog/page84/","/blog/page85/","/blog/page86/","/blog/page87/","/blog/page88/","/blog/page89/","/blog/page90/","/blog/page91/","/blog/page92/","/blog/page93/","/blog/page94/","/blog/page95/","/blog/page96/","/blog/page97/","/blog/page98/","/blog/page99/","/blog/page100/","/blog/page101/","/blog/page102/","/blog/page103/","/blog/page104/","/blog/page105/","/blog/page106/","/blog/page107/","/blog/page108/","/blog/page109/","/blog/page110/","/blog/page111/","/blog/page112/","/blog/page113/","/blog/page114/","/blog/page115/","/blog/page116/","/blog/page117/","/blog/page118/","/blog/page119/","/blog/page120/","/blog/page121/","/blog/page122/","/blog/page123/","/blog/page124/","/blog/page125/","/blog/page126/","/blog/page127/","/blog/page128/","/blog/page129/","/blog/page130/","/blog/page131/","/blog/page132/","/blog/page133/","/blog/page134/","/blog/page135/","/blog/page136/","/blog/page137/","/blog/page138/","/blog/page139/","/blog/page140/","/blog/page141/","/blog/page142/","/blog/page143/","/blog/page144/","/blog/page145/","/blog/page146/","/blog/page147/","/blog/page148/","/blog/page149/","/blog/page150/","/blog/page151/","/blog/page152/","/blog/page153/","/blog/page154/","/blog/page155/","/blog/page156/","/assets/styles.css.map","https://www.freeiconspng.com/uploads/black-cat-png-22.png", "/assets/default-offline-image.png", "/assets/scripts/fetch.js"
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
