var commandUtil = require('../../match/command-util-yp');
var fs = require('fs');

var readFile = function () {
  var phrasesPath = __dirname + '/../../match/phrases.json';
  var commandsPath = __dirname + '/../../match/commands.json';
  var commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));

  return {
    phrasesPath: phrasesPath,
    commands: commands
  };

};

module.exports = {
  readFile: readFile,
  cmdUtil: commandUtil.commandUtil,
  addPhrase: commandUtil.addPhrase
};
