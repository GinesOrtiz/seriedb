import controller from './search.controller';
import template from './search.html';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    search: '<'
  }
}