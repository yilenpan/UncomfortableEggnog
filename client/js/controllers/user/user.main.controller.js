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
      packages: []
    };

// console.log(self.fields.username);
    ApiFactory.get('/user/' + self.fields.username)
      .then(function (user) {
          //do something here
          console.log(user);
          self.fields.email = user.email;

      });

    ApiFactory.get('/api/users/' + self.fields.username + '/packages')
      .then(function (data) {
        console.log(data);
        self.fields.packages = data;
      });
  }
})();
