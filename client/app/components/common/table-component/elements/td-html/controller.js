class controller {
  constructor(SharedApiService) {
    this.SharedApiService = SharedApiService;
  }

  getHTML() {
    return this.row[this.element.key];
  }
}

controller.$inject = ['SharedApiService'];

export {controller};
