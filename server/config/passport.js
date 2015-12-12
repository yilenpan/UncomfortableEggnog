var User = require('../db/db').User;

module.exports = function (passport) {
  //serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  //deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(require('./oAuthProviders/fbAuthentication'));
  passport.use(require('./oAuthProviders/githubAuthentication'));
};