const LoginPopupService = ($rootScope) => {
  'use strict';

  const open = () => {
    $rootScope.$broadcast('$loginPopup', {openPopup: true});
  };

  const close = () => {
    $rootScope.$broadcast('$loginPopup', {openPopup: false});
  };

  const toggle = () => {
    $rootScope.$broadcast('$loginPopup');
  };

  const setState = (params) => {
    $rootScope.$broadcast('$loginPopup', params);
  };

  return {
    open,
    close,
    toggle,
    setState
  };
};

LoginPopupService.$inject = ['$rootScope'];

export {LoginPopupService};
