var commandUtil = require('../match/match-util');
var config = require('../config/config');
var fs = require('fs');
var _ = require('underscore');
// Returns string
var loadPhrases = require('../utils/loaders').loadPhrases;
var commandObj = {};
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
  commandObj.phraseObj = loadPhrases(phrasesPath, commands);
  var argCommands = ["open", "check the", "what is the", "look up the", "how is the", "google", "youtube", "Wikipedia"];
  prefixTrie.build(argCommands);
};


var getCommands = function () {
  commandObj.phrasesPath = phrasesPath;
  commandObj.commands = commands;
  return commandObj;
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

var updatePhrases = function (newPhraseObj) {
  console.log('updatePhrases');
  commandObj.phraseObj[newPhraseObj.phrase].push(newPhraseObj.inputPhrase);
};

module.exports = {
  loadCommands: loadCommands,
  cmdUtil: commandUtil.commandUtil,
  getCommands: getCommands,
  addPhrase: commandUtil.addPhrase,
  addCommand: addCommand,
  delCommand: delCommand,
  updateCommand: updateCommand,
  updatePhrases: updatePhrases
};
