import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import uiNotification from 'angular-ui-notification';
import ngMessages from 'angular-messages';
import ngstorage from 'ngstorage';
import ngSanitize from 'angular-sanitize';
import angulartics from 'angulartics';
import angularticsGA from 'angulartics-google-analytics';
import {permission, uiPermission} from 'angular-permission';
import 'oclazyload';
import popover from 'angular-ui-bootstrap/src/popover/index-nocss';

import {appComponent} from './app.component';

import {auth} from './components/auth';
import {voidView} from './components/void';

import {common} from './components/common';
import {config} from './app.config';
import {shared} from './shared';

import 'angular-material/angular-material.min.css';
import './app.scss';

window.jQuery = require('jquery');
window.$ = window.jQuery;

const appRun = (translateService, localStorage) => {
  'use strict';
  if (!localStorage.getItem('language', true)) {
    translateService.setLang();
  }
};
appRun.$inject = [
  'translateService',
  'localStorage'
];

export const app = angular
  .module('app', [
    ngMaterial,
    ngAnimate,
    uiRouter,
    uiNotification,
    ngMessages,
    ngstorage.name,
    ngSanitize,
    angulartics,
    angularticsGA,
    'angulartics.providers',
    'oc.lazyLoad',
    permission,
    uiPermission,
    popover,

    auth.name,
    voidView.name,

    common.name,
    config.name,
    shared.name
  ])
  .component('app', appComponent)
  .config(($stateProvider) => {
    'use strict';
    $stateProvider
      .state('billy', {
        abstract: true,
        template: '<app></app>'
      });
  })
  .run(appRun);
