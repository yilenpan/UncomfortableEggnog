(function () {
  'use strict';
  angular.module('app')
    .controller('SearchResultsCtrl', SearchResultsCtrl);

  SearchResultsCtrl.$inject = [];

  function SearchResultsCtrl () {
    var self = this;
    self.search;

  }
})();
