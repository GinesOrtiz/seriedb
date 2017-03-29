import angular from 'angular';
import {compareBoxComponent} from './compare-box.component';
import {CompareBoxService} from './compare-box.service';

import './compare-box.scss';

/**
 * State:
 * {
        title: String,
        content: Number,
        tooltip: String,
        subcontent: Number
      }
 * @type {any}
 */
export const compareBox = angular
  .module('billy.common.compareBox', [])
  .factory('CompareBoxService', CompareBoxService)
  .component('compareBox', compareBoxComponent);
