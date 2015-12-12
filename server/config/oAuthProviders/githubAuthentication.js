//load the strateg we need
var GithubStrategy = require('passport-github').Strategy;

//load the user model
var User = require('../../db/db').User;
var configAuth = require('../auth');

var githubStrategy = (new GithubStrategy({

  clientID: configAuth.githubAuth.clientID,
  clientSecret: configAuth.githubAuth.clientSecret,
  callbackURL: configAuth.githubAuth.callbackURL
},
  function (token, refreshToken, profile, done) {
    console.log("github: ", profile);
    process.nextTick(function () {
      User.findOne({ 'github.id': profile.id}, function (err, user) {
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
          newUser.username = profile.username;
          newUser.email = profile.emails[0].value;
          newUser["first name"] = profile.displayName;
          //newUser["last name"] = profile.name.familyName;
          newUser.github.id = profile.id;
          newUser.github.name = profile.displayName;
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
  }
));

module.exports = githubStrategy;