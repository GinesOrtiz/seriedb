export default ($http, $state, filterFilter) => {
  'use strict';

  const API_URL = __API_URL__;

  const getSearchMulti = (params) => {
    console.log('search:', params);
    return $http.get(`${API_URL}/search/multi`, {params})
      .then((res) => {
        console.log('res', res);

        let filteredResult = filterFilter(res.data.results, {
          media_type: 'movie' //jshint ignore:line
        });
        console.log('res filtered', filteredResult);

        return filteredResult;
      });
  };

  return {
    getSearchMulti
  };
};