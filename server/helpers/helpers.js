//helpers are a set of functions that work with the database.
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var db = require('../db/db.js');

var SALT_WORK_FACTOR = 10;

exports.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

exports.hashPassword = function (next) {
  var cipher = bluebird.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function (hash) {
      this.password = hash;
      next();
    });
};

exports.findPackageEntries = function (cb) {
  db.PackageEntry.find({}, cb);
};

exports.findPackage = function (id, cb) {
  db.PackageEntry.find({id: id}, cb);
};


exports.savePackage = function (entry, cb) {
  var packageEntry = new db.PackageEntry(entry);
  packageEntry.save(cb);
};

exports.findUser = function (id, cb) {
  db.User.findOne( { id: id }, cb);
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
