var matchingFunctions = require('../commandUtils/commands-util.js');
var config = require('../config/config');
matchingFunctions.loadCommands(config.coreCommandsJSON);
var executeShellComand = require('../cmd/execShellCommand');
var startCmd = require('../audio/audio').startCmd;
var failedCmd = require('../audio/audio').failedCmd;


module.exports = function (event) {
  var transcript = event.results[0][0].transcript;
  var confidence = event.results[0][0].confidence;
  var userCommand = {
    score: confidence,
    term: transcript
  };

  console.log('command is ', transcript);
  var fileInfo = matchingFunctions.getCommands();
  var matchObj = matchingFunctions.cmdUtil(userCommand, fileInfo);
  if (matchObj.guessedPhrase !== 'null' && !matchObj.exact) {

    var guessCorrectly = confirm("Did you mean \"" + matchObj.guessedPhrase + "\"?");

    if (guessCorrectly) {
      matchingFunctions.addPhrase(matchObj, function (err, data) {
        if (err) {
          failedCmd.play();
          this.switch();
        } else {
          startCmd.play();
          executeShellComand(matchObj.command);
          this.switch();
        }
      }.bind(this));

    } else {
      failedCmd.play();
      this.switch();
    }

  } else if (matchObj.guessedPhrase !== 'null') {
    startCmd.play();
    executeShellComand(matchObj.command);
    this.switch();
  } else {
    failedCmd.play();
    this.switch();
  }
};
