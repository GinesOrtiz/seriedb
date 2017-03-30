import controller from './login-popup.controller';
import template from './login-popup.content.html';
import './login-popup.scss';

/**
 * Directive to be added at the same level of the global ui-view. Displays an overlay with a
 * configurable login modal. A service is exposed in order to open/close/toggle or set the tittle
 * of the modal.
 */
export default {
  template: template,
  controller,
  controllerAs: 'vm',
  bindings: {
    openPopup: '=?',
    title: '=?',
    signup: '=?'
  }
};
