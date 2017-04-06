class paginationController {
  constructor(bmMixpanel, $state, $rootScope) {
    this.bmMixpanel = bmMixpanel;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.rppOptions = [
      10,
      25,
      50,
      100,
      250
    ];
    this.rows = this.rows ? this.rows : 10;

    $rootScope.$on('bmTableUpdate', (event, data) => {
      if (data.action === 'pageChange') {
        this.page = data.page;
      }
    });
  }


  movePage(direction) {
    if (direction === 'left') {
      this.pageChange()(--this.page);
    }
    else {
      this.pageChange()(++this.page);
    }

    this.$state.transitionTo(this.$state.$current.name, {
      page: this.page
    }, {
      location: true,
      notify: false,
      inherit: true,
      relative: this.$state.$current
    });

    this.updateEvent();
  }

  changeRows() {
    this.updateEvent(1);
  }

  updateEvent(page) {
    this.$rootScope.$broadcast('bmTableUpdate', {
      currentPage: page || this.page,
      action: 'rebuild',
      pagination: this.rows
    });

    this.$rootScope.$broadcast('bmTableUpdate', {
      action: page ? 'rppChange' : 'pageChange',
      pagination: this.rows,
      page: this.page
    });
  }

  getTotalPages() {
    return Math.ceil(this.total / this.rows) || 1;
  }
}

export default /*@ngInject*/ paginationController;
