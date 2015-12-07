var helpers = require('../helpers/helpers');


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
  // res.json(_.sortBy(packages, 'likes').slice(-10));
  helpers.findPackageEntries(function (err, entries) {
    if (err) {
      res.redirect('/');
    } else {
      res.json(entries);
    }
  });
};

module.exports.searchTerm = function (req, res) {
  // TODO: actually search.
  helpers.searchPackages(req.body.searchTerm, function (err, data) {
    if (err) {
      res.redirect('/');
    } else {
      res.json(data);
    }
  })
};

module.exports.getPackage = function (req, res) {
  var title = req.body.title;
  helpers.findPackageByTitle(title, function (err, data) {
    if (err) {
      res.redirect('/');
    } else {
      res.json(entries);
    }
  });
};
// 
// module.exports.addPackage = function (req, res) {
//   // TODO: make sure that the session has the username
//   var username = req.session.username || 'Fred';
//   helpers.savePackage(username, req.body.package, function (err, data) {
//     if (err) {
//       res.redirect('/');
//     } else {
//       res.json(data);
//     }
//   });
// };

module.exports.editPackage = function (req, res) {
  res.send('OK');
};
