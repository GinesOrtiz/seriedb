export default /*@ngInject*/ ($http) => {
  'use strict';
  const API_URL = __API_URL__;

  const getDiscoverMovies = () => {
    return $http.get(`${API_URL}/discover/movie`)
      .then((res) => {
        return res.data;
      });
  };

  const getDiscoverTV = () => {
    return $http.get(`${API_URL}/discover/tv`)
      .then((res) => {
        return res.data;
      });
  };


  return {
    getDiscoverMovies,
    getDiscoverTV
  };
};