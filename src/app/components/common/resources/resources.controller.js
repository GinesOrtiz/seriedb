import dialogController from './dialog/dialog.controller';
import dialogTemplate from './dialog/dialog.html';

class resourcesController {
  constructor(SharedFactory, $rootScope, $timeout, $mdDialog) {
    this.SharedFactory = SharedFactory;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$mdDialog = $mdDialog;
  }

  $onInit() {
    this.resources = this.loadLocalResources(this.mid);
    this.$rootScope.$broadcast('requestInfo', this.mid);
    this.$rootScope.$on('atomAppend', this.atomAppend.bind(this));
  }

  atomAppend(event, data) {
    if (data.mid === this.mid) {
      this.$timeout(() => {
        let resource = JSON.parse(atob(data.atom.split('.')[1]));
        this.resources.push(resource);
      });
    }
  }

  loadLocalResources(pkgID) {
    let resources = [];
    let pkgMem = this.SharedFactory.getPkgMem()[pkgID] || [];

    pkgMem.forEach((resource) => {
      let jsonRes = JSON.parse(atob(resource.split('.')[1]));
      resources.push(jsonRes);
    });

    return resources;
  }

  openResource(resource) {
    resource.open = true;
    window.open(resource.u, '_blank');
  }

  atomAppender() {
    this.$mdDialog.show({
      controller: dialogController,
      controllerAs: 'vm',
      template: dialogTemplate,
      clickOutsideToClose: true,
      locals: {
        mid: this.mid
      }
    });
  }
}

export default /*@ngInject*/ resourcesController;