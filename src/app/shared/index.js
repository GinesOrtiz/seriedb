import httpInterceptor from './http.interceptor';
import SharedFactory from './shared';
import {TranslateFactory, TranslateFilter} from './translate.factory';

import langEN from './lang/en.json';
import langES from './lang/es.json';
import langCA from './lang/ca.json';

const sharedRun = (TranslateFactory) => {
  'use strict';
  TranslateFactory.addLang('shared', {
    EN: langEN,
    ES: langES,
    CA: langCA
  });
};

const sharedConfig = ($locationProvider, $logProvider, $httpProvider, $mdDateLocaleProvider,
                      $localStorageProvider) => {
  'use strict';

  $httpProvider.interceptors.push('httpInterceptor');
  $httpProvider.defaults.cache = false;

  $localStorageProvider.setKeyPrefix('seriedb-');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
};

export default angular
  .module('seriedb.shared', [])
  .factory('httpInterceptor', httpInterceptor)
  .factory('SharedFactory', SharedFactory)
  .factory('TranslateFactory', TranslateFactory)
  .filter('translate', TranslateFilter)

  .config(sharedConfig)
  .run(sharedRun);
