'use strict';
var matching = require('./matching');
var prefixTrie = require('./prefixTrie');

module.exports.matchUtil = function (userCommand, commandsObj) {
  console.log('got userCommand ', userCommand);
  var prefixArray = prefixTrie.findPrefix(userCommand.term);
  if (prefixArray[0] !== null) {
    var actionPrefix = prefixArray[0];
    var variable = prefixArray[1].trim();
  } else {
    var actionPrefix = prefixArray[1];
    var variable = null;
  }
  console.log('actionPrefix ', actionPrefix);
  console.log('variable ', variable);
  return matching(actionPrefix.trim(), variable, commandsObj);
};
