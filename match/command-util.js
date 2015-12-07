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

var matching = function (input, phrasesPath) {
  var phrases = JSON.parse(fs.readFileSync(phrasesPath, 'utf8'));

  for (var key in phrases) {
    if (regMatch(phrases[key], input.term)) {
      console.log("term is: ", input.term, " exact match found, phrase is :", key);
      return key;
    }

    if (natural.JaroWinklerDistance(input.term, key) > 0.8) {
      // console.log("do you mean: ", key, "? (y/n)");
      // console.log("assuming user said yes for testing purposes... ");

      phrases[key].push(input.term);

      // when add new phrases
      fs.writeFileSync(phrasesPath, JSON.stringify(phrases), 'utf8');

      console.log("saving ", input.term, "as acceptable phrase for \'", key, "\'");

      console.log("term is: ", input.term, " close match found, phrase is :", key);
      return key;
    }

    if (natural.JaroWinklerDistance(metaphone.process(input.term), metaphone.process(key)) > 0.8) {
      // console.log("do you mean: ", key, "? (y/n)");
      // console.log("assuming user said yes for testing purposes... ");

      phrases[key].push(input.term);
      fs.writeFileSync(phrasesPath, JSON.stringify(phrases), 'utf8');
      console.log("saving ", input.term, "as acceptable phrase for \'", key, "\'");

      console.log("term is: ", input.term, " phonetic match found, phrase is :", key);
      return key;
    }
  }

  console.log("term is: ", input.term, " no match");
  return null;
};

var commandUtil = function (input, fileInfo) {
  var phrase = matching(input, fileInfo.phrasesPath);
  return fileInfo.commands[phrase];
};

//for testing
// var commands = JSON.parse(fs.readFileSync('./commands.json', 'utf8'));
// var testObject = JSON.parse(fs.readFileSync('/Users/tpduong/src/hack-reactor/UncomfortableEggnog/test/assets/parse-test.json', 'utf8'));

// for (var i = 0; i < testObject.length; i++) {
//   var command = commandUtil(testObject[i], {commands: commands, phrasesPath: './phrases.json'});
//   console.log(command);
// }

module.exports.commandUtil = commandUtil;
module.exports.matching = matching;
module.exports.regMatch = regMatch;
