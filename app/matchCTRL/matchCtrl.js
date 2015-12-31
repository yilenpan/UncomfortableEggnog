'use strict';
var matching = require('./matchingUtil');
var prefixTrie = require('./prefixTrie');

module.exports.matchUtil = function (userCommand, commandsObj) {
  prefixTrie.build(Object.keys(commandsObj.parsedCommands.argCommands));
  var prefixArray = prefixTrie.findPrefix(userCommand.term);

  if (prefixArray[0] !== null) {
    var actionPrefix = prefixArray[0];
    var variable = prefixArray[1].trim();
  } else {
    var actionPrefix = prefixArray[1];
    var variable = null;
  }

  return matching(actionPrefix.trim(), variable, commandsObj);
};
