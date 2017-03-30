
import authComponent from './auth-component.component';
import langEN from './lang/en.json';
import langES from './lang/es.json';

import './auth-component.scss';

const authComponentRun = (translateService) => {
  'use strict';
  translateService.addLang('authComponent', {
    EN: langEN,
    ES: langES
  });
};

export default angular
  .module('billy.common.authComponent', [])
  .component('authComponent', authComponent)
  .run(authComponentRun);
