(function () {
  'use strict';
  angular.module('app')
    .directive('packageInfo', packageInfo);

  function packageInfo () {
    var directive = {
      restrict: 'E',
      templateUrl: 'js/html/packageInfo/packageInfo.html',
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
  }
})();

