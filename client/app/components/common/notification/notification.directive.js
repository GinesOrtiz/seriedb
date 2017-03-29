import template from './notification.content.html';

export const notificationDirective = () => {
  return {
    template,
    controller: ['$scope', function ($scope) {
      $scope.isAuth = false;
      $scope.$on('$stateChangeSuccess', (event, toState) => {
        $scope.isAuth = toState.auth || toState.complexView;
      });
    }],
    restrict: 'E',
    replace: true
  };
};
