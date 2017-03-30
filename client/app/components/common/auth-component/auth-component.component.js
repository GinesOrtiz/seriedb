import template from './auth-component.html';
import controller from './auth-component.controller';

export default {
  controller,
  template,
  controllerAs: 'vm',
  bindings: {
    view: '@',
    disableInfo: '<',
    disableSignup: '<'
  }
};
