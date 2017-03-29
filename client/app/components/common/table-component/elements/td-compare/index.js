import template from './template.html';
import {controller} from './controller';

export const tdCompare= {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    row: '<',
    element: '<'
  }
};
