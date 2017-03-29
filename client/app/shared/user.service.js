const UserService = (localStorage, translateService, $state, $injector) => {
  'use strict';
  let user = {
    language: localStorage.getItem('language', true) || translateService.standard,
    currency: localStorage.getItem('currency', true) || 'EUR'
  };
  const USER_TYPE = window.localStorage.USER_TYPE || 'publisher';

  /**
   * returns the user stored in Api service
   * @returns {{}}
   */
  const setState = (data) => {
    user = data;
    localStorage.saveUserTypeId(data.id, USER_TYPE);
  };

  /**
   * returns the user stored in Api service
   * @returns {{}}
   */
  const getState = () => {
    return user;
  };

  /**
   * Get all campaigns from user object
   * @returns {array} - user campaigns
   */
  const getUserCampaigns = () => {
    return user.campaigns.reduce(function (acc, actual) {
      acc.push(actual.id);
      return acc;
    }, []);
  };

  /**
   * Checks user's token in localStorage
   * @returns {boolean|*}
   */
  const isAuth = () => {
    return localStorage.isDefined(USER_TYPE + '-token');
  };

  /**
   * Returns user token
   * @returns {boolean|*}
   */
  const getUserToken = () => {
    return localStorage.getItem('token', true);
  };

  /**
   * Returns if the user has validated the email
   * @returns {boolean}
   */
  const isVerified = () => {
    return !!user.verifiedAt;
  };

  /**
   * Invalidates the user by cleaning localStorage and local variable. By default redirects to auth
   * @param goToAuth {true} used to force or not the reload of the state and sending to 'auth'
   */
  const invalidateUser = (goToAuth = true) => {
    user = {};
    localStorage.cleanAll();
    const bmMixpanel = $injector.get('bmMixpanel');
    bmMixpanel.async('reset')
      .then(() => {
        bmMixpanel.reset();
      });


    if ($state.current.name !== 'billy.marketplaceDetail' &&
      $state.current.name !== 'billy.auth' &&
      goToAuth) {
      window.location = '/auth';
    }
  };

  /**
   * Returns user role (Website/Affiliates)
   * @returns {*}
   */
  const getUserRole = () => {
    return user.type;
  };

  /**
   * Merge the user role config with marketpalce allowed variable and custom entry points from
   * user.access
   * @returns {array} - state names where the user can enter
   */
  const getUserRoleAccess = () => {
    let rolesConfig = {
      'User': [],
      'Anon': []
    };
    let userRoleConfig = rolesConfig[user.type || 'Anon'] || [];

    return userRoleConfig.concat(user.access || []);
  };

  return {
    setState,
    getState,
    getUserCampaigns,
    isAuth,
    getUserToken,
    isVerified,
    invalidateUser,
    getUserRole,
    getUserRoleAccess
  };
};

UserService.$inject = [
  'localStorage',
  'translateService',
  '$state',
  '$injector'
];

export {UserService};
