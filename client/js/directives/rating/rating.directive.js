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
        packageEntry: '=package'
      }
    };

    var post = ApiFactory.post;

    return directive;

    function link(scope, elem, attrs) {
      scope.submitReview = function () {
        var id = scope.packageEntry._id;
        post('/api/package/' + id, {
          stars: scope.score,
          totalStars: 5,
          review: scope.review
        })
          .then(function (res) {
            scope.review = "";
          });
      };


    }
  }
})();
