'use strict';

var natural = require('natural');
var fs = require('fs');

var tokenizer = new natural.WordTokenizer();

//get all the test commands from test data
var parseTestData = function (testObject) {
  var commands = [];
  for (var key in testObject) {
    commands.push(key);
  }
  return commands;
};

//match inputphrase and return  matching command
var commandUtil = function (commands, input) {
   // console.log("input is", input);

  // for (var i = 0; i < commands.length; i++) {
  //   // console.log(commands[i], input);
  //   if (input.term === commands[i]) {
  //     console.log("match found, phrase is :", commands[i])
  //     return commands[i];
  //   }
  // }


  // var wordTokenizer = new natural.WordTokenizer();
  // var wordPuncTokenizer = new natural.WordPunctTokenizer();
  // var treeTokenizer = new natural.TreebankWordTokenizer();
  // var regexTokenizer = new natural.RegexpTokenizer({pattern: /\$/});

  // console.log("wordTokenizer", wordTokenizer.tokenize("my 2 dogs hasn't any $fleas."));
  // console.log("wordPuncTokenizer", wordPuncTokenizer.tokenize("my 2 dogs hasn't any $fleas."));
  // console.log("treeTokenizer", treeTokenizer.tokenize("my 2 dogs hasn't any $fleas."));
  // console.log("regexTokenizer", regexTokenizer.tokenize("my 2 dogs hasn't any $fleas."));

  console.log(natural.JaroWinklerDistance("san Francisco", "san francisco"));
  console.log(natural.JaroWinklerDistance("Francisco", "Frencisca"));
  console.log(natural.JaroWinklerDistance("weather", "whether"));
  console.log(natural.JaroWinklerDistance("dixon", "dicksonx"));
  console.log(natural.JaroWinklerDistance("way", "weigh"));
  console.log(natural.JaroWinklerDistance('not', 'same'));

    // console.log("no match");
    // return null;
};

//process the test data
var runTest = function () {
  var testObject = JSON.parse(fs.readFileSync('/Users/tpduong/src/hack-reactor/UncomfortableEggnog/test/assets/check-weather.json', 'utf8'));
  // var commands = parseTestData(testObject);

  for (var key in testObject) {
    // console.log(testObject[key]);
    for (var i = 0; i < testObject[key].length; i++) {
      commandUtil(commands, testObject[key][i]);
    }
  }
};




// runTest();

var testObject = JSON.parse(fs.readFileSync('/Users/tpduong/src/hack-reactor/UncomfortableEggnog/test/assets/check-weather.json', 'utf8'));
var commands = parseTestData(testObject);
commandUtil(commands, testObject['check the weather in San Francisco'][0]);

module.exports.commandUtil = commandUtil;
