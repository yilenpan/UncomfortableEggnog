(function () {
  'use strict';
  angular.module('app')
    .controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['ApiFactory', "$state"];

  function SignUpCtrl (ApiFactory, $state) {
    var self = this;
    self.post = function () {
      ApiFactory.post('/signup', {
        username: self.username,
        password: self.password
      }).then(function (result) {
        self.username = '';
        self.password = '';
        if (result.errorType === 'username') {
          console.log(result.error);
          self.usernameError = result.error;
          console.log('error: ', result.error);
        } else if (result.token) {
          // Should return with a token
            // if token, store it in local
            // if username, store that in local as well
          localStorage.setItem('token', result.token);
          localStorage.setItem('username', result.username);
          // Redirect to userPackages page
          $state.go('userPackages', {userName: result.username});

        } else {
          // if for some reason no token, redirect to login
          $state.go('login');
        }
      });
    };

  }
})();
