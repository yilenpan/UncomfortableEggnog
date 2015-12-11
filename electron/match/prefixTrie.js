var natural = require('natural');
var Trie = natural.Trie;
var build = function (strings) {
  var trie = new Trie(false);
  trie.addStrings(strings);
  return trie;
};

module.exports = {
  build: build
};
