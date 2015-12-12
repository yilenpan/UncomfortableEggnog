var matchUtil = require('../match/match-util');
var config = require('../config/config');
var fs = require('fs');
var _ = require('underscore');
var loadPhrases = require('../utils/loaders').loadPhrases;
var prefixTrie = require('../match/prefixTrie');
var save = require('../utils/utils').save;
var write = require('../utils/utils').write;

module.exports.saveCommands = function (obj) {
  if (typeof obj === 'object') {
    obj = JSON.stringify(obj);
  }
  save('Commands', obj);
};


var get = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

module.exports.loadPackage = function (commandsPath) {
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


module.exports.addCommand = function (command) {
  var newCommandsObj = _.extend({}, this.getCommands());
  newCommandsObj.commands = _.extend(this.getCommands().commands, command);
  console.log(newCommandsObj);
  module.exports.saveCommands(newCommandsObj);
  write(newCommandsObj.commandsPath, newCommandsObj.commands);
  module.exports.addPhrase(Object.keys(command)[0], Object.keys(command)[0]);
};


module.exports.delCommand = function (command) {
  var commandsObj = this.getCommands();
  delete commandsObj.commands[command];
  delete commandsObj.phrases[command];
  this.saveCommands(commandsObj);
  write(commandsObj.commandsPath, commandsObj.commands);
  write(commandsObj.phrasesPath, commandsObj.phrases);
};


module.exports.updateCommand = function (command, action, oldCommand) {
  var commandsObj = this.getCommands();
  if (oldCommand === command) {
    commandsObj.commands[command] = action;
  } else {
    delete commandsObj.commands[oldCommand];
    delete commandsObj.phrases[oldCommand];
    module.exports.addPhrase(command, command);
    commandsObj.commands[command] = action;
  }
  module.exports.saveCommands(commandsObj);
  write(newCommandsObj.commandsPath, newCommandsObj.commands);
};

module.exports.addPhrase = function (correctCommand, userCommand) {
  var commandsObj = this.getCommands();
  console.log(commandsObj);
  commandsObj.phrases[correctCommand] = commandsObj.phrases[correctCommand] || [];
  commandsObj.phrases[correctCommand].push(userCommand);
  module.exports.saveCommands(commandsObj);
  write(commandsObj.phrasesPath, commandsObj.phrases);
};
