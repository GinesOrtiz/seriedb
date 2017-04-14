export default ($http, $state) => {

    const API_URL = __API_URL__;

    const getSearchMulti = (params) => {
        console.log("search:", params);
        return $http.get(`${API_URL}/search/multi`, {params})
            .then((res) => {

                return res.data;
            })
    };


    return {
        getSearchMulti
    }
};