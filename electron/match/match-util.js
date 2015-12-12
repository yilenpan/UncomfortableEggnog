'use strict';
var matching = require('./matching');
var prefixTrie = require('./prefixTrie');
var formatVariable = require('./formatVariable');
var addPhrase = require('./addPhrase');
var regMatch = require('./regMatch');
var prefixTrie = require('./prefixTrie');


module.exports.matchUtil = function (userCommand) {
  console.log('got userCommand ', userCommand);
  var prefixArray = prefixTrie.findPrefix(userCommand.term);
  if (prefixArray[0] !== null) {
    var actionPrefix = prefixArray[0];
    var variable = prefixArray[1];
  } else {
    var actionPrefix = prefixArray[1];
    var variable = null;
  }
  console.log('actionPrefix ', actionPrefix);
  console.log('variable ', variable);
  return matching(actionPrefix, variable);
};


// module.exports.matchUtil = matchUtil;
module.exports.matching = matching;
module.exports.regMatch = regMatch;
module.exports.addPhrase = addPhrase;
