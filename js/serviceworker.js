//install serviceworker

var cacheName = "restaurantV1"

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache
	   .addAll(
        [
          'index.html',
          'restaurant.html',
		  '/css/syles.css',
		  '/data/restaurants.json',
		  'img/inf.png',
		  '/js/',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/js/serviceworker.js'
        ]
       );
	 
	  
    })
  );
});

//fetch cache as needed

self.addEventListener("fetch", event => { 

  //cache main restaurant page
  if (event.request.url.indexOf("restaurant.html") > -1) {
    event.request = new Request(restaurant.html);
  }
  
  //check head/get/post or simple headers
  if (URL(event.request.url).hostname !== "localhost") {
    event.request.mode = "no-cors";
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
		
        fetch(event.request)
          .then(fetchResponse => {
			  
		    //cache other pages
            return caches.open(cacheName).then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
          .catch(error => {
			  
			//display image not found
            if (event.request.url.indexOf(".jpg") > -1) {
              return caches.match("/img/inf.png");
            }
			
			//internet connection or "internet is down"
            return new Response("Check internet connection", {
              status: 404,
              statusText: "Check internet connection"
            });
          })
      );
    })
  );
});