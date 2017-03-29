import {LoginPopupDirective} from './login-popup.directive';
import {LoginPopupService} from './login-popup.service';

import langEN from './lang/en.json';
import langES from './lang/es.json';

export const loginPopup = angular.module('commonComponents.loginPopup', [])
  .directive('loginPopupDirective', LoginPopupDirective)
  .factory('LoginPopupService',LoginPopupService)
  .run((translateService) => {
    'use strict';
    translateService.addLang('loginPopup', {EN: langEN, ES: langES});
  });
