import controller from './tvshow.controller';
import template from './tvshow.html';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    tvshow: '<'
  }
};