class emailActivationController {
  constructor(BigLoaderService, Notification, AuthService, UserService, $filter) {
    this.BigLoaderService = BigLoaderService;
    this.Notification = Notification;
    this.AuthService = AuthService;
    this.$filter = $filter;
    this.user = UserService.getState();
    this.emailIsNotVerified = !UserService.isVerified();
  }

  resend() {
    this.BigLoaderService.setState('show');
    this.AuthService.sendConfirmationEmail()
      .then(() => {
        this.BigLoaderService.setState('hide');
        this.Notification.success({
          message: this.$filter('translate')('messageBlock.email-activation.sentSuccess'),
          delay: 3000
        });
      })
      .catch(() => {
        this.BigLoaderService.setState('hide');
        this.Notification.error({
          message: this.$filter('translate')('messageBlock.email-activation.sentError'),
          delay: 3000
        });
      });
  }
}

export default emailActivationController;
