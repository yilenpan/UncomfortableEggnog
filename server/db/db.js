var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/taser';
var helpers = require('../helpers/helpers.js');

mongoose.connect(dbUrl);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function (cb) {
  console.log('Connected to db!');
});

//===========Schemas===========
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  packages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "PackageEntry"
  }]
});

var PackageEntrySchema = new mongoose.Schema({
  title: String,
  likes: Number,
  dislikes: Number,
  downloads: Number,
  dateCreated: Date,
  // lastUpdated or new Date() upon POST?
  description: String,
  //stringified package object {name, content}
  packageContents: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

//===========Models===========
var User = mongoose.model('User', UserSchema);
var PackageEntry = mongoose.model('PackageEntry', PackageEntrySchema);


//===========Encryption=========

UserSchema.pre('save', helpers.hashPassword);


module.exports.db = db;
module.exports.User = User;
module.exports.PackageEntry = PackageEntry;
