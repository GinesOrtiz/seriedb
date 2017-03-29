import logo from './../../assets/logo_white.png';
import bg from './../../assets/bg.jpg';

class rememberPasswordController {
  constructor(AuthService, $timeout, $window, $log, Notification, $filter) {

    this.$timeout = $timeout;
    this.$window = $window;
    this.AuthService = AuthService;
    this.$log = $log;
    this.logo = logo;
    this.Notification = Notification;
    this.credits = {
      email: ''
    };
    this.$filter = $filter;
    this.emailSent = false;
    this.bg = bg;
    this.title = this.$filter('translate')('auth.passwordRemember.title');
    this.titleSuccess = this.$filter('translate')('auth.passwordRemember.titleSuccess');
    this.description = this.$filter('translate')('auth.passwordRemember.description');
    this.descriptionSuccess = this.$filter('translate')('auth.passwordRemember.descriptionSuccess');
    this.submit = this.$filter('translate')('shared.auth.submit');
    this.backTo = this.$filter('translate')('auth.passwordRemember.backTo');
    this.signIn = this.$filter('translate')('shared.auth.signIn');
    this.passwordRememberError = this.$filter('translate')('auth.passwordRemember.error');
  }

  send() {
    this.AuthService.rememberPassword(this.credits)
      .then(() => {
        this.emailSent = true;
      })
      .catch(() => {
        this.credits.email = '';
        this.Notification.error(this.passwordRememberError);
      });
  }
}
rememberPasswordController.$inject = [
  'AuthService',
  '$timeout',
  '$window',
  '$log',
  'Notification',
  '$filter'
];

export {rememberPasswordController};
