import angular from 'angular';
import {authRememberPasswordComponent} from './rememberPassword.component';

export const rememberPassword = angular
  .module('billy.auth.remember', [])
  .component('authRememberPassword', authRememberPasswordComponent);
