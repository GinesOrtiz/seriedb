
import langEN from './lang/en.json';
import langES from './lang/es.json';
import messageBlockComponent from './message-block.component';
import emailActivationComponent from './email-activation';

import './message-block.scss';

const messageBlockRun = (translateService) => {
  'use strict';
  translateService.addLang('messageBlock', {
    EN: langEN,
    ES: langES
  });
};

export default angular
  .module('billy.common.messageBlock', [])
  .component('messageBlock', messageBlockComponent)
  .component('emailActivation', emailActivationComponent)
  .run(messageBlockRun);
