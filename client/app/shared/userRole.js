const userRoleDirective = (UserService) => {
  'use strict';
  return {
    restrict: 'A',
    compile: () => {
      return {
        pre: (scope, elem, attr) => {
          elem.css('display', 'none');

          let access = UserService.getUserRoleAccess();
          if (access && access.indexOf(attr.userRole) < 0) {
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

export default userRoleDirective;
