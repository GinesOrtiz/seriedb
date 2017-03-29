import angular from 'angular';
import {BPNTabDirective} from './bpn-tab.directive.js';

export const BPNTab = angular.module('app.directive.BPNTab', [])
  .directive('bpnTab', BPNTabDirective);
