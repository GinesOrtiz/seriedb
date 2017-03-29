import {elements} from './elements';

class dynamicFormController {
  constructor($scope) {
    this.vmodel = this.iterate(this.model);
    $scope.$watch(() => {
      return this.vmodel;
    }, (model) => {
      if (model) {
        this.convertModel(model);
      }
    }, true);
  }

  iterate(obj) {
    let conv = {};
    let walked = [];
    let stack = [
      {
        obj: obj,
        stack: ''
      }
    ];
    while (stack.length > 0) {
      let item = stack.pop();
      let obj = item.obj;
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (typeof obj[property] === 'object') {
            var alreadyFound = false;
            for (var i = 0; i < walked.length; i++) {
              if (walked[i] === obj[property]) {
                alreadyFound = true;
                break;
              }
            }
            if (!alreadyFound) {
              walked.push(obj[property]);
              stack.push({
                obj: obj[property],
                stack: item.stack + '.' + property
              });
            }
          }
          else {
            conv[(item.stack + '.' + property).substr(1)] = obj[property];
          }
        }
      }
    }

    return conv;
  }

  convertModel(obj) {
    let conv = {};

    Object.keys(obj)
      .forEach(function (kn) {
        let keyName = kn.split('.');
        let tmp = {};

        keyName.forEach(function (n, i) {
          let isLast = (keyName.length - 1) === i;
          if (i === 0) {
            conv[n] = !conv[n] ? {} : conv[n];
            conv[n] = isLast ? obj[kn] : conv[n];
            tmp = isLast ? conv : conv[n];
          }
          else {
            tmp[n] = !tmp[n] ? {} : tmp[n];
            tmp[n] = isLast ? obj[kn] : tmp[n];
            tmp = isLast ? tmp : tmp[n];
          }
        });
      });

    this.model = conv;
  }

  buttonAction(button) {
    let action = button.action;
    if (button.submit) {
      button.action();
    }
    else {
      if (typeof action !== 'string') {
        action();
      }
      else {
        this[action]();
      }
    }
  }

  clear() {
    this.vmodel = {};
    this.model = {};
  }

  checkElement(element) {
    let elementExists = Object.keys(elements)
        .indexOf(element) > -1;

    return elementExists ? element : 'invalidElement';
  }

  async(field) {
    field.async()
      .then((options) => {
        field.options = options;
      });
  }

  submit() {
    this.fields.buttons.forEach((button) => {
      if (button.submit) {
        button.action();
      }
    });
  }

}

dynamicFormController.$inject = ['$scope'];

export {dynamicFormController};
