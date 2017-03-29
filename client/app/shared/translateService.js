const TranslateService = (localStorage) => {
  'use strict';
  let config = {
    available: [
      'EN',
      'ES'
    ],
    standard: 'EN',
    translations: {}
  };

  let localStorageLang = localStorage.getItem('language', true);
  let navigatorLang = navigator.language || navigator.userLanguage;
  // Get from navigator, if not English.
  let standardLang = navigatorLang ? navigatorLang.split('-')[0] : config.lang.standard;

  config.lang = localStorageLang || standardLang;

  const escapeASCIIChars = (str) => {
    return str.replace(/[a-z]/g, function f(a) {
      return '4BCD3F6H1JKLMN0PQR57'[parseInt(a, 36) - 10] || a.replace(/[a-t]/gi, f);
    });
  };

  // methods
  const setLang = (lang = config.standard) => {
    config.lang = lang;
    localStorage.setItem('language', lang);
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
    let convertedKey = translationKey.split('.');
    let translation = config.translations[options.lang || config.lang];

    let isPlural = !!options.plural;

    if (!translation) {
      translation = config.translations[config.standard];
    }

    convertedKey.forEach((key, i) => {
      if (i === convertedKey.length - 1) {
        if (isPlural) {
          key = key + '_plural';
        }
        if (options.context) {
          key = key + '_' + options.context;
        }
      }
      translation = translation[key];
    });

    if (options.vars) {
      options.vars.forEach((key) => {
        translation = translation.replace('%s', key);
      });
    }

    if (localStorage.getItem('prCode', true) === '@1m 4 h4ck3r&') {
      translation = escapeASCIIChars(translation);
    }

    let replace = '';
    try {
      replace = translation.replace(/\n/g, '<br>');
    } catch (e) {
      throw new TypeError('TypeError: Cannot read property \'replace\' of undefined for key: ' +
        translationKey);
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
TranslateService.$inject = ['localStorage'];

const TranslateFilter = (translateService) => {
  'use strict';
  return (input, options) => {
    return translateService.getTranslation(input, options);
  };
};
TranslateFilter.$inject = ['translateService'];


export {TranslateService, TranslateFilter};
