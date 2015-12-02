(function () {
  'use strict';
  angular.module('app')
    .directive('AppDirective', AppDirective );

  function AppDirective () {
    var directive = {
      template: '',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {

    }
  }
})();
