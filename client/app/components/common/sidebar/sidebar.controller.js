class sideBarController {
  constructor(UserService, LoginPopupService, $state, $scope) {
    this.LoginPopupService = LoginPopupService;
    this.isAuthUser = UserService.isAuth();
    this.$state = $state;
    this.$scope = $scope;
  }

  $onInit() {
    let sidebarConfig = [
      // When not logged
      [
        {
          icon: 'account_circle',
          state: 'billy.void',
          label: 'sidebar.demo',
          action: () => {
            this.LoginPopupService.setState({
              view: 'signin',
              open: true
            });
          }
        }
      ],
      // When logged
      [
        {
          icon: 'extension',
          state: 'billy.auth.signin',
          label: 'sidebar.demo',
          isNew: true
        },
        {
          icon: 'https',
          state: 'billy.auth.signin',
          label: 'sidebar.demo'
        },
        {
          icon: 'work',
          state: 'billy.auth.signin',
          label: 'sidebar.demo'
        }
      ]
    ];

    this.sidebarConfig = sidebarConfig[this.isAuthUser ? 1 : 0];
    this.active = this.$state.current.name;

    this.$scope.$on('$stateChangeSuccess', () => {
      this.active = this.$state.current.name;
    });
  };

  state(menu) {
    if (menu.action) {
      menu.action();
    }
    else {
      $state.go(menu.state);
    }
  }

}

export default sideBarController;
