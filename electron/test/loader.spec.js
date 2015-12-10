var expect = require('chai').expect;
// var loader = require('../../match/loader/loader');
var fs = require('fs');
var commandsJSON = JSON.parse(fs.readFileSync(__dirname + '/../../match/commands.json'));

describe('commands Parser', function (done) {
  it('should load the commands', function (done) {
    expect(commandsJSON).to.be.an('object');
    expect(commandsJSON).to.have.property('check the');
    done();
  });
  it('should create a phrases object with the commandsJSON', function (done) {
    done();
  });
});
