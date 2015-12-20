(function () {
  'use strict';
  angular.module('app')
    .directive('packageInfo', packageInfo);

  function packageInfo () {
    var directive = {
      restrict: 'E',
      templateUrl: 'js/html/packageInfo/packageInfo.html',
      link: link,
      scope: {
        pkg: '=pkg',
        view: '@'
      },
      controller: function ($scope, PackageFactory) {
        $scope.getRating = PackageFactory.getRating;
        $scope.formatDate = PackageFactory.formatDate;
      },
      replace: true
    };

    return directive;

    function link(scope, elem, attrs) {
      console.log(scope.view);
      if (scope.view === "card") {
        scope.pkg.description = scope.pkg.description.slice(0, 85);
        scope.pkg.title = scope.pkg.title.slice(0, 12);

      }
    }
  }
})();

