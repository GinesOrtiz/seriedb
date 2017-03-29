import angular from 'angular';
import {voidComponent} from './void.component';
import {voidViewRouter} from './router';

export const voidView = angular
  .module('billy.void', [])
  .config(voidViewRouter)
  .component('voidComponent', voidComponent);
