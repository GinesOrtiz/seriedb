import template from './template.html';
import {controller} from './controller';

export const tdMarketplaceName = {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    row: '<',
    element: '<'
  }
};
