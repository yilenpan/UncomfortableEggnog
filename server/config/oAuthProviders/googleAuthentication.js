var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../../db/db').User;
var configAuth = require('../auth');

var googleStrategy = (new GoogleStrategy({

    //get app id and secret from auth.js
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  },

  function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'google.id': profile.id}, function (err, user) {
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
          newUser.google.id = profile.id;
          newUser.google.token = token;

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

module.exports = googleStrategy;