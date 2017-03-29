import template from './big-loader.content.html';
import {BigLoaderController as controller} from './big-loader.controller';

export const bigLoaderDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true
  };
};
