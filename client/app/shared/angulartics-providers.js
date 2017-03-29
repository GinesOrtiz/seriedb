/**
 * @ngdoc overview
 * @name angulartics.providers
 * Enables analytics support for custom providers
 */
export const angularticsProviders = angular
  .module('angulartics.providers', ['angulartics'])
  .config([
    '$analyticsProvider',
    function ($analyticsProvider) {
      'use strict';
      // INTERCOM
      $analyticsProvider.registerSetUsername(function (userId) {
        if (window.Intercom) {
          window.Intercom('update', {user_id: userId}); // jshint ignore:line
        }
      });

      $analyticsProvider.registerSetUserProperties(function (properties) {
        if (window.Intercom) {
          window.Intercom('update', properties);
        }
      });

      /**
       * Track Event in Intercom
       * @name eventTrack
       *
       * @param {string} action Required 'action' (string) associated with the event
       * @param {object} properties = metadata
       *
       * @link http://doc.intercom.io/api/?javascript#submitting-events
       *
       * @example
       *   Intercom('trackEvent', 'invited-friend');
       */
      $analyticsProvider.registerEventTrack(function (action, properties) {
        if (window.Intercom) {
          window.Intercom('trackEvent', action, properties);
        }
      });
      // END INTERCOM
    }
  ]);
