import './main-menu.scss';
import template from './main-menu.html';
import {BMMainMenu as controller} from './main-menu.controller';

export const mainMenuDirective = () => {
  'use strict';

  return {
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {},
    replace: true
  };
};
