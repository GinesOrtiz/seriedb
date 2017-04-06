class filtersComponentController {
  constructor($filter, $timeout) {

    this.$filter = $filter;
    this.$timeout = $timeout;
    this.filtersFields = this.fields;
    this.columnMode = this.column === true;
    this.showFilterBox = false;
    this.hideButton = this.hideButton || false;

    this.clearFilters();
  }

  querySearch(options, name, selected) {
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

  querySubmit() {
    this.submit();
  }

  clearFilters(forceClear) {
    if (forceClear) {
      this.model = {};
      this.$timeout(() => {
        this.querySubmit();
      });
    }

    Object.keys(this.fields)
      .forEach((key) => {
        if (!this.model[key]) {
          switch (this.fields[key].type) {
            case 'text':
              this.model[key] = this.defaultModel ? this.defaultModel[key] : '';
              break;
            case 'select':
            case 'radio':
            case 'checkbox':
            case 'chip':
              this.model[key] = this.defaultModel ? this.defaultModel[key] : [];
              break;
          }
        }
      });
  }

  /**
   * Toggles the value passed (adds/removes from filterName's model)
   * @param check
   * @param filterName
   */
  toggleCheckBox(check, filterName) {
    let index = this.model[filterName].indexOf(check);
    if (index === -1) {
      this.model[filterName].push(check);
    }
    else {
      _.pullAt(this.model[filterName], index);
    }
  }

  shouldMarkAsChecked(check, filterName) {
    return _.find(this.model[filterName], check);
  }


}

export default /*@ngInject*/ filtersComponentController;
