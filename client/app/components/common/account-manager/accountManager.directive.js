import template from './accountManager.content.html';
import {AccountManagerController as controller} from './accountManager.controller';
import './accountManager.scss';

export const AccountManagerDirective = () => {
  'use strict';
  return {
    restrict: 'E',
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true,
    scope: {},
    replace: true
  };
};
