import controller from './pixels.controller';

export default angular
  .module('commonComponents.pixels', [])
  .component('pixels', {
    controller,
    controllerAs: 'vm'
  });
