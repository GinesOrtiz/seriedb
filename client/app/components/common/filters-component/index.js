import {filtersComponentComponent} from './filters-component.component';
import langES from './lang/es.json';
import langEN from './lang/en.json';
import angular from 'angular';

const filtersComponentRun = (translateService) => {
  'use strict';

  translateService.addLang('filters-component', {
    EN: langEN,
    ES: langES
  });
};

export const filtersComponent = angular
  .module('billy.common.filters', [])
  .component('filtersComponent', filtersComponentComponent)
  .run(filtersComponentRun);
