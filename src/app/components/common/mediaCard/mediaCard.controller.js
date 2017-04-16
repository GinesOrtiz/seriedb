/* globals __TMDB_IMG__ */

class mediaCard {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.imgPrev = require('../../../assets/imgPrev.png');
  }

  $onInit() {
    let poster = __TMDB_IMG__ + 'w500_and_h281_bestv2/'
      + this.info.backdrop_path; // jshint ignore:line

    let img = new Image();
    img.src = poster;
    img.onload = () => {
      this.$timeout(() => {
        this.imgPrev = poster;
        this.imgLoaded = true;
      });
    };

    this.state = `seriedb.${this.info.title ? 'movie' : 'tvshow'}({id: ${this.info.id}})`;
  }

  $onChanges() {

  }
}

export default /*@ngInject*/ mediaCard;