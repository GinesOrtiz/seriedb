const testingABDirective = (UserService) => {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      testing: '@'
    },
    compile: () => {
      return {
        pre: (scope, elem, attr) => {
          elem.css('display', 'none');

          let testModel = UserService.getState().test || 'a';
          if (attr.testing !== testModel) {
            elem.remove();
          }
          else {
            elem.css('display', '');
          }
        }
      };
    }
  };
};

export default /*@ngInject*/ testingABDirective;
