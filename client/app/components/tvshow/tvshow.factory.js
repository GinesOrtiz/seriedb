export default ($http) => {
  'use strict';

  const API_URL = __API_URL__;

  const getTvshow = (id) => {
    return $http.get(`${API_URL}/tv/${id}`)
      .then((res) => {
        return res.data;
      });
  };

  const getSeason = (id, season) => {
    return $http.get(`${API_URL}/tv/${id}/season/${season}`)
      .then((res) => {
        return res.data;
      });
  };

  return {
    getTvshow,
    getSeason
  };
};