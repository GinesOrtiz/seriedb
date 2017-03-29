import template from './template.html';
import {controller} from './controller';

export const tdImage = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    row: '<',
    element: '<'
  }
};
