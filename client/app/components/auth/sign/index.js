import angular from 'angular';
import {authComponent} from './auth.component';
import './auth.scss';

const sign = angular.module('billy.auth.sign', [])
  .component('authSign', authComponent);

export {sign};
