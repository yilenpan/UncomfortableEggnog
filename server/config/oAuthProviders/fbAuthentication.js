//load the strateg we need
var FacebookStrategy = require('passport-facebook').Strategy;

//load the user model
var User = require('../../db/db').User;
var configAuth = require('../auth');

var facebookStrategy = (new FacebookStrategy({

    //get app id and secret from auth.js
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['email', 'displayName', 'name']
  },

  function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'facebook.id': profile.id}, function (err, user) {
        //if there is an error, stop everything and return the error
        if (err) {
          return done(err);
        }

        //if the user is found, then log them in
        if (user) {
          console.log("user found");
          return done(null, user);
        } else {
          //if there is no user then create one
          var newUser = new User();
          console.log(JSON.stringify(profile));
          newUser.username = profile.displayName;
          newUser.email = profile.emails[0].value;
          //newUser["first name"] = profile.name.givenName;
          //newUser["last name"] = profile.name.familyName;
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          //newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;

          newUser.save(function (err) {
            console.log("saving user");
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

module.exports = facebookStrategy;