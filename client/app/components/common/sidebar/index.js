
import sidebarComponent from './sidebar.component';

import langEN from './lang/en.json';
import langES from './lang/es.json';

const moduleRun = (translateService) => {
  'use strict';
  translateService.addLang('sidebar', {
    EN: langEN,
    ES: langES
  });
};

export default angular
  .module('billy.common.sidebar', [])
  .component('sidebar', sidebarComponent)
  .run(moduleRun);
