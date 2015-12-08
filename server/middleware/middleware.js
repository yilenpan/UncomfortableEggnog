var jwt = require('jsonwebtoken');
var jwtKey = 'test';

module.exports = {
  verifyUser: function (req, res, next) {
    var token = req.headers.token;
    if (token) {
      jwt.verify(token, jwtKey, function (err, decoded) {
        if (err) {
          res.redirect('/');
        } else {
          req.user = decoded;
          console.log(req.user);
          next();
        }
      });
    } else {
      res.redirect('/');
    }
  }
};
