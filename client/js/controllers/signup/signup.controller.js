(function () {
  'use strict';
  angular.module('app')
    .controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['ApiFactory', "$state", '$scope', 'SignUpFactory'];

  function SignUpCtrl (ApiFactory, $state, $scope, SignUpFactory) {
    var self = this;
    self.user = {};
    self.passwordStrengthNum = 0;
    // self.passwordColor = 'white';

    self.errorMessages = {
      URL: 'Please enter a valid URL (Did you prefix your url with http://?).',
      email: 'Invalid email address.',
      minlength: 'Username is too short (4 to 12 characters allowed)',
      maxlength: 'Username is too long (4 to 12 characters allowed)',
      pattern: 'Please only use letters, numbers, and/or underscores in your username (no whitespaces allowed).',
      password: 'Your password did not match.'
    };

    self.isPassStrengthStrong = function () {
      return self.passwordStrengthNum > 70;
    };
    self.isPassStrengthGood = function () {
      return self.passwordStrengthNum > 30 && self.passwordStrengthNum <= 70;
    };
    self.isPassStrengthWeak = function () {
      return self.passwordStrengthNum <= 30;
    };
    // {
    //   weak: 'red',
    //   good: 'yellow',
    //   strong: 'green'
    // };
    self.post = function () {
      console.log(self.user);
      ApiFactory.post('/signup', {
        username: self.username,
        password: self.password
      }).then(function (result) {
        if (result.error) {
          self.errorList = [result.error];
// =======
          self.username = '';
          self.password = '';
        // if (result.errorType === 'username') {
          // console.log(result.error);
          // self.usernameError = result.error;
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
          $state.go('login');
          // if for some reason no token, redirect to login
        }
      });
    };

    $scope.$watch('su.password', function (pass) {
      var strength = SignUpFactory.getPasswordStrength(pass);
      self.passwordStrengthNum = strength;
      // console.log(pass);
      // self.passStrength = SignUpFactory.checkPasswordStrength(strength);
    });


    self.validateAndPost = function () {
      self.errorList = [];
        $('.required').each(function (field, elem) {
          if ($scope.signupForm[elem.name].$dirty === false) {
            self.errorList.push('Please enter your ' + elem.name + '.');
            $(this).parent().addClass('has-error');
          } else if ($scope.signupForm[elem.name].$invalid) {
            $(this).parent().addClass('has-error');
          } else {
            $(this).parent().addClass('has-success');
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

    self.isInputValid = function (input) {
      return input.$dirty && input.$invalid;
    };

  }
})();
