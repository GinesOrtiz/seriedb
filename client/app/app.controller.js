import io from 'socket.io-client';

class appController {
  constructor($rootScope, $localStorage) {
    this.$rootScope = $rootScope;
    this.$localStorage = $localStorage;
  }

  $onInit() {
    let pkgMem = {};
    let socket = io('ws://51.254.205.30:3030');

    socket.on('askingInfoUpdate', (info) => {
      this.nerdLog(`New request asking for package: #${info.mid}.`);

      if (pkgMem[info.mid]) {
        this.nerdLog(`Package #${info.mid} found. Resources inside: ${pkgMem[info.mid].length}.`);

        pkgMem[info.mid].forEach((atom) => {
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
      this.nerdLog(`New resource added to package #${info.mid}.`);

      pkgMem[info.mid] = pkgMem[info.mid] || [];

      if (pkgMem[info.mid].indexOf(info.atom) < 0) {
        pkgMem[info.mid].push(info.atom);
      }

      this.$rootScope.$broadcast('atomAppend', info);
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
    }
  }
}

export default appController;