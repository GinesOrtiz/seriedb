import template from './accountManager.content.html';
import {accountManagerController as controller} from './accountManager.controller';
import './accountManager.scss';

export const accountManagerComponent = {
  template,
  controller,
  controllerAs: 'vm'
};
