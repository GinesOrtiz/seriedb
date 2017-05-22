class atomAppendController {
  constructor(SharedFactory, $mdDialog, $rootScope) {
    this.$mdDialog = $mdDialog;
    this.SharedFactory = SharedFactory;
    this.$rootScope = $rootScope;
  }

  $onInit() {
    this.serverList = this.SharedFactory.getServerList();
    this.selectors = {
      l: this.SharedFactory.getLangOptions(true),
      s: this.SharedFactory.getLangOptions(),
      q: this.SharedFactory.getQualityOptions()
    };
    this.resource = {};
  }

  validateLink(atomAppender) {
    let server = this.SharedFactory.matchServer(this.resource.u);
    atomAppender.link.$setValidity('invalidServer', !!server);
    this.resource.h = server;
  }

  close() {
    this.$mdDialog.hide();
  }

  addResource() {
    this.$rootScope.$broadcast('requestAppend', {
      atom: this.resource,
      mid: this.mid
    });
    this.close();
  }
}

export default /*@ngInject*/ atomAppendController;