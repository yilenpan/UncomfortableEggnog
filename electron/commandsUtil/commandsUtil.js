var matchUtil = require('../match/match-util');
var config = require('../config/config');
var fs = require('fs');
var _ = require('underscore');
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
  commandObj.phrasesPath = commandsPath.replace('commands.', 'phrases.');
  commandObj.commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));
  commandObj.phraseObj = loadPhrases(commandObj.phrasesPath, commandObj.commands);
  var argCommands = ["open", "check the", "what is the", "look up the", "how is the", "google", "youtube", "Wikipedia"];
  prefixTrie.build(argCommands);
};


var getCommands = function () {
  return commandObj;
};


var addCommand = function (filePath, command) {
  _.defaults(commandObj.phraseObj, command);
  write(filePath, _.defaults(commandObj.commands, command));
  loadCommands(filePath);
};


var delCommand = function (filePath, command) {
  delete commandObj.commands[command];
  write(filePath, commandObj.commands);
  loadCommands(filePath);
};


var updateCommand = function (filePath, command) {
  write(filePath, _.extend(commandObj.commands, command));
  loadCommands(filePath);
};

var updatePhrases = function (newPhraseObj) {
  commandObj.phraseObj[newPhraseObj.phrase].push(newPhraseObj.inputPhrase);
};

var addPhrase = function (newPhraseObj, cb) {
  updatePhrases(newPhraseObj);
  matchUtil.addPhrase(newPhraseObj, cb);
};

module.exports = {
  loadCommands: loadCommands,
  cmdUtil: matchUtil.matchUtil,
  getCommands: getCommands,
  addPhrase: addPhrase,
  addCommand: addCommand,
  delCommand: delCommand,
  updateCommand: updateCommand,
  updatePhrases: updatePhrases
};
