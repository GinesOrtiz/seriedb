import listsSelectorComponent from './listsSelector.component';

import langES from './lang/es.json';
import langEN from './lang/en.json';

/**
 * Component that receives an array of arrays of possible lists to show. When something is
 * selected or removed, it calls its callbacks
 *
 *
 * DOCS:
 * https://github.com/billyperformance/Docs/blob/master/repos/PublisherPanel/components/lists-selector/README.md
 * }
 */

const listsSelectorRun = (translateService) => {
  'use strict';
  translateService.addLang('listsSelector', {
    EN: langEN,
    ES: langES
  });
};

export default angular
  .module('billy.common.listsSelector', [])
  .component('listsSelector', listsSelectorComponent)
  .run(listsSelectorRun);
