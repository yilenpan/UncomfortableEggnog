(function () {
  'use strict';
  angular.module('app')
    .controller('PackageCtrl', PackageCtrl);

  PackageCtrl.$inject = ["ApiFactory", "$state"];

  function PackageCtrl (ApiFactory, $state) {
    var self = this;
    var get = ApiFactory.get;
    var post = ApiFactory.post;
    var packageName = $state.params.packageName;
    self.hello = packageName;
    self.user;
    self.star = false;
    var init = function () {
      get('/api/package/' + packageName)
        .then(function (data) {
          self.info = data.package;
          self.user = data.user;
        });
    };
    // TODO: implement stars
    // Clicking it will add one like to the package
    // Clicking it again will remove the like from the package

    // self.toggleStar = function () {
    //   if (self.star) {
    //     post('/api/package/' + packageName, {likes: 1})
    //       .then(function (r) {
    //         self.star = !self.star;
    //       });
    //   } else {
    //     post('/api/package/' + packageName, {likes: -1})
    //       .then(function (r) {
    //         self.star = !self.star;
    //       });
    //   }
    // };
    init();
  }
})();
