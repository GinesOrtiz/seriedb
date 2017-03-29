import langES from './lang/es.json';
import langEN from './lang/en.json';

import {sign} from './sign';
import {resetPassword} from './reset-password';
import {rememberPassword} from './remember-password';

const moduleRun = (translateService) => {
  'use strict';
  translateService.addLang('auth', {
    EN: langEN,
    ES: langES
  });
};

moduleRun.$inject = ['translateService'];

export default angular
  .module('billy.auth.module', [
    sign.name,
    resetPassword.name,
    rememberPassword.name
  ])
  .run(moduleRun);
