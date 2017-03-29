/* globals __API_URL__ */

const AuthService = (translateService, localStorage, UserService,
                     bmMixpanel, IntercomService, BigLoaderService, WizardService, $filter,
                     $timeout, $window, Notification, $rootScope, $interval, $http, $q) => {
  'use strict';

  const USER_TYPE = window.localStorage.USER_TYPE || 'publisher';
  const API_URL = __API_URL__;
  let userAlreadyRequested = false;

  /**
   * Request the API for a token. If successful stores it in local storage.
   *
   * @param data:
   * @returns {*}
   */
  const login = (data) => {
    data.userType = USER_TYPE;

    return $http.post(`${API_URL}/auth/login`, data)
      .then(({data}) => {
        localStorage.setItem('token', data.hash);
      });
  };

  /**
   * Sends a signup request to the server. If successful, it logs in the user with the given token.
   *
   * @param data: user model
   * @returns {*}
   */
  const signup = (data) => {
    let dfd = $q.defer();
    data.confirmationPassword = data.password;
    data.publisherType = 'Affiliates';

    $http.post(`${API_URL}/auth/signup`, data)
      .then(({data}) => {
        localStorage.setItem('token', data.hash);
        bmMixpanel.track('Action - User Created');
        dfd.resolve();
      }, (err) => {
        dfd.reject(err);
      });

    return dfd.promise;
  };

  const setMixpanelSignup = data => {
    bmMixpanel.async('get_distinct_id')
      .then(() => {

        /*
         * When the user SIGN UP, we need to `alias` its actual mixpanel id with his email,
         * and `identify` him right away so we can avoid duplicated identifiers.
         * We do not need to call `identify` here, because `setMixpanelSignin` will be called
         * later
         * */
        bmMixpanel.alias(data.email);
        localStorage.deleteItem('distinct_id', true);
      });
  };

  /*
   login
   */
  const setMixpanelSignin = data => {
    bmMixpanel.async('get_distinct_id')
      .then(() => {
        /*
         * Because we already have this user in out Mixpanel database, we only need him
         * to be identified. Calling `alias` here will occur in a duplicated user.
         * */
        bmMixpanel.identify(data.email);
        localStorage.deleteItem('distinct_id', true);

        /*
         *
         * */
        bmMixpanel.setUser(data);

      });

  };

  /**
   * Depends on UserService to see if the user is already athenticated and returns its information.
   * @returns user info in object format
   */

  const requestUser = (isSignup = false) => {

    userAlreadyRequested = true;
    let url = `${API_URL}/me`;

    return $http.get(url)
      .then(({data}) => {
        /* globals intercomSettings */
        intercomSettings.email = data.email;
        /* jshint ignore:start */
        intercomSettings.user_id = data.hashId;
        /* jshint ignore:end */
        IntercomService.run('update', intercomSettings);

        if (isSignup) {
          setMixpanelSignup(data);
        }
        else {
          setMixpanelSignin(data);
        }

        let RavenChecker = setInterval(() => {
          if (typeof Raven !== 'undefined') {
            clearInterval(RavenChecker);

            Raven.setUserContext({
              email: data.email,
              id: data.id,
              name: data.fullName
            });

            Raven.setRelease(__VERSION__);
          }
        }, 20);

        UserService.setState(data);
        translateService.setLang(data.language);
        localStorage.setItem('currency', data.currency);
        delete data.token;

        return data;
      });
  };


  const whoami = (forceReload, isSignup) => {
    const usr = UserService.getState();

    if (!UserService.isAuth()) {
      // It has to be as a promise in order to resolve it in views
      let dfd = $q.defer();
      dfd.resolve({});
      return dfd.promise;
    }

    //user exists and dont want to reload
    if (!!usr.hashId && !forceReload) {
      let dfd = $q.defer();
      dfd.resolve(usr);
      return dfd.promise;
    }
    else {
      if (userAlreadyRequested && !forceReload) {
        let dfd = $q.defer();
        let checkForUser = $interval(() => {
          if (UserService.getState().hashId) {
            $interval.cancel(checkForUser);
            dfd.resolve(UserService.getState());
          }
        }, 100);
        return dfd.promise;
      }
      else {
        return requestUser(isSignup);
      }
    }

  };


  /**
   * Shuts down the current session
   * @returns {*}
   */
  const logout = () => {
    return $http.post(`${API_URL}/auth/logout`)
      .then(() => {

        UserService.invalidateUser(false);
        IntercomService.shutdown();
        bmMixpanel.async('reset')
          .then(() => {
            bmMixpanel.reset();
          });
        BigLoaderService.setState('show',
          {message: $filter('translate')('auth.loggingOut')});
        $timeout(() => {
          //$window.location.href = '/auth';
        }, 1000);
      });
  };

  //Reset password

  /**
   * Makes a request to the API requesting to reset the password after receiving the email with the
   * hash
   * @param data
   * @returns {*}
   */
  const resetPassword = (data) => {

    return $http.post(`${API_URL}/auth/reset-password`, data);
  };

  /**
   * Makes a request to the API requesting to change the password
   * @param data
   * @returns {*}
   */
  const changePassword = (data) => {

    return $http.post(`${API_URL}/auth/change-password`, data);
  };

  //Send confirmation email

  const sendConfirmationEmail = () => {
    return $http.post(`${API_URL}/auth/send-confirmation-email`);
  };

  //Reset password

  const rememberPassword = (credentials) => {
    credentials.userType = USER_TYPE;
    return $http.post(`${API_URL}/auth/send-reset-password-email`, credentials);
  };

  //Verificate email

  const emailVerification = (credentials) => {
    credentials.userType = USER_TYPE;
    return $http.post(`${API_URL}/auth/verify-email`, credentials);
  };

  const getUserTokenFromTopo = (hash, email) => {
    UserService.invalidateUser(false);
    BigLoaderService.setState('show');

    $http({
      method: 'GET',
      url: `${API_URL}/auth/view-as`,
      params: {
        userType: 'publisher',
        hash: hash,
        email: email
      }
    })
      .then((res) => {
        localStorage.setItem('token', res.data.hash);
        $timeout(() => {
          $window.location = '/dashboard';
        });
      });
  };

  return {
    login,
    signup,
    whoami,
    logout,
    resetPassword,
    changePassword,
    sendConfirmationEmail,
    rememberPassword,
    emailVerification,
    getUserTokenFromTopo,
    setMixpanelSignin,
    setMixpanelSignup
  };
};

AuthService.$inject = [
  'translateService',
  'localStorage',
  'UserService',
  'bmMixpanel',
  'IntercomService',
  'BigLoaderService',
  'WizardService',
  '$filter',
  '$timeout',
  '$window',
  'Notification',
  '$rootScope',
  '$interval',
  '$http',
  '$q'
];


export {AuthService};
