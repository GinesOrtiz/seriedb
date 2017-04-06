class accountManagerController {
  constructor(IntercomService, UserService) {
    this.IntercomService = IntercomService;
    this.user = UserService.getState();
    this.accm = this.user ? this.user.accountManager : null;

    this.default = {
      fullName: 'Your Account Manager',
      skypeId: 'enric.sabater'
    };
  }

  openIntercom() {
    this.IntercomService.run('show');
  }
}

export default /*@ngInject*/ accountManagerController;
