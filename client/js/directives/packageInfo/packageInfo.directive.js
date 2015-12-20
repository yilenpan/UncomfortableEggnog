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
        pkg: '=pkg'
      },
      controller: function ($scope, PackageFactory) {
        $scope.getRating = PackageFactory.getRating;
        $scope.formatDate = PackageFactory.formatDate;
      }
    };

    return directive;

    function link(scope, elem, attrs) {
    }
  }
})();

