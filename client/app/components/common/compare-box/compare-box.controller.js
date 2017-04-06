class compareBoxController {
  constructor() {
  }

  $onInit() {
    if (this.config === undefined) {
      this.config = {
        showSubcontent: true
      };
    }
  }

  $onChanges(changesObj) {
    if (changesObj.state) {
      if (changesObj.state.currentValue !== undefined) {
        this.state.content = angular.copy(changesObj.state.currentValue.content);
        this.state.subcontent = angular.copy(changesObj.state.currentValue.subcontent);
      }
    }
  }

  calcStyle() {
    if (this.showSubcontent() && this.state.subcontent !== 0) {
      return this.state.subcontent > 0 ? 'positive' : 'negative';
    }
  }

  /**
   * Show subcontent only when it is loaded and we want to show it
   * @returns {boolean|*}
   */
  showSubcontent() {
    return this.config.showSubcontent && this._isSubcontentLoaded();
  }

  /**
   * Content is not null -> it is fully loaded
   * @returns {boolean}
   * @private
   */
  _isContentLoaded() {
    try {
      return this.state.content !== undefined;
    } catch (e) {
      return false;
    }
  }

  /**
   * Subcontent is a Number type -> it is fully loaded
   * @returns {boolean}
   * @private
   */
  _isSubcontentLoaded() {
    try {
      return typeof this.state.subcontent === 'number';
    } catch (e) {
      return false;
    }
  }
}

export default /*@ngInject*/ compareBoxController;
