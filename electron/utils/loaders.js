module.exports = {
  loadPhrases: function (commands) {
    console.log('Loading phrases');
    return JSON.stringify(Object.keys(commands)
      .reduce(function (phrases, command) {
        phrases[command] = [command];
        return phrases;
      }, {}));
  }
};
