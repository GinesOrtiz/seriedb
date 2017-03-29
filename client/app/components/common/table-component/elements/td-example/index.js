import template from './template.html';
import {controller} from './controller';

export const tdExample = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    row: '<',
    element: '<'
  }
};
