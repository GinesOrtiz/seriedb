import logo from './../../assets/logo_white.png';
import miniBg from './../../assets/mini_bg.png';
import bigBg from './../../assets/bg.jpg';

class signController {
  constructor(localStorage, bmMixpanel, $location, $stateParams, $scope, $state, $timeout) {
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.localStorage = localStorage;
    this.bmMixpanel = bmMixpanel;
    this.$state = $state;
    this.$timeout = $timeout;
    this.current = this.$state.current.name.replace('billy.', '');
    this.logo = logo;
    this.miniBg = miniBg;
    this.bigBg = bigBg;
    this.view = this.current === 'signup' ? 'signup' : 'signin';
    this.origin = !!this.localStorage.getItem('origin', true);

    $scope.$on('changeView', (event, view) => {
      this.view = view;

      this.$state.transitionTo('billy.auth.' + view, {}, {
        location: true,
        notify: false
      });
    });

    $scope.$watch('$viewContentLoaded', () => {
      let hb = new Image();
      hb.src = this.bigBg;
      hb.onload = () => {
        this.$timeout(() => {
          this.bgLoaded = true;
        });
      };
    });
  }
}

export default signController;
