(function () {
  'use strict';
  angular.module('app')
    .controller('PackageCtrl', PackageCtrl);

  PackageCtrl.$inject = ["ApiFactory", "$state"];

  function PackageCtrl (ApiFactory, $state) {
    var self = this;
    var packageName = $state.params.packageName;
    self.hello = packageName;
    self.user;
    var init = function () {
      ApiFactory.get('/api/package/' + packageName)
        .then(function (data) {
          if (data === "Not Found") {
            $state.go('main');
          }
          self.info = data.package;
          self.user = data.user;
          if (self.user.username === localStorage.username) {
            self.canEditPackage = true;
          }
        });
    };

    init();
  }
})();
