var commandsUtil = require('../commandsUtil/commandsUtil');
var executeShellComand = require('../cmd/execShellCommand');
var startCmd = require('../audio/audio').startCmd;
var failedCmd = require('../audio/audio').failedCmd;
var match = require('../match/match-util').matchUtil;


module.exports = function (event) {
  var transcript = event.results[0][0].transcript;
  var confidence = event.results[0][0].confidence;
  var userCommand = {
    score: confidence,
    term: transcript
  };

  console.log('command is ', transcript);
  var matchObj = match(userCommand);

  if (matchObj.guessedCommand) {
    var guessCorrectly = confirm("Did you mean \"" + matchObj.guessedCommand + "\"?");
    if (guessCorrectly) {
      startCmd.play();
      executeShellComand(matchObj.action);
      this.switch();
      commandsUtil.addPhrase(matchObj.guessedCommand, matchObj.userCommand);
    } else {
      failedCmd.play();
      this.switch();
    }
  } else if (matchObj.action) {
    startCmd.play();
    executeShellComand(matchObj.action);
    this.switch();
  } else {
    failedCmd.play();
    this.switch();
  }
};
