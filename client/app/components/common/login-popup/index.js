import loginPopupComponent from './login-popup.component';
import LoginPopupService from './login-popup.service';

import langEN from './lang/en.json';
import langES from './lang/es.json';

const loginPopupRun = (translateService) => {
  'use strict';
  translateService.addLang('loginPopup', {
    EN: langEN,
    ES: langES
  });
};

export default angular
  .module('billy.common.loginPopup', [])
  .component('loginPopupComponent', loginPopupComponent)
  .factory('LoginPopupService', LoginPopupService)
  .run(loginPopupRun);
