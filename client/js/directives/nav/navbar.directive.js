(function () {
  'use strict';
  angular.module('app')
    .directive('NavBarDirective', NavBarDirective);

  function NavBarDirective () {
    var directive = {
      restrict: 'AE',
      template: 'js/html/nav/navbar.top.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      scope.searchTerm;

    }
  }
})();
