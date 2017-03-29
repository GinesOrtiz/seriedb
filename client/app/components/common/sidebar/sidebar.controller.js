class SideBarController {
  constructor(AuthService, UserService, LoginPopupService, $mdSidenav, $filter, $window, $state,
              $timeout) {
    this.smallSideBar = $window.innerWidth < 1440 && $window.innerWidth > 960;
    this.AuthService = AuthService;
    this.sidenav = $mdSidenav;
    this.isAuthUser = UserService.isAuth();
    this.LoginPopupService = LoginPopupService;
    this.$state = $state;
    this.$filter = $filter;
    this.user = UserService.getState();

    /**
     * This will trigger a window size change so we can force the sidebar to be small if the user
     * is resizing the window
     */
    let resizeTimeout;
    this.smallSideBar = $window.innerWidth > 959;
    $(window)
      .on('resize', ()=> {
        $timeout.cancel(resizeTimeout);
        resizeTimeout = $timeout(()=> {
          this.smallSideBar = $window.innerWidth > 959;
        }, 200);
      });
  }

  login() {
    this.LoginPopupService.setState({
      view: 'signin',
      open: true
    });
  }

}


SideBarController.$inject = [
  'AuthService',
  'UserService',
  'LoginPopupService',
  '$mdSidenav',
  '$filter',
  '$window',
  '$state',
  '$timeout'
];

export {SideBarController};
