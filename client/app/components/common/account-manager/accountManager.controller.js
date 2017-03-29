class accountManagerController {
  constructor(IntercomService, UserService, $window, $timeout) {
    this.IntercomService = IntercomService;
    this.user = UserService.getState();
    this.accm = this.user ? this.user.accountManager : null;

    this.default = {
      fullName: 'Your Account Manager',
      skypeId: 'enric.sabater'
    };

    let resizeTimeout;
    this.showTooltip = $window.innerWidth > 959;

    $(window)
      .on('resize', () => {
        $timeout.cancel(resizeTimeout);
        resizeTimeout = $timeout(() => {
          this.showTooltip = $window.innerWidth > 959;
        }, 200);
      });
  }

  openIntercom() {
    this.IntercomService.run('show');
  }
}

accountManagerController.$inject = [
  'IntercomService',
  'UserService',
  '$window',
  '$timeout'
];

export {accountManagerController};
