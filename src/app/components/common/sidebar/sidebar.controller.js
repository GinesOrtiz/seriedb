class sidebarController {
  constructor() {

  }

  $onInit() {
    this.menu = [
      {
        icon: 'home',
        state: 'seriedb.discover'
      },
      {
        icon: 'settings',
        state: 'seriedb.settings'
      },
      {
        icon: 'info',
        state: 'seriedb.about'
      }
    ];
  }
}

export default /*@ngInject*/ sidebarController;