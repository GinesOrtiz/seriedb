class consoleController {
  constructor($rootScope, $timeout) {
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
  }

  $onInit() {
    this.logs = [];
    this.openConsole = false;
    this.$rootScope.$on('nerdModeLog', this.addToLogs.bind(this));
    this.logs.push([
      'Console logger started',
      +new Date()
    ]);

    this.$rootScope.$on('$stateChangeSuccess', (event, toState, toStateParams) => {
      this.enableConsoleInput = toState.name === 'seriedb.movie' && toStateParams.id === '10428';
    });
  }

  addToLogs(event, log) {
    this.$timeout(() => {
      this.logs.push([
        log,
        +new Date()
      ]);

      setTimeout(() => {
        let logTerminal = document.querySelector('.console-terminal md-list');
        logTerminal.scrollTop = logTerminal.scrollHeight;
      }, 50);
    });
  }

  consoleSend(event) {
    if (event.keyCode === 13) {
      this.$rootScope.$broadcast('requestInfo', this.consoleInput);
      delete this.consoleInput;
    }
  }
}

export default /*@ngInject*/ consoleController;