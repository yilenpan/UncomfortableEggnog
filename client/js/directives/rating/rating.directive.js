(function () {
  'use strict';
  angular.module('app')
    .directive('rating', RatingDirective);

  function RatingDirective (ApiFactory) {
    var directive = {
      restrict: 'AE',
      templateUrl: 'js/html/rating/rating.main.html',
      link: link,
      scope: {
        score: '=',
        review: '=review',
        packageEntry: '=package',
        user: '='
      }
    };

    var post = ApiFactory.post;

    return directive;
  }

  function link(scope, elem, attrs) {
    // scope.$watch('user', function(newValue, oldValue) {
    //   console.log(typeof newValue);
    //   if (newValue !== oldValue) console.log(scope.user);
    // });
    scope.submitReview = function () {
      var id = scope.packageEntry._id;

      post('/api/package/' + id, {
        stars: scope.score,
        totalStars: 5,
        review: scope.review,
        user: scope.user
      })
        .then(function (res) {
          scope.review = "";
        });
    };
  }
})();
