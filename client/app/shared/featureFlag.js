import _ from 'lodash';

const featureFlagDirective = ([
  'featureFlagService',
  (featureFlagService) => {
    'use strict';
    return {
      restrict: 'A',
      compile: () => {
        return {
          pre: (scope, elem, attr) => {
            let features = featureFlagService.getFeatures();
            if (features && features.indexOf(attr.featureFlag) < 0) {
              elem.remove();
            }
          }
        };
      }
    };
  }
]);

const featureFlagService = () => {
  'use strict';
  let allFeatures = {
    'production': [
      'noUserTypeSelector',
      'oldRestrictions'
    ],
    'beta': [
      'noUserTypeSelector',
      'oldRestrictions',
      'betaLogo'
    ],
    'staging': [
      'userTypeSelector',
      'newRestrictions'
    ]
  };
  let features = allFeatures[__ENV__];

  const getFeatures = () => {
    /* globals __ENV__ */
    return features;
  };

  /**
   * Expects an object with show and hide and inside of them an array of feature names
   * @param userFeatures {Object}
   */
  const mergeFeatures = (userFeatures) => {
    if (userFeatures.show) {
      features = _.uniq(features.concat(userFeatures.show));
    }
    if (userFeatures.hide) {
      _.remove(features, function (feature) {
        return _.indexOf(userFeatures.hide, feature) !== -1;
      });
    }
  };

  return {
    getFeatures,
    mergeFeatures
  };
};

export {
  featureFlagDirective,
  featureFlagService
};
