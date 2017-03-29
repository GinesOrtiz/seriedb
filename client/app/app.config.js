import angular from 'angular';
import NGHighcharts from 'highcharts-ng';
import ngMaterial from 'angular-material';
import notifications from 'angular-ui-notification';

const appConfig = ($compileProvider, $urlRouterProvider, $mdThemingProvider, highchartsNGProvider,
                   NotificationProvider) => {
  'use strict';

  $urlRouterProvider.deferIntercept();

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|skype|tel):/);

  $mdThemingProvider.definePalette('BMPallete', $mdThemingProvider.extendPalette('grey', {
    '50': 'F2F6F9',
    '100': 'EAEFF5',
    '200': 'D0DBE9',
    '300': '94A9C1',
    '400': '2E3E51', //default
    '500': '2B3135', //darker
    'contrastDefaultColor': 'light'
  }));

  $mdThemingProvider.theme('default')
    .primaryPalette('BMPallete', {
      'default': '400'
    });

  $urlRouterProvider.otherwise(function () {
    window.location.href = '/auth';
  });

  //Highcharts
  highchartsNGProvider.lazyLoad();

  NotificationProvider.setOptions({
    delay: 3000,
    startTop: 0,
    startRight: 0,
    verticalSpacing: 0,
    horizontalSpacing: 0,
    positionX: 'left',
    positionY: 'top',
    templateUrl: '/notification.html'
  });

};

appConfig.$inject = [
  '$compileProvider',
  '$urlRouterProvider',
  '$mdThemingProvider',
  'highchartsNGProvider',
  'NotificationProvider'
];

export const config = angular
  .module('app.config', [
    ngMaterial,
    NGHighcharts,
    notifications
  ])
  .config(appConfig);
