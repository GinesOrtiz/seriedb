import {sign} from './sign';
import {resetPassword} from './reset-password';
import {rememberPassword} from './remember-password';

export default angular
  .module('billy.auth.module', [
    sign.name,
    resetPassword.name,
    rememberPassword.name
  ]);
