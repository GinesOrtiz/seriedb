import {billyPolyfills} from './billyPolyfills';
import angular from 'angular';
import {app} from './app';

billyPolyfills();

// jshint ignore:start
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
  a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
// jshint ignore:end

ga('create', __GA_ID__, 'auto');

let mixLoad = setInterval(() => {
  'use strict';
  if (typeof mixpanel !== 'undefined') {
    clearInterval(mixLoad);
    mixpanel.init(__MIXPANEL_ID__);
  }
}, 20);

/* globals __SENTRY_ID__ */
Raven.config(__SENTRY_ID__)
  .install();


angular.element(document)
  .ready(() => {
    'use strict';
    angular.bootstrap(document.body, [app.name]);
  });


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/worker.js')
    .then(function (registration) {
      'use strict';
      if (__DEV__) {
        console.log('Service Worker registered' + JSON.stringify(registration));
      }
    })
    .catch(function (err) {
      'use strict';
      if (__DEV__) {
        console.log('Service Worker registration failed: ', err);
      }
    });
}
