import angular from 'angular';
import './notification.scss';

import {notificationComponent} from './notification.component';

export const notification = angular
  .module('billy.common.notification', [])
  .component('notification', notificationComponent);
