(function () {
  'use strict';
  angular.module('app')
    .factory('Factory', Factory);
  Factory.$inject = [];

  function Factory() {
    var services = {
      getService: getService
    };
    return services;

    function getService () {

    }
  }

})();
