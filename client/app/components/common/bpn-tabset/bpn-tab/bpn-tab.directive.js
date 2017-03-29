import template from './bpn-tab.content.html';
import {BPNTabController as controller} from './bpn-tab.controller.js';
import './bpn-tab.scss';

export const BPNTabDirective = () =>{
  'use strict';

  return{
    restrict: 'E',
    template,
    controller,
    transclude: true,
    scope: {
      heading: '@'
    },
    require: '^bpnTabset',
    link: function(scope, elem, attr, tabsetCtrl) {
      scope.active = false;
      scope.eventName = attr.eventName;
      tabsetCtrl.addTab(scope);
    }
  };
};
