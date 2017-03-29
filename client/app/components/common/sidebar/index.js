import angular from 'angular';
import {sidebarDirective} from './sidebar.directive';

export const sidebar = angular.module('commonComponents.sidebar', [])
  .directive('sidebar', sidebarDirective);
