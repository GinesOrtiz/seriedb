import mediaCardComponent from './mediaCard/mediaCard.component';
import searchBarComponent from './searchBar/searchBar.component';
import sidebarComponent from './sidebar/sidebar.component';

export default angular
  .module('seriedb.common', [])
  .component('mediaCard', mediaCardComponent)
  .component('searchBar', searchBarComponent)
  .component('sidebar', sidebarComponent);