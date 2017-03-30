import controller from './compare-box.controller';
import template from './compare-box.content.html';

export default {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    state: '<',
    config: '<?'
  }
};
