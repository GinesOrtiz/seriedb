import angular from 'angular';
import app from './app';

Object.assign = require('object-assign');

angular.element(document)
  .ready(() => {
    'use strict';
    angular.bootstrap(document.body, [app.name]);
  });
