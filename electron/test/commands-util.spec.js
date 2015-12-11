var expect = require('chai').expect;
var commandsUtil = require('../commandUtils/commands-util');
var config = require('../config/config');
var fs = require('fs');
// var commandsJSON = JSON.parse(fs.readFileSync(__dirname + '/../../match/commands.json'));
var extraCommands = {
  "enhance": "osascript -e 'tell application \"System Events\"" +
             "to repeat 5 times' -e 'key code 24 using {command down}'" +
             " -e 'delay 0.1' -e 'end repeat'",
  "dehance": "osascript -e 'tell application \"System Events\"" +
             " to repeat 5 times' -e 'key code 27 using {command down}'" +
             " -e 'delay 0.1' -e 'end repeat'"
};

describe('commands Parser', function (done) {
  before(function (done) {
    commandsUtil.loadCommands();
  });
  it('should get commands', function (done) {
    var commands = commandsUtil.getCommands();
    expect(commands).to.have.property('commands');
    expect(commands).to.have.property('phrasesPath');
    expect(commands.commands).to.have.property('kyle cho pro tip');
    done();
  });
  it('should add command', function (done) {
    commandsUtil.addCommand(config.coreCommandsJSON, extraCommands);
    var commands = commandsUtil.getCommands();
    expect(commands.commands).to.have.property('enhance');
    expect(commands.commands).to.have.property('dehance');
    done();
  });

});
