'use strict';

var natural = require('natural');
var fs = require('fs');
var _ = require('underscore');
var tokenizer = new natural.WordTokenizer();
var metaphone = natural.Metaphone;
var soundEx = natural.SoundEx;

//match inputphrase and return  matching command
var commandUtil = function (input, commands, commandsPath) {
  console.log(typeof input.term);
  console.log("INPUT: ", input.term);
  for (var key in commands) {
    if (regMatch(commands[key], input.term)) {
      console.log("term is: ", input.term, " exact match found, phrase is :", key);
      return key;
    }

    if (natural.JaroWinklerDistance(input.term, key) > 0.8) {
      console.log("do you mean: ", key, "? (y/n)");
      console.log("assuming user said yes for testing purposes... ");

      commands[key].push(input.term);

      // when add new commands
      fs.writeFileSync(commandsPath, JSON.stringify(commands), 'utf8');

      console.log("saving ", input.term, "as acceptable phrase for \'", key, "\'");

      console.log("term is: ", input.term, " close match found, phrase is :", key);
      return key;
    } else if (natural.JaroWinklerDistance(metaphone.process(input.term), metaphone.process(key)) > 0.8) {
      console.log("do you mean: ", key, "? (y/n)");
      console.log("assuming user said yes for testing purposes... ");

      commands[key].push(input.term);
      fs.writeFileSync(commandsPath, JSON.stringify(commands), 'utf8');
      console.log("saving ", input.term, "as acceptable phrase for \'", key, "\'");

      console.log("term is: ", input.term, " phonetic match found, phrase is :", key);
      return key;
    }
  }

  console.log("term is: ", input.term, " no match");
  return null;
};


var regMatch = function (arr, term) {
  var regTerm = new RegExp(term, 'i'); // creates new regexp obj
  return _.some(arr, function (key) {
    return key.match(regTerm); // tests key against regTerm
  });
};

// var testObject = JSON.parse(fs.readFileSync('/Users/tpduong/src/hack-reactor/UncomfortableEggnog/test/assets/parse-test.json', 'utf8'));
// var commands = JSON.parse(fs.readFileSync('./commands.json', 'utf8'));

// for (var i = 0; i < testObject.length; i++) {
//   commandUtil(testObject[i], commands);
// }

module.exports.commandUtil = commandUtil;
module.exports.regMatch = regMatch;
