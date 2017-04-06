class controller {
  constructor(SharedApiService,
              UserService,
              Dates,
              $filter) {
    this.SharedApiService = SharedApiService;
    this.userCurrency = UserService.getState().currency;
    this.Dates = Dates;
    this.$filter = $filter;
  }

  getFormat(row, element, format, float) {
    let text;
    if (this.element.format !== 'custom') {
      text = typeof row[element] !== 'undefined' ? row[element] : 'NOT_DEFINED';
    }
    else {
      text = this.element.text(row);
    }

    switch (format) {
      case 'currency':
        let num = this.$filter('number')(text, float || 2);
        return this.userCurrency === 'EUR' ? (num + ' €') : ('$ ' + num);
      case 'float':
        return this.$filter('number')(text, float || 2);
      case 'number':
        return this.$filter('number')(text);
      case 'int':
        return parseInt(text);
      case 'uppercase':
        return text.toUpperCase();
      case 'parenthesis':
        return '(' + text + ')';
      case 'hours':
        return text + ':00h';
      case 'symbol':
        if (this.element.float) {
          text = this.$filter('number')(text, float);
        }
        return text + ' ' + this.element.symbol;
      case 'custom':
        if (text && this.element.translate) {
          return this.$filter('translate')(text);
        }
        else {
          return text;
        }
        break;
      default:
        return text;
    }
  }

  getText(row, element) {
    if (!row[element.key]) {
      return null;
    }
    return element.custom(row[element.key]);
  }
}

export default /*@ngInject*/ controller;
