import template from './email-activation.html';
import {emailActivationController as controller} from './email-activation.controller';

import './email-activation.scss';

export const emailActivationComponent = {
  template,
  controller,
  controllerAs: 'vm'
};
