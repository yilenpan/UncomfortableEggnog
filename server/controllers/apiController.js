var helpers = require('../helpers/helpers');
var rootFolder = require('../../rootPath');
var Promise = require('bluebird');
var utils = require('../lib/utils');

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

// TODO: this may be a duplicate function.

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


// gets a username in the params, then we return out the packages associated
// to the username

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

// Takes the userId and the package title
module.exports.isUserPackage = function (req, res) {
  var title = req.params.packageName;
  var userId = req.user._id;
  helpers.findPackageByTitle(title, function (err, entry) {
    // checks to see if theres an error or if the packages dont match
      // if no match, responds with error obj

    if (err || entry[0].userId.toString() !== userId) {
      res.json({error: true});
    } else {
      res.json(entry);
    }
  });
};

// passes req to editPackage, where it will check user obj against
// the package before updating db
module.exports.editPackage = function (req, res) {
  helpers.editPackage(req, function (err, packageEntry) {
    if (err) {
      res.redirect('/');
    } else {
      res.json(packageEntry);
    }
  });
};

module.exports.addStars = function (req, res) {
  var id = req.params.id;
  var stars = req.body.data;
  helpers.addStars(req.params.id, stars, function (err, packageEntry) {
    if (err) {
      res.redirect('/');
    } else {
      res.json(packageEntry);
    }
  });
};

module.exports.downloadPackage = function (req, res) {
  var id = req.params.id;
  var folder = rootFolder + '/server/tmp/' + Date.now() + '/';
  helpers.findPackageById(id, function (packageEntry, err) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log(packageEntry);
      utils.writeSnippetFile(packageEntry[0], folder).then(function (file) {
        res.download(file.filePath, file.fileName, function (err) {
          if (err) {
            console.log(err);
          }
          utils.cleanFolder(folder);
        });
      });

    }
  });
};