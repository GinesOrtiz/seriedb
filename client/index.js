import angular from 'angular';
import app from './app';

angular.element(document)
  .ready(() => {
    'use strict';
    angular.bootstrap(document.body, [app.name]);
  });
