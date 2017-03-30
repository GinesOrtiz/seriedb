import controller from './bm-table.controller';
import template from './bm-table.html';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    columns: '<',
    data: '<content',
    filters: '<?',
    totals: '<?',
    resource: '@?',
    asyncLoad: '@?',
    chunk: '@?',
    pagination: '<?',
    totalRows: '<?',
    page: '<?',
    rpp: '@?',
    customEvent: '@?',
    requestingContent: '<'
  }
};
