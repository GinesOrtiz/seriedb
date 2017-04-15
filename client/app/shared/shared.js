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

  return {
    getPkgMem,
    addPkgMem
  };
};