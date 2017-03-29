import angular from 'angular';
import {BPNTabsetDirective} from './bpn-tabset.directive.js';

export const BPNTabset = angular
  .module('billy.common.BPNTabSet', [])
  .directive('bpnTabset', BPNTabsetDirective);
