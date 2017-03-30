import filtersComponentComponent from './filters-component.component';
import langES from './lang/es.json';
import langEN from './lang/en.json';


const filtersComponentRun = (translateService) => {
  'use strict';

  translateService.addLang('filters-component', {
    EN: langEN,
    ES: langES
  });
};

export default angular
  .module('billy.common.filters', [])
  .component('filtersComponent', filtersComponentComponent)
  .run(filtersComponentRun);
