var expect = require('chai').expect;
var testCases = require('../assets/parse-test');
var cmdUtil = require('../../match/command-util').commandUtil;
var regMatch = require('../../match/command-util').regMatch;
var fs = require('fs');
var _ = require('underscore');
// TODO: Change when the commands folder is established
var commandsPath = __dirname + '/../../match/commands.json';
var commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));


// when new command, add to command obj
  // fs.writeFile('commands.json', "module.exports = " + JSON.stringify(commands), function () {...});


// This will match "DIM SCREEN" to 'dim screen'
// This will match "DIm SCReEN" to 'dim screen'



describe('Natural language string matching algorithm', function () {

  it('should match exact phrases', function (done) {
    var exactCommands = _.every(Object.keys(commands), function (input) {
      return cmdUtil(key, commands, commandPath);
    });
    expect(exactCommands).to.be(true);
    done();
  });


  it('should match phrases with score > 0.75', function (done) {
    // if the term matches a command, filter it out
    // TODO: change testCases to goodTestCases
    // TODO: have badTestCases as well
    var filtered = testCases.filter(function (test) {
      return !regMatch(Object.keys(commands), test.term);
    });

    // tests to see that every term in the testCases matches a command
    var matchCommands = _.every(filtered, function (test) {
      var term = test.term;
      return cmdUtil(term, commands, commandPath);
    });
    // test to see if they still match
    expect(matchCommands).to.be(true);
    done();
  });

  it('should check to see if a close match exists', function (done) {
    // TODO: if close match, FOR NOW, just add it into the object
      // test to see if the command matches
      // check to see if command.json has changed
    done();
  });

  it('should return null or whatever for a bad match', function (done) {
    done();
  });

});
