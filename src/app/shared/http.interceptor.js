/* globals __API_URL__, __TMDB__ */

const httpInterceptor = function ($q, $localStorage) {
  'use strict';

  const API_URL = __API_URL__;
  const TMDB = __TMDB__;

  return {
    'request': function (config) {
      if (config.url.indexOf(API_URL) > -1) {
        let language = $localStorage.language ? $localStorage.language.toLowerCase() : 'en';

        // Language selector fix
        switch (language) {
          case 'ca':
            language = 'es';
        }

        config.url += `?api_key=${TMDB}&language=${language}`;
      }
      config.timeout = 30000;
      return config;
    },

    'requestError': function (rejection) {
      return $q.reject(rejection);
    },

    'responseError': function (rejection) {

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
