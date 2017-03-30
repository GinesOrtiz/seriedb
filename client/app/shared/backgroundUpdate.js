const BackgroundUpdateService = ($localStorage, $rootScope, $injector, $timeout) => {
  'use strict';
  const initListener = () => {
    $rootScope.$watch(() => {
      return $localStorage.backgroundUpdate;
    }, (updateInfo) => {
      if ((updateInfo && updateInfo.name !== window.name) || (updateInfo && updateInfo.force)) {
        const AuthService = $injector.get('AuthService');
        delete $localStorage.backgroundUpdate;
        switch (updateInfo.action) {
          case 'updateUser':
            AuthService.whoami(true);
            break;
          case 'reloadTabs':
            window.location.reload();
            break;
          case 'logout':
            window.location = '/auth';
            break;
        }
      }
      //force deletion when no one is listening
      $timeout(() => {
        delete $localStorage.backgroundUpdate;
      }, 1000);
    });
  };

  const update = (action, extra = {}, force = false) => {
    $localStorage.backgroundUpdate = {
      name: window.name,
      time: +new Date(),
      action,
      extra,
      force
    };
  };

  return {
    initListener,
    update
  };
};

export default BackgroundUpdateService;
