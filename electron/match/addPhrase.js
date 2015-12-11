var fs = require('fs');
var commandsUtil = require('../commandsUtil/commandsUtil.js');

module.exports = function (newPhraseObj, cb) {
  commandsUtil.updatePhrases(newPhraseObj);
  fs.readFile(newPhraseObj.phrasesPath, 'utf8', function (err, data) {
    if (err) {
      cb(err);
    } else {
      var phrases = JSON.parse(data);
      phrases[newPhraseObj.phrase].push(newPhraseObj.inputPhrase);
      fs.writeFile(newPhraseObj.phrasesPath,
        JSON.stringify(phrases),
        'utf8',
        function (err, data) {
        cb(null, data);
      });
    }
  });
};
