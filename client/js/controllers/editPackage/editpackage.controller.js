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

    // makes a get request to the edit route of the package
    get('/api/package/' + $state.params.packageName + '/edit')
      .then(function (result) {
        // Server side, we check to see that the user and the package match
        if (result.error) {
          // if error, we go to the package page, no editing allowed
          $state.go('package', {packageName: $state.params.packageName});
        } else {
          // else we set self.package to the returned obj
          self.package = result[0];
          // We build our commands array by iterating over the packageContents
          for (var key in self.package.packageContents) {
            self.commands.push({
              command: key,
              action: self.package.packageContents[key]
            });
          }
        }
      });

    self.postEdit = function () {
      // Here we are building the packageContents from the commands array
      self.package.packageContents = self.commands.reduce(function (commands, command) {
        commands[command.command] = command.action;
        return commands;
      }, {});

      // send server the new package
      post('/api/package/' + $state.params.packageName + '/edit', self.package)
        .then(function (data) {
          // redirects to new package page
          $state.go('package', {packageName: data.title});
        });
    };

  }
})();
