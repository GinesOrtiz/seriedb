
import inputSaveComponent from './input-save.component';
import langEN from './lang/en.json';
import langES from './lang/es.json';

const inputSaveRun = (translateService) => {
  'use strict';
  translateService.addLang('inputSave', {
    EN: langEN,
    ES: langES
  });
};

import './input-save.scss';

export default angular
  .module('billy.common.inputSave', [])
  .component('inputSave', inputSaveComponent)
  .run(inputSaveRun);
