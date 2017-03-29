import template from './auth-component.html';
import {authComponentController as controller} from './auth-component.controller';

export const authComponent = {
  controller,
  template,
  controllerAs: 'vm',
  bindings: {
    view: '@',
    disableInfo: '<',
    disableSignup: '<'
  }
};
