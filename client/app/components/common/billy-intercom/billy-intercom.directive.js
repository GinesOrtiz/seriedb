import template from './billy-intercom.content.html';
import {BillyIntercomController as controller} from './billy-intercom.controller';
import './billy-intercom.scss';

export const BillyIntercomDirective = () =>{
  return{
    restrict: 'E',
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true,
    scope: {},
    replace: true
  }
};
