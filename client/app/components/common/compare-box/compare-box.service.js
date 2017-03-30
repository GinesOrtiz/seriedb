const CompareBoxService = (UserService, $http, $q) => {
  'use strict';

  const API_URL = __API_URL__;
  const setParams = () => {
    return {
      filters: {},
      dimensions: ['day'],
      page: '1',
      order: 'day',
      sort: 'asc',
      rowsPerPage: '50',
      currency: UserService.getState().currency
    };
  };

  const getData = () => {
    let dfd = $q.defer();
    $http.get(`${API_URL}/stats/query`, {params: setParams()})
      .then(({data}) => {
        return dfd.resolve(data.total.publisher_conversion_amount);
      });

    return dfd.promise;
  };


  return {
    getData
  };
};

export default CompareBoxService;
