import tvshowComponent from './tvshow.component';
import TvshowFactory from './tvshow.factory';

import './tvshow.scss';

import langEN from './lang/en.json';

const tvshowRun = (translateService) => {
  'use strict';
  translateService.addLang('tvshow', {EN: langEN});
};

const tvshowConfig = ($stateProvider) => {
  'use strict';
  $stateProvider
    .state('seriedb.tvshow', {
      url: '/tv/:id',
      template: '<seriedb-tvshow tvshow="tvshow"></seriedb-tvshow>',
      controller: ($scope, tvshow) => {
        $scope.tvshow = tvshow;
      },
      resolve: {
        tvshow: (TvshowFactory, $stateParams) => {
          return TvshowFactory.getTvshow($stateParams.id);
        }
      }
    });
};

export default angular
  .module('seriedb.tvshow', [])
  .component('seriedbTvshow', tvshowComponent)
  .factory('TvshowFactory', TvshowFactory)
  .run(tvshowRun)
  .config(tvshowConfig);