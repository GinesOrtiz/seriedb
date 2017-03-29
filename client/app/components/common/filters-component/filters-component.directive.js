import {FiltersComponentController as controller} from './filters-component.controller';
import template from './filters-component.content.html';
import './filter-component.scss';

export const FiltersComponentDirective = () => {
  'use strict';

  return {
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      submit: '&',
      fields: '=',
      model: '=',
      defaultModel: '=?',
      hideButton: '=?',
      forceOpen: '=?',
      column: '=?'
    },
    replace: true
  };
};
