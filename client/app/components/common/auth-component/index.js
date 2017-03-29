import angular from 'angular';
import {authComponent} from './auth-component.component';
import langEN from './lang/en.json';
import langES from './lang/es.json';

import './auth-component.scss';

export const authBox = angular
  .module('commonComponents.authComponent', [])
  .component('authComponent', authComponent)
  .run((translateService) => {
    'use strict';
    translateService.addLang('authComponent', {
      EN: langEN,
      ES: langES
    });
  });
