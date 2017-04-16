import settingsComponent from './settings.component';

import './settings.scss';

import langEN from './lang/en.json';

const settingsRun = (translateService) => {
  'use strict';

  translateService.addLang('settings', {EN: langEN});
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