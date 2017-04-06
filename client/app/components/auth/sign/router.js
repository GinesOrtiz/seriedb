export default /*@ngInject*/ ($stateProvider) => {
  'use strict';
  $stateProvider
    .state('billy.auth.signin', {
      url: '/auth',
      auth: false,
      template: '<auth-sign></auth-sign>'
    });
};
