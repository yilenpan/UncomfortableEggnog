var startCmd = require('../audio/audio').startCmd;
var failedCmd = require('../audio/audio').failedCmd;
var phoneticsTest = require('../match/testers/phoneticsTest');
var regMatch = require('../match/regMatch');

module.exports = function (event) {
  var word = '';
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    var transcript = event.results[i][0].transcript;
    var words = transcript.split('\n');
    console.log(words);
    var word = words[words.length - 1];
  }
  console.log(word);
  if (phoneticsTest(word, 'Jarvis') > 0.8) {
    this.switchListener.hasTimeout = true;
    startCmd.play();
    this.switch();
  }
};
