class controller {
  constructor() {

  }

  getIcon() {
    if (this.element.custom) {
      return this.element.custom(this.row, this.element);
    }
    else {
      return this.element.icon;
    }
  }
}

export default controller;
