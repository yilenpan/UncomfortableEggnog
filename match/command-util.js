'use strict';

var natural = require('natural');
var fs = require('fs');
var _ = require('underscore');

var metaphone = natural.Metaphone;

//match inputphrase and return  matching command

var regMatch = function (arr, term) {
  var regTerm = new RegExp(term, 'i'); // creates new regexp obj
  return _.some(arr, function (key) {
    return key.match(regTerm); // tests key against regTerm
  });
};

var addPhrase = function (newPhraseObj) {
  //read from phrasesPath
  var phrases = JSON.parse(fs.readFileSync(newPhraseObj.phrasesPath, 'utf8'));

  //push in new phrase
  phrases[newPhraseObj.phrase].push(newPhraseObj.inputphrase);

  // write back to phrases
  fs.writeFileSync(newPhraseObj.phrasesPath, JSON.stringify(phrases), 'utf8');
  console.log("saving ", newPhraseObj.inputphrase, "as acceptable phrase for \'", newPhraseObj.phrase, "\'");
};

var matching = function (input, phrasesPath) {
  var commandObj = {
    command: "",
    exact: true,
    phrase: "",
    inputphrase: input.term,
    phrasesPath: phrasesPath
  };
  var phrases = JSON.parse(fs.readFileSync(phrasesPath, 'utf8'));


  for (var key in phrases) {
    if (regMatch(phrases[key], input.term)) {
      console.log("term is: ", input.term, " exact match found, phrase is :", key);
      commandObj.phrase = key;
      return commandObj;
    }

    if (natural.JaroWinklerDistance(input.term, key) > 0.8) {
      console.log("term is: ", input.term, " possible close match found, phrase is :", key);
      commandObj.exact = false;
      commandObj.phrase = key;
      return commandObj;
    }

    if (natural.JaroWinklerDistance(metaphone.process(input.term), metaphone.process(key)) > 0.8) {
      console.log("term is: ", input.term, " possible phonetic match found, phrase is :", key);
      commandObj.exact = false;
      commandObj.phrase = key;
      return commandObj;
    }
  }

  console.log("term is: ", input.term, " no match");
  commandObj.exact = false;
  commandObj.phrase = null;
  return commandObj;
};

var commandUtil = function (input, fileInfo) {
  var commandObj = matching(input, fileInfo.phrasesPath);
  var phrase = commandObj.phrase;
  //add bash shell
  commandObj.command = fileInfo.commands[phrase];
  return commandObj;
};

//for testing
// var commands = JSON.parse(fs.readFileSync('./commands.json', 'utf8'));
// var testObject = JSON.parse(fs.readFileSync('/Users/tpduong/src/hack-reactor/UncomfortableEggnog/test/assets/parse-test.json', 'utf8'));

// // for (var i = 0; i < testObject.length; i++) {
//   var command = commandUtil(testObject[1], {commands: commands, phrasesPath: './phrases.json'});
//   // console.log(command);
//  addPhrase(command);
// }

module.exports.commandUtil = commandUtil;
module.exports.matching = matching;
module.exports.regMatch = regMatch;
