
import dynamicFormComponent from './dynamic-form.component';
import elements from './elements';

const dynamicFormRun = ($templateCache) => {
  'use strict';
  $templateCache.put('invalidElement', '[invalid element]');
  Object.keys(elements)
    .forEach((element) => {
      $templateCache.put(element, elements[element]);
    });
};

export default angular
  .module('billy.common.dynamicForm', [])
  .component('dynamicForm', dynamicFormComponent)
  .run(dynamicFormRun);
