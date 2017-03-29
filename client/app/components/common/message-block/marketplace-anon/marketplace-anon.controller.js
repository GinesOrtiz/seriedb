class marketplaceAnonController {
  constructor(LoginPopupService, bmMixpanel) {
    this.LoginPopupService = LoginPopupService;
    this.bmMixpanel = bmMixpanel;
  }

  trackEvent(event) {
    this.bmMixpanel.track('Click - Anonymous Block ' + event);
  }

  openLoginPopup() {
    this.trackEvent('Login');
    this.LoginPopupService.open();
  }

  openSignupPopup() {
    this.trackEvent('Login');
    this.LoginPopupService.setState({
      view: 'signup'
    });
  }

}

marketplaceAnonController.$inject = [
  'LoginPopupService',
  'bmMixpanel'
];

export {marketplaceAnonController};
