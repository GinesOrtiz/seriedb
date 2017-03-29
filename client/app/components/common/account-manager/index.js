import {AccountManagerDirective} from './accountManager.directive';
import langEN from './lang/en.json';
import langES from './lang/es.json';

export const accountManager = angular.module('commonComponents.accountManager', [])
  .directive('accountManager', AccountManagerDirective)
  .run((translateService)=> {
    'use strict';
    translateService.addLang('accountManager', {
      EN: langEN,
      ES: langES
    });
  });
