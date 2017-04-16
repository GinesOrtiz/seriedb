import tvshowComponent from './tvshow.component';
import TvshowFactory from './tvshow.factory';

import './tvshow.scss';

import langEN from './lang/en.json';
import langES from './lang/es.json';
import langCA from './lang/ca.json';

const tvshowRun = (TranslateFactory) => {
  'use strict';
  TranslateFactory.addLang('tvshow', {
    EN: langEN,
    ES: langES,
    CA: langCA
  });
};

const tvshowConfig = ($stateProvider) => {
  'use strict';
  $stateProvider
    .state('seriedb.tvshow', {
      url: '/tv/:id',
      template: '<seriedb-tvshow tvshow="tvshow"></seriedb-tvshow>',
      controller: (tvshow, $scope) => {
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