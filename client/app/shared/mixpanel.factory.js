const MixpanelFactory = (UserService, $q, localStorage) => {
  'use strict';

  const ASYNC_INTERVAL = 500;

  const async = (func) => {
    let dfd = $q.defer();
    let mixLoad = setInterval(() => {
      if (typeof mixpanel !== 'undefined' && mixpanel && typeof mixpanel[func] !== 'undefined') {
        clearInterval(mixLoad);
        dfd.resolve();
      }
    }, ASYNC_INTERVAL);

    return dfd.promise;
  };

  /**
   * Tracks given event
   * @param name String: event name (Action - Download Button, Pageview...)
   * @param info Object: extra information that will be merged with default one
   */
  const track = (name, info) => {
    let user = UserService.getState();
    let userInfo = {};
    if (!!user.email) {
      userInfo = {
        userEmail: user.email,
        userCampaigns: user.campaigns.length,
        userAccountManager: user.accountManager.email !== 'support@billymob.com'
      };
    }
    let infoMerged = Object.assign(userInfo, info);

    let mixLoad = setInterval(() => {
      if (typeof mixpanel !== 'undefined' && typeof mixpanel.track !== 'undefined') {
        clearInterval(mixLoad);
        mixpanel.track(name, infoMerged);
      }
    }, ASYNC_INTERVAL);
  };

  const setUser = (data) => {
    mixpanel.people.set({
      $email: data.email,
      $name: data.fullName,
      type: data.type,
      language: data.language,
      marketplaceAllowed: data.marketplaceAllowed,
      version: __VERSION__,
      hasAccountManager: data.accountManager.email !== 'support@billymob.com',
      numberOfCampaigns: data.campaigns.length
    });
  };

  const alias = (email) => {
    //si viene de fuera tendrá una disctId en local Storage
    //TODO: confirmar si hace falta hacer un alias del id actual y del id por parametro
    const disctIdStorage = localStorage.getItem('distinct_id', true);
    mixpanel.alias(email, disctIdStorage || mixpanel.get_distinct_id());
  };

  const identify = (email) => {
    mixpanel.identify(email);
  };

  const reset = () => {
    mixpanel.reset();
  };

  return {
    async,
    track,
    setUser,
    alias,
    identify,
    reset
  };
};

export default /*@ngInject*/ MixpanelFactory;
