import angular from 'angular';

import {mainMenuDirective} from './main-menu.directive';

export const mainMenu = angular.module('commonComponents.main-menu', [])
  .directive('mainMenu', mainMenuDirective);
