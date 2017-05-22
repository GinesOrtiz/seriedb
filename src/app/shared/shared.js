export default /*@ngInject*/  ($rootScope) => {
  'use strict';

  let pkgMem = {};

  const getPkgMem = () => {
    return angular.copy(pkgMem);
  };

  const addPkgMem = (info) => {
    pkgMem[info.mid] = pkgMem[info.mid] || [];

    if (pkgMem[info.mid].indexOf(info.atom) < 0) {
      pkgMem[info.mid].push(info.atom);
      $rootScope.$broadcast('atomAppend', info);
    }
  };

  const findPkgMem = (mid) => {
    return pkgMem[mid];
  };

  const getServerList = () => {
    return [
      {
        name: 'Streamplay.to',
        regex: 'http://streamplay.to/.*'
      },

      {
        name: 'Streamin.to',
        regex: 'http://streamin.to/.*'
      },

      {
        name: 'Streamcloud.eu',
        regex: 'http://streamcloud.eu/.*/.*'
      }
    ];
  };

  const matchServer = (link) => {
    let serverList = angular.copy(getServerList());
    let selected = null;

    if (link) {
      serverList.forEach((server) => {
        if (link.match(new RegExp(server.regex))) {
          selected = server.name;
        }
      });
    }

    return selected;
  };

  const getLangOptions = (removeFirst = false) => {
    let options = [
      {
        slug: '--',
        name: 'None'
      },
      {
        slug: 'en',
        name: 'EN'
      },
      {
        slug: 'es',
        name: 'ES'
      },
      {
        slug: 'es_la',
        name: 'LAT'
      },
      {
        slug: 'fr',
        name: 'FR'
      }
    ];

    if (removeFirst) {
      options.shift();
    }

    return options;
  };

  const getQualityOptions = () => {
    return [
      {
        slug: '0',
        name: '480p'
      },
      {
        slug: '1',
        name: '720p'
      },
      {
        slug: '2',
        name: '1080p'
      },
      {
        slug: '3',
        name: 'TS-Screener'
      },
      {
        slug: '4',
        name: 'DVD-Screener'
      },
      {
        slug: '5',
        name: 'BLUERAY-Screener'
      }
    ];
  };

  return {
    getPkgMem,
    addPkgMem,
    findPkgMem,
    getServerList,
    matchServer,
    getLangOptions,
    getQualityOptions
  };
};