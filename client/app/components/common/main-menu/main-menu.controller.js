import logo from './../../assets/logo_white.png';
import md5 from 'md5';


class BMMainMenu {
  constructor(LoginPopupService, AuthService, UserService, bmMixpanel, translateService,
              BigLoaderService, localStorage, BackgroundUpdateService, $timeout, $state, $mdSidenav,
              $rootScope) {
    this.LoginPopupService = LoginPopupService;
    this.AuthService = AuthService;
    this.BackgroundUpdateService = BackgroundUpdateService;
    this.UserService = UserService;
    this.bmMixpanel = bmMixpanel;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.localStorage = localStorage;
    this.$mdSidenav = $mdSidenav;
    this.$timeout = $timeout;
    this.BigLoaderService = BigLoaderService;
    this.logo = logo;
    this.user = UserService.getState();
    this.translateService = translateService;
    this.languagesAvailable = translateService.available;
    this.stateMode = localStorage.getItem('prCode', true) === '@pinkPower&' ? 'state-mode' : '';
    this.currencies = [
      'USD',
      'EUR'
    ];

    this.user.organization = this.user.organization || {};
    this.userName = this.user.organization.name || this.user.fullName;
    this.isAuth = UserService.isAuth();
    if (this.isAuth) {
      this.gravatar =
        'https://www.gravatar.com/avatar/' + md5(this.user.email.toLowerCase()) + '?d=' +
        decodeURI('http://cdn.billy.mobi/assets/imgs/default_avatar.png');
    }
  }

  clickLogo() {
    this.$state.go('billy.void');
  }

  openSideNav() {
    this.$mdSidenav('left')
      .toggle();
  }

  logout() {
    this.BackgroundUpdateService.update('logout');
    this.AuthService.logout();
  }

  openFAQ() {
    this.$rootScope.$broadcast('openFaqSidebar');
  }

  changeLang(language = 'EN') {
    this.bmMixpanel.track('Action - Top bar Button Clicked', {
      button: 'Language',
      selection: language
    });

    this.user.language = language;

    this.translateService.setLang(this.user.language);
    if (this.isAuth) {
      this.AuthService.updateUser(this.user);
    }
    else {
      this.BigLoaderService.setState('show');
      this.$timeout(() => {
        window.location.reload();
      });
    }
  }

  changeCurrency(currency = 'EUR') {
    this.bmMixpanel.track('Action - Top bar Button Clicked', {
      button: 'Currency',
      selection: currency
    });

    this.user.currency = currency;

    this.localStorage.setItem('currency', this.user.currency);
    if (this.isAuth) {
      this.AuthService.updateUser(this.user);
    }
    else {
      this.BigLoaderService.setState('show');
      this.$timeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  login() {
    this.LoginPopupService.setState({
      view: 'signup'
    });
  }

}

BMMainMenu.$inject = [
  'LoginPopupService',
  'AuthService',
  'UserService',
  'bmMixpanel',
  'translateService',
  'BigLoaderService',
  'localStorage',
  'BackgroundUpdateService',
  '$timeout',
  '$state',
  '$mdSidenav',
  '$rootScope'
];

export {BMMainMenu};
