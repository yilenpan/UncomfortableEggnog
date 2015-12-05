
//controllers are request handers that work with routes.

var helpers = require('../helpers/helpers');

/*************************************
                     Login Handlers
**************************************/
// TODO: Client side login
// exports.loginUserForm = function (req, res) {

// };

// TODO: Client side signup
// exports.signupUserForm = function (req, res) {
// };

exports.isLoggedIn = function (req, res) {
  return req.session ? !!req.session.user : false;
};


exports.loginUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  //check username match
  helpers.findUserbyUsername(username, function (err, user) {
    if (err) {
      console.log('There was an error logging in user.');
      res.sendStatus(500);
    } else if (user.username === undefined) {
        console.log('User was not found.');
        res.sendStatus(400);
    } else {
  //check password match
        helpers.comparePassword(password, function (err, isMatch) {
          if (err) {
            console.log('There was an error logging in user.');
            res.sendStatus(500);
          } else if (!isMatch) {
              console.log('User password did not match.');
              res.sendStatus(400);
          } else {
  //username and password matched on login: start session.
              req.session.user = user;
              res.redirect('/');
            }
          });
        }
    });
};


exports.logoutUser = function (req, res) {

};


exports.signupUser = function (req, res) {

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

exports.fetchPackageById = function (req, res) {
  var id = req.params.id;
  //handle incorrect id
  if (typeof id !== 'number') {
    res.sendStatus(404);
  } else {
    helpers.findPackageById(id, function (err, packageEntry) {
      if (err) {
        console.log('There was an error finding package with ID: ' + id + '.');
        res.sendStatus(500);
      } else if (!packageEntry) {
          console.log('No entry found with ID: ' + id);
          res.sendStatus(404);
      } else {
         console.log('Sending package with ID ' + id + ' to client.');
         res.send(packages);
      }
    });
  }
};

exports.fetchPackageByTitle = function (req, res) {
  var title = req.params.title;
  helpers.findPackageByTitle(id, function (err, packageEntry) {
    if (err) {
      console.log('There was an error finding package with title: ' + title + '.');
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

/*************************************
                     User Handlers
**************************************/

//~~~~~~~~~~~~refactor this to helpers~~~~~~~~~
exports.getUserInfo = function (req, res) {
  var id = req.params.id;
  helpers.findUserById(id, function (err, user) {
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
