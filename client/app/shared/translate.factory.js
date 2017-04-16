const TranslateFactory = /*@ngInject*/ ($localStorage) => {
  'use strict';
  let config = {
    available: [
      'EN',
      'ES'
    ],
    standard: 'EN',
    translations: {}
  };

  let localStorageLang = $localStorage.language;
  let navigatorLang = navigator.language || navigator.userLanguage;

  let standardLang = navigatorLang ? navigatorLang.split('-')[0] : config.lang.standard;
  config.lang = localStorageLang || standardLang;

  const setLang = (lang = config.standard) => {
    config.lang = lang;
    $localStorage.language = lang;
    window.location.reload();
  };

  const addLang = (moduleKey, translations) => {
    let keys = Object.keys(translations);

    keys.forEach((langKey) => {
      if (!config.translations[langKey]) {
        config.translations[langKey] = {};
      }

      if (config.available.indexOf(langKey) < 0) {
        if (__DEV__) {
          console.warn(
            `Translations for language key "${langKey}" 
            is not among the allowed languages. Please allow in service config.`);
        }
        return;
      }
      config.translations[langKey][moduleKey] = JSON.parse(translations[langKey]);
    });
  };

  const getTranslation = (translationKey, options = {}) => {
    let replace = '';

    try {
      let convertedKey = translationKey.split('.');
      let translation = config.translations[options.lang || config.lang];

      if (!translation) {
        translation = config.translations[config.standard];
      }

      convertedKey.forEach((key) => {
        translation = translation[key];
      });

      if (options.vars) {
        options.vars.forEach((key) => {
          translation = translation.replace('%s', key);
        });
      }

      replace = translation.replace(/\n/g, '<br>');
    } catch (e) {
      console.error('Translation not found: ' + translationKey);
    }
    return replace;
  };

  return {
    available: config.available,
    standard: config.standard,
    setLang,
    addLang,
    getTranslation
  };
};

const TranslateFilter = /*@ngInject*/ (TranslateFactory) => {
  'use strict';
  return (input, options) => {
    return TranslateFactory.getTranslation(input, options);
  };
};

TranslateFilter.$inject = ['translateService'];

export {TranslateFactory, TranslateFilter};
