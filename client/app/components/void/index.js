
import voidComponent from './void.component';
import voidViewRouter from './router';

export default angular
  .module('billy.void', [])
  .config(voidViewRouter)
  .component('voidComponent', voidComponent);
