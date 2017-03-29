import template from './sidebar.html';
import {SideBarController as controller} from './sidebar.controller';
import './sidebar.scss';

export const sidebarDirective = () => {
  'use strict';

	return {
		template,
		controller,
		controllerAs: 'sidebar',
    bindToController: true,
		restrict: 'E',
		replace: true,
    scope: {}
	};
};
