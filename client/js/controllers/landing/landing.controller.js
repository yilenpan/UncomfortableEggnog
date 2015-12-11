(function () {
  'use strict';
  angular.module('app')
    .controller('LandingPageCtrl', LandingPageCtrl);

  LandingPageCtrl.$inject = ['ApiFactory'];

  function LandingPageCtrl (ApiFactory) {
    console.log("contrller");
    var self = this;
    var get = ApiFactory.get;
    var post = ApiFactory.post;
    self.packages = [];
    self.averages = [];
    get('/api/top10').then(function (data) {
      self.packages = data;
      calculateAvg();
    });

    function calculateAvg () {
      var avg;
      for (var i = 0; i < self.packages.length; i++) {
        avg = parseInt(self.packages[i].stars / self.packages[i].countReviews * 20);
        self.packages[i].average = avg || 0;
      }
    }
  }


})();
