import template from './sidebar.html';
import {SideBarController as controller} from './sidebar.controller';
import './sidebar.scss';

export const sidebarComponent = {
  template,
  controller,
  controllerAs: 'vm'
};
