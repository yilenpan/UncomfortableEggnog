
//controllers are request handers that work with routes.

var helpers = require('../helpers/helpers');

/*************************************
                     Login Handlers
**************************************/

exports.loginUserForm = function (req, res) {

};

exports.isLoggedIn = function (req, res) {
  return req.session ? !!req.session.user : false;
};


exports.loginUser = function (req, res) {

};


exports.logoutUser = function (req, res) {

};


exports.signupUserForm = function (req, res) {

};

exports.signupUser = function (req, res) {

};

/*************************************
                     User Handlers
**************************************/

//~~~~~~~~~~~~refactor this to helpers~~~~~~~~~
exports.getUserInfo = function (req, res) {
  var id = req.params.id;
  helpers.findUser(id, function (err, user) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    console.log(user);
    res.send(user);
  });
};

exports.checkUser = function (req, res, next) {
  if (!exports.isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

/*************************************
                     Package Handlers
**************************************/

exports.fetchPackages = function (req, res) {
  helpers.findPackageEntries(function (err, packages) {
    if (err) {
      console.log('There was an error finding packages.');
      res.sendStatus(500);
    } else {
      console.log('Sending packages to client.');
      res.send(packages);
    }
  });
};

exports.fetchPackage = function (req, res) {
  var id = req.params.id;
  helpers.findPackage(id, function (err, packageEntry) {
    if (err) {
      console.log('There was an error finding package with ID: ' + id + '.');
      res.sendStatus(500);
    } else if (packageEntry.length === 0) {
        console.log('No entry found with ID: ' + id);
        res.sendStatus(404);
    } else {
       console.log('Sending package with ID ' + id + ' to client.');
       res.send(packages);
    }
  });
};

exports.savePackageEntry = function (req, res) {
  //entry should be object with all relevant PackageEntry attributes
  var entry = req.body;
  helpers.savePackage(entry, function (err, packageEntry) {
    if (err) {
      console.log('There was an error saving package.');
      res.sendStatus(500);
    } else {
      console.log('Saved entry to the database!');
      res.send(packageEntry);
    }
  });
};
