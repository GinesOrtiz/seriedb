
import compareBoxComponent from './compare-box.component';
import CompareBoxService from './compare-box.service';

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
export default angular
  .module('billy.common.compareBox', [])
  .factory('CompareBoxService', CompareBoxService)
  .component('compareBox', compareBoxComponent);
