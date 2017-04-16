/* globals __SOCKET__ */
import io from 'socket.io-client';

class appController {
  constructor(SharedFactory, $rootScope, $localStorage) {
    this.SharedFactory = SharedFactory;
    this.$rootScope = $rootScope;
    this.$localStorage = $localStorage;
  }

  $onInit() {
    let socket = io(this.$localStorage.socketURL || __SOCKET__);
    this.nerdMode = this.$localStorage.nerdMode;

    socket.on('askingInfoUpdate', (info) => {
      this.nerdLog(`New request asking for package: #${info.mid}.`);

      let pkg = this.SharedFactory.findPkgMem(info.mid);

      if (pkg) {
        this.nerdLog(`Package #${info.mid} found. Resources inside: ${pkg.length}.`);

        pkg.forEach((atom) => {
          socket.emit('atomicUpdate', {
            mid: info.mid,
            atom: atom,
            who: info.who
          });
        });
      }
      else {
        this.nerdLog(`Package #${info.mid} not found.`);
      }
    });

    socket.on('atomAppend', (info) => {
      this.nerdLog(`New resource received for package #${info.mid}.`);

      this.SharedFactory.addPkgMem(info);
    });

    this.$rootScope.$on('requestInfo', (event, mid) => {
      this.nerdLog(`Request for package #${mid} sent.`);

      this.$rootScope.$broadcast('appendLocalResources', this.SharedFactory.getPkgMem()[mid] || []);
      socket.emit('requestInfo', {
        mid
      });
    });

    this.$rootScope.$on('requestAppend', (event, info) => {
      this.nerdLog(`Request for adding a resource to package #${info.mid} sent.`);

      socket.emit('requestAppend', info);
    });

    this.$rootScope.$on('nerdMode', (event, mode) => {
      this.nerdMode = mode;
    });
  }

  nerdLog(log) {
    if (!!this.$localStorage.nerdMode) {
      console.info(log);
      this.$rootScope.$broadcast('nerdModeLog', log);
    }
  }
}

export default /*@ngInject*/ appController;