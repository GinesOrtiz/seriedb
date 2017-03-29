import template from './template.html';
import {controller} from './controller';

export const tdIcon = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    row: '<',
    element: '<'
  }
};
