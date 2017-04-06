class controller {
  constructor(SharedApiService) {
    this.SharedApiService = SharedApiService;
  }

  getHTML() {
    return this.row[this.element.key];
  }
}

export default /*@ngInject*/ controller;
