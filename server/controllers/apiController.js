var helpers = require('../helpers/helpers');


var _ = require('underscore');

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
  helpers.searchPackages(req.body.searchTerm, function (err, entries) {
    if (err) {
      res.redirect('/');
    } else {
      res.json(entries);
    }
  });
};

module.exports.getPackage = function (req, res) {
  var title = req.body.title;
  helpers.findPackageByTitle(title, function (err, entry) {
    if (err) {
      res.redirect('/');
    } else {
      res.json(entry);
    }
  });
};


module.exports.editPackage = function (req, res) {
  res.send('OK');
};
