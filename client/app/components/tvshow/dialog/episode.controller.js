class episodeController {
  constructor(episode, tvshowID, SharedFactory, $mdDialog, $rootScope, $timeout) {
    this.episode = episode;
    this.tvshowID = tvshowID;
    this.SharedFactory = SharedFactory;
    this.$mdDialog = $mdDialog;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    let pkgID = `T${this.tvshowID}E${this.episode.id}`;
    this.resources = this.loadLocalResources(pkgID);

    this.$rootScope.$broadcast('requestInfo', pkgID);
    this.$rootScope.$on('atomAppend', this.atomAppend.bind(this));
  }

  close() {
    this.$mdDialog.hide();
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

}

export default episodeController;