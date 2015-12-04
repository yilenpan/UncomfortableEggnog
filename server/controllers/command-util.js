'use strict';

var natural = require('natural');
var fs = require('fs');

var tokenizer = new natural.WordTokenizer();

var parseTestData = function (testObject) {
  var commands = [];
  for (var key in testObject) {
    commands.push(key);
  }
  return commands;
};

var commandUtil = function (commands, input) {
   console.log("input is", input);

  for (var i = 0; i < commands.length; i++) {
    console.log(commands[i], input);
    if (input.term === commands[i]) {
      console.log("true");
      return commands[i];
    }
    // if


  }
};

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
