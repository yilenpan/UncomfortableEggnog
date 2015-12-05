'use strict';

var natural = require('natural');
var fs = require('fs');
var tokenizer = new natural.WordTokenizer();
// var metaphone = natural.Metaphone, soundEx = natural.SoundEx;


//match inputphrase and return  matching command
var commandUtil = function (input, commands, filepath) {
  // when add new commands
  // fs.writeFileSync(filepath + 'commands.json', commands, 'utf8');
  for (var key in commands) {
    // console.log (commands[key])
    for (var i = 0; i < commands[key].length; i++) {
      if (input.term === commands[key][i]) {
        console.log("term is: ", input.term, " exact match found, phrase is :", commands[key][i]);
        return key;
      } else if (natural.JaroWinklerDistance(input.term, commands[key][i]) > 0.7) {
        console.log("do you mean: ", commands[key][i], "? (y/n)");
        console.log("assuming user said yes for testing purposes... ");

        commands[key].push(input.term);

        console.log("saving ", input.term, "as acceptable phrase for \'", key, "\'");

        console.log("term is: ", input.term, " close match found, phrase is :", commands[key][i]);
        return key;
      } else if (natural.JaroWinklerDistance(metaphone.process(input.term), metaphone.process(commands[key][i])) > 0.7) {
        console.log("do you mean: ", commands[key][i], "? (y/n)");
        console.log("assuming user said yes for testing purposes... ");

        commands[key].push(input.term);
        console.log("saving ", input.term, "as acceptable phrase for \'", key, "\'");

        console.log("term is: ", input.term, " phonetic match found, phrase is :", commands[key][i]);
        return key;
      }
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

// runTest();

var testObject = JSON.parse(fs.readFileSync('/Users/tpduong/src/hack-reactor/UncomfortableEggnog/test/assets/parse-test.json', 'utf8'));
var commands = JSON.parse(fs.readFileSync)('./commands.json');

for (var i = 0; i < testObject.length; i++) {
  commandUtil(commands, testObject[i]);
}

// commandUtil();

module.exports.commandUtil = commandUtil;
module.exports.regMatch = regMatch;
