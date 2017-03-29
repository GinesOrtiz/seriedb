import template from './template.html';
import {controller} from './controller';

export const tdHtml = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    row: '<',
    element: '<'
  }
};
