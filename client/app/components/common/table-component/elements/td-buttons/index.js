import template from './template.html';
import {controller} from './controller';

export const tdButtons = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    row: '<',
    element: '<'
  }
};
