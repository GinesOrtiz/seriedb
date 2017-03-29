class appController {
  constructor(BackgroundUpdateService, UserService, $state, $mdSidenav, $mdComponentRegistry,
              BigLoaderService, $location, $scope, $rootScope, $filter) {
    this.$scope = $scope;
    this.$state = $state;
    this.$location = $location;
    this.sidenav = $mdSidenav;
    this.$mdComponentRegistry = $mdComponentRegistry;
    this.isSecuredView = false;
    this.BigLoaderService = BigLoaderService;
    this.UserService = UserService;
    this.$rootScope = $rootScope;
    this.$filter = $filter;

    BackgroundUpdateService.initListener();

    /**
     * On state change success we decide: which template to show and whether sending an intercom
     * update or not
     */
    this.$scope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
      if (fromState.abstract) {
        this.routeLogic(fromState, toState, event);
      }
      this.isSecuredView = toState.auth || toState.complexView;
      this.BigLoaderService.setState('hide');
      document.getElementsByTagName('body')[0].setAttribute('id', toState.name.replace(/\./g, '-'));

      this.getTitleFromState(toState);
    });

    this.$rootScope.$on('$viewContentLoaded', () => {
      this.appShellRemover();
    });

    this.$scope.$on('$stateChangeStart', (e, toState, toParams, fromState) => {
      if (fromState.name !== toState.name) {
        $location.$$search = {};
      }
      this.routeLogic(fromState, toState, e);
    });
  }

  /**
   * Executed when a state change occurs
   * @param fromState
   * @param toState
   */
  routeLogic(fromState, toState) {
    if (this.$mdComponentRegistry.get('left')) {
      this.sidenav('left')
        .close();
    }
    this.isAuthUser = this.UserService.isAuth();
    this.BigLoaderService.setState('show');
    if (fromState.abstract) {
      this.isSecuredView = toState.auth || toState.complexView;
    }
  }

  /**
   * Updates tab title text depending on current state
   * @param state
   */
  getTitleFromState(state) {
    let name = state.name.replace('billy.', '');
    let isTab = !!this.$location.search().tab;
    let avoidStates = [];
    let title = 'Billy Panel';
    let stateMatching = {};
    let tabsMatching = {};
    let stateExists = Object.keys(stateMatching)
        .indexOf(name) >= 0;

    if (avoidStates.indexOf(name) < 0 && stateExists) {
      title = this.$filter('translate')(stateMatching[name]) + ' - ' + title;
      if (isTab) {
        let tabName = this.$location.search().tab;
        title = this.$filter('translate')(tabsMatching[name][tabName]) + ' - ' + title;
      }

      document.querySelector('title').innerText = title;
    }
    else {
      // Custom cases
      switch (name) {
        default:
          break;
      }
    }

  }

  /**
   * Checks render status to remove appShell
   */
  appShellRemover() {
    let appShell = document.querySelector('appShell');
    if (appShell) {
      let timer;
      let backup = setTimeout(() => {
        appShell.classList.add('remove');
        setTimeout(() => {
          // Once the effect is finish (.2s) remove the appShell from DOM
          appShell.remove();
        }, 200);
      }, 500);

      // Waits until the source view (the second ui-view) finish loading elements
      if (document.querySelectorAll('ui-view')[1]) {
        document.querySelectorAll('ui-view')[1].addEventListener('DOMNodeInserted', () => {
          clearTimeout(timer);
          clearTimeout(backup);
          timer = setTimeout(() => {
            // Add class to appShell for a faceOut effect
            appShell.classList.add('remove');
            setTimeout(() => {
              // Once the effect is finish (.2s) remove the appShell from DOM
              appShell.remove();
            }, 200);
          }, 300);
        }, false);
      }
    }
  }
}

appController.$inject = [
  'BackgroundUpdateService',
  'UserService',
  '$state',
  '$mdSidenav',
  '$mdComponentRegistry',
  'BigLoaderService',
  '$location',
  '$scope',
  '$rootScope',
  '$filter'
];

export {appController};
