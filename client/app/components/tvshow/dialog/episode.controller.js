class episodeController {
  constructor(episode, tvshowID, $mdDialog, $rootScope, $timeout) {
    this.episode = episode;
    this.tvshowID = tvshowID;
    this.$mdDialog = $mdDialog;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.resources = [];

    this.$rootScope.$broadcast('requestInfo', `T${this.tvshowID}E${this.episode.id}`);
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

  openResource(resource) {

  }
}

export default episodeController;