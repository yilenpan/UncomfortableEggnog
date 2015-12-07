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
        console.log(result);
        // TODO: if err, show err, else redirect
        // TODO: User page
        // refactor to jwt
        $state.go('main');
      });
    };

  }
})();
