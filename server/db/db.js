var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var dbUrl = 'mongodb://localhost/blacklist';

mongoose.connect(dbUrl);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(cb){
  console.log('Connected to db!');
});

//===========Schemas===========
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

var PackageEntrySchema = new mongoose.Schema({
  likes: Number,
  dislikes: Number,
  downloads: Number,
  dateCreated: Date,
  // lastUpdated or new Date() upon POST?
  description: String,
  //stringified package object {name, content}
  packageContents: String
});

//===========Models===========
var User = db.model('User', UserSchema);
var PackageEntry = db.model('PackageEntry', PackageEntrySchema);


//===========Encryption=========

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


var comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports.db = db;
module.exports.User = User;
module.exports.PackageEntry = PackageEntry;
