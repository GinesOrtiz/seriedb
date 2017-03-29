import angular from 'angular';

import {resetPasswordComponent} from './resetPassword.component';

export const resetPassword = angular
  .module('billy.auth.resetPassword', [])
  .component('authResetPassword', resetPasswordComponent);
