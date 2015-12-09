(function () {
  'use strict';
  angular.module('app')
    .controller('UserPackagesCtrl', UserPackagesCtrl);

  UserPackagesCtrl.$inject = ['ApiFactory', '$state'];

  function UserPackagesCtrl (ApiFactory, $state) {
    var self = this;
    var get = ApiFactory.get;
    var userName = $state.params.userName;
    get('/api/users/' + userName + '/packages')
      .then(function (data) {
        self.packages = data;
        console.log(self.packages);
      });
  }
})();
