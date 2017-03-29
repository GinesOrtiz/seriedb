import {listsSelectorController as controller} from './listsSelector.controller';
import template from './listsSelector.html';

import './listsSelector.scss';

export const listsSelectorComponent = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    lists: '<',
    initialModel: '<',
    config: '<?',
    addList: '&',
    selectElement: '&',
    removeList: '&',
  }
};


