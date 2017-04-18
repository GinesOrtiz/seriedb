/* globals __SOCKET__, __PROJECT_NAME__ */
import io from 'socket.io-client';

class appController {
  constructor(SharedFactory, $rootScope, $localStorage, $timeout) {
    this.SharedFactory = SharedFactory;
    this.$rootScope = $rootScope;
    this.$localStorage = $localStorage;
    this.$timeout = $timeout;
  }

  $onInit() {
    this.nerdMode = this.$localStorage.nerdMode;
    this.$rootScope.$on('nerdMode', (event, mode) => {
      this.nerdMode = mode;
    });
    this.socketURL = this.$localStorage.socketURL;
    if (__SOCKET__) {
      this.socketURL = __SOCKET__;
    }
    this.projectName = __PROJECT_NAME__;

    if (this.socketURL) {
      this.socketConnect();
    }
  }

  socketConnect() {
    let socket = io(this.socketURL);

    socket.on('connect', () => {
      this.$timeout(() => {
        this.$localStorage.socketURL = this.socketURL;
      });
    });

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

      socket.emit('requestInfo', {
        mid
      });
    });

    this.$rootScope.$on('requestAppend', (event, info) => {
      this.nerdLog(`Request for adding a resource to package #${info.mid} sent.`);

      socket.emit('requestAppend', info);
    });

  }

  nerdLog(log) {
    if (!!this.$localStorage.nerdMode) {
      console.info(log);
      this.$rootScope.$broadcast('nerdModeLog', log);
    }
  }

  insertSocket() {
    this.socketURL = this.address;
    this.socketConnect();
  }
}

export default /*@ngInject*/ appController;