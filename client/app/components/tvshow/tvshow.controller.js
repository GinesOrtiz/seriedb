/* globals __TMDB_IMG__ */

import episodeController from './dialog/episode.controller';
import episodeTemplate from './dialog/episode.html';

class tvshowController {
  constructor(TvshowFactory, $stateParams, $mdDialog) {
    this.TvshowFactory = TvshowFactory;
    this.$stateParams = $stateParams;
    this.$mdDialog = $mdDialog;
  }

  $onInit() {
    let backdropBase = `${__TMDB_IMG__}w1400_and_h450_bestv2/`;
    this.backdrop = backdropBase + this.tvshow.backdrop_path; // jshint ignore: line

    this.episodes = {};
  }

  openSeason(season, number) {
    season.open = !season.open;
    if (!this.episodes[number]) {
      season.loading = true;
      let tvshowId = this.$stateParams.id;
      this.TvshowFactory.getSeason(tvshowId, number)
        .then((res) => {
          season.loading = false;
          this.episodes[number] = res.episodes;
        });
    }
  }

  openEpisode(episode, tvshowID) {
    this.$mdDialog.show({
      controller: episodeController,
      controllerAs: 'vm',
      template: episodeTemplate,
      clickOutsideToClose: true,
      locals: {
        episode,
        tvshowID
      }
    });
  }
}

export default tvshowController;