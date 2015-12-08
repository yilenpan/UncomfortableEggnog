(function () {
  'use strict';
  angular.module('app')
    .controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['ApiFactory', "$state", '$scope'];

  function SignUpCtrl (ApiFactory, $state, $scope) {
    var self = this;
    self.user = {};
    self.validity = '';

    self.errorMessages = {
      URL: 'Please enter a valid URL (Did you prefix your url with http://?).',
      email: 'Invalid email address.',
      minlength: 'Username is too short (4 to 12 characters allowed)',
      maxlength: 'Username is too long (4 to 12 characters allowed)',
      pattern: 'Please only use letters, numbers, and/or underscores in your username (no whitespaces allowed).',
      password: 'Your password did not match.'
    };

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
            self.errorList = [result.error];
        } else {
          console.log('result: ', result);
          $state.go('main');
        }
        // TODO: User page
        // refactor to jwt
      });
    };
    self.validateAndPost = function () {
      self.errorList = [];
        $('input:required').each(function (field, elem) {
          if ($scope.signupForm[elem.name].$dirty === false) {
            self.errorList.push('Please enter your ' + elem.name + '.');
            $(this).parent().addClass('has-error');
          } else if ($scope.signupForm[elem.name].$invalid) {
            $(this).parent().addClass('has-error');
            // self.errorList.push
          } else {
            $(this).parent().addClass('has-success');
            // console.log(elem);
          }
        });
      //check password match

      if (self.password !== self.passwordRepeat) {
        self.password = '';
        self.passwordRepeat = '';
        self.errorList.push(self.errorMessages[password]);
        $('input[type=password]').parent().addClass('has-error');
      }
    };

  }
})();
