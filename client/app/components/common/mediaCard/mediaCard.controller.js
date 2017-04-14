class mediaCard {
  constructor() {

  }

  $onInit() {
    this.poster = __TMDB_IMG__ + 'w500_and_h281_bestv2/' + this.info.backdrop_path;
  }

  $onChanges() {

  }
}

export default mediaCard;