import angular from 'angular';
import {dynamicFormComponent} from './dynamic-form.component';
import {elements} from './elements';

export const dynamicForm = angular
  .module('commonComponents.dynamicForm', [])
  .component('dynamicForm', dynamicFormComponent)
  .run(($templateCache)=> {
    'use strict';
    $templateCache.put('invalidElement', '[invalid element]');
    Object.keys(elements)
      .forEach((element)=> {
        $templateCache.put(element, elements[element]);
      });
  });
