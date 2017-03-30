import _ from 'lodash';

const localStorageService = ($localStorage) => {
  'use strict';
  const USER_TYPE = 'panel-';

  /**
   *
   * @param key       -- It can be an string or an array
   * @param value     -- It can be an string or an array
   * @param {boolean} original  -- will create with window.localStorage to prevent deletion with
   *     .clearAll
   * @param withUserType {boolean} -- will add the USER_TYPE to the key requested, by default is
   *     TRUE
   */
  const setItem = (key, value, original, withUserType = true) => {
    function saveItem(key, value) {
      if (original) {
        window.localStorage[key] = value;
      }
      else {
        if (withUserType) {
          $localStorage[USER_TYPE + key] = value;
        }
        else {
          $localStorage[key] = value;
        }
      }
    }

    if (_.isArray(key) && _.isArray(value)) {
      key.forEach(function (mkey, mval) {
        saveItem(mkey, value[mval]);
      });
    }
    else {
      saveItem(key, value);
    }
  };

  /**
   *
   * @param key
   * @param {boolean} withUserType -- prepends the USER_TYPE to the key
   */
  const deleteItem = (key, withUserType) => {
    let localKey = withUserType ? USER_TYPE + key : key;
    delete $localStorage[localKey];
  };

  const isDefined = (key, withUserType) => {
    let localKey = withUserType ? USER_TYPE + key : key;
    return !!$localStorage[localKey];
  };

  const getItem = function (key, withUserType) {
    let localKey = withUserType ? USER_TYPE + key : key;
    if (isDefined(localKey, withUserType)) {
      return $localStorage[localKey].replace(/\"/g, '');
    }
    else {
      return $localStorage[localKey];
    }
  };

  const saveToken = (token) => {
    $localStorage[`${USER_TYPE}token`] = token;
  };

  const saveUserTypeId = (id, role) => {
    $localStorage[`${USER_TYPE}id`] = id;
    $localStorage[`${USER_TYPE}role`] = role;
  };

  const cleanAll = () => {
    $localStorage.$reset();
  };

  return {
    getItem,
    setItem,
    deleteItem,
    saveUserTypeId,
    saveToken,
    isDefined,
    cleanAll
  };
};

export default localStorageService;
