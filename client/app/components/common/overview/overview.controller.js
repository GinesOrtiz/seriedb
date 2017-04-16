/* globals __TMDB_IMG__ */

class overviewController {
  constructor() {

  }

  $onInit() {
    let backdropBase = `${__TMDB_IMG__}w1400_and_h450_bestv2/`;
    this.backdrop = backdropBase + this.info.backdrop_path; // jshint ignore: line
  }
}

export default /*@ngInject*/ overviewController;