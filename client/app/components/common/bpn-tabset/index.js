import angular from 'angular';
import {BPNTabsetDirective} from './bpn-tabset.directive.js';

export const BPNTabset = angular.module('commonComponents.BPNTabSet', [])
  .directive('bpnTabset', BPNTabsetDirective);
