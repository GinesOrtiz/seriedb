class episodeController {
  constructor(mid, $mdDialog) {
    this.mid = mid;
    this.$mdDialog = $mdDialog;
  }

  close() {
    this.$mdDialog.hide();
  }
}

export default /*@ngInject*/ episodeController;