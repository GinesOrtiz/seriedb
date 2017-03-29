const signRouter = ($stateProvider) => {
  'use strict';
  $stateProvider
    .state('billy.auth.signin', {
      url: '/auth',
      auth: false,
      template: '<auth-sign></auth-sign>'
    });
};

signRouter.$inject = ['$stateProvider'];

export {signRouter};
