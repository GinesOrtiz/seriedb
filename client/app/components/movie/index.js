import seriedbMovieComponent from './movie.component';
import MovieFactory from './movie.factory';

import './movie.scss';

import langEN from './lang/en.json';

const movieRun = (translateService) => {
  'use strict';

  translateService.addLang('movie', {EN: langEN});
};

const movieConfig = ($stateProvider) => {
  'use strict';

  $stateProvider
    .state('seriedb.movie', {
      url: '/movie/:id',
      template: '<seriedb-movie movie="movie"></seriedb-movie>',
      controller: (movie, $scope) => {
        $scope.movie = movie;
      },
      resolve: {
        movie: (MovieFactory, $stateParams) => {
          return MovieFactory.getMovie($stateParams.id);
        }
      }
    });
};

export default angular
  .module('seriedb.movie', [])
  .component('seriedbMovie', seriedbMovieComponent)
  .factory('MovieFactory', MovieFactory)
  .run(movieRun)
  .config(movieConfig);