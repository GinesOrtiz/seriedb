import accountManagerComponent from './accountManager.component';

import langEN from './lang/en.json';
import langES from './lang/es.json';

const accountManagerRun = (translateService) => {
  'use strict';
  translateService.addLang('accountManager', {
    EN: langEN,
    ES: langES
  });
};

export default angular
  .module('billy.common.accountManager', [])
  .component('accountManager', accountManagerComponent)
  .run(accountManagerRun);
