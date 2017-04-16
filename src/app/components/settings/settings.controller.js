class settingsController {
  constructor(TranslateFactory, $localStorage, $rootScope) {
    this.TranslateFactory = TranslateFactory;
    this.$localStorage = $localStorage;
    this.$rootScope = $rootScope;
  }

  $onInit() {
    this.nerdMode = this.$localStorage.nerdMode;
    this.customSocket = this.$localStorage.socketURL;
    this.socketURL = !!this.$localStorage.socketURL;
    this.language = this.$localStorage.language || 'en';
    this.languagesAvailable = this.TranslateFactory.available;
  }

  changeNerdMode() {
    this.nerdMode = !this.nerdMode;
    this.$localStorage.nerdMode = this.nerdMode;
    this.$rootScope.$broadcast('nerdMode', this.nerdMode);
  }

  enableCustomSocket() {
    this.socketURL = !this.socketURL;
    this.$localStorage.socketURL = this.customSocket;

    if (!this.socketURL) {
      delete this.$localStorage.socketURL;
      setTimeout(() => {
        window.location.reload();
      }, 250);
    }
  }

  saveSocket() {
    this.$localStorage.socketURL = this.customSocket;
    setTimeout(() => {
      window.location.reload();
    }, 250);
  }

  changeLanguage() {
    this.TranslateFactory.setLang(this.language);
  }
}

export default /*@ngInject*/ settingsController;