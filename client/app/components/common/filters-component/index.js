import {FiltersComponentDirective} from './filters-component.directive';
import langES from './lang/es.json';
import langEN from './lang/en.json';
import angular from 'angular';

export const FiltersComponent = angular.module('commonComponents.filters', [])
  .directive('filtersComponent', FiltersComponentDirective)
  .config(() => {
  })
  .run((translateService) => {
    'use strict';

    translateService.addLang('filters-component', {
      EN: langEN,
      ES: langES
    });
  });
