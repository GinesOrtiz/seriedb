class notificationController {
  constructor($scope) {
    this.isAuth = false;
    $scope.$on('$stateChangeSuccess', (event, toState) => {
      this.isAuth = toState.auth || toState.complexView;
    });
  }
}

export default /*@ngInject*/ notificationController;
