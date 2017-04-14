import discoverComponent from './discover.component';
import DiscoveryFactory from './discover.factory';
import './discover.scss';

import langEN from './lang/en.json';

const discoverRun = (translateService) => {
  translateService.addLang('discover', {EN: langEN});
};

const discoverConfig = ($stateProvider) => {
  $stateProvider
    .state('seriedb.discover', {
      url: '/',
      template: '<seriedb-discover movies="movies" tv="tv"></seriedb-discover>',
      controller: ($scope, movies, tv) => {
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
    })
};

export default angular
  .module('seriedb.discover', [])
  .config(discoverConfig)
  .run(discoverRun)
  .component('seriedbDiscover', discoverComponent)
  .factory('DiscoveryFactory', DiscoveryFactory);