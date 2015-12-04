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
    // TODO: uncomment when ready
    // get('/api/top10').then(function (data) {
    //   self.packages = data;
    // });
    var lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe sint nesciunt voluptates nam vitae error quasi possimus quas quam et incidunt nisi, doloribus aliquam excepturi, inventore cupiditate facere id commodi!";
    for (var i = 0; i < 10; i++) {
      self.packages.push(lorem);
    }
  }
})();
