class BPNTabsetController {
  constructor(bmMixpanel, BigLoaderService, UserService, $scope, $timeout, $analytics) {
    this.tabs = [];
    this.$analytics = $analytics;
    this.bmMixpanel = bmMixpanel;
    this.UserService = UserService;

    $scope.$on('offerCard-forceTab', (event, status)=> {
      this.select(+status, null, false);
      // ES: Como los eventos entran en cola, lo que se hace es que se crea un timeout trase el
      // cual se ejecutará el ocultar el loading. Lo que ocurre es que primero se cancela ese mismo
      // timeout cada vez que llega un nuevo evento. El último evento cancelará la penúltima pero
      // ejecutará otro timeout que nadie más cancelará por lo que justo a los 100 milisegundos de
      // la última ejecución el loader se ocultará.
      $timeout.cancel(this.isLoaded);
      this.isLoaded = $timeout(()=> {
        $timeout(()=> {
          BigLoaderService.setState('hide');
        });
      }, 500);
    });
  }

  /**
   * addTab() method is called in the `bpn-tab` link function to add the specific tab to the tabset
   */
  addTab(tab) {
    this.tabs.push(tab);

    if (this.tabs.length === 1) {
      tab.active = true;
    }
  }

  /**
   * Avoid going to card when clicking on the <ul>
   * @param event
   */
  avoidClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * select() method is called to select the specific tab.
   */
  select(selectedTab, evt, sendToAnalytics = true) {
    evt && this.avoidClick(evt);
    this.tabs[0].active = false;
    this.tabs[1].active = false;
    //if (this.tabs[2]) this.tabs[2].active = false;
    this.tabs[selectedTab].active = true;
    const eventName = evt && evt.currentTarget.getAttribute('data-event-name');
    if (sendToAnalytics && eventName) {
      this.bmMixpanel.track('Click - Tab Selected', {
        value: eventName
      });
    }
  }
}

export default BPNTabsetController;
