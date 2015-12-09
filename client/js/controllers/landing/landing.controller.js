(function () {
  'use strict';
  angular.module('app')
    .controller('LandingPageCtrl', LandingPageCtrl);

  LandingPageCtrl.$inject = ['ApiFactory'];

  function LandingPageCtrl (ApiFactory) {
    var self = this;
    var get = ApiFactory.get;
    var post = ApiFactory.post;
    self.packages = [];
    get('/api/top10').then(function (data) {
      console.log(data);
      self.packages = data.body;
    });

  }
})();
