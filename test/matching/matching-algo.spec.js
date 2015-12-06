var expect = require('chai').expect;
var testCases = require('../assets/parse-test');
var cmdUtil = require('../../match/command-util').commandUtil;
var regMatch = require('../../match/command-util').regMatch;
var fs = require('fs');
var _ = require('underscore');
// TODO: Change when the commands folder is established
var commandsPath = __dirname + '/../../match/commands.json';
var commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));

//after testing, write this back to the commands.json file
var revertCommands = {"kyle cho pro tip": ["kyle cho pro tip"],
  "check the weather in San Francisco": ["check the weather in San Francisco"],
  "dim screen": ["dim screen"],
  "open sublime": ["open sublime"]
};


xdescribe('Natural language string matching algorithm', function () {

  it('should match exact phrases', function (done) {
    var exactMatch = JSON.parse(fs.readFileSync(__dirname + '/../assets/exact-match-test.json', 'utf8'));
    var exactCommands = _.every(exactMatch, function (input, key) {
      return (cmdUtil(input[0], commands, commandsPath) === key);
    });
    expect(exactCommands).to.equal(true);
    done();
  });

  it('should match phrases with different cases', function (done) {
    var caseMatch = JSON.parse(fs.readFileSync(__dirname + '/../assets/case-match-test.json', 'utf8'));
    var caseCommands = _.every(caseMatch, function (input, key) {
      return (cmdUtil(input[0], commands, commandsPath) === key);
    });
    expect(caseCommands).to.equal(true);
    done();
  });

  it('should match phrases with score > 0.75', function (done) {
    var closeMatch = JSON.parse(fs.readFileSync(__dirname + '/../assets/close-match-test.json', 'utf8'));
    var closeCommands = _.every(closeMatch, function (input, key) {
      return (cmdUtil(input[0], commands, commandsPath) === key);
    });
    expect(closeCommands).to.equal(true);
    // fs.writeFileSync(commandsPath, JSON.stringify(revertCommands), 'utf8');
    done();
  });

  it('should return null for a bad match', function (done) {
    var noMatch = JSON.parse(fs.readFileSync(__dirname + '/../assets/no-match-test.json', 'utf8'));
    var noMatchCommands = _.every(noMatch, function (input, key) {
      return (cmdUtil(input[0], commands, commandsPath) === null);
    });
    expect(noMatchCommands).to.equal(true);
    done();
  });

  // it('should add new close-match commands', function (done) {
  //   var closeMatch = JSON.parse(fs.readFileSync(__dirname + '/../assets/close-match-test.json', 'utf8'));
  //   _.each(closeMatch, function (input, key) {
  //     cmdUtil(input[0], commands, commandsPath);
  //   });

  //   var updatedCommands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));
  //   var closeCommands = _.every(closeMatch, function (input, key) {
  //     return (cmdUtil(input[0], commands, commandsPath) === key);
  //   });
  //   expect(closeCommands).to.equal(true);
  //   // fs.writeFileSync(commandsPath, JSON.stringify(revertCommands), 'utf8');
  //   done();
  // });

});
