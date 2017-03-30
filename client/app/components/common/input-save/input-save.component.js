import controller from './input-save.controller';
import template from './input-save.html';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    model: '@',
    value: '=',
    onSuccess: '=?',
    onError: '=?',
    configExtra: '@',
    action: '@',
    onClick: '=?'
  }
};
