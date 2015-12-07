var bodyParser = require('body-parser');
var helpers = require('../helpers/helpers.js');
var session = require('express-session');
// var sessionSecret = process.env.sessionSecret || require('./authKeys').sessionSecret;
var sessionSecret = "dasfgg";
var db = require('../db/db.js');

module.exports = function (app, express) {
  var userRoute = express.Router();
  var apiRoute = express.Router();
//==========Core Middleware==============
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  app.use(express.static(__dirname + '/../../client'));

//=========Custom Routes================
  // search, top10 packages
  app.use('/api', apiRoute);
  require('../routers/apiRoute')(apiRoute);

  // User login, logout, Add/View packages
  app.use('/', userRoute);
  require('../routers/routers.js')(userRoute);
};
