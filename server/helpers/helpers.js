//helpers are a set of functions that work with the database.
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var db = require('../db/db.js');

var SALT_WORK_FACTOR = 10;

/************************************************
                     Login Database Helpers
*************************************************/
exports.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, cb);
};

exports.hashPassword = function (next) {
  var cipher = bluebird.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function (hash) {
      this.password = hash;
      next();
    });
};

/********************************************
                     Package Database Helpers
*********************************************/
exports.findPackageByUser = function (user, cb) {
  // finds user, then finds the packages associated to user
};

//find by title
exports.findPackageById = function (id, cb) {
  db.PackageEntry.findById({_id: id}, cb);
};

exports.findPackageEntries = function (cb) {
  db.PackageEntry.find({}, cb);
};

exports.savePackage = function (user, entry, cb) {
  // exports.findUserByUsername(user, function(){...});
  var packageEntry = new db.PackageEntry(entry);
  packageEntry.save(cb);
};

/************************************************
                     User Database Helpers
*************************************************/


exports.findUserById = function (id, cb) {
  db.User.findOne( { id: id }, cb);
};

exports.findUserByUsername = function (username, cb) {
  db.User.findOne( { username: username }, cb);
};



// exports.hashPassword = function (next) {
//   var user = this;
// // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) {
//     return next();
//   }
// // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//     if (err) {
//       return next(err);
//     }
// // hash the password along with our new salt
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) {
//         return next(err);
//       }
// // override the cleartext password with the hashed one
//       user.password = hash;
//       next();
//     });
//   });
// };
