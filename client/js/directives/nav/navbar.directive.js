(function () {
  'use strict';
  angular.module('app')
    .directive('navBarDirective', NavBarDirective);

  function NavBarDirective () {
    var directive = {
      restrict: 'AE',
      templateUrl: 'js/html/nav/navbar.top.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      scope.searchTerm;

    }
  }
})();
