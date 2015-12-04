(function () {
  'use strict';

  angular.module('app')
    .config(config);

    // search results
    // user page to set profile pic, contact info, change password
    // login
    // sign up
    // add package view

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config ($stateProvider, $urlRouterProvider) {
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
            controller: 'LandingPageCtrl'
          }
        }
      })
      .state('package', {
        url: '/package/:packageName',
        views: {
          main: {
            templateUrl: 'js/html/package/package.main.html',
            controller: 'PackageCtrl'
          }
        }
      })
      .state('search', {
        url: '/search/:searchTerm',
        views: {
          main: {
            templateUrl: 'js/html/search/search.main.html',
            controller: 'SearchResultsCtrl'
          }
        }
      });
  }

})();
