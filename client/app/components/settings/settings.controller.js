class settingsController {
  constructor($localStorage, $rootScope) {
    this.$localStorage = $localStorage;
    this.$rootScope = $rootScope;
  }

  $onInit() {
    this.nerdMode = this.$localStorage.nerdMode;
  }

  changeNerdMode() {
    this.nerdMode = !this.nerdMode;
    this.$localStorage.nerdMode = this.nerdMode;
    this.$rootScope.$broadcast('nerdMode', this.nerdMode);
  }
}

export default /*@ngInject*/ settingsController;