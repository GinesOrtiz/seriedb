import angular from 'angular';
import './notification.scss';

import {notificationDirective} from './notification.directive';

export const notification = angular.module('commonComponents.notification', [])
  .directive('notification', notificationDirective);
