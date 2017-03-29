import logo from '../app/components/assets/logo_white.png';

import './styles.scss';

const isAuth = () => {
  'use strict';
  return !!window.localStorage.getItem('billy-publisher-token');
};

const checkUrl = () => {
  'use strict';

  let path = window.location.pathname;
  let router = {
    secured: [
      '/'
    ],
    auth: [
      '/auth',
      '/auth/*'
    ]
  };
  let template = 'none';

  for (let route in Object.keys(router)) {
    for (let section in Object.keys(router)[route]) {
      if (path.match(new RegExp(Object.keys(router)[route][section] + '$'))) {
        template = Object.keys(router)[route];
        break;
      }
    }
  }

  return template;
};

const templateVars = () => {
  'use strict';

  let html = require('./templates/' + checkUrl() + '.html');
  let vars = [
    [
      '__LOGO_URL__',
      logo
    ]
  ];

  vars.forEach((tvar) => {
    html = html.replace(tvar[0], tvar[1]);
  });

  return html;
};

const appShell = () => {
  'use strict';

  document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
      let appShell = document.createElement('appShell');
      appShell.innerHTML = templateVars();
      appShell.className += (isAuth() ? 'user-enabled' : '');
      document.body.appendChild(appShell);
    }
  };
};

appShell();
