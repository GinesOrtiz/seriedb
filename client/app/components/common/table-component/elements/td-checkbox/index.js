import template from './template.html';
import {controller} from './controller';

export const tdCheckbox = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    row: '<',
    element: '<'
  }
};
