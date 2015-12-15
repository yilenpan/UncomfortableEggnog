(function () {
  'use strict';
  angular.module('app')
    .controller('EditUserCtrl', EditUserCtrl);

  EditUserCtrl.$inject = ['ApiFactory', '$state', '$scope', 'SignUpFactory'];

  function EditUserCtrl (ApiFactory, $state, $scope, SignUpFactory) {
    var self = this;

    self.fields = {
      "currentUsername": localStorage.username,
      "email": {
        required: true,
        value: 'example@email.com'
      },
      "website": {
        required: false,
        value: ''
      },
      "first name": {
        required: true,
        value: ''
      },
      "last name": {
        required: true,
        value: ''
      },
      "username": {
        required: true,
        value: localStorage.username
      },
      "password": {
        required: true,
        value: '',
        strength: 0
      },
      "password repeat": {
        required: false,
        value: ''
      }
    };

    self.errorMessages = {
      website: 'Please enter a valid URL (Did you prefix your website with http://?).',
      email: 'Invalid email address.',
      minlength: 'Username is too short (4 to 12 characters allowed)',
      maxlength: 'Username is too long (4 to 12 characters allowed)',
      pattern: 'Please only use letters, numbers, and/or underscores in your username (no whitespaces allowed).',
      password: 'Your password did not match.'
    };


    ApiFactory.get('/user/' + self.fields.username.value + '/edit')
      .then(function (user) {
        console.log(user);
        self.fields["first name"].value = user["first name"];
        self.fields["last name"].value = user["last name"];
        self.fields.email.value = user.email;
        self.fields.website.value = user.website;
      });

    self.isPassStrengthStrong = function () {
      return self.fields.password.strength > 70;
    };
    self.isPassStrengthGood = function () {
      return self.fields.password.strength > 30 && self.fields.password.strength <= 70;
    };
    self.isPassStrengthWeak = function () {
      return self.fields.password.strength <= 30;
    };

    self.post = function () {
      var user = {};
      for (var key in self.fields) {
        var field = self.fields[key];
        if (key !== 'password repeat' && field.value !== '') {
          user[key] = field.value;
        }
      }
      ApiFactory.post('/signup', user)
        // username: self.fields.username.value,
        // password: self.fields.password.value
      .then(function (result) {
        if (result.error) {
          self.errorList = [result.error];
          self.fields.password.value = '';
          self.fields['password repeat'].value = '';
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

    $scope.$watch('su.fields.password.value', function (pass) {
      var strength = SignUpFactory.getPasswordStrength(pass);
      self.fields.password.strength = strength;
    });


    self.validateAndPost = function () {
      var validated = true;
      self.errorList = [];
      $scope.signupForm.$setDirty(true);
          for (var key in self.fields) {
            var field = self.fields[key];
            if (field.required) {
              if (!field.value) {
                $scope.signupForm[key].$dirty = true;
                self.errorList.push('Please enter your ' + key + '.');
                validated = false;
              }
            }
          }
      //check password validation
      if (self.fields.password.value !== self.fields['password repeat'].value) {
        self.fields.password.value = '';
        self.fields['password repeat'].value = '';
        self.errorList.push(self.errorMessages.password);
        $scope.signupForm['password'].$dirty = true;
        $scope.signupForm['password'].$pristine = false;
        $scope.signupForm['password repeat'].$dirty = true;
        $scope.signupForm['password repeat'].$pristine = false;

        validated = false;
      }

      if (validated) {
        self.post();
      }
    };

    self.isInputInvalid = function (input) {
      return input.$dirty && input.$invalid;
    };

    self.isInputValid = function (input) {
      return input.$dirty && input.$valid && !(input.$error.minlength);
    };

    self.setPristine = function (field) {
      if (field.$$lastCommittedViewValue === '') {
        field.$setPristine();
      }
    };

  }
})();
