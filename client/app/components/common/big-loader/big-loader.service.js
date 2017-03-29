const BigLoaderService = ($rootScope) => {
  'use strict';
  const setState = (state, options) => {
    if (!options) {
      options = {};
    }
    options.state = state;
    $rootScope.$broadcast('$bigLoading', options);
  };


  return {setState};
};

BigLoaderService.$inject = ['$rootScope'];

export {BigLoaderService};
