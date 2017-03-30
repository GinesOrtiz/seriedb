import controller from './dynamic-form.controller';
import template from './dynamic-form.html';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    model: '=',
    fields: '=',
    options: '='
  }
};
