/* globals __PROJECT_NAME__ */
class searchBarController {
  constructor($rootScope, $location, $state, $scope) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$state = $state;
    this.$scope = $scope;
  }

  $onInit() {
    this.brand = __PROJECT_NAME__;
    this.query = this.$location.search().query;
    this.searchText = this.$location.search().query;
    this.$scope.$on('$stateChangeSuccess', (event, toState) => {
      this.searchText = toState.name === 'seriedb.search' ? this.$location.search().query : '';
    });
  }

  search() {
    this.$state.go('seriedb.search', {
      query: this.searchText
    });
  }
}

export default /*@ngInject*/ searchBarController;