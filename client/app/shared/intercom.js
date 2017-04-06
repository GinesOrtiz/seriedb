const IntercomService = ($interval, $q) => {
  'use strict';
  let _config = {
    app_id: __INTERCOM_ID__ || 'uidz8r4x' //jshint ignore:line
  };

  window.intercomSettings = _config;

  const _intercom = () => {
    let dfd = $q.defer();
    if (typeof Intercom === 'undefined') {
      let checker = $interval(() => {
        if (typeof Intercom !== 'undefined') {
          $interval.cancel(checker);
          dfd.resolve();
        }
      }, 50);
    }
    else {
      dfd.resolve();
    }

    return dfd.promise;
  };

  const run = (action, bootOptions) => {
    if (!bootOptions) {
      bootOptions = {};
    }
    if (typeof action !== 'string') {
      if (__DEV__) {
        console.error('Error, missing action param');
      }
      return;
    }
    bootOptions.app_id = _config.app_id; // jshint ignore:line
    _intercom()
      .then(() => {
        window.Intercom(action, bootOptions);
      });
  };

  const shutdown = () => {
    _intercom()
      .then(() => {
        window.Intercom('shutdown');
      });
  };


  return {
    run,
    shutdown
  };
};

export default /*@ngInject*/ IntercomService;
