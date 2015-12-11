module.exports = function (newPhraseObj) {
  //read from phrasesPath
  var phrases = JSON.parse(fs.readFileSync(newPhraseObj.phrasesPath, 'utf8'));

  //push in new phrase
  phrases[newPhraseObj.phrase].push(newPhraseObj.inputPhrase);

  // write back to phrases
  fs.writeFileSync(newPhraseObj.phrasesPath, JSON.stringify(phrases), 'utf8');
  console.log("saving ", newPhraseObj.inputPhrase, "as acceptable phrase for \'", newPhraseObj.phrase, "\'");
};
