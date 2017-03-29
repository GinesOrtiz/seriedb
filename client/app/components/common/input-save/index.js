import angular from 'angular';
import {inputSaveComponent} from './input-save.component';
import langEN from './lang/en.json';
import langES from './lang/es.json';

import './input-save.scss';

export const inputSave = angular
  .module('commonComponents.inputSave', [])
  .component('inputSave', inputSaveComponent)
  .run((translateService) => {
    'use strict';
    translateService.addLang('inputSave', {
      EN: langEN,
      ES: langES
    });
  });
