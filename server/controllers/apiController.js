var helpers = require('../helpers/helpers');

module.exports.topTen = function (req, res) {
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

module.exports.getUserPackages = function (req, res) {
  var name = req.params.userName;
  helpers.findPackagesByUsername(name, function (err, packages) {
    if (err) {
      res.redirect('/');
    } else {
      res.json(packages);
    }
  });
};

module.exports.getPackage = function (req, res) {
  var title = req.params.packageName;
  console.log(title);
  helpers.findPackageByTitle(title, function (err, entry) {
    helpers.findUserById(entry[0].userId, function (err, user) {
      if (err) {
        res.redirect('/');
      } else {
        var sendObj = {};
        sendObj.package = entry[0];
        sendObj.user = {
          username: user.username
        };
        res.json(sendObj);
      }
    });
  });
};


module.exports.editPackage = function (req, res) {
  res.send('OK');
};
