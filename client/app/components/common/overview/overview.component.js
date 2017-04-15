import controller from './overview.controller';
import template from './overview.html';

import './overview.scss';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {info: '<'}
};