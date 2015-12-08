(function () {
  'use strict';
  angular.module('app')
    .controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['ApiFactory', "$state"];

  function SignUpCtrl (ApiFactory, $state) {
    var self = this;
    self.user = {};
    self.post = function () {
      console.log(self.user);
      ApiFactory.post('/signup', {
        username: self.username,
        password: self.password
      }).then(function (result) {
        // TODO: if err, show err, else redirect
        self.user.username = '';
        self.user.password = '';
        if (result.error) {
          // if (result.errorType === 'username') {
          //   console.log(result.error);
          //   self.usernameError = result.error;
          //   console.log('error: ', result.error);
          // } else {
            self.defaultErrorMsg = result.error;
          // }
        } else {
          console.log('result: ', result);
          $state.go('main');
        }
        // TODO: User page
        // refactor to jwt
      });
    };

  }
})();
