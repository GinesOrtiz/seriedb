class LoginPopupController {
  constructor(bmMixpanel, AuthService, BigLoaderService, BackgroundUpdateService, Notification,
              translateService, localStorage, $filter, $analytics, $state, $scope) {
    this.AuthService = AuthService;
    this.BackgroundUpdateService = BackgroundUpdateService;
    this.BigLoaderService = BigLoaderService;
    this.Notification = Notification;
    this.translateService = translateService;
    this.$filter = $filter;
    this.localStorage = localStorage;
    this.$analytics = $analytics;
    this.$state = $state;
    this.bmMixpanel = bmMixpanel;
    this.view = 'signin';
    this.origin = !!this.localStorage.getItem('origin', true);

    this.openPopup = this.openPopup ? this.openPopup : false;
    this.signup = this.signup ? this.signup : false;

    $scope.$on('changeView', (event, view)=> {
      this.view = view;
    });

    $scope.$on('$loginPopup', (evt, params)=> {
      this.view = params.view || 'signin';
      this.openPopup = true;

      let popupOpened = this.openPopup ? 'Opened' : 'Closed';
      this.bmMixpanel.track('Event - ' + popupOpened + ' Popup');

      if (typeof params.signup !== 'undefined') {
        this.signup = params.signup;
      }

    });
  }


}

LoginPopupController.$inject = [
  'bmMixpanel',
  'AuthService',
  'BigLoaderService',
  'BackgroundUpdateService',
  'Notification',
  'translateService',
  'localStorage',
  '$filter',
  '$analytics',
  '$state',
  '$scope'
];

export {LoginPopupController};
