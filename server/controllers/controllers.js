
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
  db.User.findOne( { id: id }, function (err, user) {
    if (err) {
      console.log(err);
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

};

exports.fetchPackage = function (req, res) {

};

exports.savePackageEntry = function (req, res) {

};

