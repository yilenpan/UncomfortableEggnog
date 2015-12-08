(function () {
  'use strict';
  angular.module('app')
    .controller('PackageCreateCtrl', PackageCreateCtrl);

  PackageCreateCtrl.$inject = ['ApiFactory'];

  function PackageCreateCtrl (ApiFactory) {
    var self = this;
    var post = ApiFactory.post;
    self.commands = [
      {
        command: '',
        action: ''
      }
    ];
    self.addCommand = function () {
      self.commands.push({
        command: '',
        action: ''
      });
    };
    self.addPackage = function () {
      self.packageContents = self.commands.reduce(function (commands, command) {
        commands[command.command] = command.action;
        return commands;
      }, {});
      post('/packages', {
        username: 'Fred', //TODO: REMOVE
        title: self.title,
        description: self.description,
        packageContents: self.packageContents
      }).then(function (r) {
        $state.go('package({packageName:' + self.title + ' })');
      });
    };

  }
})();
