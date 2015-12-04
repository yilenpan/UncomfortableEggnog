(function () {
  'use strict';
  angular.module('app')
    .controller('NavCtrl', NavCtrl);

  NavCtrl.$inject = ["ApiFactory"];

  function NavCtrl (ApiFactory) {
    var self = this;
    var get = ApiFactory.get;
    var post = ApiFactory.post;
    // TODO: Add search function

  }
})();
