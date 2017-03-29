class SideBarController {
  constructor(UserService, LoginPopupService) {
    this.LoginPopupService = LoginPopupService;
    let isAuthUser = UserService.isAuth();

    let sidebarConfig = [
      // When not logged
      [
        {
          icon: 'extension',
          state: 'billy.auth.signin',
          label: 'sidebar.demo',
          isNew: true
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

    this.sidebarConfig = sidebarConfig[isAuthUser ? 1 : 0];
  }

  login() {
    this.LoginPopupService.setState({
      view: 'signin',
      open: true
    });
  }

}


SideBarController.$inject = [
  'UserService',
  'LoginPopupService'
];

export {SideBarController};
