var fs = require('fs');
var natural = require('natural');
var regMatch = require('./regMatch');
// var getCommands = require('../commandsUtil/commandsUtil').getCommands;
var getCommands = require('../utils/loaders').getCommands;
var JaroWinklerDistance = natural.JaroWinklerDistance;
var Metaphone = natural.Metaphone;
var formatVariable = require('./formatVariable');


var matching = function (actionPrefix, variable) {
  var commandsObj = getCommands();
  var actionObj = {};
  actionObj.exact = false;
  actionObj.userCommand = actionPrefix;
  actionObj.guessedCommand = null;
  actionObj.action = '';

  var exactMatchThreshold = 0.8;
  var closeMatchThreshold = 0.6;

  var phrases = commandsObj.phrases;
  var actions = commandsObj.commands;

  for (var key in phrases) {
    if (regMatch(phrases[key], actionPrefix)) {
      actionObj.exact = true;
      actionObj.action = variable ? actions[key] + formatVariable(variable) : actions[key];
      return actionObj;
    }
  }

  for (var key in phrases) {
    //compare distance between the input phrase and one of our accepted phrase
    if (JaroWinklerDistance(actionPrefix, key) > exactMatchThreshold) {
      console.log('word distance match found');
      actionObj.exact = false;
      actionObj.action = variable ? actions[key] + formatVariable(variable) : actions[key];
      return actionObj;
    }
    //first converts the input phrases to the phonetics sound, then compare how far they are apart.
    if (JaroWinklerDistance(Metaphone.process(actionPrefix), Metaphone.process(key)) > closeMatchThreshold) {
      console.log('phonetic match found');
      actionObj.exact = false;
      actionObj.guessedCommand = key;
      actionObj.action = variable ? actions[key] + formatVariable(variable) : actions[key];
      return actionObj;
    }
  }

  return actionObj;
};

module.exports = matching;
