import {compareBoxController as controller} from './compare-box.controller';
import template from './compare-box.content.html';

export const compareBoxComponent = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    state: '<',
    config: '<?'
  }
};
