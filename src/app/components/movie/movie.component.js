import controller from './movie.controller';
import template from './movie.html';

export default {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    movie: '<'
  }
};