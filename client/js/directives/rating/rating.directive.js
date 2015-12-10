(function () {
  'use strict';
  angular.module('app')
    .directive('rating', cards);

  function RatingDirective () {
    var directive = {
      restrict: 'AE',
      templateUrl: 'js/html/nav/navbar.top.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      console.log('ratings');
    }
  }
})();