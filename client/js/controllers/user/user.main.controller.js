(function () {
  'use strict';
  angular.module('app')
    .controller('UserMainCtrl', UserMainCtrl);

  UserMainCtrl.$inject = ['ApiFactory', '$state'];

  function UserMainCtrl (ApiFactory, $state) {
    var self = this;

    self.fields = {
      userName: $state.params.userName,
      fullName: '',
      email: '',
      website: '',
      packages: []
    };

    ApiFactory.get();

    ApiFactory.get('/api/users/' + self.fields.userName + '/packages')
      .then(function (data) {
        self.packages = data;
      });
  }
})();
