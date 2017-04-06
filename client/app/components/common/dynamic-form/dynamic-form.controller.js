import elements from './elements';

class dynamicFormController {
  constructor($templateCache, $filter) {
    this.$templateCache = $templateCache;
    this.$filter = $filter;


  }

  $onInit() {
    this.tmpFields = {};
    this.fields.forEach((field, i) => {
      let elementContent = this.checkElement(field.element);

      if (field.name) {
        elementContent =
          elementContent.replace(/__MODEL__/gi, this.bracket(field.name, 'vm.model'));
      }

      this.$templateCache.put(field.element + '_' + i, elementContent);

    });
  }

  bracket(model, base) {
    let props = model.split('.');
    return (base || props.shift()) + (props.length ? "['" + props.join("']['") + "']" : '');
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

    return elementExists ? elements[element] : 'invalidElement';
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

  querySearch(options, name, selected = []) {
    let filterByName = this.$filter('filter')(options, {name: name});
    let availableFilters = [];
    let usedFilters = [];

    selected.forEach((option) => {
      usedFilters.push(option.id);
    });

    filterByName.forEach((option) => {
      if (usedFilters.indexOf(option.id) < 0) {
        availableFilters.push(option);
      }
    });

    return availableFilters;
  }

  callOnAdd() {
    /**
     * IOS FIX: after closing the first md-menu with the fix in the constructor
     */
    $(document)
      .on('touchend', '.md-scroll-mask', function () {
        $('.md-menu-showing input')
          .blur();
        $('md-virtual-repeat-container:not(\'.ng-hide\')')
          .addClass('ng-hide');
        $('.md-scroll-mask')
          .hide();
      });

  }

  checkboxExists(item, list) {
    return list.indexOf(item.name) > -1;
  };

  checkboxToggle(item, list) {
    let idx = list.indexOf(item.name);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item.name);
    }
  };

}

export default /*@ngInject*/ dynamicFormController;
