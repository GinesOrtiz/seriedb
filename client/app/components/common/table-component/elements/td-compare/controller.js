class controller {
  constructor() {

  }

  getIcon() {
    let upColor = '#23BF76';
    let downColor = '#E74C3C';
    let color, icon;
    let value = this.row[this.element.value];
    let compare = this.row[this.element.compare];
    let diff = parseFloat(value) - parseFloat(compare);
    if (diff > 0) {
      color = this.element.color ? this.element.color.up || upColor : upColor;
      icon = 'arrow_drop_up';
    }
    else if (diff < 0) {
      color = this.element.color ? this.element.color.down || downColor : downColor;
      icon = 'arrow_drop_down';
    }

    return {
      color,
      icon
    };
  }

}

export default /*@ngInject*/ controller;
