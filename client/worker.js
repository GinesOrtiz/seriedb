var CACHE_NAME_LONG = __CACHE_VERSION__; //this will be replaced on build

//urls to cache without auth token needed
var urlsToCacheOnInit = [
  __API_URL__ + '/countries',
  __API_URL__ + '/carriers'
];

var endpointsToAvoidCache = [
  '/me',
  '/billing',
  '/wizard',
  '/email-verification'
];

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
  caches.keys()
    .then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return !key.startsWith(CACHE_NAME_LONG);
          })
          .map(function (key) {
            return caches.delete(key);
          })
      );
    });
});


self.addEventListener('install', function (event) {
  //We cannot add them to cache using cache add because in the list there are urls that need
  // token, so we add only a few

  event.waitUntil(self.skipWaiting());
  caches.open(CACHE_NAME_LONG)
    .then(function (cache) {
      cache.addAll(urlsToCacheOnInit);
    })
});

/*
self.addEventListener('fetch', function (event) {
  //only try to catch requests that have 'billy' in the domain
  let url = event.request.url;

  let regex = new RegExp(/(api.billydomain|publishers.billymob)/);

  if (__DEV__) {
    regex = /(api.billystaging|publisher.billystaging|localhost:3000)/;
  }

  let avoidReqs = new RegExp('(' + endpointsToAvoidCache.join('(\/?)|\\') + ')$');

  if (regex.test(url)) {
    if (avoidReqs.test(url)) {
      console.log('Ignored request: ', url);
      return;
    }
    else {
      event.respondWith(
        caches.match(event.request)
          .then(function (cached) {
              var networked = fetch(event.request)
                .then(fetchedFromNetwork, unableToResolve)
                .catch(unableToResolve);
              return cached || networked;
            }
          )
      );
    }
  }
});
*/

/**
 * COMUNICATION INTERFACE
 */
self.addEventListener('message', function (event) {
    var data = event.data;

    if (data.command === 'prefetch') {
      if (__DEV__) {
        console.debug('Prefetching: ', data.url);
      }
      caches.match(data.url)
        .then(function (cached) {
            var theReq = new Request(data.url);
            theReq.headers.set('Authorization', data.token);

            var networked = fetch(theReq)
              .then(fetchedFromNetwork, unableToResolve)
              .catch(unableToResolve);
            return cached || networked;
          }
        );
    }

    if (data.command === 'purgeCache') {
      caches.keys()
        .then(function (keys) {
          return Promise.all(keys
            .filter(function (key) {
              return key.startsWith(CACHE_NAME_LONG);
            })
            .map(function (key) {
              return caches.delete(key);
            })
          );
        })
    }

    //purge all urls that contains `data.contains`

    if (data.command === 'purgeOnly') {
      caches.open(CACHE_NAME_LONG)
        .then(function (cache) {
          cache.keys()
            .then(function (keys) {
              keys.forEach(function (request) {
                if (request.url.indexOf(data.contains) > -1) {
                  cache.delete(request)
                }
              });
            });
        });
    }
  }
);


function fetchedFromNetwork(response) {

  if (response.status >= 500) {
    return response
  }

  var cacheCopy = response.clone();
  caches.open(CACHE_NAME_LONG)
    .then(function (cache) {
      //TODO: replace all this logic with sw-toolbox frameworks
      switch (response.headers.get('Content-type')) {
        case 'application/javascript':
          cache.put(response.url, cacheCopy);
          break;
        case 'application/json':
          if (shouldCacheIt(response.url)) {
            cache.put(response.url, cacheCopy);
          }
          break;
      }
    });
  return response;
}

function unableToResolve() {
  return new Response('<!doctype html><head><title>Site Maintenance<\/title> <meta name=\"robots\" content=\"noindex\"><\/head><style>body{text-align: center; padding: 150px;}h1{font-size: 50px;}body{font: 20px Helvetica, sans-serif; color: #333;}article{display: block; text-align: left; width: 650px; margin: 0 auto;}a{color: #dc8100; text-decoration: none;}a:hover{color: #333; text-decoration: none;}<\/style><body><article> <h1>We&rsquo;ll be back soon!<\/h1> <div> <p>Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment. If you need to you can always <a id=\"intercom\">contact us<\/a>, otherwise we&rsquo;ll be back online shortly!<\/p><p>&mdash; Billy team<\/p><\/div><\/article><\/body><script>document.getElementById(\'intercom\').addEventListener(\"click\", function(){Intercom(\'show\');}); if (\'serviceWorker\' in navigator){navigator.serviceWorker.register(\'\/worker.js\') .then(function (registration){console.log(\'Service Worker registered\' + JSON.stringify(registration));}}) .catch(function (err){console.log(\'Service Worker registration failed: \', err);}});}window.intercomSettings={app_id: \"uidz8r4x\"};<\/script><script type=\"text\/javascript\"><\/script><script>(function(){var w=window;var ic=w.Intercom;if(typeof ic===\"function\"){ic(\'reattach_activator\');ic(\'update\',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement(\'script\');s.type=\'text\/javascript\';s.async=true;s.src=\'https:\/\/widget.intercom.io\/widget\/uidz8r4x\';var x=d.getElementsByTagName(\'script\')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent(\'onload\',l);}else{w.addEventListener(\'load\',l,false);}}})()<\/script>', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: new Headers({
      'Content-Type': 'text/html'
    })
  });
}

function shouldCacheIt(url) {
  let avoid = endpointsToAvoidCache.some(elem => {
    return url.indexOf(elem) > -1;
  });
  return !avoid;
}
