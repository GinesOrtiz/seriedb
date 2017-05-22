import mediaCardComponent from './mediaCard/mediaCard.component';
import searchBarComponent from './searchBar/searchBar.component';
import sidebarComponent from './sidebar/sidebar.component';
import overviewComponent from './overview/overview.component';
import resourcesComponent from './resources/resources.component';
import consoleComponent from './console/console.component';
import atomAppenderComponent from './atomAppender/atomAppender.component';

export default angular
  .module('seriedb.common', [])
  .component('mediaCard', mediaCardComponent)
  .component('searchBar', searchBarComponent)
  .component('sidebar', sidebarComponent)
  .component('overview', overviewComponent)
  .component('resources', resourcesComponent)
  .component('console', consoleComponent)
  .component('atomAppender', atomAppenderComponent);