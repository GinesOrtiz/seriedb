import template from './sidebar.html';
import {sideBarController as controller} from './sidebar.controller';
import './sidebar.scss';

export const sidebarComponent = {
  template,
  controller,
  controllerAs: 'vm'
};
