class searchController {
  constructor(SearchFactory, $stateParams) {
    this.SearchFactory = SearchFactory;
    this.$stateParams = $stateParams;
  }

  $onInit() {
  }

  searchMore(){

    this.SearchFactory.getSearchMulti({
      query: this.$stateParams.query,
      page: this.$stateParams.page + 1
    });

  }
}

export default searchController;