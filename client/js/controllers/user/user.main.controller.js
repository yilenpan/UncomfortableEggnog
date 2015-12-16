(function () {
  'use strict';
  angular.module('app')
    .controller('UserMainCtrl', UserMainCtrl);

  UserMainCtrl.$inject = ['ApiFactory', '$state'];

  function UserMainCtrl (ApiFactory, $state) {
    var self = this;

    self.fields = {
      username: $state.params.userName,
      email: '',
      website: '',
      packages: [],
      userLink: window.location.href,
      numPackages: 0,
      canEdit: false
      };

    self.countPackages = function (count) {
        if (count === 1) {
          return "1 package by " + self.fields.username;
        }
        if (count !== 1) {
          return count + " packages by " + self.fields.username;
        }
    };

    ApiFactory.get('/user/' + self.fields.username)
      .then(function (user) {
          self.fields.email = user.email;
          self.fields.website = user.website;
          console.log(window.location.hash, ('#/user/' + localStorage.username));
          if (window.location.hash === ('#/user/' + localStorage.username)) {
            self.fields.canEdit = true;
          }
      });

    ApiFactory.get('/api/users/' + self.fields.username + '/packages')
      .then(function (data) {
        self.fields.packages = data;
        self.fields.numPackages = self.countPackages(data.length);
      });
  }
})();


