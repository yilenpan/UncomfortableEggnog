(function () {
  'use strict';
  angular.module('app')
    .directive('cards', cards);

  function cards () {
    var directive = {
      restrict: 'AE',
      template: '<h1>Hello</h1>',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      console.log('cards');
    }
  }
})();
