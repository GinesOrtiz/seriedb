import AuthService from './auth.service';
import signRouter from './sign/router';
import resetPasswordRouter from './reset-password/router';
import rememberPasswordRouter from './remember-password/router';
import emailVerificationRouter from './email-verification/router';

const authRun = (PermRoleStore, AuthService, $urlRouter) => {
  'use strict';
  AuthService.whoami()
    .then((user) => {

      PermRoleStore
        .defineRole('Anon', [
          'UserService',
          (UserService) => {
            return !UserService.isAuth();
          }
        ]);

      PermRoleStore
        .defineRole('User', [
          'UserService',
          (UserService) => {
            return !UserService.isAuth();
          }
        ]);

      $urlRouter.sync();
      $urlRouter.listen();
    });
};

const authConfig = ($stateProvider) => {
  'use strict';

  $stateProvider
    .state('billy.auth', {
      abstract: true,
      template: '<div ui-view></div>',
      resolve: {
        loadModule: ($q, $ocLazyLoad) => {
          return $q((resolve) => {
            require.ensure([], () => {
              let module = require('./module');
              $ocLazyLoad.load({name: module.name});
              resolve();
            });
          });
        }
      },
      data: {
        permissions: {
          only: ['Anon'],
          redirectTo: {
            default: 'billy.void'
          }
        }
      }
    });
};

export default angular
  .module('billy.auth', [])
  .factory('AuthService', AuthService)
  .run(authRun)
  .config(authConfig)
  .config(signRouter)
  .config(resetPasswordRouter)
  .config(rememberPasswordRouter)
  .config(emailVerificationRouter);
