class LoginPopupController {
  constructor(bmMixpanel, $scope) {

    this.bmMixpanel = bmMixpanel;
    this.view = 'signin';

    this.openPopup = this.openPopup ? this.openPopup : false;
    this.signup = this.signup ? this.signup : false;

    $scope.$on('changeView', (event, view) => {
      this.view = view;
    });

    $scope.$on('$loginPopup', (evt, params) => {
      this.view = params.view || 'signin';
      this.openPopup = typeof params.openPopup !== 'undefined' ? params.openPopup : true;

      let popupOpened = this.openPopup ? 'Opened' : 'Closed';
      this.bmMixpanel.track('Event - ' + popupOpened + ' Popup');

      if (typeof params.signup !== 'undefined') {
        this.signup = params.signup;
      }

    });
  }
}

export default LoginPopupController;
