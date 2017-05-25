class episodeController {
  constructor(episode, tvshowID, $mdDialog) {
    this.episode = episode;
    this.tvshowID = tvshowID;
    this.$mdDialog = $mdDialog;
    // jshint ignore:start
    this.pkgID = `T${this.tvshowID}S${this.episode.season_number}E${this.episode.episode_number}`;
    // jshint ignore:end
  }

  close() {
    this.$mdDialog.hide();
  }
}

export default /*@ngInject*/ episodeController;