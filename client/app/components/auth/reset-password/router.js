export default ($stateProvider) => {
  'use strict';

  $stateProvider.state('billy.auth.reset', {
    url: '/auth/reset-password?hash&email&userType',
    auth: false,
    template: '<auth-reset-password></auth-reset-password>'
  });
};
