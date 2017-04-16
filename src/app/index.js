import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngstorage from 'ngstorage';
import ngSanitize from 'angular-sanitize';
import angularLoadingBar from 'angular-loading-bar';

import appComponent from './app.component';
import 'angular-loading-bar/build/loading-bar.min.css';

import discover from './components/discover';
import search from './components/search';
import tvshow from './components/tvshow';
import movie from './components/movie';
import settings from './components/settings';

import common from './components/common';
import config from './app.config';
import shared from './shared';

import 'angular-material/angular-material.min.css';
import './app.scss';

const appRun = (TranslateFactory, $localStorage) => {
  'use strict';
  if (!$localStorage.language) {
    TranslateFactory.setLang();
  }
};

export default angular
  .module('app', [
    ngMaterial,
    uiRouter,
    ngMessages,
    ngstorage.name,
    ngSanitize,
    angularLoadingBar,

    discover.name,
    tvshow.name,
    movie.name,
    settings.name,
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
