import controller from './atomAppender.controller';
import template from './atomAppender.html';

import './atomAppender.scss';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    mid: '<'
  }
};