import settingsComponent from './settings.component';

import './settings.scss';

import langEN from './lang/en.json';
import langES from './lang/es.json';
import langCA from './lang/ca.json';

const settingsRun = (TranslateFactory) => {
  'use strict';
  TranslateFactory.addLang('settings', {
    EN: langEN,
    ES: langES,
    CA: langCA
  });
};

const settingsConfig = ($stateProvider) => {
  'use strict';

  $stateProvider
    .state('seriedb.settings', {
      url: '/settings',
      template: '<seriedb-settings></seriedb-settings>'
    });
};

export default angular
  .module('seriedb.settings', [])
  .component('seriedbSettings', settingsComponent)
  .run(settingsRun)
  .config(settingsConfig);