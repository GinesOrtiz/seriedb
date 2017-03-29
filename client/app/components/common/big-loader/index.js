import angular from 'angular';
import './big-loader.scss';

import {bigLoaderComponent} from './big-loader.component';
import {BigLoaderService} from './big-loader.service';

export const bigLoader = angular
  .module('billy.common.bigLoader', [])
  .component('bigLoader', bigLoaderComponent)
  .factory('BigLoaderService', BigLoaderService);
