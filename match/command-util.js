'use strict';

//using natural npm package to parse input
var natural = require('natural');
var fs = require('fs');
var _ = require('underscore');

//metaphone converts inputPhrase to what it sounds like
var metaphone = natural.Metaphone;
var Trie = natural.Trie;

//making a new trie and adding commands that will contain variables
var initialize = function (arr) {
  var trie = new Trie(false);
  trie.addString("open");
  trie.addStrings(["check the", "what is the", "look up the", "how is the"]);
  trie.addString("google");
  trie.addString("youtube");
  trie.addString("Wikipedia");
  // trie.addStrings(arr);
  return trie;
};

// initialize(Object.keys(commands.withArgs));

//match phrases regardless of case, 'Google' = 'google'
var regMatch = function (arr, term) {
  var regTerm = new RegExp(term, 'i'); // creates new regexp obj
  return _.some(arr, function (key) {
    return key.match(regTerm); // tests key against regTerm
  });
};

//When it is a close match, can call this function to add the closely matched phrase to list of acceptable phrases array in phrases.json
var addPhrase = function (newPhraseObj) {
  //read from phrasesPath
  var phrases = JSON.parse(fs.readFileSync(newPhraseObj.phrasesPath, 'utf8'));

  //push in new phrase
  phrases[newPhraseObj.phrase].push(newPhraseObj.inputPhrase);

  // write back to phrases
  fs.writeFileSync(newPhraseObj.phrasesPath, JSON.stringify(phrases), 'utf8');
  console.log("saving ", newPhraseObj.inputPhrase, "as acceptable phrase for \'", newPhraseObj.phrase, "\'");
};

//split input phrase into prefix and variable
var findPrefix = function (input) {
  return trie.findPrefix(input);
};


//first look for exact match, if exact match is not found, then check if a close match is found
//can adjust threshold 1 is exact match only, 0 is match anything.  Currently at 0.8
var matching = function (commandObj) {
  var threshold = 0.8;
  var phrases = JSON.parse(fs.readFileSync(commandObj.phrasesPath, 'utf8'));

  //look for exact match
  for (var key in phrases) {
    if (regMatch(phrases[key], commandObj.prefix)) {
      console.log("term is: ", commandObj.inputPhrase, " exact match found");
      commandObj.phrase = key;
      return commandObj;
    }
  }

  for (var key in phrases) {
    //compare distance between the input phrase and one of our accepted phrase
    if (natural.JaroWinklerDistance(commandObj.prefix, key) > threshold) {
      console.log("term is: ", commandObj.inputPhrase, " possible close match found");
      commandObj.exact = false;
      commandObj.phrase = key;
      return commandObj;
    }

    //first converts the input phrases to the phonetics sound, then compare how far they are apart.
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

//for commands with variable, need to format the variable in a certain way so that it can be executed in bash
var formatVariable = function (phrase, variable) {
  //remove the first character if it's a space
  if (variable[0] === " ") {
    variable = variable.substr(1);
  }

  //when openning a application, first letter of every word must be capitalized.
  //spaces must be escapped with "\\
  if (phrase === 'open') {
    variable = variable.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    variable = variable.replace(/\ /g, "\\ ") + ".app";
  }

  //replacing spaces with '+'
  if (phrase === "check the" || phrase === "Youtube" || phrase === "google") {
    variable = variable.replace(/\ /g, "\+");
  }

  if (phrase === 'Wikipedia') {
    variable = variable.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    variable = variable.replace(/\ /g, "\_");
  }

  return variable;
};


var commandUtil = function (input, fileInfo) {
  //create a new object to be returned
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

  //break inputPhrase down to prefix and variable
  var prefixArray = findPrefix(commandObj.inputPhrase);
  if (prefixArray[0] !== null) {
    commandObj.prefix = prefixArray[0];
    commandObj.variable = prefixArray[1];
  } else {
    commandObj.prefix = prefixArray[1];
  }

  //call the matching function to find either an exact match or a close match
  commandObj = matching(commandObj);
  var phrase = commandObj.phrase;
  commandObj.guessedPhrase = commandObj.phrase + commandObj.variable;

  //add bash shell command
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
