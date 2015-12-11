var commandUtil = require('../match/match-util');
var config = require('../config/config');
var fs = require('fs');
var _ = require('underscore');
var loadPhrases = require('../utils/loaders').loadPhrases;
var commands, phrases, phrasesPath;
var prefixTrie = require('../match/prefixTrie');

var write = function (filePath, data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  fs.writeFileSync(filePath, data);
};


var loadCommands = function (commandsPath) {
  var tmpPhrases = {};
  phrasesPath = commandsPath.replace('commands.', 'phrases.');
  commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));
  try {
    tmpPhrases = JSON.parse(fs.readFileSync(phrasesPath));
    write(phrasesPath, loadPhrases(tmpPhrases, commands));
  } catch (e) {
    write(phrasesPath, loadPhrases(tmpPhrases, commands));
  }
  var argCommands = ["open", "check the", "what is the", "look up the", "how is the", "google", "youtube", "Wikipedia"];
  prefixTrie.build(argCommands);
};


var getCommands = function () {
  return {
    phrasesPath: phrasesPath,
    commands: commands
  };
};


var addCommand = function (filePath, command) {
  write(filePath, _.defaults(commands, command));
  loadCommands(filePath);
};


var delCommand = function (filePath, command) {
  delete commands[command];
  write(filePath, commands);
  loadCommands(filePath);
};


var updateCommand = function (filePath, command) {
  write(filePath, _.extend(commands, command));
  loadCommands(filePath);
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
