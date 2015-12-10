var startCmd = require('../audio/audio').startCmd;
var failedCmd = require('../audio/audio').failedCmd;
module.exports = function (event) {
  console.log('got something');
  var transcript = event.results[0][0].transcript;
  var confidence = event.results[0][0].confidence;
  console.log(transcript);
  if (transcript === 'Jarvis') {
    startCmd.play();
    this.switch();
  }
};
