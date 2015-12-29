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

  function link(scope, elem, attrs) {
    scope.$watch('packageEntry', function(newValue, oldValue) {
      console.log(typeof newValue);
      if (newValue !== oldValue) console.log('entry', scope.packageEntry, scope.packageUser);
    });

    scope.submitReview = function () {
      var id = scope.packageEntry._id;
      if (scope.user.ownPackage || scope.user.prevReview) {
        console.log('own package or....!');
        if (scope.user.prevReview) console.log('already submitted');
        return;
      }

      post('/api/package/' + id, {
        stars: scope.score,
        totalStars: 5,
        contents: scope.review
      })
        .then(function (res) {
          scope.review = "";
        });
      };
    }
  }
})();
