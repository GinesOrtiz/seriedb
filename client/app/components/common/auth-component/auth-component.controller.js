class authComponentController {
  constructor(UserService, AuthService, BackgroundUpdateService, BigLoaderService, Notification,
              translateService, localStorage, $filter, $analytics, $state, $stateParams, $scope,
              $timeout, $location) {
    this.UserService = UserService;
    this.$analytics = $analytics;
    this.AuthService = AuthService;
    this.BackgroundUpdateService = BackgroundUpdateService;
    this.BigLoaderService = BigLoaderService;
    this.Notification = Notification;
    this.translateService = translateService;
    this.$filter = $filter;
    this.$timeout = $timeout;
    this.$state = $state;
    this.localStorage = localStorage;
    this.$stateParams = $stateParams;
    this.$scope = $scope;
    this.$location = $location;

    if (!this.view) {
      this.view = 'signup';
    }

    //this.origin = !this.$location.search().origin;
    this.origin = this.localStorage.getItem('origin', true);
    this.viewOpposite = this.opposite();
    this.formContent = {};
    this.formFields = {
      signin: {
        opposite: true,
        submit: 'signin',
        submitButton: true,
        options: [
          {
            label: 'email',
            element: 'input',
            type: 'email',
            required: true
          },
          {
            label: 'password',
            element: 'input',
            type: 'password',
            required: true
          },
          {
            label: 'forgotPassword',
            element: 'link',
            href: '/remember'
          }
        ]
      },
      signup: {
        opposite: true,
        submit: 'signup',
        submitButton: true,
        options: [
          {
            label: 'fullName',
            element: 'input',
            type: 'text',
            required: true
          },
          {
            label: 'email',
            element: 'input',
            type: 'email',
            required: true
          },
          {
            label: 'password',
            element: 'input',
            type: 'password',
            required: true
          },
          {
            label: 'phone',
            type: 'tel',
            element: 'input'
          },
          {
            label: 'origin',
            hide: !this.origin,
            element: 'select',
            options: [
              'facebook',
              'lk',
              'adwords',
              'twitter',
              'forums',
              'conferences',
              'recommendation',
              'other'
            ]
          },
          {
            label: 'originExtra',
            hide: () => this.formContent.origin !== 'other',
            type: 'text',
            placeholder: 'otherPlaceholder',
            element: 'input'
          },
          {
            element: 'hr'
          },
          {
            label: 'subscribeToNewsletter',
            element: 'checkbox'
          },
          {
            label: 'terms',
            element: 'checkbox',
            required: true
          }
        ]
      },
      remember: {
        submit: 'rememberButton',
        submitButton: true,
        options: [
          {
            label: 'rememberDescription',
            element: 'text'
          },
          {
            label: 'email',
            element: 'input',
            type: 'email',
            required: true
          },
          {
            label: 'oposite_signin',
            element: 'link',
            href: '/auth'
          }
        ]
      },
      reset: {
        submit: 'resetButton',
        submitButton: true,
        small: this.$stateParams.email,
        options: [
          {
            label: 'newPassword',
            element: 'input',
            type: 'password',
            required: true
          },
          {
            label: 'confirmationPassword',
            element: 'input',
            type: 'password',
            required: true
          }
        ]
      }
    };

    this.marketplaceBubbles = [
      'local_offer',
      'trending_up',
      'question_answer'
    ];
    if (this.view === 'signup') {
      this.formContent.subscribeToNewsletter = true;
    }
    if (this.disableSignup) {
      this.formFields.signin.opposite = false;
    }
  }

  changeView() {
    this.viewOpposite = this.view;
    this.view = this.opposite();
    this.$scope.$emit('changeView', this.view);
    this.formIsChanging = true;
    this.$timeout(() => {
      this.formIsChanging = false;
    }, 250);
    if (this.view === 'signup') {
      this.formContent.subscribeToNewsletter = true;
    }
    else {
      delete this.formContent.subscribeToNewsletter;
    }
  }

  opposite() {
    return this.view === 'signup' ? 'signin' : 'signup';
  }

  submitForm() {
    this.BigLoaderService.setState('show');
    switch (this.view) {
      case 'signup':

        if (this.origin) {
          this.formContent.origin = this.localStorage.getItem('origin', true);
          this.formContent.originExtra = this.localStorage.getItem('originExtra', true);
        }
        else {
          if (this.formContent.origin !== 'other') {
            this.formContent.originExtra = 'signup-combo';
          }
        }
        this.doSignup();
        break;
      case 'signin':
        this.doSignin();
        break;
      case 'remember':
        this.doRemember();
        break;
      case 'reset':
        this.doReset();
        break;
    }
  }

  doSignup() {
    this.AuthService.signup(this.formContent)
      .then(() => {
        this.BackgroundUpdateService.update('reloadTabs');
        this.sendConversionPixels();
        const isSignup = true;
        this.identifyUsers(isSignup);
        this.AuthService.whoami(null, isSignup)
          .then(() => {
            this.reloadTab();
            this.Notification.success(this.$filter('translate')('authComponent.signupSuccess'));
          });
      }, () => {
        this.BigLoaderService.setState('hide');
        this.showError(this.$filter('translate')('authComponent.credentials'));
      });
  }

  doSignin() {
    this.AuthService.login(this.formContent)
      .then(() => {
        this.AuthService.whoami()
          .then((data) => {
            this.BackgroundUpdateService.update('reloadTabs');
            this.$analytics.setUserProperties({
              /* jshint ignore:start */
              user_id: data.hashId,
              email: data.email,
              panel_url: window.location.hostname,
              pub_type: data.type,
              marketplace_allowed: !!data.marketplaceAllowed
              /* jshint ignore:end */
            });

            this.translateService.setLang(data.language);
            this.reloadTab();
          });
      })
      .catch(() => {
        delete this.formContent.password;
        this.showError(this.$filter('translate')('authComponent.credentials'));
        this.BigLoaderService.setState('hide');
      });
  }

  doRemember() {
    this.AuthService.rememberPassword(this.formContent)
      .then(() => {
        this.BigLoaderService.setState('hide');
        this.formFields.remember.submitButton = false;
        this.formFields.remember.options = [
          {
            label: 'rememberSuccess',
            element: 'text'
          }
        ];
      });
  }

  doReset() {
    this.formContent.email = this.$stateParams.email;
    this.formContent.hash = this.$stateParams.hash;
    this.formContent.userType = this.$stateParams.userType;
    if (this.formContent.newPassword !== this.formContent.confirmationPassword) {
      this.showError(this.$filter('translate')('auth.errorNoMatch'));
      this.BigLoaderService.setState('hide');
      return;
    }
    if (this.formContent.newPassword.length < 6) {
      this.showError(this.$filter('translate')('auth.minlength'));
      this.BigLoaderService.setState('hide');
      return;
    }
    this.AuthService.resetPassword(this.formContent)
      .then(() => {
        this.Notification.success(this.$filter('translate')('auth.passwordReset.success'));
        this.$state.go('billy.auth');
        this.BigLoaderService.setState('hide');
      }, () => {
        this.showError(this.$filter('translate')('auth.error'));
        this.BigLoaderService.setState('hide');
      });
  }

  reloadTab() {
    //let isMA = this.UserService.getState().marketplaceAllowed;
    //window.location = this.$state.href(isMA ? 'billy.marketplace' : 'billy.myCampaigns');
    let nonPopup = [
      'billy.auth',
      'billy.remember',
      'billy.signup',
      'billy.reset'
    ];
    if (nonPopup.indexOf(this.$state.$current.name) > -1) {
      if (this.$location.search().next) {
        window.location = decodeURIComponent(this.$location.search().next);
      }
      else {
        window.location = this.$state.href('billy.myCampaigns');
      }
    }
    else {
      window.location.reload();
    }
  }

  showError(e) {
    this.Notification.error({
      message: e,
      delay: 3000
    });
  }

  /**
   * Send to intercom the user on signup
   * Mixpanel is sent in whoami()
   */
  identifyUsers(isSignup = false) {
    this.AuthService.whoami(null, isSignup)
      .then(() => {
        let data = this.UserService.getState();
        let userProperties = {
          /* jshint ignore:start */
          user_id: data.hashId,
          /* jshint ignore:end */
          name: data.fullName,
          email: data.email,
          /* jshint ignore:start */
          panel_url: window.location.hostname,
          pub_type: data.type,
          /* jshint ignore:end */
          origin: this.origin || '',
          status: 'Signed Up'
        };
        this.$analytics.setUserProperties(userProperties);
      });
  }

  sendConversionPixels() {
    switch (this.origin) {
      case 'adwords':
        this.sendAdwords();
        break;
      case 'facebook':
        this.sendFacebook();
        break;
      case 'twitter':
        this.sendTwitter();
        break;
    }
  }

  /**
   * If we have adwords as a origin, we try to parse the object originExtra to get the config params
   */
  sendAdwords() {
    let err = false;
    try {
      /* jshint ignore:start */
      let a = JSON.parse(this.credits.originExtra);
      /* jshint ignore:end */
    } catch (e) {
      err = true;
    }

    if (!err) {
      var configParams = JSON.parse(this.credits.originExtra);
      window.google_trackConversion(configParams); // jshint ignore:line

      if (__DEV__) {
        this.$log.log('configParams: ', configParams);
      }

    }
  }

  sendFacebook() {
    /* globals fbq */
    fbq('track', 'CompleteRegistration');
  }

  sendTwitter() {
    /* globals twttr */
    twttr.conversion.trackPid('nvp79', {
      /* jshint ignore:start */
      tw_sale_amount: 0,
      tw_order_quantity: 0
      /* jshint ignore:end */
    });
  }

  goToMarketplace() {
    this.$state.go('billy.marketplace');
  }
}

export default authComponentController;
