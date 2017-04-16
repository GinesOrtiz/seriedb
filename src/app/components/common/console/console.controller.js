class consoleController {
  constructor($scope, $timeout) {
    this.$scope = $scope;
    this.$timeout = $timeout;
  }

  $onInit() {
    this.logs = [];
    this.openConsole = false;
    this.$scope.$on('nerdModeLog', this.addToLogs.bind(this));
    this.logs.push([
      'Console logger started',
      +new Date()
    ]);
  }

  addToLogs(event, log) {
    this.$timeout(() => {
      this.logs.push([
        log,
        +new Date()
      ]);

      setTimeout(() => {
        let logTerminal = document.querySelector('.console-terminal');
        logTerminal.scrollTop = logTerminal.scrollHeight;
      }, 50);
    });
  }
}

export default /*@ngInject*/ consoleController;