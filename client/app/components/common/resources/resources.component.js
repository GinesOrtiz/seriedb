import controller from './resources.controller';
import template from './resources.html';

import './resources.scss';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    mid: '<'
  }
};