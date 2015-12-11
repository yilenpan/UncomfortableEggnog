var commandUtil = require('../match/match-util');
var config = require('../config/config');
var fs = require('fs');
var _ = require('underscore');
var loadPhrases = require('../utils/loaders').loadPhrases;
var phrasesPath = config.corePhrasesJSON;
// var commandsPath = config.coreCommandsJSON;
var commands, phrases;

var write = function (filePath, data) {
  fs.writeFileSync(filePath, data);
};

var loadCommands = function (commandsPath) {
  var tmpPhrases = {};
  commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));
  try {
    tmpPhrases = JSON.parse(fs.readFileSync(phrasesPath));
    write(phrasesPath, loadPhrases(tmpPhrases, commands));
  } catch (e) {
    write(phrasesPath, loadPhrases(tmpPhrases, commands));
  }
};

var getCommands = function () {
  return {
    phrasesPath: phrasesPath,
    commands: commands
  };
}

var addCommand = function (filePath, command) {
  write(filePath, _.defaults(commands, command));
  loadCommands();
};

var delCommand = function (filePath, command) {
  delete commands[command];
  write(filePath, commands);
  loadCommands();
};

var updateCommand = function (filePath, command) {
  write(filePath, _.extend(commands, command))
  loadCommands();
};

module.exports = {
  loadCommands: loadCommands,
  cmdUtil: commandUtil.commandUtil,
  getCommands: getCommands,
  addPhrase: commandUtil.addPhrase,
  addCommand: addCommand,
  delCommand: delCommand,
  updateCommand: updateCommand
};
