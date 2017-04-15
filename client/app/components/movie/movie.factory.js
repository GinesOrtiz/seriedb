const MovieFactory = ($http) => {
  'use strict';

  const API_URL = __API_URL__;

  const getMovie = (id) => {
    return $http.get(`${API_URL}/movie/${id}`)
      .then((res) => {
        return res.data;
      });
  };

  return {
    getMovie
  };
};

export default MovieFactory;