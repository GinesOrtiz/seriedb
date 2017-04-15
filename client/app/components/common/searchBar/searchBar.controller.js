class searchBarController {
  constructor($location) {
    this.$location = $location;
  }

  $onInit() {
    this.query = this.$location.search().query;
  }
}

export default  searchBarController;