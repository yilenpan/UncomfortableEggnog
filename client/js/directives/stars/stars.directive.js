(function () {
  'use strict';
  angular.module('app')
    .directive('stars', starsDirective);

  function starsDirective () {
    var directive = {
      restrict: 'AE',
      template: '<a ng-click="setRating($index)" ng-mouseover="hover($index)" \n\
        ng-mouseleave="stopHover()" ng-repeat="star in stars track by $index">\n\
        <i class="fa" ng-class=star></i></a>',
      link: link,
      scope: {
        max: '@',
        type: '@',
        score: '='
      }
    };

    return directive;

    function link(scope, elem, attrs) {
      scope.renderStars = function () {
        var index = 0;
        scope.stars = [];

        for (index = 0; index < scope.max; index++) {
          if (scope.score >= index + 1) {
            scope.stars.push('fa-star');
          } else if (scope.score > index) {
            scope.stars.push('fa-star-half-o');
          } else {
            scope.stars.push('fa-star-o');
          }
        }
      };

      scope.$watch('score', function (newValue, oldValue) {
        if (newValue !== null && newValue !== undefined) {
          scope.renderStars();
        }
      });

      scope.setRating = function (index) {
        if (scope.type === 'rating') {
          scope.score = Math.ceil(index + 1);
          console.log('changed rating to', scope.score);
        }
      };

      scope.hover = function (index) {
        scope.hoverIndex = index;
      };

      scope.stopHover = function () {
        scope.hoverIndex = -1;
      };

      scope.starColor = function (index) {
        var starClass = 'rating-normal';
        if (scope.type === 'rating' && star.full || index <= scope.hoverIndex) {
         starClass = 'rating-highlight';
        }
        return starClass;
      };
      scope.renderStars();
    }
  }
})();
