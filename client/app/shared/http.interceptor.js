const httpInterceptor = function (localStorage, BigLoaderService, $q, $injector, $log, $filter) {
  'use strict';
  return {
    'request': function (config) {
      let UserService = $injector.get('UserService');

      if (UserService.isAuth()) {
        config.headers.Authorization = UserService.getUserToken();
      }

      config.timeout = 30000;
      return config;
    },

    'requestError': function (rejection) {
      if (__DEV__) {
        $log.log('requestError', rejection);
      }
      return $q.reject(rejection);
    },

    'responseError': function (rejection) {
      let Notification = $injector.get('Notification');
      let UserService = $injector.get('UserService');
      BigLoaderService.setState('hide');

      function _displayMessage(msg, status) {
        let avoidStates = [];
        let $state = $injector.get('$state');

        if (status && avoidStates.indexOf($state.current.name) > -1) {
          return true;
        }
        if (__DEV__) {
          $log.warn(msg);
        }
        Notification.error(msg);
      }

      if (__DEV__) {
        console.log('rejection::', rejection);
      }

      // If we detect a 500 error (500, 501...)
      if (rejection.status >= 500) {
        let serverErrors = localStorage.getItem('serverErrors', true) || {total: 0};

        if (serverErrors.time < +new Date()) {
          localStorage.deleteItem('serverErrors', true);
          window.location.reload();
        }

        // If we have less than 5 errors we add a new one and update the time var
        if (serverErrors.total < 5) {
          localStorage.setItem('serverErrors', {
            time: +new Date().setMinutes(new Date(new Date().getMinutes() + 5)),
            total: serverErrors.total + 1
          });
        }
      }

      switch (rejection.status) {
        case 0:
          _displayMessage($filter('translate')('shared.rejection.connection'));
          break;
        case 401:
          // _displayMessage($filter('translate')('shared.api.rejection.unauthorized'));
          UserService.invalidateUser();
          break;
        case 403:
          _displayMessage($filter('translate')('shared.rejection.sourceNotAuth'));
          break;
        case 404:

          break;
        case 422:

          break;
        case 500:
          _displayMessage($filter('translate')('shared.rejection.error'));
          break;
        case 504:
          _displayMessage($filter('translate')('shared.rejection.timeout'));
          break;
        //case 409: fallbacks to default
        default:
          _displayMessage($filter('translate')('shared.rejection.errorUnexpected'),
            rejection.status);
          break;
      }
      return $q.reject(rejection);
    }
  };
};

export default /*@ngInject*/ httpInterceptor;
