var matchUtil = require('../match/match-util');
var config = require('../config/config');
var fs = require('fs');
var _ = require('underscore');
var loadPhrases = require('../utils/loaders').loadPhrases;
var prefixTrie = require('../match/prefixTrie');

var write = function (filePath, data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  fs.writeFileSync(filePath, data);
};

module.exports.saveCommands = function (obj) {
  if (typeof obj === 'object') {
    obj = JSON.stringify(obj);
  }
  save('Commands', obj);
};

var save = function (name, obj) {
  localStorage.setItem('Commands', obj);
};

var get = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

module.exports.loadCommands = function (commandsPath) {
  var commandObj = {};
  var rawCommands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));
  commandObj.commands = rawCommands; // TODO: parse into pure and arg
  commandObj.commandsPath = commandsPath;
  commandObj.phrasesPath = commandsPath.replace('commands.', 'phrases.');
  commandObj.phrases = loadPhrases(commandObj.phrasesPath, commandObj.commands);
  var argCommands = ["open", "check the", "what is the", "look up the", "how is the", "google", "youtube", "Wikipedia"];
  prefixTrie.build(argCommands);
  module.exports.saveCommands(commandObj);
};


module.exports.getCommands = function () {
  return get('Commands');
};


module.exports.addCommand = function () {

};


module.exports.delCommand = function () {

};


module.exports.updateCommand = function () {

};

module.exports.addPhrase = function (correctCommand, userCommand) {
  var commandsObj = this.getCommands();
  console.log(commandsObj);
  commandsObj.phrases[correctCommand].push(userCommand);
  module.exports.saveCommands(commandsObj);
  write(commandsObj.commandsPath, commandsObj.commands);
  write(commandsObj.phrasesPath, commandsObj.phrases);
};
