(function () {
  'use strict';

  angular.module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        views: {
          top: {
            templateUrl: 'js/html/landing/landing.top.html',
            controller: 'NavCtrl'
          },
          main: {
            templateUrl: 'js/html/landing/landing.main.html',
            controller: 'MainPageCtrl'
          }
        }
      })
      .state('package', {
        url: '/package/:packageName',
        views: {
          top: {
            templateUrl: 'js/html/nav/navbar.top.html',
            controller: 'NavCtrl'
          },
          main: {
            templateUrl: 'js/html/package/package.main.html',
            controller: 'PackageCtrl'
          }
        }
      });
  }

})();
