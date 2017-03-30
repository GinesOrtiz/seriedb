import controller from './pagination.controller';
import template from './pagination.html';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    rows: '=',
    page: '<',
    total: '<',
    pageChange: '&',
    rpp: '<?'
  }
};
