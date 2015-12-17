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
        info: '='
      }
    };

    return directive;

    function link(scope, elem, attrs) {
      console.log('cards');
    }
  }
})();

