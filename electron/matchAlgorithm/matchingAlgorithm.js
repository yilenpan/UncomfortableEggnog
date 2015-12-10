var commandUtil = require('../../match/command-util');
var config = require('../config/config');
var fs = require('fs');
var loadPhrases = require('../utils/loaders').loadPhrases;

var readFile = function () {
  var phrasesPath = config.corePhrasesJSON;
  var commandsPath = config.coreCommandsJSON;
  var commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));
  try {
    fs.readFileSync(phrasesPath);
  } catch (e) {
    fs.writeFileSync(phrasesPath, loadPhrases(commands));
  }

  return {
    phrasesPath: phrasesPath,
    commands: commands
  };

};

var addCommand = function () {};

var delCommand = function () {};

var updateCommand = function () {};

module.exports = {
  readFile: readFile,
  cmdUtil: commandUtil.commandUtil,
  addPhrase: commandUtil.addPhrase,
  addCommand: addCommand,
  delCommand: delCommand,
  updateCommand: updateCommand
};
