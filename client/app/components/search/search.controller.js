class searchController {
  constructor(SearchFactory, $state) {
    this.SearchFactory = SearchFactory;
    this.$state = $state;
  }

  $onInit() {
    this.results = [];
    this.searchText = '';

    this.SearchFactory.getSearchMulti({query:'torrente'})
      .then((res) => {
        console.log('res.controller', res);
        this.results = res;

      });
  }

  search(searchText) {
    console.log(searchText);
    let params = {query: searchText};

    this.SearchFactory.getSearchMulti(params)
      .then((res) => {
        console.log('res', res);
        this.results = res.results;
        /*
         this.$state.transitionTo('seriedb.search', params, {
         location: true,
         inherit: true,
         relative: this.$state.$current,
         notify: false
         });*/
      });
  };


}

export default searchController;