import template from './rememberPassword.content.html';
import './rememberPassword.scss';
import {rememberPasswordController as controller} from './rememberPassword.controller';

export const authRememberPasswordComponent = {
  template,
  controller,
  controllerAs: 'vm',
};
