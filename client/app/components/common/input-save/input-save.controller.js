class inputSaveController {
  constructor($injector, Notification, $filter) {
    this.Notification = Notification;
    this.factory = $injector.get(this.action.split('.')[0]);
    this.factoryAction = this.action.split('.')[1];
    this.extraParams = this.configExtra ? JSON.parse(this.configExtra.replace(/'/g, '"')) : {};
    this.$filter = $filter;
    this.editState = 0;
    this.originalValue = angular.copy(this.value);
    this.onSuccess = this.onSuccess ? this.onSuccess : this.defaultSuccess;
    this.onError = this.onError ? this.onError : this.defaultError;
  }

  onSubmit() {
    let configBase = {};
    let config;
    configBase[this.model] = this.value;
    config = Object.assign(angular.copy(this.extraParams), configBase);
    this.editState = 2;
    this.factory[this.factoryAction](config)
      .then((res) => {
        this.editState = 0;
        this.onSuccess(res);
      }, (res) => {
        this.onError(res);
      });
  }

  onCancel() {
    this.editState = 0;
    this.value = this.originalValue;
  }

  onEdit() {
    this.editState = 1;
  }

  onKeypress($event) {
    if ($event.which === 13) {
      this.onSubmit();
    }
  }

  defaultSuccess() {
    this.originalValue = angular.copy(this.value);
    this.Notification.success(this.$filter('translate')('inputSave.saveSuccess'));
  }

  defaultError() {
    this.editState = 1;
    this.Notification.error(this.$filter('translate')('inputSave.saveError'));
  }

}

inputSaveController.$inject = [
  '$injector',
  'Notification',
  '$filter'
];

export {inputSaveController};
