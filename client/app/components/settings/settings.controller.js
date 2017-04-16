class settingsController {
  constructor($localStorage, $rootScope) {
    this.$localStorage = $localStorage;
    this.$rootScope = $rootScope;
  }

  $onInit() {
    this.nerdMode = this.$localStorage.nerdMode;
    this.customSocket = this.$localStorage.socketURL;
    this.socketURL = !!this.$localStorage.socketURL;
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
}

export default /*@ngInject*/ settingsController;