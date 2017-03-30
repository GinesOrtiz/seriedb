
import billyFaqComponent from './billy-faq.component';
import FaqService from './faq.service';

import langEN from './lang/en.json';
import langES from './lang/es.json';

const billyFaqRun = (translateService) => {
  'use strict';
  translateService.addLang('faq', {
    EN: langEN,
    ES: langES
  });
};

export default angular
  .module('billy.common.billyFaq', [])
  .component('billyFaq', billyFaqComponent)
  .run(billyFaqRun)
  .factory('FaqService', FaqService);
