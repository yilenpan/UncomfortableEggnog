(function () {
  'use strict';
  angular.module('app')
    .factory('ApiFactory', ApiFactory);
  ApiFactory.$inject = ['$http'];


  function ApiFactory ($http) {
    var services = {
      get : get,
      post: post
    };
    return services;

    function parse (results) {
      return results.data;
    }
    /**
     * Makes a get request
     *
     * @param {string} url -  url of endpoint
     * @return {object}
     */

    function get (url) {
      return $http({
        method: 'GET',
        url: url
      }).then(parse);
    }

    /**
     * Makes a post request
     *
     * @param {string} url - url end point
     * @param {object} data - data to be sent to end point
     * @return {object}
     */

    function post (url, data) {
      return $http({
        method: 'POST',
        url: url,
        data: data
      }).then(parse);
    }
  }

})();
