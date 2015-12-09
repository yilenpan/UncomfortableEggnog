(function () {
  'use strict';
  angular.module('app')
    .controller('PackageCreateCtrl', PackageCreateCtrl);

  PackageCreateCtrl.$inject = ['ApiFactory', "$state"];

  function PackageCreateCtrl (ApiFactory, $state) {
    var self = this;
    var post = ApiFactory.post;
    // Start with empty command
    self.commands = [
      {
        command: '',
        action: ''
      }
    ];
    // adds a command
    self.addCommand = function () {
      self.commands.push({
        command: '',
        action: ''
      });
    };
    self.addPackage = function () {
      // we reduce over the commands and return {command: action} structure
      self.packageContents = self.commands.reduce(function (commands, command) {
        commands[command.command] = command.action;
        return commands;
      }, {});

      post('/packages', {
        title: self.title,
        description: self.description,
        packageContents: self.packageContents
      }).then(function (r) {
        // if successful, redirect to recently added package
        $state.go('package', {packageName: self.title});
      });
    };

  }
})();
