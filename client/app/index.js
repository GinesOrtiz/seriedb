import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import uiNotification from 'angular-ui-notification';
import ngMessages from 'angular-messages';
import ngstorage from 'ngstorage';
import ngSanitize from 'angular-sanitize';

import appComponent from './app.component';

import discover from './components/discover';
import search from './components/search';

import common from './components/common';
import config from './app.config';
import shared from './shared';

import 'angular-material/angular-material.min.css';
import './app.scss';

window.jQuery = require('jquery');
window.$ = window.jQuery;

const appRun = (translateService, $localStorage) => {
  'use strict';
  if (!$localStorage.language) {
    translateService.setLang();
  }
};

export default angular
  .module('app', [
    ngMaterial,
    ngAnimate,
    uiRouter,
    uiNotification,
    ngMessages,
    ngstorage.name,
    ngSanitize,

    discover.name,
    search.name,

    common.name,
    config.name,
    shared.name
  ])
  .component('app', appComponent)
  .config(($stateProvider) => {
    'use strict';
    $stateProvider
      .state('seriedb', {
        abstract: true,
        template: '<app></app>'
      });
  })
  .run(appRun);
