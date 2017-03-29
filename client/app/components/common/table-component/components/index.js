import angular from 'angular';
import {paginationComponent} from './pagination/pagination.component';

export const bmTableComponents = angular
  .module('bmTable.components.pagination', [])
  .component('tablePaginationComponent', paginationComponent);
