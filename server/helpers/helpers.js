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

/************************************************
                     User Database Helpers
*************************************************/


exports.findUserById = function (id, cb) {
  db.User.findOne(id, cb);
};

exports.findUserByUsername = function (username, cb) {
  db.User.findOne({
    username: username
  }, cb);
};

/********************************************
                     Package Database Helpers
*********************************************/

//find by title
exports.findPackageByTitle = function (title, cb) {
  db.PackageEntry.find({title: title}, cb);
};

exports.findPackageById = function (id, cb) {
  db.PackageEntry.findById({_id: id}, cb);
};

exports.findPackageEntries = function (cb) {
  db.PackageEntry.find({}, cb);
};

exports.savePackage = function (user, entry, cb) {
  exports.findUserByUsername(user, function (err, user) {
    if (err) {
      console.log('Error finding user.');
      cb(err);
    } else {
      entry.userId = user._id;
      var packageEntry = new db.PackageEntry(entry);
      packageEntry.save(function (err, entry) {
        if (err) {
          console.log('Error saving package.');
          cb(err);
        } else {
          user.packages.push(entry._id);
          user.save(function (err, entry) {
            if (err) {
              console.log('Error updating user.');
              cb(err);
            } else {
              cb(err, entry);
            }
          });
        }
      });
    }
  });
};

exports.findPackagesByUsername = function (username, cb) {
  // finds user, then finds the packages associated to user
  exports.findUserByUsername(username, function (err, user) {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      db.PackageEntry.find({userId: user._id}, cb);
    }
  });
};
