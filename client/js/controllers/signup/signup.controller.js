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
        // TODO: if err, show err, else redirect
        self.username = '';
        self.password = '';
        if (result.errorType === 'username') {
          console.log(result.error);
          self.usernameError = result.error;
          console.log('error: ', result.error);
        } else if (result.token) {
          console.log("inside controller" + result.token);
          localStorage.setItem('token', result.token);
          $state.go('main');
        } else {
          $state.go('login');
        }
      });
    };

  }
})();
