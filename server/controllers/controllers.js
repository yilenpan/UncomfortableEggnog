
//controllers are request handers that work with routes.

var helpers = require('../helpers/helpers');

/*************************************
                     Login Handlers
**************************************/

exports.isLoggedIn = function (req, res) {
  return req.session ? !!req.session.user : false;
};


exports.loginUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  //check username match
  helpers.findUserByUsername(username, function (err, user) {
    if (err) {
      console.log('There was an error logging in user.');
      res.sendStatus(500);
    } else if (!user) {
        console.log('User was not found.');
        res.status(401).json({error: 'User was not found.'});
    } else {
  //check password match
        helpers.comparePassword(password, user.password, function (err, isMatch) {
          if (err) {
            console.log('There was an error logging in user.');
            res.sendStatus(500);
          } else if (!isMatch) {
              console.log('User password did not match.');
              res.status(401).json({error: 'User password did not match.'});
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
  req.session.destroy();
  res.redirect('/');
};


exports.signupUser = function (req, res) {
  //assumes req.password is a string
  var username = req.body.username;
  var password = req.body.password;
  helpers.findUserByUsername(username, function (err, user) {
    if (user) {
      console.log('That username already exists.');
      res.status(200).json({
        errorType: 'username',
        error: 'That username already exists.'
      });
    } else {
      helpers.saveUser(username, password, function (err, user) {
        if (err) {
          console.log('There was an error saving user.');
          res.sendStatus(500);
        } else {
          //user successfully signed up, now login user automatically
          req.session.user = user;
          res.json({username: user.username});
        }
      });
    }
  });
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
  console.log(entry);
  //make req.session.user object === db user model?
  // console.log('trying to save... ' + req.body.username + ' ,' + req.entry);
  helpers.savePackage(req.body.username, entry, function (err, packageEntry) {
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
exports.getUserInfo = function (req, res) {
  console.log(req.session);
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
