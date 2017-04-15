class movieController {
  constructor(SharedFactory, $rootScope) {
    this.SharedFactory = SharedFactory;
    this.$rootScope = $rootScope;
  }

  $onInit() {
    this.pkgID = `M${this.movie.id}`;
  }
}

export default movieController;