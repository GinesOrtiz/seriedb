import angular from 'angular';
import './big-loader.scss';

import {bigLoaderDirective} from './big-loader.directive';
import {BigLoaderService} from './big-loader.service';

export const bigLoader = angular.module('commonComponents.bigLoader', [])
  .directive('bigLoader', bigLoaderDirective)
  .factory('BigLoaderService',BigLoaderService);
