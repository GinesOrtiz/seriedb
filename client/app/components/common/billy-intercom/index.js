import angular from 'angular';
import {BillyIntercomDirective} from './billy-intercom.directive';
import langEN from './lang/en.json';
import langES from './lang/es.json';
import {FaqService} from './faq.service';

export const billyIntercom = angular.module('commonComponents.billyIntercom', [])
  .directive('billyIntercom', BillyIntercomDirective)
  .run((translateService) => {
    translateService.addLang('intercom', {EN: langEN, ES: langES});
  })
  .factory('FaqService', FaqService);
