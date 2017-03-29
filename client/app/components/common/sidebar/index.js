import angular from 'angular';
import {sidebarComponent} from './sidebar.component';

import langEN from './lang/en.json';
import langES from './lang/es.json';

const moduleRun = (translateService) => {
  'use strict';
  translateService.addLang('sidebar', {
    EN: langEN,
    ES: langES
  });
};

moduleRun.$inject = ['translateService'];

export const sidebar = angular.module('commonComponents.sidebar', [])
  .component('sidebar', sidebarComponent)
  .run(moduleRun);
