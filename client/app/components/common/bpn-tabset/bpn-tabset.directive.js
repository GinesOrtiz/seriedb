import template from './bpn-tabset.content.html';
import {BPNTabsetController as controller} from './bpn-tabset.controller';
import './bpn-tabset.scss';

export const BPNTabsetDirective = () =>{
  return{
    restrict: 'E',
    template,
    controller,
    controllerAs: 'tabset',
    bindToController: true,
    transclude: true,
    scope: {}
  }
};
