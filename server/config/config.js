var bodyParser = require('body-parser');
// var helpers = require('./helpers.js');
var session = require('express-session');
var sessionSecret = process.env.sessionSecret || 'don\'t tase me bro';


module.exports = function (app, express) {
//==========Core Middleware==============
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({
    // genid: function(req) {
    //   return genuuid(); // use UUIDs for session IDs 
    // },
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret
  }));
  app.use(express.static(__dirname + '/../../client'));
    

  app.get('/', function (req, res) {
    res.sendStatus(200);
  });
};
