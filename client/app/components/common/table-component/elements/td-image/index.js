import template from './template.html';

export default {
  template,
  controllerAs: 'vm',
  bindings: {
    row: '<',
    element: '<'
  }
};
