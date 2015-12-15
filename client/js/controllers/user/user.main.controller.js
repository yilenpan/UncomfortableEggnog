(function () {
  'use strict';
  angular.module('app')
    .controller('UserMainCtrl', UserMainCtrl);

  UserMainCtrl.$inject = ['ApiFactory', '$state'];

  function UserMainCtrl (ApiFactory, $state) {
    var self = this;

    self.fields = {
      username: $state.params.userName,
      fullName: '',
      email: '',
      website: '',
      packages: [],
      userLink: window.location.href
    };

    ApiFactory.get('/user/' + self.fields.username)
      .then(function (user) {
          self.fields.email = user.email;
          self.fields.website = user.website;
      });

    ApiFactory.get('/api/users/' + self.fields.username + '/packages')
      .then(function (data) {
        self.fields.packages = data;
      });
  }
})();


