export default /*@ngInject*/ ($http) => {
  'use strict';

  const API_URL = __API_URL__;

  const getSearchMulti = (params) => {
    return $http.get(`${API_URL}/search/multi`, {params})
      .then((res) => {

        let filteredResult = {
          page: res.data.page,
          totalPages: res.data.total_pages, //jshint ignore:line
          results: []
        };

        res.data.results.forEach((item) => {
          if (item.media_type === 'movie' || item.media_type === 'tv') {  //jshint ignore:line
            filteredResult.results.push(item);
          }
        });

        return filteredResult;
      });
  };

  return {
    getSearchMulti
  };
};