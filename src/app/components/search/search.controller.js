class searchController {
  constructor(SearchFactory, $stateParams) {
    this.SearchFactory = SearchFactory;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.loading = false;
  }

  searchMore() {
    this.loading = true;

    this.SearchFactory.getSearchMulti({
      query: this.$stateParams.query,
      page: this.results.page + 1
    })
      .then((res) => {
        this.results.page = res.page;
        this.results.totalPages = res.totalPages;

        if (res.results.length > 0) {
          res.results.forEach((item) => {
            this.results.results.push(item);
            this.loading = false;
          });
        }
        else {
          if (this.results.page < this.results.totalPages) {
            this.searchMore();
          }
        }
      });

  }
}

export default /*@ngInject*/ searchController;