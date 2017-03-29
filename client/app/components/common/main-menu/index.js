import angular from 'angular';

import {mainMenuComponent} from './main-menu.component';

export const mainMenu = angular
  .module('billy.common.main-menu', [])
  .component('mainMenu', mainMenuComponent);
