var commandUtil = require('../match/match-util');
var config = require('../config/config');
var fs = require('fs');
var loadPhrases = require('../utils/loaders').loadPhrases;
var phrasesPath = config.corePhrasesJSON;
var commandsPath = config.coreCommandsJSON;
var commands;


var loadCommands = function () {
  commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));
  try {
    fs.readFileSync(phrasesPath);
  } catch (e) {
    fs.writeFileSync(phrasesPath, loadPhrases(commands));
  }
};

var getCommands = function () {
  return {
    phrasesPath: phrasesPath,
    commands: commands
  };
};

var addCommand = function () {
  loadCommands();
};

var delCommand = function () {
  loadCommands();
};

var updateCommand = function () {
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
