import angular from 'angular';
import {bmTableComponent} from './bm-table.component';
import {tableElements} from './elements';
import langES from './lang/es.json';
import langEN from './lang/en.json';

import {bmTableComponents} from './components';

import './bm-table.scss';

export const bmTable = angular
  .module('commonComponents.bmTableComponent', [
    tableElements.name,
    bmTableComponents.name
  ])
  .component('bmTable', bmTableComponent)
  .run((translateService) => {
    'use strict';

    translateService.addLang('tableComponent', {
      EN: langEN,
      ES: langES
    });
  });
