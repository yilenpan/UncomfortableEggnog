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
    self.destroySession = function () {
      localStorage.removeItem('token', '');
      localStorage.removeItem('username', '');
    };
    self.isLoggedIn = function () {
      return localStorage.getItem('token') !== null;
    };
    self.getUserName = function () {
      return localStorage.getItem('username');
    };
    self.goToAccount = function () {
      $state.go('userPackages', {userName: self.getUserName()});
    };

  }
})();
