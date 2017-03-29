const rememberPasswordRouter = ($stateProvider) => {
  'use strict';

  $stateProvider.state('billy.auth.remember', {
    url: '/auth/remember',
    auth: false,
    template: '<auth-remember-password></auth-remember-password>'
  });
};

rememberPasswordRouter.$inject = ['$stateProvider'];

export {rememberPasswordRouter};
