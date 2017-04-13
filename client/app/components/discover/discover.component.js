import controller from './discover.controller';
import template from './discover.html';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    movies: '<',
    tv: '<'
  }
}