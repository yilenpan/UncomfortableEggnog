var cmdUtil = require('../../match/command-util').commandUtil;
var fs = require('fs');

var readFile = function () {
  var commandsPath = __dirname + '/../../match/commands.json';
  var commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));

  return {
    commandsPath: commandsPath,
    commands: commands
  };

};

module.exports = {
  readFile: readFile,
  cmdUtil: cmdUtil
};

