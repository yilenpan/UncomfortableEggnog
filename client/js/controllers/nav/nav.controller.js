(function () {
  'use strict';
  angular.module('app')
    .controller('NavCtrl', NavCtrl);

  NavCtrl.$inject = ["ApiFactory", "$scope"];

  function NavCtrl (ApiFactory, $scope) {
    var self = $scope;
    var get = ApiFactory.get;
    var post = ApiFactory.post;
    // TODO: Add search function
    self.search = function (e) {
      console.log(e);
    };

  }
})();
