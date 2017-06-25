function giphyAPIService($log, $http) {
  var API = 'd46f6be86154419dab1d59f376974885',
      apiHost = 'http://api.giphy.com/v1/gifs';
  var api = this;
  api.getGifs = getGifs;
  api.getGifsById = getGifsById;

  function getGifs(action, limit, offset, params) {
    var urlParams = params.length > 0 ? '&' + params.toString().replace(/,/g, '&') : '';
    return $http.get(apiHost + '/' + action + '?api_key=' + API + '&' + limit + '&offset=' + offset + urlParams)
        .then(function(response) {
          return response.data.data;
        })
        .catch(function(error) {
          $log.error('Error. \n' + angular.toJson(error.data, true));
        });
  }

  function getGifsById(id) {
    return $http.get('http://api.giphy.com/v1/gifs?api_key=' + API + '&ids=' + id)
        .then(function(response) {
          return response.data.data;
        })
        .catch(function(error) {
          $log.error('Error. \n' + angular.toJson(error.data, true));
        })
  }

}

angular.module('testApp')
    .service('giphyAPIService', giphyAPIService);