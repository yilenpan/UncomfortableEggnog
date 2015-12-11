var _ = require('underscore');
module.exports = {
  loadPhrases: function (tmpPhrases, commands) {
    console.log('Loading phrases');
    return JSON.stringify(
      _.defaults(tmpPhrases, Object.keys(commands)
        .reduce(function (phrases, command) {
          phrases[command] = [command];
          return phrases;
        }, {}))
    );
  }
};
