class searchController {
    constructor(SearchFactory, $state) {
        this.SearchFactory = SearchFactory;
        this.$state = $state;
    }

    $onInit() {
        //this.SearchFactory.getSearchMulti({query:'rocky'})
        this.results = [];
        this.searchText = '';
    }

    search(searchText) {
        console.log(this.searchText);
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