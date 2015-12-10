var natural = require('natural');
var Trie = natural.Trie;
var build = function (strings) {
  var trie = new Trie(false);
  // trie.addString("open");
  // trie.addStrings(["check the", "what is the", "look up the", "how is the"]);
  // trie.addString("google");
  // trie.addString("youtube");
  // trie.addString("Wikipedia");
  for (var i = 0; i < strings.length; i++) {
    if (Array.isArray(strings[i])) {
      trie.addStrings(strings[i]);
    } else {
      trie.addString(strings[i]);
    }
  }
  return trie;
};



module.exports = {
  build: build
};
