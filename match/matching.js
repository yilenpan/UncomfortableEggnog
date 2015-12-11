var fs = require('fs');
var natural = require('natural');
var regMatch = require('./regMatch');
var JaroWinklerDistance = natural.JaroWinklerDistance;
var Metaphone = natural.Metaphone;


var matching = function (commandObj) {
  var threshold = 0.8;
  // load phrases
  var phrases = JSON.parse(fs.readFileSync(commandObj.phrasesPath, 'utf8'));

  for (var key in phrases) {
    if (regMatch(phrases[key], commandObj.prefix)) {
      console.log("term is: ", commandObj.inputPhrase, " exact match found");
      commandObj.phrase = key;
      return commandObj;
    }
  }

  for (var key in phrases) {
    //compare distance between the input phrase and one of our accepted phrase
    if (JaroWinklerDistance(commandObj.prefix, key) > threshold) {
      console.log('word distance match found');
      commandObj.exact = false;
      commandObj.phrase = key;
      return commandObj;
    }
    //first converts the input phrases to the phonetics sound, then compare how far they are apart.
    if (JaroWinklerDistance(Metaphone.process(commandObj.prefix), Metaphone.process(key)) > threshold) {
      console.log('phonetic match found');
      commandObj.exact = false;
      commandObj.phrase = key;
      return commandObj;
    }
  }

  commandObj.exact = false;
  commandObj.phrase = null;
  return commandObj;
};

module.exports = matching;
