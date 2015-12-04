var bodyParser = require('body-parser');
var helpers = require('../helpers/helpers.js');
var session = require('express-session');
var sessionSecret = process.env.sessionSecret || 'don\'t tase me bro';
var db = require('../db/db.js');
var routers = require('../routers/routers.js');

module.exports = function (app, express) {
//==========Core Middleware==============
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret
  }));
  app.use(express.static(__dirname + '/../../client'));

//=========Custom Routes==========
    app.use('/', routers);
};
