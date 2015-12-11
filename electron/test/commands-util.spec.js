var expect = require('chai').expect;
var commandsUtil = require('../commandUtils/commands-util');
var config = require('../config/config');
var fs = require('fs');
var extraCommands = {
  "enhance": "osascript -e 'tell application \"System Events\"" +
             "to repeat 2 times' -e 'key code 24 using {command down}'" +
             " -e 'delay 0.1' -e 'end repeat'",
  "dehance": "osascript -e 'tell application \"System Events\"" +
             " to repeat 2 times' -e 'key code 27 using {command down}'" +
             " -e 'delay 0.1' -e 'end repeat'"
};

describe('commands Parser', function (done) {
  before(function (done) {
    fs.readFile(config.coreCommandsJSON, 'utf8', function (err, data) {
      fs.writeFile(config.testCoreCommandsJSON, data, function (err, data) {
        commandsUtil.loadCommands(config.testCoreCommandsJSON);
        done();
      });
    });
  });
  it('should get commands', function (done) {
    var commands = commandsUtil.getCommands();
    expect(commands).to.have.property('commands');
    expect(commands).to.have.property('phrasesPath');
    expect(commands.commands).to.have.property('kyle cho pro tip');
    done();
  });
  it('should add command', function (done) {
    commandsUtil.addCommand(config.testCoreCommandsJSON, extraCommands);
    var commands = commandsUtil.getCommands();
    expect(commands.commands).to.have.property('enhance');
    expect(commands.commands).to.have.property('dehance');
    done();
  });

});
