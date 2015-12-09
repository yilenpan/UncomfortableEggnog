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


module.exports.getPackage = function (req, res) {
  var title = req.params.packageName;
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

module.exports.isUserPackage = function (req, res) {
  var title = req.params.packageName;
  var userId = req.user._id;
  console.log(userId);
  helpers.findPackageByTitle(title, function (err, entry) {
    if (err || entry[0].userId.toString() !== userId) {
      res.json({error: true});
    } else {
      res.json(entry);
    }
  });
};

module.exports.editPackage = function (req, res) {
  helpers.editPackage(req, function (err, packageEntry) {
    if (err) {
      res.redirect('/');
    } else {
      res.json(packageEntry);
    }
  });
};
