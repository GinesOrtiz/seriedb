const httpInterceptor = function ($q, $injector) {
  'use strict';
  return {
    'request': function (config) {
      if (config.url.indexOf(__API_URL__) > -1) {
        config.url += '?api_key=' + __TMDB__;
      }
      config.timeout = 30000;
      return config;
    },

    'requestError': function (rejection) {
      return $q.reject(rejection);
    },

    'responseError': function (rejection) {
      let Notification = $injector.get('Notification');

      switch (rejection.status) {
        default:
          console.error(rejection);
          break;
      }
      return $q.reject(rejection);
    }
  };
};

export default /*@ngInject*/ httpInterceptor;
