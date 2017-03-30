# Billymob Panels base
## Getting Started
```
git clone <repo>
cd to <project>
npm install
direnv allow
npm start
```
## Build
```
npm install
npm run build
```

## Documentation
All the documentation can be founded inside the repo Docs
https://github.com/billyperformance/Docs/tree/master/repos/PublisherPanel
##### TODO: create a new folder with the common documentation components in it.

## Folder and files structure
### Main structure `client/`
```
- app/
    - components/
        - assets/
        - common/
        - css-components/
        - [component]
    - shared/
- appShell/
- custom_vendors
- billyPollyfills.js
- index.html
- index.js
- worker.js
```
### Component structure
A component inside `/components` folder is an agrupation of views
Ex: auth component
```
- sign/
    - lang/
    - auth.component.js
    - auth.content.html
    - auth.controller.js
    - auth.scss
    - auth.service.js (optional)
    - index.js
    - router.js
- auth.service.js
- index.js
- module.js
- lang/ (optional)
```

#### index.js
The index is the main definition of the component. It creates a abstract state `billy.auth` where all the related views inside it will be attached. We can define the `module.js` resolve and the state permissions for all the views at the same time.
```javascript
import angular from 'angular';

import {AuthService} from './auth.service';
import {signRouter} from './sign/router';

const authConfig = ($stateProvider) => {
  'use strict';

  $stateProvider
    .state('billy.auth', {
      abstract: true,
      template: '<div ui-view></div>',
      resolve: {
        loadModule: ($q, $ocLazyLoad) => {
          return $q((resolve) => {
            require.ensure([], () => {
              let module = require('./module');
              $ocLazyLoad.load({name: module.name});
              resolve();
            });
          });
        }
      },
      data: {
        permissions: {
          only: ['Anon'],
          redirectTo: {
            default: 'billy.void'
          }
        }
      }
    });
};

authConfig.$inject = ['$stateProvider'];

export const auth = angular
  .module('billy.auth', [])
  .factory('AuthService', AuthService)
  .run(authRun)
  .config(authConfig)
  .config(signRouter);
```

#### sign/auth.component.js
```javascript
import {AuthController as controller} from './auth.controller';
import template from './auth.content.html';

export const authComponent =  {
    template,
    controller,
    controllerAs: 'vm',
};
```

#### sign/auth.controller.js
```javascript
class controller {
    constructor(providers...) {
        ...
    }
};

controller.$inject = [providers...];
export {controller};
```

#### sign/auth.scss
```css
auth {
    ...
}
```

#### sign/auth.service.js || sign/auth.factory.js
```javascript
const AuthFactory = () => {
    const example = () => {
        ...
    };

    return {
        example
    };
};

AuthFactory.$inject = [];
export {AuthFactory};
```

#### sign/index.js
```javascript
import angular from 'angular';
import {authComponent} from './auth.component';
import './auth.scss';

const sign = angular.module('billy.auth.sign', [])
  .component('authSign', authComponent);

export {sign};
```

#### sign/router.js
When we create the state, we linked it to the parent state so `billy.auth.signin` will recibe the module import and the permissions configuration from the parent state `billy.auth`.
```javascript
const signRouter = ($stateProvider) => {
  'use strict';
  $stateProvider
    .state('billy.auth.signin', {
      url: '/auth',
      auth: false,
      template: '<auth-sign></auth-sign>'
    });
};

signRouter.$inject = ['$stateProvider'];
export {signRouter};
```
