(function () {
  'use strict';
  angular.module('app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['ApiFactory', "$state"];

  function LoginCtrl (ApiFactory, $state) {
    var self = this;
    self.post = function () {
      ApiFactory.post('/login', {
        username: self.username,
        password: self.password
      }).then(function (result) {
        // TODO: if err, show err, else redirect
          self.username = '';
          self.password = '';
          self.errorMessage = '';

        if (result.error) {
            self.errorMessage = result.error;
          // otherwise password / default error;
        } else {
          $state.go('main');
        }
        // TODO: User page
        // refactor to jwt
      });
    };

  }
})();
