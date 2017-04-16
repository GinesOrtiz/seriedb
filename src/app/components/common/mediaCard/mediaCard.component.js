import controller from './mediaCard.controller';
import template from './mediaCard.html';

import './mediaCard.scss';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    info: '<'
  }
};