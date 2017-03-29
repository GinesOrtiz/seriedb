const voidViewRouter = ($stateProvider) => {
  'use strict';

  $stateProvider
    .state('billy.void', {
      url: '/void',
      auth: true,
      template: '<void-component></void-component>'
    });
};
voidViewRouter.$inject = ['$stateProvider'];

export {voidViewRouter};
