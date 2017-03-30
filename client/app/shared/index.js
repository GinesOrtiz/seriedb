
import moment from 'moment';

import angularticsProviders from './angulartics-providers';
import httpInterceptor from './http.interceptor';
import SharedApiService from './shared.service';
import IntercomService from './intercom';
import localStorageService from './localStorage';
import daterange from './daterange';
import {TranslateService, TranslateFilter} from './translateService';
import {featureFlagDirective, featureFlagService} from './featureFlag';
import userRoleDirective from './userRole';
import UserService from './user.service';
import WizardService from './wizard.service';
import testingABDirective from './testingAB';
import BackgroundUpdateService from './backgroundUpdate';
import MixpanelFactory from './mixpanel.factory';

import langES from './lang/es.json';
import langEN from './lang/en.json';

const sharedConfig = ($locationProvider, $logProvider, $httpProvider, $mdDateLocaleProvider,
                      $localStorageProvider) => {
  'use strict';

  $httpProvider.interceptors.push('httpInterceptor');
  $httpProvider.defaults.cache = false;

  $logProvider.debugEnabled(__DEV__);
  $localStorageProvider.setKeyPrefix('billy-');
  $mdDateLocaleProvider.formatDate = function (date) {
    if (!date) {
      return '';
    }
    return moment(date)
      .format('YYYY/MM/DD');
  };
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
};

const sharedRun = (translateService) => {
  'use strict';
  translateService.addLang('shared', {
    EN: langEN,
    ES: langES
  });
};

export default angular
  .module('shared', [
    angularticsProviders.name
  ])
  .factory('httpInterceptor', httpInterceptor)
  .factory('SharedApiService', SharedApiService)
  .factory('IntercomService', IntercomService)
  .factory('localStorage', localStorageService)
  .factory('Dates', daterange)
  .factory('translateService', TranslateService)
  .factory('featureFlagService', featureFlagService)
  .factory('UserService', UserService)
  .factory('WizardService', WizardService)
  .factory('BackgroundUpdateService', BackgroundUpdateService)
  .factory('bmMixpanel', MixpanelFactory)

  .directive('featureFlag', featureFlagDirective)
  .directive('userRole', userRoleDirective)
  .directive('testing', testingABDirective)

  .filter('translate', TranslateFilter)

  .config(sharedConfig)
  .run(sharedRun);
