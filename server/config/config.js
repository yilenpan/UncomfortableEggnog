var bodyParser = require('body-parser');
var helpers = require('../helpers/helpers.js');
var sessionSecret = "dasfgg";
var db = require('../db/db.js');
var morgan = require('morgan');
var passport = require('passport');
var session = require('express-session');

module.exports = function (app, express) {
  var userRoute = express.Router();
  var apiRoute = express.Router();
//==========Passport====================
require('./passport.js')(passport);

//==========Core Middleware==============
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  // logging
  if (process.env.NODE === 'production') {
    app.use(morgan('production'));
    var sessionSecret = process.env.sessionSecret;
  } else {
    // app.use(morgan('dev'));
    var sessionSecret = 'tester';
  }
  app.use(session({secret: sessionSecret}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(__dirname + '/../../client'));

//=========Custom Routes================
  // search, top10 packages
  app.use('/api', apiRoute);
  require('../routers/apiRoute')(apiRoute);

  // User login, logout, Add/View packages
  app.use('/', userRoute);
  require('../routers/routers.js')(userRoute, passport);
};
