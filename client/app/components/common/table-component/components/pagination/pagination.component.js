import {paginationController as controller} from './pagination.controller';
import template from './pagination.html';

export const paginationComponent = {
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
