import httpInterceptor from './http.interceptor';
import SharedFactory from './shared';
import {TranslateService, TranslateFilter} from './translateService';

import langEN from './lang/en.json';

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

const sharedRun = (translateService) => {
  'use strict';
  translateService.addLang('shared', {
    EN: langEN
  });
};

export default angular
  .module('seriedb.shared', [])
  .factory('httpInterceptor', httpInterceptor)
  .factory('SharedFactory', SharedFactory)
  .factory('translateService', TranslateService)
  .filter('translate', TranslateFilter)

  .config(sharedConfig)
  .run(sharedRun);
