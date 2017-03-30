import controller from './listsSelector.controller';
import template from './listsSelector.html';

import './listsSelector.scss';

export default {
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


