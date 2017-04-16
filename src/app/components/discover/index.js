import discoverComponent from './discover.component';
import DiscoveryFactory from './discover.factory';
import './discover.scss';

import langEN from './lang/en.json';
import langES from './lang/es.json';
import langCA from './lang/ca.json';

const discoverRun = (TranslateFactory) => {
  'use strict';
  TranslateFactory.addLang('discover', {
    EN: langEN,
    ES: langES,
    CA: langCA
  });
};

const discoverConfig = ($stateProvider) => {
  'use strict';
  $stateProvider
    .state('seriedb.discover', {
      url: '/',
      template: '<seriedb-discover movies="movies" tv="tv"></seriedb-discover>',
      controller: (movies, tv, $scope) => {
        $scope.movies = movies;
        $scope.tv = tv;
      },
      resolve: {
        movies: (DiscoveryFactory) => {
          return DiscoveryFactory.getDiscoverMovies();
        },
        tv: (DiscoveryFactory) => {
          return DiscoveryFactory.getDiscoverTV();
        }
      }
    });
};

export default angular
  .module('seriedb.discover', [])
  .config(discoverConfig)
  .run(discoverRun)
  .component('seriedbDiscover', discoverComponent)
  .factory('DiscoveryFactory', DiscoveryFactory);