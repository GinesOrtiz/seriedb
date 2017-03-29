import {pixelsController as controller} from './pixels.controller';

export const pixelsComponent = angular
  .module('commonComponents.pixels', [])
  .component('pixels', {
    controller,
    controllerAs: 'vm'
  });
