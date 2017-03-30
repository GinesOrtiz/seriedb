import controller from './filters-component.controller';
import template from './filters-component.content.html';
import './filter-component.scss';

export default {
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    submit: '&',
    fields: '=',
    model: '=',
    defaultModel: '=?',
    hideButton: '=?',
    forceOpen: '=?',
    column: '=?'
  },
};
