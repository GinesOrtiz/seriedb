import {dynamicFormController as controller} from './dynamic-form.controller';
import template from './dynamic-form.html';

export const dynamicFormComponent = {
  controller,
  controllerAs: 'vm',
  template,
  bindings: {
    model: '=',
    fields: '=',
    options: '='
  }
};
