class episodeController {
  constructor(episode, tvshowID, $mdDialog) {
    this.episode = episode;
    this.tvshowID = tvshowID;
    this.$mdDialog = $mdDialog;
    this.pkgID = `T${this.tvshowID}E${this.episode.id}`;
  }

  close() {
    this.$mdDialog.hide();
  }
}

export default /*@ngInject*/ episodeController;