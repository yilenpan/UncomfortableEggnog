var _ = require('underscore');

// TODO: Delete this and replace with actual db.
var packages = _.range(30).map(function (x) {
  return {
    title: x + 'Dev Package',
    likes: x,
    dislikes: x,
    downloads: x,
    dateCreated: new Date(),
    description: 'all the commands you ever need',
    packageContents: JSON.stringify({
      'git push': 'git push origin master',
      'make folder apple': 'mkdir apple'
    })
  };
});

module.exports.topTen = function (req, res) {
  res.json(_.sortBy(packages, 'likes').slice(-10));
};

module.exports.searchTerm = function (req, res) {
  // TODO: actually search.
  res.json(packages);
};
