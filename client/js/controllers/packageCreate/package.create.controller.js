(function () {
  'use strict';
  angular.module('app')
    .controller('PackageCreateCtrl', PackageCreateCtrl);

  PackageCreateCtrl.$inject = ['ApiFactory', '$state'];

  function PackageCreateCtrl (ApiFactory, $state) {
    var self = this;

    // Start with empty fields.  Title and at least one command are required.
    self.fields = {
      title: '',
      description: '',
      commands: [],
      command: '',
      action: '',
      errorList: []
    };

    self.errorMessages = {
      title: 'Please only use letters and numbers.',
      command: 'Please only use letters, numbers, and spaces.'
    };

    self.isInputInvalid = function (input) {
      // console.log(input);
      return input.$dirty && input.$invalid;
    };

    self.isInputValid = function (input) {
      return input.$dirty && input.$valid;
    };

    self.setPristine = function (field) {
      if (field.$$lastCommittedViewValue === '') {
        field.$setPristine();
      }
    };

    self.validateAndPost = function () {
      console.log("here");
      var validated = true;
      self.fields.errorList = [];
      if (!self.fields.title) {
        self.fields.errorList.push('Please enter a valid title.');
        validated = false;
      }
      if (self.fields.commands.length < 1) {
        self.fields.errorList.push('Please add a valid command/action.');
        validated = false;
      }
      if (validated) {
        self.addPackage();
      }
    };

    // adds a command
    self.addCommand = function () {
      if (!self.command || !self.action) {
        self.fields.errorList.push('Please enter a command/action.');
      } else {
        self.fields.commands.push({
          command: self.command,
          action: self.action
        });
        self.command = '';
        self.action = '';
      }
    };

    self.addPackage = function () {
      var pkgContents = {};
      for (var i = 0; i < self.fields.commands.length; i++) {
        pkgContents[self.fields.commands[i].command] = self.fields.commands[i].action;
      }

      ApiFactory.post('/packages', {
        title: self.fields.title,
        description: self.fields.description,
        packageContents: pkgContents
      }).then(function (r) {
        // if successful, redirect to recently added package
        $state.go('package', {packageName: self.fields.title});
      });
    };

  }
})();

