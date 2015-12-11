var matchingFunctions = require('../commandUtils/commands-util.js');
var config = require('../config/config');
matchingFunctions.loadCommands(config.coreCommandsJSON);
var executeShellComand = require('../cmd/execShellCommand');
var startCmd = require('../audio/audio').startCmd;
var failedCmd = require('../audio/audio').failedCmd;


module.exports = function (event) {
  console.log("command listening");
  var transcript = event.results[0][0].transcript;
  var confidence = event.results[0][0].confidence;
  var userCommand = {
    score: confidence,
    term: transcript
  };
  var fileInfo = matchingFunctions.getCommands();
  var matchObj = matchingFunctions.cmdUtil(userCommand, fileInfo);
  //check if the user command matched exactly with something in phrases.json
  if (matchObj.guessedPhrase !== 'null' && !matchObj.exact) {
    //if it didn't match, try to guess the command
    var guessCorrectly = confirm("Did you mean \"" + matchObj.guessedPhrase + "\"?");
    //make sure the command is not empty and if the guess was correct
    if (guessCorrectly) {
      console.log("guess correctly");
      //if guess was correct, add the phrase to the json file and execute
      matchingFunctions.addPhrase(matchObj);
      startCmd.play();
      executeShellComand(matchObj.command);
    } else {
      console.log("guess incorrect");
      failedCmd.play();
      this.switch();
    }
  } else if (matchObj.guessedPhrase !== 'null') {
    startCmd.play();
    executeShellComand(matchObj.command);
    this.switch();
  } else {
    console.log("guess phrase null");
    failedCmd.play();
    this.switch();
  }
};
