/* globals __PROJECT_NAME__ */
class searchBarController {
  constructor($location, $state, $scope) {
    this.$location = $location;
    this.$state = $state;
    this.$scope = $scope;
  }

  $onInit() {
    this.brand = __PROJECT_NAME__;
    this.query = this.$location.search().query;
    this.$scope.$on('$stateChangeSuccess', (event, toState) => {

      if (toState.name !== 'seriedb.search') {
        this.searchText = '';
      }

    });
  }

  search() {
    this.$state.go('seriedb.search', {
      query: this.searchText
    });
  }
}

export default /*@ngInject*/ searchBarController;