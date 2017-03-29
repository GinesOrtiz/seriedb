import angular from 'angular';
import template from './void.html';
import {voidController as controller} from './void.controller';
window.moment = require('moment');

import 'ob-daterangepicker/dist/styles/ob-daterangepicker.css';
import 'ob-daterangepicker';

const voidViewConfig = ($stateProvider) => {
  'use strict';
  $stateProvider
    .state('billy.voidState', {
      url: '/void',
      controller,
      controllerAs: 'vm',
      template,
      auth: true,
    });

};
voidViewConfig.$inject = ['$stateProvider'];

export const voidView = angular
  .module('voidView', ['obDateRangePicker'])
  .config(voidViewConfig);
