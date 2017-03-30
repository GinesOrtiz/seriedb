import template from './bpn-tabset.content.html';
import controller from './bpn-tabset.controller';
import './bpn-tabset.scss';

export default () => {
  'use strict';
  return {
    restrict: 'E',
    template,
    controller,
    controllerAs: 'tabset',
    bindToController: true,
    transclude: true,
    scope: {}
  };
};
