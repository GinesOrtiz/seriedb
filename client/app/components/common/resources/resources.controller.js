class resourcesController {
  constructor(SharedFactory, $rootScope, $timeout) {
    this.SharedFactory = SharedFactory;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
  }

  $onInit() {
    this.resources = this.loadLocalResources(this.mid);

    this.$rootScope.$broadcast('requestInfo', this.mid);
    this.$rootScope.$on('atomAppend', this.atomAppend.bind(this));
  }

  atomAppend(event, data) {
    this.$timeout(() => {
      let resource = JSON.parse(atob(data.atom.split('.')[1]));
      this.resources.push(resource);
    });
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

  openResource() {
    console.log('open res');
  }
}

export default resourcesController;