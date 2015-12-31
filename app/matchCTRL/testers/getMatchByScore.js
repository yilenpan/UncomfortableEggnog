var phoneticsTest = require('./phoneticsTest');

module.exports = function (phrases, actionPrefix) {
  // console.log('\n\n\n\n');
  // console.log('Testing: ', actionPrefix);
  // console.log('\n\n');
  return phrases.reduce(function (max, phrase) {
    if (max.score === undefined) {
      max.phrase = phrase;
      max.score = phoneticsTest(phrase, actionPrefix);
      return max;
    } else {
      var score = phoneticsTest(phrase, actionPrefix);
      return max.score > score ? max : {
        phrase: phrase,
        score: score
      };
    }
  }, {})['phrase'];
};
