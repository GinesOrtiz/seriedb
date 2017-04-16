import searchComponent from './search.component';
import SearchFactory from './search.factory';
import './search.scss';

import langEN from './lang/en.json';
import langES from './lang/es.json';
import langCA from './lang/ca.json';

const searchRun = (TranslateFactory) => {
  'use strict';
  TranslateFactory.addLang('search', {
    EN: langEN,
    ES: langES,
    CA: langCA
  });
};

const searchConfig = ($stateProvider) => {
  'use strict';
  $stateProvider
    .state('seriedb.search', {
      url: '/search?query',
      template: '<seriedb-search results="results"></seriedb-search>',
      controller: (results, $scope) => {
        $scope.results = results;
      },
      resolve: {
        results: (SearchFactory, $stateParams) => {
          return SearchFactory.getSearchMulti({
            query: $stateParams.query
          });
        }
      }
    });
};

export default angular
  .module('seriedb.search', [])
  .config(searchConfig)
  .run(searchRun)
  .component('seriedbSearch', searchComponent)
  .factory('SearchFactory', SearchFactory);