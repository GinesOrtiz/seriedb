export default /*@ngInject*/ ($stateProvider) => {
  'use strict';

  $stateProvider.state('billy.email-verification', {
    url: '/email-verification?hash&email',
    complexView: true,
    resolve: {
      verificateUser: function (Notification, AuthService, localStorage, $state, $stateParams) {
        if ($stateParams.email) {
          return AuthService.emailVerification({
            email: $stateParams.email,
            hash: $stateParams.hash
          })
            .then((res) => {
              localStorage.setItem('token', res.data.hash);
              Notification.success({
                message: 'Email verification successful!',
                delay: 3000
              });
              AuthService.whoami()
                .then(() => {
                  $state.go('billy.myCampaigns');
                });
              return false;
            }, () => {
              $state.go('billy.auth');
              Notification.error({
                message: 'Error while verifying your email. Try resending it again.',
                delay: 3000
              });
              return false;
            });
        }
      }
    },
    data: {
      permissions: {
        except: ['Anon'],
        redirectTo: {
          default: 'billy.void'
        }
      }
    },
    controller: ($stateParams, $state) => {
      if (!$stateParams.email) {
        $state.go('billy.void');
      }
    }
  });
};
