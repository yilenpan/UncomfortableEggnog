var startCmd = require('../audio/audio').startCmd;
var failedCmd = require('../audio/audio').failedCmd;
module.exports = function (event) {
  console.log('got something');

  var transcript = event.results[0][0].transcript;
  var confidence = event.results[0][0].confidence;
  console.log(transcript);
  // TODO: use natural to match transcript to jarvis
  if (transcript.match(/Jarvis/gi)) {
    startCmd.play();
    this.switch();
  }
};
