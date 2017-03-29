import angular from 'angular';
import {tdText} from './td-text';
import {tdIcon} from './td-icon';
import {tdImage} from './td-image';
import {tdHtml} from './td-html';
import {tdButtons} from './td-buttons';
import {tdCompare} from './td-compare';
import {tdCheckbox} from './td-checkbox';
import {tdMarketplaceName} from './td-marketplaceName';

export const tableElements = angular
  .module('common.bmTableComponent.elements', [])
  .component('tdText', tdText)
  .component('tdImage', tdImage)
  .component('tdHtml', tdHtml)
  .component('tdButtons', tdButtons)
  .component('tdCompare', tdCompare)
  .component('tdIcon', tdIcon)
  .component('tdCheckbox', tdCheckbox)
  .component('tdMarketplaceName', tdMarketplaceName);
