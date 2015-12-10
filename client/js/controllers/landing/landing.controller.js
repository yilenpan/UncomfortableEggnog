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
      self.packages = data;
    });

    self.likePackage = function (pckge) {
      var id = pckge._id;
      console.log(pckge);
      post('/api/package/' + id)
        .then(function (res) {
          console.log("RESPONSE");
          pckge.likes = pckge.likes + 1;
        });
    };
  }


})();
