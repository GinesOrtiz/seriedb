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
        icon: 'info',
        state: 'seriedb.about'
      }
    ];
  }
}

export default sidebarController;