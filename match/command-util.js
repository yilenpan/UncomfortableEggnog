'use strict';

var natural = require('natural');
var fs = require('fs');
var _ = require('underscore');

var metaphone = natural.Metaphone;
var Trie = natural.Trie;

var initialize = function () {
  var trie = new Trie(false);
  trie.addString("open");
  trie.addStrings(["check the", "what is the", "look up the", "how is the"]);
  return trie;
};

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

//split input phrase into prefix and variable
var findPrefix = function (input) {
  return trie.findPrefix(input);
};

var matching = function (commandObj) {
  var threshold = 0.8;
  var phrases = JSON.parse(fs.readFileSync(commandObj.phrasesPath, 'utf8'));

  for (var key in phrases) {
    if (regMatch(phrases[key], commandObj.prefix)) {
      console.log("term is: ", commandObj.inputPhrase, " exact match found");
      commandObj.phrase = key;
      return commandObj;
    }

    if (natural.JaroWinklerDistance(commandObj.prefix, key) > threshold) {
      console.log("term is: ", commandObj.inputPhrase, " possible close match found");
      commandObj.exact = false;
      commandObj.phrase = key;
      return commandObj;
    }

    if (natural.JaroWinklerDistance(metaphone.process(commandObj.prefix), metaphone.process(key)) > threshold) {
      console.log("term is: ", commandObj.inputPhrase, " possible phonetic match found");
      commandObj.exact = false;
      commandObj.phrase = key;
      return commandObj;
    }
  }

  console.log("term is: ", commandObj.inputPhrase, " no match");
  commandObj.exact = false;
  commandObj.phrase = null;
  return commandObj;
};

var formatVariable = function (phrase, variable) {
  if (variable[0] === " ") {
    variable = variable.substr(1);
  }
  console.log(variable);

  if (phrase === 'open') {
    variable = variable.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    variable = variable.replace(/\ /g, "\\ ") + ".app";
  }

  if (phrase === "check the") {
    variable = variable.replace(/\ /g, "\+");
  }
  return variable;
};

var commandUtil = function (input, fileInfo) {
  var commandObj = {
    command: "",
    exact: true,
    phrase: "",
    prefix: "",
    variable: "",
    inputPhrase: input.term,
    phrasesPath: fileInfo.phrasesPath,
    guessedPhrase: ""
  };

  var prefixArray = findPrefix(commandObj.inputPhrase);
  if (prefixArray[0] !== null) {
    commandObj.prefix = prefixArray[0];
    commandObj.variable = prefixArray[1];
  } else {
    commandObj.prefix = prefixArray[1];
  }

  commandObj = matching(commandObj);
  var phrase = commandObj.phrase;
  commandObj.guessedPhrase = commandObj.phrase + commandObj.variable;

  //add bash shell
  commandObj.variable = formatVariable(commandObj.phrase, commandObj.variable);
  commandObj.command = fileInfo.commands[phrase] + commandObj.variable;
  console.log(commandObj);
  return commandObj;
};

var trie = initialize();

//for testing
// var commands = JSON.parse(fs.readFileSync('./commands.json', 'utf8'));
// var testObject = JSON.parse(fs.readFileSync('/Users/tpduong/src/hack-reactor/UncomfortableEggnog/test/assets/parse-test.json', 'utf8'));

// for (var i = 0; i < testObject.length; i++) {
//   var command = commandUtil(testObject[i], {commands: commands, phrasesPath: './phrases.json'});
//   // var command = commandUtil({
  //           "score": 0.9855742454528809,
  //           "term": "open sublime text 2"
  //       }, {commands: commands, phrasesPath: './phrases.json'});

  // open https://www.google.com/?gws_rd=ssl#q=weather+san+francisco
  // console.log(command);
//  addPhrase(command);
// }

module.exports.commandUtil = commandUtil;
module.exports.matching = matching;
module.exports.regMatch = regMatch;
module.exports.addPhrase = addPhrase;
