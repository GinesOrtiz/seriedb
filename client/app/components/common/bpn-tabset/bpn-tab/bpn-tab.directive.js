import template from './bpn-tab.content.html';
import './bpn-tab.scss';

export default () => {
  'use strict';

  return {
    restrict: 'E',
    template,
    transclude: true,
    scope: {
      heading: '@'
    },
    require: '^bpnTabset',
    link: function (scope, elem, attr, tabsetCtrl) {
      scope.active = false;
      scope.eventName = attr.eventName;
      tabsetCtrl.addTab(scope);
    }
  };
};
