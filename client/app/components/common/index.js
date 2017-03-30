import billyFaq from './billy-faq';
import accountManager from './account-manager';
import mainMenu from './main-menu';
import sidebar from './sidebar';
import bigLoader from './big-loader';
import notification from './notification';
import filtersComponent from './filters-component';
import BPNTabset from './bpn-tabset';
import BPNTab from './bpn-tabset/bpn-tab';
import loginPopup from './login-popup';
import messageBlock from './message-block';
import authBox from './auth-component';
import inputSave from './input-save';
import dynamicForm from './dynamic-form';
import pixelsComponent from './pixels';
import bmTable from './table-component';
import compareBox from './compare-box';
import listsSelector from './lists-selector';

export default angular
  .module('billy.common', [
    notification.name,
    mainMenu.name,
    sidebar.name,
    bigLoader.name,
    billyFaq.name,
    filtersComponent.name,
    accountManager.name,
    BPNTabset.name,
    BPNTab.name,
    loginPopup.name,
    messageBlock.name,
    authBox.name,
    inputSave.name,
    dynamicForm.name,
    pixelsComponent.name,
    bmTable.name,
    compareBox.name,
    listsSelector.name
  ]);
