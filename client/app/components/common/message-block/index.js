import angular from 'angular';
import langEN from './lang/en.json';
import langES from './lang/es.json';
import {messageBlockComponent} from './message-block.component';
import {emailActivationComponent} from './email-activation';
import {marketplaceAnonComponent} from './marketplace-anon';

import './message-block.scss';

const messageBlockRun = (translateService) => {
  'use strict';
  translateService.addLang('messageBlock', {
    EN: langEN,
    ES: langES
  });
};

messageBlockRun.$inject = ['translateService'];

export const messageBlock = angular
  .module('commonComponents.messageBlock', [])
  .component('messageBlock', messageBlockComponent)
  .component('emailActivation', emailActivationComponent)
  .component('marketplaceAnon', marketplaceAnonComponent)
  .run(messageBlockRun);
