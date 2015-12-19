(function () {
  'use strict';
  angular.module('app')
    .directive('stars', starsDirective);

  function starsDirective () {
    var directive = {
      restrict: 'AE',
      template: '<a ng-click="setRating($index)" ng-mouseover="hover($index)" \n\
        ng-mouseleave="stopHover()" ng-repeat="star in stars">\n\
        <i class="fa" ng-class="starClass(star, $index)"></i></a>',
      // controller: function (scope, element) {
      //   if (attrs.type === "rating") {
      //     // $compile()
      //   }
      //     },
      link: link,
      // replace: 'true',
      scope: {max: '@'}
    };

    return directive;

    function link(scope, elem, attrs) {
      scope.updateStars = function () {
        var index = 0;
        scope.stars = [];
        for (index = 0; index < scope.max; index++) {
          scope.stars.push({
            full: scope.score > index
          });
        }
      };
      scope.starClass = function (star, index) {
        var starClass = 'fa-star-o';
        if (scope.stars[index].full) {
          starClass = 'fa-star';
        }

        return starClass;
      };

      scope.$watch('score', function (newValue, oldValue) {
        if (newValue !== null && newValue !== undefined) {
          scope.updateStars();
        }
      });

      scope.setRating = function (index) {
        scope.score = index + 1;
      };
      scope.hover = function (index) {
        scope.hoverIndex = index;
      };

      scope.stopHover = function () {
        scope.hoverIndex = -1;
      };

      scope.starColor = function (index) {
        console.log(index);
        var starClass = 'rating-normal';
        if (star.full || index <= scope.hoverIndex) {
         starClass = 'rating-highlight';
        }
        return starClass;
      };
      scope.updateStars();
      console.log('stars');
    }
  }
})();
