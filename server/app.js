var express = require('express');
var app = express();

require('./config/config.js')(app, express);

module.exports = app;
