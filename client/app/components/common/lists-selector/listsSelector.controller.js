class listsSelectorController {
  constructor($filter) {
    this.$filter = $filter;
  }


  $onInit() {

    //set the initial model given pre-selected options
    this.model = {};
    this.initialModel.forEach((elem, index) => {
      this.model[index] = angular.copy(elem);
    });

    if (this.config === undefined) {
      this.config = { //default config
        maximumLists: Number.MAX_SAFE_INTEGER,
        placeholder: this.$filter('translate')('listsSelector.placeholder'),
        placeholderAdd: this.$filter('translate')('listsSelector.placeholderAdd'),
        minimumLists: 0
      };
    }
  }

  $onChanges(changesObj) {
    //here we could do tracking actions or similar when something changes
    if (changesObj.config) {
      this.config = angular.copy(changesObj.config.currentValue);
    }
    if (changesObj.lists) {
      if (changesObj.lists.currentValue !== undefined) {
        this.lists = angular.copy(changesObj.lists.currentValue);
      }
    }
  }

  /**
   * Update the model depending on the index of the list that we want to remove
   * @param listIndex
   */
  handleListRemoval(listIndex) {
    //if the item is not the last in the model, shift all objects one position to the left
    // starting on listIndex
    if (Object.keys(this.model).length - 1 !== listIndex) {
      let modelArray = Object.values(this.model);
      var rem = modelArray.splice(listIndex + 1);
      modelArray.pop();
      let finalModel = [
        ...modelArray,
        ...rem
      ];

      //restore the model
      this.model = finalModel.reduce((acc, curr, index) => {
        acc[index] = curr;
        return acc;
      }, {});

      this.removeList({listIndex});
    }
    else { //remove last element
      delete this.model[listIndex];
      this.removeList({listIndex});
    }
  }

  showRemoveButton(index) {
    if (index === 0) {
      return Object.keys(this.model).length > this.config.minimumLists;
    }
    else {
      return Object.keys(this.model)[index] !== undefined;
    }
  }
}

export default /*@ngInject*/ listsSelectorController;
