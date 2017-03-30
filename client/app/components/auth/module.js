import sign from './sign';
import resetPassword from './reset-password';
import rememberPassword from './remember-password';

import langEN from './lang/en.json';
import langES from './lang/es.json';

const authRun = (translateService) => {
  'use strict';
  translateService.addLang('auth', {
    EN: langEN,
    ES: langES
  });
};

export default angular
  .module('billy.auth.module', [
    sign.name,
    resetPassword.name,
    rememberPassword.name
  ])
  .run(authRun);
