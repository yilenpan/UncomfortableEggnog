(function () {
  'use strict';
  angular.module('app')
    .controller('EditPackageCtrl', EditPackageCtrl);

  EditPackageCtrl.$inject = ['ApiFactory', '$state'];

  function EditPackageCtrl (ApiFactory, $state) {
    var self = this;
    var get = ApiFactory.get;
    var post = ApiFactory.post;
    self.commands = [];

    self.addCommand = function () {
      self.commands.push({
        command: '',
        action: ''
      });
    };

    get('/api/package/' + $state.params.packageName + '/edit')
      .then(function (result) {
        if (result.error) {
          $state.go('package', {packageName: $state.params.packageName});
        } else {
          self.package = result[0];
          console.log(self.package);
          for (var key in self.package.packageContents) {
            self.commands.push({
              command: key,
              action: self.package.packageContents[key]
            });
          }
        }
      });
    self.postEdit = function () {
      console.log(self.commands);
      self.package.packageContents = self.commands.reduce(function (commands, command) {
        commands[command.command] = command.action;
        return commands;
      }, {});
      console.log(self.package.packageContents);
      post('/api/package/' + $state.params.packageName + '/edit', self.package).then(function (data) {
        $state.go('package', {packageName: data.title});
      });
    };

  }
})();
