class BigLoaderController {

  constructor($scope, $filter) {
    this.$scope = $scope;
    this.BigLoaderService = {
      visible: true,
      message: $filter('translate')('shared.loading')
    };
    this.previous = {};

    this.$scope.$on('$bigLoading', (event, options) => {
      this.BigLoaderService.message = options.message || $filter('translate')('shared.loading');
      switch (options.state) {
        case 'show':
          this.previous = options;
          this.BigLoaderService.visible = true;
          this.BigLoaderService.percent = 0;
          break;
        case 'update':
          this.BigLoaderService.percent = options.percent || 0;
          this.BigLoaderService.message = options.message || this.previous.message;
          break;
        case 'hide':
          this.previous = {};
          this.BigLoaderService.visible = false;
          break;
      }
    });
  }
}

BigLoaderController.$inject = ['$scope', '$filter'];

export {BigLoaderController};
