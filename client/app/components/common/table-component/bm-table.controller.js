class bmTableController {
  constructor($injector, $interval, $timeout, $scope, $state) {
    this.$scope = $scope;
    this.$injector = $injector;
    this.$interval = $interval;
    this.$timeout = $timeout;
    this.$state = $state;
    this.interval = null;
    this.loading = false;
    this.requestingContent = this.requestingContent || true;
    this.chunkSize = parseInt(this.chunk) || 1;
    this.pagination = this.pagination ? parseInt(this.pagination) : null;
    this.currentPage = parseInt(this.page) || 1;
    this.total = 1;

    if (this.resource) {
      let method = this.prepareMethod(this.resource);

      if (method) {
        method.action()
          .then((res) => {
            this.total = angular.copy(this.data.length);
            this.requestingContent = true;
            this.data = method.content ? res[method.content] : res;
            //this.printContent(this.data);
          });
      }
    }

    $scope.$on('bmTableUpdate', (event, data) => {
      switch (data.action) {
        case 'rebuild':
          if (this.customEvent) {
            return;
          }
          if (this.asyncLoad) {
            this.currentPage = data.currentPage || 1;
            this.pagination = data.pagination;
            this.printContent(this.data);
          }
          else {
            this.content = angular.copy(this.data);
          }
          break;
      }
    });

    this.pageChange = this.pageChangeDetector.bind(this);
  }

  $onChanges(changes) {
    if (changes.data.currentValue) {
      let data = angular.copy(changes.data.currentValue);
      this.total = this.totalRows || data.length;

      if (this.asyncLoad) {
        this.printContent(data);
      }
      else {
        this.content = data;
        this.requestingContent = false;
      }
    }
  }

  printContent(content) {
    let tableContent = angular.copy(content);
    if (this.pagination) {
      let currentBlock = this.currentPage * this.pagination - this.pagination;
      tableContent = tableContent.splice(currentBlock, this.pagination);
    }
    this.loading = true;
    this.$interval.cancel(this.interval);
    this.content = [];
    let contentLength = tableContent.length;
    let domContentLength = 0;

    this.interval = this.$interval(() => {
      let tmpContent = [];
      for (let i = 0; i < this.chunkSize; i++) {
        if (tableContent[domContentLength + i]) {
          tmpContent.push(tableContent[domContentLength + i]);
        }
      }

      this.content = this.content.concat(tmpContent);

      domContentLength += this.chunkSize;

      if (domContentLength >= contentLength) {
        this.requestingContent = false;
        this.$interval.cancel(this.interval);
        this.loading = false;
      }
    }, this.chunkSize * 10);
  }

  doSort(column) {
    this.requestingContent = true;
    this.$interval.cancel(this.interval);
    this.content = [];
    let prepare = this.prepareMethod(column.sort.method);
    let columnDirection = column.sort.direction === 'asc' ? 'desc' : 'asc';
    if (!column.sort.active) {
      columnDirection = 'desc';
    }

    this.columns.forEach((column) => {
      if (column.sort) {
        column.sort.active = false;
        column.sort.direction = 'desc';
      }
    });
    column.sort.active = true;
    column.sort.direction = columnDirection;

    prepare.action({
      data: this.data,
      filters: {
        order: column.sort.key || column.key,
        sort: column.sort.direction
      }
    })
      .then((res) => {
        this.currentPage = 1;
        this.data = prepare.content ? res[prepare.content] : res;
        this.printContent(this.data);

        this.$state.transitionTo(this.$state.$current.name, {
          order: column.sort.key || column.key,
          sort: column.sort.direction
        }, {
          location: true,
          notify: false,
          inherit: true,
          relative: this.$state.$current
        });
      });
  }

  prepareMethod(methodString) {
    let service;
    let method;
    let content;

    methodString.split('.')
      .forEach((k, i) => {
        if (i === 0) {
          service = this.$injector.get(k);
        }
        if (i === 1) {
          method = service[k];
        }
        if (i === 2) {
          content = k;
        }
      });

    if (method) {
      return {
        action: method,
        content: content
      };
    }

  }

  search() {
    this.requestingContent = true;
    this.$interval.cancel(this.interval);
    this.content = [];

    let prepare = this.prepareMethod(this.filters.search.method);

    prepare.action(this.filters.search.query)
      .then((res) => {
        this.currentPage = 1;
        this.data = [];
        this.$timeout(() => {
          this.data = prepare.content ? res[prepare.content] : res;
        });
      });
  }

  checkTotal(column) {
    if (Object.keys(this.totals.allowed)
        .indexOf(column.key) > -1) {
      return {
        content: this.totals.content,
        element: this.totals.allowed[column.key]
      };
    }
  }

  pageChangeDetector(page) {
    if (this.customEvent) {
      return;
    }
    this.requestingContent = true;
    this.currentPage = page;
    this.printContent(this.data);
  }

  tableHeight() {
    let height = 0;
    if (this.hasOwnProperty('totals')) {
      height += 52;
    }
    if (this.pagination) {
      height += 52 * this.pagination;
    }

    return height + 'px';
  }
}

export default /*@ngInject*/ bmTableController;
