(function () {
  'use strict';
  angular.module('app')
    .controller('NavCtrl', NavCtrl);

  NavCtrl.$inject = ["ApiFactory", "$scope", "$state"];

  function NavCtrl (ApiFactory, $scope, $state) {
    var self = $scope;
    var get = ApiFactory.get;
    var post = ApiFactory.post;
    // TODO: Add search function
    self.search = function (term) {
      $state.go('search', {
        searchTerm: term
      });
    };

  }
})();
